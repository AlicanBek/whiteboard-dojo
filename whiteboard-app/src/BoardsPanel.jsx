import { useState } from "react";

const timeFormat = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

function relativeTime(ms) {
  const minutes = Math.round((ms - Date.now()) / 60000);
  if (Math.abs(minutes) < 1) return "just now";
  if (Math.abs(minutes) < 60) return timeFormat.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return timeFormat.format(hours, "hour");
  return timeFormat.format(Math.round(hours / 24), "day");
}

export default function BoardsPanel({ boards, currentId, onOpen, onNew, onImport, onRename, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");

  const startRename = (board) => {
    setEditingId(board.id);
    setDraft(board.title);
  };

  const commitRename = () => {
    if (editingId) onRename(editingId, draft);
    setEditingId(null);
  };

  return (
    <div className="wd-boards">
      <div className="wd-boards-actions">
        <button className="wd-btn wd-btn-primary" onClick={onNew}>New board</button>
        <button className="wd-btn" onClick={onImport}>Import…</button>
      </div>

      <ul className="wd-boards-list">
        {boards.map((board) => (
          <li key={board.id} className={board.id === currentId ? "wd-board is-current" : "wd-board"}>
            {editingId === board.id ? (
              <input
                className="wd-board-input"
                value={draft}
                autoFocus
                onFocus={(e) => e.target.select()}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commitRename}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitRename();
                  if (e.key === "Escape") setEditingId(null);
                  e.stopPropagation(); // keep Excalidraw shortcuts out of the input
                }}
              />
            ) : (
              <button className="wd-board-open" onClick={() => onOpen(board.id)} onDoubleClick={() => startRename(board)}>
                <span className="wd-board-title">{board.title}</span>
                <span className="wd-board-meta">Edited {relativeTime(board.updatedAt)}</span>
              </button>
            )}
            <div className="wd-board-tools">
              <button className="wd-icon-btn" title="Rename" onClick={() => startRename(board)}>✎</button>
              <button
                className="wd-icon-btn"
                title="Delete"
                onClick={() => window.confirm(`Delete “${board.title}”? This can't be undone.`) && onDelete(board.id)}
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="wd-boards-note">
        Boards are stored only in this browser. Use “Save to…” in the menu to keep a copy as a file.
      </p>
    </div>
  );
}
