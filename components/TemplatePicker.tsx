"use client";

import { useRef, useState } from "react";
import { POSE_TEMPLATES, type PoseTemplate } from "@/lib/poseTemplates";
import { PaywallModal } from "@/components/PaywallModal";

interface TemplatePickerProps {
  selectedId: string | null;
  onSelect: (template: PoseTemplate | null) => void;
}

export function TemplatePicker({ selectedId, onSelect }: TemplatePickerProps) {
  const [open, setOpen] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="safe-top absolute left-4 right-4 top-4 z-10 flex items-center justify-center gap-2 rounded-full bg-black/50 py-3 backdrop-blur-sm"
        aria-label="Choose pose template"
      >
        <span className="text-sm font-medium text-white">
          {selectedId
            ? POSE_TEMPLATES.find((t) => t.id === selectedId)?.name ?? "Pose"
            : "Choose pose"}
        </span>
        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="absolute inset-0 z-20 bg-black/60"
            onClick={() => setOpen(false)}
            aria-label="Close"
          />
          <div className="safe-bottom safe-left safe-right absolute bottom-0 left-0 right-0 z-30 rounded-t-3xl bg-zinc-900/95 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-zinc-700/50 px-4 py-3">
              <h2 className="text-lg font-semibold text-white">Pose template</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto px-4 py-4 scrollbar-hide"
              style={{ scrollSnapType: "x mandatory" }}
            >
              <button
                type="button"
                onClick={() => {
                  onSelect(null);
                  setOpen(false);
                }}
                className="flex shrink-0 flex-col items-center gap-2 rounded-2xl border-2 bg-zinc-800/80 px-6 py-4 transition hover:bg-zinc-700"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="flex h-20 w-14 items-end justify-center rounded-lg border border-dashed border-zinc-500">
                  <span className="text-xs text-zinc-500">None</span>
                </div>
                <span className="text-sm font-medium text-zinc-300">No overlay</span>
              </button>
              {POSE_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => {
                    onSelect(template);
                    setOpen(false);
                  }}
                  className={`flex shrink-0 flex-col items-center gap-2 rounded-2xl border-2 bg-zinc-800/80 px-6 py-4 transition hover:bg-zinc-700 ${
                    selectedId === template.id ? "border-white bg-zinc-700" : "border-transparent"
                  }`}
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div
                    className="flex h-20 w-14 items-center justify-center overflow-hidden text-white opacity-80 [&_svg]:h-full [&_svg]:w-full [&_svg]:object-contain"
                    dangerouslySetInnerHTML={{ __html: template.svg }}
                  />
                  <span className="text-center text-sm font-medium text-white">{template.name}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPaywallOpen(true)}
                className="flex shrink-0 flex-col items-center gap-2 rounded-2xl border-2 border-amber-500/50 bg-zinc-800/80 px-6 py-4 transition hover:bg-zinc-700"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="flex h-20 w-14 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="text-center text-sm font-medium text-amber-400">
                  Pro Aesthetic Poses
                </span>
                <span className="text-xs text-zinc-500">Locked</span>
              </button>
            </div>
          </div>
        </>
      )}
      <PaywallModal open={paywallOpen} onClose={() => setPaywallOpen(false)} />
    </>
  );
}
