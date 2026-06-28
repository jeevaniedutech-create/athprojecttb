import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export function LazyImage({ src, alt, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-[var(--brand-cream)] ${className ?? ""}`}
    >
      {!loaded && (
        <div
          className="w-full animate-pulse bg-gradient-to-br from-[var(--brand-cream)] via-white to-[var(--brand-cream)]"
          style={{ aspectRatio: "4 / 5" }}
        />
      )}
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          className={`block w-full h-auto transition-all duration-1000 ease-out ${
            loaded ? "opacity-100 scale-100 static" : "opacity-0 scale-105 absolute inset-0"
          } group-hover:scale-[1.04]`}
        />
      )}
    </div>
  );
}
