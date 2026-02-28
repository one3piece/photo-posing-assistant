"use client";

import type { PoseTemplate } from "@/lib/poseTemplates";

interface PoseOverlayProps {
  template: PoseTemplate;
  /** Mirror overlay for front camera */
  mirror?: boolean;
  /** Green when aligned */
  aligned?: boolean;
}

const NEON_ALIGNED = "#00FF66";
const NEON_GLOW = "0 0 20px rgba(0, 255, 102, 0.9), 0 0 40px rgba(0, 255, 102, 0.5)";

export function PoseOverlay({ template, mirror = false, aligned = false }: PoseOverlayProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between"
      aria-hidden
    >
      {/* Rule of thirds grid: 2 vertical + 2 horizontal lines */}
      <div className="absolute inset-0 flex items-stretch justify-stretch">
        <div className="absolute left-1/3 top-0 h-full w-px bg-white" style={{ opacity: 0.15 }} />
        <div className="absolute left-2/3 top-0 h-full w-px bg-white" style={{ opacity: 0.15 }} />
        <div className="absolute left-0 top-1/3 h-px w-full bg-white" style={{ opacity: 0.15 }} />
        <div className="absolute left-0 top-2/3 h-px w-full bg-white" style={{ opacity: 0.15 }} />
      </div>

      {/* Corner brackets: camera viewfinder style (⌜ ⌝ ⌞ ⌟) */}
      <div className="absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-white" style={{ opacity: 0.5 }} />
      <div className="absolute right-0 top-0 h-12 w-12 border-r-2 border-t-2 border-white" style={{ opacity: 0.5 }} />
      <div className="absolute bottom-0 left-0 h-12 w-12 border-b-2 border-l-2 border-white" style={{ opacity: 0.5 }} />
      <div className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-white" style={{ opacity: 0.5 }} />

      {/* Silhouette overlay: centered, with smooth alignment glow */}
      <div className="absolute inset-0 flex flex-1 items-center justify-center">
        <div
          className="h-[82%] max-h-[75vh] w-auto max-w-[58%] transition-[filter,color] duration-500 ease-out"
          style={{
            transform: mirror ? "scaleX(-1)" : "none",
            color: aligned ? NEON_ALIGNED : "rgba(255, 255, 255, 0.85)",
            filter: aligned
              ? `drop-shadow(${NEON_GLOW})`
              : "drop-shadow(0 0 6px rgba(255,255,255,0.2))",
          }}
        >
          <div
            className="h-full w-full [&_svg]:h-full [&_svg]:w-full [&_svg]:object-contain"
            dangerouslySetInnerHTML={{ __html: template.svg }}
          />
        </div>
      </div>

      {/* Bottom hint: glows green when aligned */}
      <div className="safe-bottom w-full px-4 pb-6 text-center">
        <p
          className="text-sm font-medium transition-all duration-500 ease-out"
          style={{
            color: aligned ? NEON_ALIGNED : "rgba(255, 255, 255, 0.5)",
            textShadow: aligned
              ? "0 0 12px rgba(0, 255, 102, 0.9), 0 0 24px rgba(0, 255, 102, 0.5)"
              : "0 0 6px rgba(0,0,0,0.4)",
          }}
        >
          Match the glowing outline to capture
        </p>
      </div>
    </div>
  );
}
