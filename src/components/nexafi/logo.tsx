export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="NexaFi logo">
      <defs>
        <linearGradient id="nexafi-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6C3CE1" />
          <stop offset="60%" stopColor="#4F7DF3" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="45" height="45" rx="13" fill="url(#nexafi-mark)" opacity="0.16" />
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="13"
        fill="none"
        stroke="url(#nexafi-mark)"
        strokeWidth="2"
      />
      <path
        d="M15 34V14l18 20V14"
        fill="none"
        stroke="url(#nexafi-mark)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Logo className="h-8 w-8" />
      <span className="font-display text-lg font-semibold tracking-tight">
        Nexa<span className="gradient-text">Fi</span>
      </span>
    </span>
  );
}
