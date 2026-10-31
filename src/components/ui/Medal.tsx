/** A small ribboned medal with its place number: silver for 2nd, bronze for 3rd. */
const METAL: Record<number, string> = { 1: '#d4a72c', 2: '#aeb4c0', 3: '#c27a45' };

export function Medal({ place, size = 22 }: { place: number; size?: number }) {
  const metal = METAL[place] ?? 'currentColor';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M7 2h4l2 6H9zM17 2h-4l-2 6h4z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="12" cy="15" r="6.5" fill={metal} stroke="currentColor" strokeWidth="1.3" />
      <text x="12" y="18.2" textAnchor="middle" fontSize="8.5" fontWeight="700" fontFamily="system-ui, sans-serif" fill="#1c1230">
        {place}
      </text>
    </svg>
  );
}
