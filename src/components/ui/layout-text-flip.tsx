import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LayoutTextFlipProps {
  text: string;
  words: string[];
  duration?: number;
  className?: string;
}

export const LayoutTextFlip: React.FC<LayoutTextFlipProps> = ({
  text,
  words,
  duration = 3000,
  className,
}) => {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"visible" | "exiting">("visible");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const start = () => {
      intervalRef.current = setInterval(() => {
        setPhase("exiting");
        timerRef.current = setTimeout(() => {
          setIndex((i) => (i + 1) % words.length);
          setPhase("visible");
        }, 350);
      }, duration);
    };

    const stop = () => {
      clearInterval(intervalRef.current);
      clearTimeout(timerRef.current);
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [words.length, duration]);

  const maxLen = Math.max(...words.map((w) => w.length));

  return (
    <span className={cn("inline-block", className)}>
      {text}{" "}
      <span
        className="relative inline-block text-left align-top"
        style={{ width: `${maxLen * 0.7}ch`, minWidth: `${maxLen * 0.7}ch` }}
      >
        <span
          className="inline-block whitespace-nowrap absolute left-0"
          style={{
            opacity: phase === "visible" ? 1 : 0,
            transform:
              phase === "visible" ? "translateY(0) rotateX(0deg)" : "translateY(-8px) rotateX(90deg)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {words[index]}
        </span>
      </span>
    </span>
  );
};
