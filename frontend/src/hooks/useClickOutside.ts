import { useEffect } from "react";

export function useClickOutside(refs: React.RefObject<HTMLElement | null>[], onOutside: () => void) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInside = refs.some((ref) => ref.current?.contains(target));

      if (!clickedInside) onOutside();
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [refs, onOutside]);
}
