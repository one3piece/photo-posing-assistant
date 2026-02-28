"use client";

import type { PoseTemplate } from "@/lib/poseTemplates";

interface PoseOverlayProps {
  template: PoseTemplate;
  /** Mirror overlay for front camera */
  mirror?: boolean;
  /** Step 4: green when aligned */
  aligned?: boolean;
}

export function PoseOverlay({ template, mirror = false, aligned = false }: PoseOverlayProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      <div
        className="h-[85%] max-h-[80vh] w-auto max-w-[60%] opacity-50"
        style={{
          transform: mirror ? "scaleX(-1)" : "none",
        }}
      >
        <div
          className="h-full w-full [&_svg]:h-full [&_svg]:w-full [&_svg]:object-contain transition-[filter,color] duration-300"
          style={{
            color: aligned ? "rgba(34, 197, 94, 0.95)" : "rgba(255, 255, 255, 0.9)",
            filter: aligned ? "drop-shadow(0 0 12px rgba(34, 197, 94, 0.8))" : "none",
          }}
          dangerouslySetInnerHTML={{ __html: template.svg }}
        />
      </div>
    </div>
  );
}
