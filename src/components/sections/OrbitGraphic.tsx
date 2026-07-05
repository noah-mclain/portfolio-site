import styles from './OrbitGraphic.module.css';

interface Planet {
  label: string;
  size: 'sm' | 'md' | 'lg';
}

interface Orbit {
  radius: number;
  duration: number;
  reverse?: boolean;
  planets: Planet[];
}

const VIEWBOX = 240;

const ORBITS: Orbit[] = [
  {
    radius: 38,
    duration: 16,
    planets: [
      { label: 'Py', size: 'sm' },
      { label: 'AI', size: 'sm' },
    ],
  },
  {
    radius: 62,
    duration: 26,
    reverse: true,
    planets: [
      { label: 'ML', size: 'sm' },
      { label: 'NLP', size: 'md' },
      { label: 'CV', size: 'sm' },
    ],
  },
  {
    radius: 84,
    duration: 38,
    planets: [
      { label: 'LLMs', size: 'md' },
      { label: 'RL', size: 'sm' },
      { label: 'Agents', size: 'lg' },
      { label: 'Voice', size: 'md' },
    ],
  },
  {
    radius: 104,
    duration: 56,
    reverse: true,
    planets: [
      { label: 'Docker', size: 'md' },
      { label: 'AWS', size: 'sm' },
      { label: 'Git', size: 'sm' },
    ],
  },
];

const PLANET_SIZE: Record<Planet['size'], number> = {
  sm: 20,
  md: 26,
  lg: 32,
};

/**
 * A glowing sun with concentric orbits of skill "planets".
 * Each orbit is a square div sized to its diameter; planets are placed at the
 * top edge and rotated by their angular position around the orbit's center
 * via a per-planet "rotator" wrapper. The orbit itself spins via CSS
 * animation, so planets travel around the sun.
 */
export function OrbitGraphic() {
  return (
    <div className={styles.wrapper} aria-hidden>
      <svg viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} className={styles.svg}>
        <defs>
          <radialGradient id="sun-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#fff', stopOpacity: 1 }} />
            <stop offset="40%" style={{ stopColor: 'var(--color-accent-soft)', stopOpacity: 1 }} />
            <stop offset="80%" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0.85 }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-accent-strong)', stopOpacity: 0 }} />
          </radialGradient>
          <linearGradient id="orbit-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0.55 }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>

        {ORBITS.map((orbit) => (
          <circle
            key={orbit.radius}
            cx={VIEWBOX / 2}
            cy={VIEWBOX / 2}
            r={orbit.radius}
            fill="none"
            stroke="url(#orbit-stroke)"
            strokeWidth="0.6"
            strokeDasharray="1.5 5"
          />
        ))}

        <circle cx={VIEWBOX / 2} cy={VIEWBOX / 2} r="34" fill="url(#sun-core)" className={styles.sunGlow} />
        <circle cx={VIEWBOX / 2} cy={VIEWBOX / 2} r="9" fill="#fff" />
      </svg>

      {ORBITS.map((orbit, i) => {
        const sizePct = ((orbit.radius * 2) / VIEWBOX) * 100;
        return (
          <div
            key={i}
            className={styles.orbit}
            style={{
              width: `${sizePct}%`,
              height: `${sizePct}%`,
              animationDuration: `${orbit.duration}s`,
              animationDirection: orbit.reverse ? 'reverse' : 'normal',
            }}
          >
            {orbit.planets.map((planet, j) => {
              const angle = (360 / orbit.planets.length) * j;
              const size = PLANET_SIZE[planet.size];
              return (
                <div
                  key={planet.label}
                  className={styles.rotator}
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <span
                    className={`${styles.planet} ${styles[`planet--${planet.size}`]}`}
                    style={{ width: `${size}px`, height: `${size}px` }}
                  >
                    <span
                      className={styles.planetLabel}
                      style={{ transform: `rotate(${-angle}deg)` }}
                    >
                      {planet.label}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
