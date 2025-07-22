import { useEffect, useRef, useState, type RefObject } from "react";

export const useContainerObserver = (
  defaultWidth: number
): [number, RefObject<HTMLDivElement | null>] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(defaultWidth);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const newWidth = entry.contentRect.width;
      setWidth(newWidth);
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  return [width, containerRef];
};
