import { convertToExcalidrawElements } from "@excalidraw/excalidraw";

export const DEFAULT_TIMER_SECONDS = 15 * 60;

// The Dojo page links here with ?challenge=<urlencoded design/for/toHelp/timer>.
export function readChallengeFromUrl() {
  const raw = new URLSearchParams(window.location.search).get("challenge");
  if (!raw) return null;
  const data = new URLSearchParams(decodeURIComponent(raw));
  const design = data.get("design");
  const forValue = data.get("for");
  const toHelp = data.get("toHelp");
  if (!design || !forValue || !toHelp) return null;
  const timer = parseInt(data.get("timer"), 10);
  return {
    design,
    for: forValue,
    toHelp,
    timer: Number.isFinite(timer) && timer > 0 ? timer : DEFAULT_TIMER_SECONDS,
  };
}

export function clearChallengeFromUrl() {
  window.history.replaceState(null, "", window.location.pathname);
}

export function challengeTitle(c) {
  return `Design ${c.design}`;
}

// Excalidraw registers its font faces after mount; until then fonts.load() resolves
// with nothing. Poll until the card's font face is registered and loaded.
export async function waitForCardFont(text, timeoutMs = 4000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const faces = await document.fonts.load(`${CARD_FONT_SIZE}px ${CARD_FONT}`, text).catch(() => []);
    if (faces.length) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

export function challengeCardText(c) {
  return `CHALLENGE\n\nDesign ${c.design}\nfor ${c.for}\nto help ${c.toHelp}`;
}

// A prompt card placed on the canvas, so the brief stays with the board and its exports.
// Text is measured first, then a background sized around it; both share a group.
const CARD_PADDING = 28;
const CARD_FONT_SIZE = 20;
const CARD_FONT = "Nunito"; // Excalidraw's "Normal" font, fontFamily 6
export const NORMAL_FONT_FAMILY = 6;

// Excalidraw can measure with metrics cached before its font finished loading,
// which leaves the text box too narrow. Measure the lines directly instead.
function measureLines(text) {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = `${CARD_FONT_SIZE}px ${CARD_FONT}`;
  return Math.ceil(Math.max(...text.split("\n").map((line) => ctx.measureText(line).width)));
}

export function challengeElements(c) {
  const groupIds = [`challenge-${Date.now()}`];
  const [converted] = convertToExcalidrawElements([
    {
      type: "text",
      x: CARD_PADDING,
      y: CARD_PADDING,
      text: challengeCardText(c),
      fontSize: CARD_FONT_SIZE,
      fontFamily: NORMAL_FONT_FAMILY,
      strokeColor: "#c01f1f",
      groupIds,
    },
  ]);
  const text = { ...converted, width: Math.max(converted.width, measureLines(converted.text)) };
  const [card] = convertToExcalidrawElements([
    {
      type: "rectangle",
      x: 0,
      y: 0,
      width: text.width + CARD_PADDING * 2,
      height: text.height + CARD_PADDING * 2,
      strokeColor: "#e32727",
      backgroundColor: "#fff5f5",
      fillStyle: "solid",
      roughness: 0,
      roundness: { type: 3 },
      groupIds,
    },
  ]);
  return [card, text];
}
