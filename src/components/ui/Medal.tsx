/**
 * A small ribboned medal with its place number, drawn in the current color so
 * it matches the icon tile it sits in. The number carries the place.
 */
export function Medal({ place, size = 22 }: { place: number; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M7 2h4l2 6H9zM17 2h-4l-2 6h4z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="12" cy="15" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="12" y="18.2" textAnchor="middle" fontSize="8.5" fontWeight="700" fontFamily="system-ui, sans-serif" fill="currentColor">
        {place}
      </text>
    </svg>
  );
}
