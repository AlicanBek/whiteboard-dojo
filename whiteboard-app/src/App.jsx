import { useCallback, useEffect, useRef, useState } from "react";
import {
  CaptureUpdateAction,
  Excalidraw,
  MainMenu,
  Sidebar,
  WelcomeScreen,
  getSceneVersion,
  loadFromBlob,
  restoreElements,
  serializeAsJSON,
  useHandleLibrary,
} from "@excalidraw/excalidraw";
import {
  createBoard,
  deleteBoard,
  getLastBoardId,
  libraryAdapter,
  listBoards,
  loadBoard,
  renameBoard,
  saveBoard,
  setLastBoardId,
} from "./storage.js";
import {
  challengeCardText,
  challengeElements,
  challengeTitle,
  clearChallengeFromUrl,
  NORMAL_FONT_FAMILY,
  readChallengeFromUrl,
  waitForCardFont,
} from "./challenge.js";
import BoardsPanel from "./BoardsPanel.jsx";
import ChallengeTimer from "./ChallengeTimer.jsx";
import { DiceIcon, UploadIcon } from "./icons.jsx";
import { track } from "./track.js";

const THEME_KEY = "wd-theme";
const SAVE_DELAY_MS = 600;
// New boards start clean: the "Normal" font and straight "Architect" lines
// instead of Excalidraw's handwritten, sketchy defaults.
const EMPTY_VIEW = {
  scrollX: 0,
  scrollY: 0,
  zoom: { value: 1 },
  viewBackgroundColor: "#ffffff",
  currentItemFontFamily: NORMAL_FONT_FAMILY,
  currentItemRoughness: 0,
};

function readTheme() {
  try { return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light"; } catch { return "light"; }
}

// Keep only what's worth persisting: drop transient UI state and files no element uses.
// The file serializer leaves out the viewport and tool styles, so those are added back.
function toStoredScene(elements, appState, files) {
  const { elements: storedElements, appState: fileAppState } = JSON.parse(
    serializeAsJSON(elements, appState, {}, "local"),
  );
  const storedAppState = { ...fileAppState, scrollX: appState.scrollX, scrollY: appState.scrollY, zoom: appState.zoom };
  for (const key of Object.keys(appState)) {
    if (key.startsWith("currentItem")) storedAppState[key] = appState[key];
  }
  const used = new Set(elements.filter((el) => !el.isDeleted && el.fileId).map((el) => el.fileId));
  const storedFiles = Object.fromEntries(Object.entries(files || {}).filter(([id]) => used.has(id)));
  return { elements: storedElements, appState: storedAppState, files: storedFiles };
}

export default function App() {
  const [api, setApi] = useState(null);
  const [boards, setBoards] = useState([]);
  const [current, setCurrent] = useState(null); // { id, data, isNew }
  const [theme, setTheme] = useState(readTheme);

  const pending = useRef(null);
  const saveTimer = useRef(null);
  const baselineVersion = useRef(null);
  const shownBoardId = useRef(null); // the board the canvas is showing right now
  const initialData = useRef(null);
  const fileInput = useRef(null);
  const editedThisSession = useRef(new Set());
  // Programmatic changes (loading a board, placing a challenge card, font refreshes) also
  // change the scene, so an edit only counts once the person has touched the page.
  const userInteracted = useRef(false);
  useEffect(() => {
    const mark = () => { userInteracted.current = true; };
    window.addEventListener("pointerdown", mark, true);
    window.addEventListener("keydown", mark, true);
    return () => {
      window.removeEventListener("pointerdown", mark, true);
      window.removeEventListener("keydown", mark, true);
    };
  }, []);

  // Keeps the shape library across reloads and accepts libraries sent back from
  // libraries.excalidraw.com via the "Browse libraries" link.
  useHandleLibrary({ excalidrawAPI: api, adapter: libraryAdapter });

  const refreshBoards = useCallback(async () => setBoards(await listBoards()), []);

  const flush = useCallback(async () => {
    clearTimeout(saveTimer.current);
    const p = pending.current;
    if (!p) return;
    pending.current = null;
    if (p.changed) baselineVersion.current = p.version;
    await saveBoard(p.id, toStoredScene(p.elements, p.appState, p.files), { touch: p.changed });
    if (p.changed) refreshBoards();
  }, [refreshBoards]);

  const openBoard = useCallback(async (id, { isNew = false } = {}) => {
    await flush();
    let data = await loadBoard(id);
    if (!data) {
      id = await createBoard();
      data = await loadBoard(id);
    }
    setLastBoardId(id);
    setCurrent({ id, data, isNew });
    refreshBoards();
  }, [flush, refreshBoards]);

  // First load: a challenge from the Dojo gets its own board; otherwise reopen the last one.
  useEffect(() => {
    (async () => {
      const challenge = readChallengeFromUrl();
      if (challenge) {
        const id = await createBoard({ title: challengeTitle(challenge), challenge });
        track("board_created", { source: "challenge" });
        clearChallengeFromUrl();
        return openBoard(id, { isNew: true });
      }
      const list = await listBoards();
      const last = getLastBoardId();
      let id = list.find((b) => b.id === last)?.id ?? list[0]?.id;
      if (!id) {
        id = await createBoard();
        track("board_created", { source: "first_visit" });
      }
      openBoard(id);
    })();
  }, [openBoard]);

  // Don't lose the last edits when the tab is hidden or closed.
  useEffect(() => {
    const onHide = () => { if (document.visibilityState === "hidden") flush(); };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
    };
  }, [flush]);

  // One Excalidraw instance for the whole session. The first board is its initialData
  // (Excalidraw applies that asynchronously after mount, so an earlier updateScene would
  // be overwritten); later switches swap the scene through the API.
  useEffect(() => {
    if (!api || !current || shownBoardId.current === current.id) return;
    const { elements = [], appState = {}, files = {} } = current.data;
    shownBoardId.current = current.id;
    baselineVersion.current = null;
    api.updateScene({
      elements: restoreElements(elements, null),
      appState: { ...EMPTY_VIEW, ...appState },
      captureUpdate: CaptureUpdateAction.NEVER,
    });
    const fileList = Object.values(files);
    if (fileList.length) api.addFiles(fileList);
    api.history.clear();
    if (current.isNew && elements.length) api.scrollToContent(undefined, { fitToViewport: true, viewportZoomFactor: 0.8 });
  }, [api, current]);

  // The prompt card is added once the board is up: text measured before Excalidraw's
  // handwriting font has loaded comes out too narrow and gets clipped.
  const placingCard = useRef(null);
  useEffect(() => {
    const challenge = current?.data.challenge;
    if (!api || !challenge || challenge.placed || placingCard.current === current.id) return;
    placingCard.current = current.id;
    (async () => {
      await waitForCardFont(challengeCardText(challenge));
      const elements = [...api.getSceneElements(), ...challengeElements(challenge)];
      api.updateScene({ elements, captureUpdate: CaptureUpdateAction.NEVER });
      api.scrollToContent(elements, { fitToViewport: true, viewportZoomFactor: 0.6 });
      const placed = { ...challenge, placed: true };
      await saveBoard(current.id, { challenge: placed }, { touch: false });
      setCurrent((c) => (c.id === current.id ? { ...c, data: { ...c.data, challenge: placed } } : c));
    })();
  }, [api, current]);

  const onChange = useCallback((elements, appState, files) => {
    const boardId = shownBoardId.current;
    if (!boardId) return;
    if (appState.theme !== theme) {
      setTheme(appState.theme);
      try { localStorage.setItem(THEME_KEY, appState.theme); } catch { /* storage blocked */ }
    }
    // Scrolling and zooming are saved too, but only real edits bump "last edited".
    const version = getSceneVersion(elements);
    if (baselineVersion.current === null) baselineVersion.current = version;
    const changed = version !== baselineVersion.current;
    if (changed && userInteracted.current && !editedThisSession.current.has(boardId)) {
      editedThisSession.current.add(boardId);
      track("board_edited");
    }
    pending.current = { id: boardId, elements, appState, files, version, changed };
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(flush, SAVE_DELAY_MS);
  }, [theme, flush]);

  const newBoard = useCallback(async () => {
    const id = await createBoard();
    track("board_created", { source: "new" });
    openBoard(id, { isNew: true });
  }, [openBoard]);

  const onImportFile = useCallback(async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const scene = await loadFromBlob(file, null, null);
      const id = await createBoard({
        title: file.name.replace(/\.(excalidraw|json)$/i, "") || "Imported board",
        scene: toStoredScene(scene.elements, scene.appState, scene.files),
      });
      track("board_created", { source: "import" });
      openBoard(id, { isNew: true });
    } catch {
      window.alert("That file couldn't be opened. Use a .excalidraw or .json board file.");
    }
  }, [openBoard]);

  const importBoard = useCallback(() => fileInput.current?.click(), []);

  const onRename = useCallback(async (id, title) => {
    await renameBoard(id, title.trim() || "Untitled board");
    refreshBoards();
  }, [refreshBoards]);

  const onDelete = useCallback(async (id) => {
    if (id === current?.id) pending.current = null;
    await deleteBoard(id);
    const list = await listBoards();
    setBoards(list);
    if (id === current?.id) openBoard(list[0]?.id ?? (await createBoard()));
  }, [current, openBoard]);

  const setChallengeHidden = useCallback(async (hidden) => {
    if (!current?.data.challenge) return;
    const challenge = { ...current.data.challenge, hidden };
    await saveBoard(current.id, { challenge }, { touch: false });
    setCurrent((c) => ({ ...c, data: { ...c.data, challenge } }));
  }, [current]);

  const toggleBoards = useCallback(() => api?.toggleSidebar({ name: "boards" }), [api]);

  if (!current) return null;

  if (!initialData.current) {
    const { elements = [], appState = {}, files = {} } = current.data;
    initialData.current = {
      elements,
      appState: { ...EMPTY_VIEW, ...appState, theme },
      files,
      scrollToContent: current.isNew,
    };
    shownBoardId.current = current.id;
  }

  const title = boards.find((b) => b.id === current.id)?.title ?? "Untitled board";
  const challenge = current.data.challenge;

  return (
    <div className="wd-app" data-theme={theme}>
      <Excalidraw
        excalidrawAPI={setApi}
        initialData={initialData.current}
        onChange={onChange}
        libraryReturnUrl={`${window.location.origin}${window.location.pathname}`}
        UIOptions={{ canvasActions: { loadScene: false } }}
        // Phones get no room up there; "My boards" is in the menu instead.
        renderTopRightUI={(isMobile) => !isMobile && (
          <button className="wd-board-pill" onClick={toggleBoards} title="My boards">
            <span className="wd-board-pill-title">{title}</span>
            <span aria-hidden="true">▾</span>
          </button>
        )}
      >
        <MainMenu>
          <MainMenu.Item onSelect={newBoard}>New board</MainMenu.Item>
          <MainMenu.Item onSelect={toggleBoards}>My boards</MainMenu.Item>
          <MainMenu.Item onSelect={importBoard}>Import board…</MainMenu.Item>
          <MainMenu.DefaultItems.Export />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.Separator />
          {challenge?.hidden && (
            <MainMenu.Item onSelect={() => setChallengeHidden(false)}>Show challenge timer</MainMenu.Item>
          )}
          <MainMenu.ItemLink href="../dojo/">Get a challenge</MainMenu.ItemLink>
          <MainMenu.ItemLink href="../">Whiteboard Dojo home</MainMenu.ItemLink>
          <MainMenu.Separator />
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
          <MainMenu.DefaultItems.Help />
        </MainMenu>

        <WelcomeScreen>
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Logo>
              <span className="wd-welcome-logo">
                <img src="../images/logo.svg" alt="" />
                Whiteboard Dojo
              </span>
            </WelcomeScreen.Center.Logo>
            <WelcomeScreen.Center.Heading>
              Sketch, wireframe and practice design challenges on an infinite canvas.
            </WelcomeScreen.Center.Heading>
            <WelcomeScreen.Center.Menu>
              <WelcomeScreen.Center.MenuItemLink href="../dojo/" icon={<DiceIcon />}>
                Get a challenge
              </WelcomeScreen.Center.MenuItemLink>
              <WelcomeScreen.Center.MenuItem onSelect={importBoard} icon={<UploadIcon />}>
                Import a board
              </WelcomeScreen.Center.MenuItem>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center.Menu>
            <p className="wd-welcome-tips">
              Pick a tool above or press 1 to 9 · Drop images straight onto the canvas · Boards save automatically in
              this browser
            </p>
          </WelcomeScreen.Center>
        </WelcomeScreen>

        <Sidebar name="boards">
          <Sidebar.Header>My boards</Sidebar.Header>
          <BoardsPanel
            boards={boards}
            currentId={current.id}
            onOpen={(id) => id !== current.id && openBoard(id)}
            onNew={newBoard}
            onImport={importBoard}
            onRename={onRename}
            onDelete={onDelete}
          />
        </Sidebar>
      </Excalidraw>

      <a className="wd-brand" href="../" title="Whiteboard Dojo home">
        <img src="../images/logo.svg" alt="" />
        <span>Whiteboard Dojo</span>
      </a>

      {challenge && !challenge.hidden && (
        <ChallengeTimer key={current.id} challenge={challenge} onClose={() => setChallengeHidden(true)} />
      )}

      <input
        ref={fileInput}
        type="file"
        accept=".excalidraw,.json,application/json"
        hidden
        onChange={onImportFile}
      />
    </div>
  );
}
