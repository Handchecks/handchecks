import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Fade + slide in when scrolled into view. The motion itself is plain CSS
 * (see .reveal in styles.css); this only flips a class once the element is visible.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "-80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={className ? `reveal ${className}` : "reveal"}
      style={{ "--rv-y": `${y}px`, "--rv-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
