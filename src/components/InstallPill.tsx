import { useState, useRef } from "react";

const installCmd = "scoop bucket add elev1e1nSure https://github.com/elev1e1nSure/scoop-bucket; scoop install sieve";

const IconCopy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="9" y="9" width="11" height="11" rx="1" />
    <path d="M5 15V5a1 1 0 0 1 1-1h10" />
  </svg>
);

const IconCheck = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path className="check-path" d="M5 13l4 4L19 7" />
  </svg>
);

export default function InstallPill() {
  const [copied, setCopied] = useState(false);
  const [bounce, setBounce] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd).then(() => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setCopied(true);
      setBounce(false);
      requestAnimationFrame(() => setBounce(true));
      timerRef.current = setTimeout(() => {
        setCopied(false);
      }, 1500);
    });
  };

  return (
    <>
      <div className="install-label">установка</div>
      <div className={`install${copied ? " copied" : ""}`}>
        <span className={`toast${copied ? " show" : ""}`}>скопировано</span>
        <code>{installCmd}</code>
        <button
          onClick={handleCopy}
          aria-label="скопировать команду"
          title="скопировать"
          className={bounce ? "bounce" : ""}
        >
          {copied ? <IconCheck /> : <IconCopy />}
        </button>
      </div>
    </>
  );
}
