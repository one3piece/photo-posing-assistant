# Photo Posing Assistant

A mobile-first PWA that helps you nail the pose. Pick a template, see a semi-transparent overlay on your camera feed, and get real-time feedback when your pose matches (MediaPipe, client-side).

- **Stack:** Next.js 14, React, Tailwind CSS, MediaPipe Pose (tasks-vision)
- **No backend:** Camera, pose detection, and capture run entirely in the browser.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 and allow camera access. Best experienced on a phone or in Chrome device emulation.

## Features

- Full-screen camera with flip and capture
- 3 pose templates (Casual Standing, Fashion Editorial, Profile) with overlay
- Live skeleton from MediaPipe; overlay turns green when you align
- Photo capture and download
- “Pro Aesthetic Poses” paywall (Stripe Payment Link placeholder)
