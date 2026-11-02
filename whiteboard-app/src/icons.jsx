// Stroke icons drawn to match Excalidraw's own menu icons (20px, 1.25 stroke).
function Icon({ children }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export function DiceIcon() {
  return (
    <Icon>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="8.5" cy="8.5" r="0.9" fill="currentColor" />
      <circle cx="15.5" cy="8.5" r="0.9" fill="currentColor" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" />
      <circle cx="8.5" cy="15.5" r="0.9" fill="currentColor" />
      <circle cx="15.5" cy="15.5" r="0.9" fill="currentColor" />
    </Icon>
  );
}

export function UploadIcon() {
  return (
    <Icon>
      <path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
      <path d="M7 9l5-5 5 5" />
      <path d="M12 4v12" />
    </Icon>
  );
}
