"use client";

import { CameraView } from "@/components/CameraView";

export default function CameraPage() {
  return (
    <main className="fixed inset-0 min-h-screen min-w-full overflow-hidden bg-black">
      <CameraView />
    </main>
  );
}
