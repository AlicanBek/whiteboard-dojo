import { useEffect, useState } from "react";

const STEP_SECONDS = 60;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function ChallengeTimer({ challenge, onClose }) {
  const [total, setTotal] = useState(challenge.timer);
  const [left, setLeft] = useState(challenge.timer);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const tick = setInterval(() => {
      setLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [running]);

  const adjust = (delta) => {
    const next = Math.max(STEP_SECONDS, total + delta);
    setTotal(next);
    setLeft((t) => Math.max(0, t + (next - total)));
  };

  const reset = () => {
    setRunning(false);
    setLeft(total);
  };

  const timeUp = left === 0;

  return (
    <div className={timeUp ? "wd-timer is-up" : "wd-timer"} role="timer" aria-live="polite">
      <div className="wd-timer-brief" title={`Design ${challenge.design} for ${challenge.for} to help ${challenge.toHelp}`}>
        <span className="wd-timer-label">Challenge</span>
        <span className="wd-timer-design">Design {challenge.design}</span>
      </div>
      <div className="wd-timer-clock">
        <button className="wd-icon-btn" onClick={() => adjust(-STEP_SECONDS)} disabled={running} title="1 minute less">−</button>
        <span className="wd-timer-time">{timeUp ? "Time's up" : formatTime(left)}</span>
        <button className="wd-icon-btn" onClick={() => adjust(STEP_SECONDS)} disabled={running} title="1 minute more">+</button>
      </div>
      <div className="wd-timer-actions">
        {timeUp ? (
          <button className="wd-btn" onClick={reset}>Restart</button>
        ) : (
          <button className="wd-btn wd-btn-primary" onClick={() => setRunning((r) => !r)}>
            {running ? "Pause" : left === total ? "Start" : "Resume"}
          </button>
        )}
        {!timeUp && left !== total && <button className="wd-btn" onClick={reset}>Reset</button>}
        <button className="wd-icon-btn" onClick={onClose} title="Hide timer (bring it back from the menu)">✕</button>
      </div>
    </div>
  );
}
