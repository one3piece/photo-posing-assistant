"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PoseTemplate } from "@/lib/poseTemplates";
import { checkTemplateAlignment } from "@/lib/poseTemplates";
import { PoseOverlay } from "@/components/PoseOverlay";
import { PoseCanvas } from "@/components/PoseCanvas";
import { TemplatePicker } from "@/components/TemplatePicker";
import type { PoseLandmarkerResult } from "@/lib/usePoseLandmarker";

type CameraErrorType = "NotAllowedError" | "NotFoundError" | "NotReadableError" | "generic";

interface CameraError {
  type: CameraErrorType;
  message: string;
}

export function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [error, setError] = useState<CameraError | null>(null);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<PoseTemplate | null>(null);
  const [aligned, setAligned] = useState(false);
  const alignedRef = useRef(false);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async (mode: "user" | "environment") => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError({ type: "generic", message: "Camera API is not supported in this browser." });
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);
    stopStream();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setFacingMode(mode);
      setStatus("ready");
    } catch (err) {
      const e = err as DOMException & { name?: string };
      if (e.name === "NotAllowedError" || e.name === "PermissionDeniedError") {
        setError({
          type: "NotAllowedError",
          message: "Camera access denied. Please allow camera access in your browser settings and reload.",
        });
      } else if (e.name === "NotFoundError") {
        setError({
          type: "NotFoundError",
          message: "No camera found on this device.",
        });
      } else if (e.name === "NotReadableError" || e.name === "DevicesNotFoundError") {
        setError({
          type: "NotReadableError",
          message: "Camera is in use by another app or could not be read. Try closing other apps using the camera.",
        });
      } else {
        setError({
          type: "generic",
          message: "Something went wrong. Please reload and try again.",
        });
      }
      setStatus("error");
    }
  }, [stopStream]);

  useEffect(() => {
    startCamera("user");
    return () => stopStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount, cleanup on unmount
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function checkDevices() {
      if (!navigator.mediaDevices?.enumerateDevices) return;
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === "videoinput");
        if (!cancelled) setHasMultipleCameras(videoDevices.length > 1);
      } catch {
        if (!cancelled) setHasMultipleCameras(false);
      }
    }
    checkDevices();
    return () => { cancelled = true; };
  }, [status]);

  const handleFlip = useCallback(() => {
    const next = facingMode === "user" ? "environment" : "user";
    startCamera(next);
  }, [facingMode, startCamera]);

  const handlePoseResult = useCallback(
    (result: PoseLandmarkerResult | null) => {
      if (!selectedTemplate || !result?.landmarks?.length) {
        if (alignedRef.current) {
          alignedRef.current = false;
          setAligned(false);
        }
        return;
      }
      const isAligned = checkTemplateAlignment(
        result.landmarks[0],
        selectedTemplate,
        facingMode === "user"
      );
      if (isAligned !== alignedRef.current) {
        alignedRef.current = isAligned;
        setAligned(isAligned);
      }
    },
    [selectedTemplate, facingMode]
  );

  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) {
      setToast("Camera not ready");
      setTimeout(() => setToast(null), 2000);
      return;
    }
    const w = video.videoWidth;
    const h = video.videoHeight;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setToast("Could not capture");
      setTimeout(() => setToast(null), 2000);
      return;
    }
    if (facingMode === "user") {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, w, h);
    if (facingMode === "user") {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setToast("Capture failed");
          setTimeout(() => setToast(null), 2000);
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `pose-${Date.now()}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
        setToast("Photo saved");
        setTimeout(() => setToast(null), 2000);
      },
      "image/jpeg",
      0.92
    );
  }, [facingMode]);

  if (status === "error" && error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 safe-top safe-bottom safe-left safe-right">
        <div className="rounded-2xl bg-zinc-900/90 p-6 text-center shadow-xl">
          <p className="text-lg font-medium text-red-400">Camera error</p>
          <p className="mt-2 text-sm text-zinc-300">{error.message}</p>
        </div>
        <button
          type="button"
          onClick={() => startCamera("user")}
          className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 h-full w-full object-cover mirror"
        style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
      />
      {selectedTemplate && (
        <PoseOverlay
          template={selectedTemplate}
          mirror={facingMode === "user"}
          aligned={aligned}
        />
      )}
      <PoseCanvas
        videoRef={videoRef}
        mirror={facingMode === "user"}
        onPoseResult={handlePoseResult}
      />
      <TemplatePicker
        selectedId={selectedTemplate?.id ?? null}
        onSelect={setSelectedTemplate}
      />
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <p className="text-white">Starting camera…</p>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-4 safe-bottom pb-6">
        <div className="flex items-center gap-8">
          {hasMultipleCameras && (
            <button
              type="button"
              onClick={handleFlip}
              disabled={status !== "ready"}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm disabled:opacity-50"
              aria-label="Flip camera"
            >
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={handleCapture}
            disabled={status !== "ready"}
            className="h-16 w-16 rounded-full border-4 border-white bg-white/10 backdrop-blur-sm disabled:opacity-50"
            aria-label="Capture photo"
          />
          {hasMultipleCameras && <div className="h-14 w-14" />}
        </div>
      </div>

      {toast && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 rounded-lg bg-zinc-800/95 px-4 py-2 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
