import { useEffect, useRef, useState } from "react";

/**
 * Adds an "in-view" boolean once the ref'd element crosses the viewport
 * threshold. Pair with the `.reveal` utility class in index.css.
 */
export default function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
