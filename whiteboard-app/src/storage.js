// All boards live in this browser's IndexedDB. No server, no accounts.
import { get, set, del, createStore } from "idb-keyval";

const store = createStore("whiteboard-dojo", "boards");
const INDEX_KEY = "index";
const LAST_KEY = "wd-last-board";

// Serialize index writes so concurrent saves can't clobber each other.
let queue = Promise.resolve();
function updateIndex(fn) {
  queue = queue.then(async () => {
    const list = (await get(INDEX_KEY, store)) || [];
    const next = fn(list);
    await set(INDEX_KEY, next, store);
    return next;
  });
  return queue;
}

export async function listBoards() {
  await queue;
  const list = (await get(INDEX_KEY, store)) || [];
  return [...list].sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function createBoard({ title = "Untitled board", scene = {}, challenge = null } = {}) {
  const id = crypto.randomUUID();
  const now = Date.now();
  await set(`board:${id}`, { elements: [], appState: {}, files: {}, ...scene, challenge }, store);
  await updateIndex((list) => [{ id, title, createdAt: now, updatedAt: now }, ...list]);
  return id;
}

export function loadBoard(id) {
  return get(`board:${id}`, store);
}

export async function saveBoard(id, data, { touch = true } = {}) {
  const prev = await get(`board:${id}`, store);
  if (!prev) return; // deleted while a save was pending
  await set(`board:${id}`, { ...prev, ...data }, store);
  if (touch) await updateIndex((list) => list.map((b) => (b.id === id ? { ...b, updatedAt: Date.now() } : b)));
}

export function renameBoard(id, title) {
  return updateIndex((list) => list.map((b) => (b.id === id ? { ...b, title } : b)));
}

export async function deleteBoard(id) {
  await del(`board:${id}`, store);
  await updateIndex((list) => list.filter((b) => b.id !== id));
}

export function getLastBoardId() {
  try { return localStorage.getItem(LAST_KEY); } catch { return null; }
}

export function setLastBoardId(id) {
  try { localStorage.setItem(LAST_KEY, id); } catch { /* storage blocked */ }
}
