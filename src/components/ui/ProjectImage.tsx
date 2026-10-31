import { useEffect, useRef, useState } from 'react';
import styles from './ProjectImage.module.css';

export function ProjectImage({ image, video, name }: { image?: string; video?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', update);
    update();
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const player = videoRef.current;
    if (!player) return;
    if (reducedMotion) {
      player.pause();
      player.load();
    } else {
      void player.play().catch(() => {});
    }
  }, [reducedMotion, video]);

  useEffect(() => setFailed(false), [image, video]);

  return (
    <div className={styles.frame}>
      {failed ? (
        <p className={styles.fallback}>
          Preview unavailable<span>{name} · See project source below</span>
        </p>
      ) : video ? (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="metadata"
          poster={image}
          autoPlay={!reducedMotion}
          aria-label={`${name} application preview`}
          onError={() => setFailed(true)}
        />
      ) : image ? (
        <img
          src={image}
          alt={`${name} application interface`}
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <p className={styles.fallback}>{name}</p>
      )}
    </div>
  );
}
