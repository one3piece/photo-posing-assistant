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
      <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <circle cx="50" cy="18" r="10"/>
        <line x1="50" y1="28" x2="50" y2="70"/>
        <line x1="50" y1="48" x2="25" y2="65"/>
        <line x1="50" y1="48" x2="75" y2="65"/>
        <line x1="50" y1="70" x2="35" y2="120"/>
        <line x1="50" y1="70" x2="65" y2="120"/>
        <line x1="35" y1="120" x2="30" y2="195"/>
        <line x1="65" y1="120" x2="70" y2="195"/>
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
      <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <circle cx="50" cy="18" r="10"/>
        <line x1="50" y1="28" x2="48" y2="72"/>
        <line x1="48" y1="42" x2="20" y2="55"/>
        <line x1="48" y1="42" x2="75" y2="52"/>
        <path d="M 75 52 L 78 68 Q 72 72 65 70" />
        <line x1="48" y1="72" x2="38" y2="118"/>
        <line x1="48" y1="72" x2="62" y2="118"/>
        <line x1="38" y1="118" x2="32" y2="195"/>
        <line x1="62" y1="118" x2="68" y2="195"/>
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
      <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <ellipse cx="35" cy="20" rx="12" ry="10"/>
        <path d="M 35 30 Q 30 50 32 75"/>
        <line x1="32" y1="55" x2="15" y2="70"/>
        <line x1="32" y1="55" x2="48" y2="68"/>
        <line x1="32" y1="75" x2="25" y2="125"/>
        <line x1="32" y1="75" x2="40" y2="125"/>
        <line x1="25" y1="125" x2="22" y2="195"/>
        <line x1="40" y1="125" x2="43" y2="195"/>
      </svg>
    `,
  },
];
