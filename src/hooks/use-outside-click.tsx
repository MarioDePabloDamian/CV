import React, { useEffect, useRef } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: Function,
  enabled: boolean = true
) => {
  const mouseDownTargetRef = useRef<Node | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleMouseDown = (event: Event) => {
      mouseDownTargetRef.current = event.target as Node;
    };

    const handleMouseUp = (event: Event) => {
      const target = event.target as Node;
      
      if (mouseDownTargetRef.current && ref.current?.contains(mouseDownTargetRef.current)) {
        mouseDownTargetRef.current = null;
        return;
      }

      if (ref.current?.contains(target)) {
        mouseDownTargetRef.current = null;
        return;
      }

      const selection = window.getSelection();
      const hasSelection = selection && selection.rangeCount > 0 && selection.toString().length > 0;
      
      if (hasSelection) {
        mouseDownTargetRef.current = null;
        return;
      }

      mouseDownTargetRef.current = null;
      callback(event);
    };
    document.addEventListener("mousedown", handleMouseDown, true);
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("touchstart", handleMouseDown, true);
    document.addEventListener("touchend", handleMouseUp, true);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown, true);
      document.removeEventListener("mouseup", handleMouseUp, true);
      document.removeEventListener("touchstart", handleMouseDown, true);
      document.removeEventListener("touchend", handleMouseUp, true);
    };
  }, [ref, callback, enabled]);
};
