import { useState } from "react";

const FallbackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

export default function Screenshot() {
  const [errored, setErrored] = useState(false);

  return (
    <section className="shot-section">
      <div className="panel">
        <div className="panel-head">
          <span className="panel-dot" />
          <span>sieve.exe</span>
        </div>
        <div className="shot-body">
          {errored ? (
            <div className="shot-fallback">
              <FallbackIcon />
              <span>Тут должен был быть скриншот...</span>
            </div>
          ) : (
            <img
              src="screenshot.png"
              alt="скрин sieve"
              onError={() => setErrored(true)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
