"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const WASM_PATH = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm";
const MODEL_PATH =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";

export type NormalizedLandmark = { x: number; y: number; z?: number };

export type PoseLandmarkerResult = {
  landmarks: NormalizedLandmark[][];
  worldLandmarks: unknown[][];
};

export type PoseConnection = { start: number; end: number };

export type PoseLandmarkerInstance = {
  detectForVideo: (video: HTMLVideoElement, timestamp: number) => PoseLandmarkerResult;
  POSE_CONNECTIONS: PoseConnection[];
};

export function usePoseLandmarker() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const landmarkerRef = useRef<PoseLandmarkerInstance | null>(null);
  const connectionsRef = useRef<PoseConnection[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { FilesetResolver, PoseLandmarker } = await import(
          "@mediapipe/tasks-vision"
        );
        const vision = await FilesetResolver.forVisionTasks(WASM_PATH);
        const poseLandmarker = await PoseLandmarker.createFromModelPath(vision, MODEL_PATH);
        poseLandmarker.setOptions({
          runningMode: "VIDEO",
          numPoses: 1,
        });
        if (!cancelled) {
          landmarkerRef.current = poseLandmarker as unknown as PoseLandmarkerInstance;
          connectionsRef.current = (PoseLandmarker as unknown as { POSE_CONNECTIONS: PoseConnection[] }).POSE_CONNECTIONS ?? [];
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load pose model");
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
      landmarkerRef.current = null;
    };
  }, []);

  const detect = useCallback(
    (video: HTMLVideoElement, timestamp: number): PoseLandmarkerResult | null => {
      if (!landmarkerRef.current || video.readyState < 2) return null;
      try {
        return landmarkerRef.current.detectForVideo(video, timestamp) as PoseLandmarkerResult;
      } catch {
        return null;
      }
    },
    []
  );

  const getConnections = useCallback((): PoseConnection[] => connectionsRef.current, []);

  return { detect, getConnections, loading, error };
}
