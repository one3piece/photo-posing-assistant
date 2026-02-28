"use client";

const WAITLIST_URL = "#"; // Replace with Tally.so or real waitlist link

export default function LandingPage() {
  function handleWaitlist() {
    if (typeof window !== "undefined" && WAITLIST_URL !== "#") {
      window.open(WAITLIST_URL, "_blank");
    } else {
      window.alert("Waitlist joined! We'll be in touch.");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased">
      {/* Subtle radial gradient for depth */}
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(120,119,198,0.08),transparent)]"
        aria-hidden
      />

      {/* 1. Minimal Header */}
      <header className="safe-top safe-left safe-right fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-8">
        <span className="font-semibold tracking-tight text-white md:text-lg">
          POSE.AI
        </span>
        <button
          type="button"
          onClick={handleWaitlist}
          className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10 hover:border-white/20"
        >
          Join Waitlist
        </button>
      </header>

      {/* 2. Hero: Show, Don't Tell */}
      <section className="safe-left safe-right safe-top relative px-5 pt-28 pb-20 md:px-12 md:pt-36 md:pb-28 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            Master your photo poses. Instantly.
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-zinc-400 md:text-xl">
            Your AI-powered editorial director. Real-time posing silhouettes
            directly in your browser. No apps to download. Zero server lag.
          </p>
          <button
            type="button"
            onClick={handleWaitlist}
            className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-zinc-900 shadow-lg shadow-black/20 transition hover:bg-zinc-100 hover:shadow-xl hover:shadow-black/25"
          >
            Join the Waitlist — It&apos;s Free
          </button>
        </div>

        {/* iPhone frame mockup: camera view + silhouette */}
        <div className="mx-auto mt-16 max-w-[280px] md:mt-20 md:max-w-[320px]">
          <div className="rounded-[2.5rem] border-[10px] border-zinc-800 bg-zinc-900 p-2 shadow-2xl shadow-black/50 md:rounded-[3rem] md:border-[12px]">
            <div className="flex justify-center">
              <div className="h-5 w-24 rounded-full bg-zinc-800 md:h-6 md:w-28" />
            </div>
            <div className="mt-2 overflow-hidden rounded-[1.5rem] bg-zinc-950 md:rounded-2xl">
              {/* Camera view placeholder + silhouette overlay */}
              <div className="relative aspect-[9/19] w-full bg-gradient-to-b from-zinc-900 to-zinc-950">
                {/* Fake camera grain / blur */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 30%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
                  }}
                />
                {/* Rule-of-thirds hint lines */}
                <div className="absolute inset-0 flex">
                  <div className="w-1/3 border-r border-white/10" />
                  <div className="w-1/3 border-r border-white/10" />
                </div>
                <div className="absolute inset-0 flex flex-col">
                  <div className="h-1/3 border-b border-white/10" />
                  <div className="h-1/3 border-b border-white/10" />
                </div>
                {/* Centered white silhouette (elegant path) */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <svg
                    viewBox="0 0 100 200"
                    className="h-full w-auto max-w-[45%] text-white/90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M 50 10 Q 58 6 62 14 Q 64 22 60 28 Q 56 32 50 32 Q 44 32 40 28 Q 36 22 38 14 Q 42 6 50 10" />
                    <path d="M 50 32 C 50 40 50 52 50 62 C 49 78 48 94 48 108" />
                    <path d="M 50 42 C 36 44 26 56 24 72 C 22 86 26 98 32 106" />
                    <path d="M 50 42 C 64 44 74 56 76 72 C 78 86 74 98 68 106" />
                    <path d="M 48 108 C 40 112 32 132 28 162 C 26 184 28 198 30 200" />
                    <path d="M 50 108 C 58 112 66 132 70 162 C 72 184 70 198 68 200" />
                  </svg>
                </div>
                {/* Corner brackets */}
                <div className="absolute left-3 top-12 h-6 w-6 border-l-2 border-t-2 border-white/30" />
                <div className="absolute right-3 top-12 h-6 w-6 border-r-2 border-t-2 border-white/30" />
                <div className="absolute bottom-12 left-3 h-6 w-6 border-b-2 border-l-2 border-white/30" />
                <div className="absolute bottom-12 right-3 h-6 w-6 border-b-2 border-r-2 border-white/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How it Works */}
      <section className="safe-left safe-right border-t border-white/10 px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-14 text-center text-2xl font-semibold tracking-tight text-white md:text-3xl">
            How it works
          </h2>
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            <div className="text-center">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white">
                1
              </span>
              <h3 className="mb-2 text-lg font-semibold text-white">
                Choose your vibe
              </h3>
              <p className="text-zinc-400">
                Select from 100+ influencer-curated templates.
              </p>
            </div>
            <div className="text-center">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white">
                2
              </span>
              <h3 className="mb-2 text-lg font-semibold text-white">
                Align the silhouette
              </h3>
              <p className="text-zinc-400">
                The on-screen guide glows when your body matches.
              </p>
            </div>
            <div className="text-center">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white">
                3
              </span>
              <h3 className="mb-2 text-lg font-semibold text-white">
                Auto-capture
              </h3>
              <p className="text-zinc-400">
                Snap the perfect editorial shot effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bento Box Features */}
      <section className="safe-left safe-right border-t border-white/10 px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-4 md:grid-rows-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:col-span-2 md:row-span-2 md:flex md:flex-col md:justify-center md:p-10">
            <h3 className="mb-2 text-lg font-semibold text-white">
              100% Client-Side Privacy
            </h3>
            <p className="text-zinc-400 md:text-lg md:leading-relaxed">
              Your camera feed never leaves your device. Everything runs in the
              browser.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8">
            <h3 className="mb-2 text-base font-semibold text-white">
              Zero Latency MediaPipe
            </h3>
            <p className="text-sm text-zinc-400">
              Real-time pose tracking. No round-trips to a server.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8">
            <h3 className="mb-2 text-base font-semibold text-white">
              Pro Viewfinder UI
            </h3>
            <p className="text-sm text-zinc-400">
              Rule of thirds, corner brackets, and clean overlays.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="safe-left safe-right border-t border-white/10 px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-8 text-xl font-medium leading-relaxed text-white md:text-2xl">
            Stop wondering what to do with your hands. Secure your early
            access.
          </p>
          <button
            type="button"
            onClick={handleWaitlist}
            className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-zinc-900 shadow-lg shadow-black/20 transition hover:bg-zinc-100 hover:shadow-xl"
          >
            Join the Waitlist — It&apos;s Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="safe-bottom safe-left safe-right border-t border-white/10 px-5 py-8 md:px-12 lg:px-20">
        <p className="text-sm text-zinc-500">
          © 2026 POSE.AI. Built by a solo operator.
        </p>
      </footer>
    </div>
  );
}
