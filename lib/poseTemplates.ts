/** Reference landmark for alignment check (normalized 0-1, MediaPipe index) */
export interface ReferenceLandmark {
  index: number;
  x: number;
  y: number;
}

export interface PoseTemplate {
  id: string;
  name: string;
  /** SVG markup for overlay (viewBox 0 0 100 200 typical for standing figure) */
  svg: string;
  /** Key landmarks to check for alignment (normalized coords; mirror not applied here) */
  referenceLandmarks?: ReferenceLandmark[];
}

const ALIGNMENT_THRESHOLD = 0.22;

function isAligned(
  landmarks: { x: number; y: number }[],
  reference: ReferenceLandmark[],
  mirror: boolean
): boolean {
  if (!landmarks.length || !reference.length) return false;
  const requiredMatch = Math.ceil(reference.length * 0.7);
  let matchCount = 0;
  for (const ref of reference) {
    const lm = landmarks[ref.index];
    if (lm == null) continue;
    const x = mirror ? 1 - lm.x : lm.x;
    const dx = Math.abs(x - ref.x);
    const dy = Math.abs(lm.y - ref.y);
    if (dx <= ALIGNMENT_THRESHOLD && dy <= ALIGNMENT_THRESHOLD) matchCount++;
  }
  return matchCount >= requiredMatch;
}

export function checkTemplateAlignment(
  landmarks: { x: number; y: number }[],
  template: PoseTemplate,
  mirror: boolean
): boolean {
  const refs = template.referenceLandmarks;
  if (!refs?.length) return false;
  return isAligned(landmarks, refs, mirror);
}

/** Minimalist fashion silhouettes: smooth contour line-art (path-only, no stick figures) */
export const POSE_TEMPLATES: PoseTemplate[] = [
  {
    id: "casual-standing",
    name: "Casual Standing",
    referenceLandmarks: [
      { index: 0, x: 0.5, y: 0.22 },
      { index: 11, x: 0.35, y: 0.38 },
      { index: 12, x: 0.65, y: 0.38 },
      { index: 23, x: 0.42, y: 0.58 },
      { index: 24, x: 0.58, y: 0.58 },
    ],
    svg: `
      <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 50 10 Q 58 6 62 14 Q 64 22 60 28 Q 56 32 50 32 Q 44 32 40 28 Q 36 22 38 14 Q 42 6 50 10" />
        <path d="M 50 32 C 50 40 50 52 50 62 C 49 78 48 94 48 108" />
        <path d="M 50 42 C 36 44 26 56 24 72 C 22 86 26 98 32 106" />
        <path d="M 50 42 C 64 44 74 56 76 72 C 78 86 74 98 68 106" />
        <path d="M 48 108 C 40 112 32 132 28 162 C 26 184 28 198 30 200" />
        <path d="M 50 108 C 58 112 66 132 70 162 C 72 184 70 198 68 200" />
      </svg>
    `,
  },
  {
    id: "fashion-editorial",
    name: "Fashion Editorial",
    referenceLandmarks: [
      { index: 0, x: 0.5, y: 0.2 },
      { index: 11, x: 0.38, y: 0.36 },
      { index: 12, x: 0.62, y: 0.34 },
      { index: 23, x: 0.42, y: 0.56 },
      { index: 24, x: 0.58, y: 0.56 },
    ],
    svg: `
      <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 50 10 Q 60 6 64 14 Q 66 22 62 28 Q 56 32 50 30 Q 44 30 40 26 Q 38 20 40 14 Q 44 8 50 10" />
        <path d="M 50 30 C 52 38 50 52 50 62 C 48 80 48 98 50 108" />
        <path d="M 50 38 C 36 34 22 42 18 56 C 14 68 18 80 26 88" />
        <path d="M 50 42 C 66 40 80 52 84 66 C 86 76 82 84 76 88 C 70 90 66 86 64 82" />
        <path d="M 48 108 C 40 112 32 132 30 162 C 28 182 30 198 32 200" />
        <path d="M 52 108 C 60 114 68 136 70 162 C 70 182 68 198 66 200" />
      </svg>
    `,
  },
  {
    id: "profile",
    name: "Profile",
    referenceLandmarks: [
      { index: 0, x: 0.35, y: 0.2 },
      { index: 11, x: 0.28, y: 0.35 },
      { index: 12, x: 0.42, y: 0.35 },
      { index: 23, x: 0.3, y: 0.56 },
      { index: 24, x: 0.4, y: 0.56 },
    ],
    svg: `
      <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 30 20 Q 22 16 16 24 Q 12 32 14 40 Q 16 46 22 48 Q 30 50 38 46 Q 44 40 44 32 Q 44 24 38 20 Q 34 16 30 20" />
        <path d="M 28 48 C 24 56 22 68 20 80 C 18 100 20 120 22 140 C 24 168 26 192 26 200" />
        <path d="M 30 52 C 34 60 36 78 34 98 C 32 120 32 148 34 178 C 36 198 38 200 38 200" />
        <path d="M 20 78 C 12 82 8 92 10 102" />
        <path d="M 30 56 C 40 60 48 72 50 84" />
        <path d="M 22 140 C 16 144 12 164 10 190 C 10 200 12 200 14 200" />
        <path d="M 34 140 C 40 144 44 164 46 190 C 48 200 46 200 44 200" />
      </svg>
    `,
  },
];
