"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type EasingFn = (t: number) => number;

type Props = {
  value: number;
  durationMs?: number;
  size?: number;
  strokeWidth?: number;
  colors?: [string, string];
  trailColor?: string;
  easing?: EasingFn;
  loop?: boolean;
};

const easeOutCubic: EasingFn = (t) => 1 - Math.pow(1 - t, 3);

export default function GradientLoadingBar({
  value,
  durationMs = 2000,
  size = 200,
  strokeWidth = 12,
  colors = ["#ff7e5f", "#feb47b"],
  trailColor = "#eee",
  easing = easeOutCubic,
  loop = false,
}: Props) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(0);
  const toRef = useRef(Math.max(0, Math.min(100, value)));

  // unik id för gradient i DOM
  const gradId = useMemo(
    () => "grad-" + Math.random().toString(36).slice(2),
    []
  );

  // uppdatera target när prop 'value' ändras
  useEffect(() => {
    toRef.current = Math.max(0, Math.min(100, value));
    // starta ny animation från nuvarande progress
    fromRef.current = progress;
    startRef.current = null;

    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;
      const pct = Math.min(1, elapsed / durationMs);
      const eased = easing(pct);
      const next =
        fromRef.current + (toRef.current - fromRef.current) * eased;

      setProgress(next);

      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (loop) {
        // vänd riktning och loopa
        fromRef.current = toRef.current;
        toRef.current = toRef.current === 0 ? value : 0;
        startRef.current = null;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, durationMs, easing, loop]); // avsiktligt inte 'progress'

  return (
    <div
      style={{ position: "relative", width: size, height: size }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-label="Laddning"
    >
      {/* SVG-defs för gradient */}
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
      </svg>

      <CircularProgressbar
        value={progress}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          pathColor: `url(#${gradId})`,
          trailColor,
          strokeLinecap: "round",
          // textColor etc. finns om du vill använda inbyggd text
        })}
      />

      {/* Procenttext i mitten */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: Math.max(14, size * 0.18),
          userSelect: "none",
        }}
      >
        {Math.round(progress)}%
      </div>
    </div>
  );
}
