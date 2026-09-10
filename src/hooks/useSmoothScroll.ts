import { RefObject, useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling via Lenis.
 * - No arg → window / document scroll (public pages)
 * - RefObject → nested overflow container (dashboard shells)
 *
 * Always pass the RefObject itself — never `.current` at call time
 * (that is null on first render / hard reload and breaks wheel scroll).
 */
export const useSmoothScroll = (
  targetRef?: RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    const targetElement = targetRef?.current ?? null;

    // Nested shell: wrapper scrolls; content must be a single child that
    // wraps the full page height (header + main + footer).
    const contentElement = targetElement
      ? ((targetElement.firstElementChild as HTMLElement | null) ??
        targetElement)
      : document.documentElement;

    const lenis = new Lenis({
      ...(targetElement
        ? {
            wrapper: targetElement,
            content: contentElement,
          }
        : {
            wrapper: window,
            content: document.documentElement,
          }),
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoRaf: false,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [targetRef]);
};

export default useSmoothScroll;
