"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePoseLandmarker } from "@/lib/usePoseLandmarker";
import type { NormalizedLandmark } from "@/lib/usePoseLandmarker";
import type { PoseLandmarkerResult } from "@/lib/usePoseLandmarker";

interface PoseCanvasProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  mirror?: boolean;
  className?: string;
  onPoseResult?: (result: PoseLandmarkerResult | null) => void;
}

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;

function drawPose(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmark[],
  connections: Array<{ start: number; end: number }>,
  width: number,
  height: number,
  mirror: boolean
) {
  const toX = (x: number) => (mirror ? (1 - x) * width : x * width);
  const toY = (y: number) => y * height;

  ctx.strokeStyle = "rgba(0, 255, 136, 0.9)";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  for (const { start, end } of connections) {
    const a = landmarks[start];
    const b = landmarks[end];
    if (!a || !b) continue;
    ctx.beginPath();
    ctx.moveTo(toX(a.x), toY(a.y));
    ctx.lineTo(toX(b.x), toY(b.y));
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(0, 255, 136, 0.95)";
  const radius = 4;
  for (const lm of landmarks) {
    ctx.beginPath();
    ctx.arc(toX(lm.x), toY(lm.y), radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function PoseCanvas({ videoRef, mirror = false, className = "", onPoseResult }: PoseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { detect, getConnections, loading } = usePoseLandmarker();
  const lastFrameTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || loading) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const now = performance.now();
    if (now - lastFrameTimeRef.current < FRAME_INTERVAL_MS) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    lastFrameTimeRef.current = now;

    const result = detect(video, now * 1000);
    if (onPoseResult) onPoseResult(result ?? null);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    if (result?.landmarks?.length) {
      const connections = getConnections();
      drawPose(ctx, result.landmarks[0], connections, w, h, mirror);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [videoRef, detect, getConnections, loading, mirror, onPoseResult]);

  useEffect(() => {
    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const onResize = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const rect = video.getBoundingClientRect();
    const dpr = window.devicePixelRatio ?? 1;
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }
  }, [videoRef]);

  useEffect(() => {
    onResize();
    const ro = new ResizeObserver(onResize);
    if (videoRef.current) ro.observe(videoRef.current);
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [onResize, videoRef]);

  if (loading) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ left: 0, top: 0 }}
      aria-hidden
    />
  );
}
