"use client";

import Link from "next/link";

export default function LandingPage() {
  function handleCta() {
    // Placeholder: replace with Tally.so or real waitlist later
    if (typeof window !== "undefined") {
      window.alert("Waitlist joined! We'll be in touch.");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="safe-top safe-left safe-right fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-8">
        <span className="text-lg font-semibold tracking-tight text-white md:text-xl">
          POSE.AI
        </span>
        <Link
          href="/camera"
          className="text-xs font-medium uppercase tracking-widest text-white/60 transition hover:text-white md:text-sm"
        >
          Try demo
        </Link>
      </header>

      {/* Hero */}
      <section className="safe-left safe-right safe-top flex min-h-[90vh] flex-col justify-center px-5 pt-24 pb-16 md:min-h-[85vh] md:px-12 md:pt-32 lg:px-20">
        <p className="mb-6 text-xs font-medium uppercase tracking-widest text-white/50 md:text-sm">
          Client-side processing // 100% private
        </p>
        <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tighter text-white md:text-6xl lg:text-7xl">
          Never feel awkward{" "}
          <span className="bg-gradient-to-r from-cyber-blue via-cyber-emerald to-cyber-blue bg-clip-text text-transparent">
            in front of a camera
          </span>{" "}
          again.
        </h1>
        <p className="mb-10 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          Real-time AI pose detection directly in your browser. Match the glowing
          silhouettes to capture editorial-level photos instantly.
        </p>
        <button
          type="button"
          onClick={handleCta}
          className="group relative w-full max-w-sm rounded-lg bg-white px-8 py-4 text-base font-semibold uppercase tracking-widest text-black transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,136,0.35)] md:py-5 md:text-lg"
        >
          <span className="relative z-10">Join the waitlist</span>
          <span
            className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              boxShadow: "inset 0 0 30px rgba(0, 255, 136, 0.15)",
            }}
          />
        </button>
        <p className="mt-4 text-xs text-white/40 md:text-sm">
          Or{" "}
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") window.alert("Pre-order coming soon.");
            }}
            className="underline underline-offset-2 hover:text-white/70"
          >
            pre-order for $9.99
          </button>
        </p>
      </section>

      {/* Features: 3-column grid */}
      <section className="safe-left safe-right border-t border-white/10 px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
          <div className="border border-white/5 bg-white/[0.02] p-6 md:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyber-emerald/90">
              Aesthetic silhouettes
            </p>
            <p className="text-sm leading-relaxed text-white/80 md:text-base">
              100+ influencer-curated pose templates. From casual to editorial.
            </p>
          </div>
          <div className="border border-white/5 bg-white/[0.02] p-6 md:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyber-emerald/90">
              Instant feedback
            </p>
            <p className="text-sm leading-relaxed text-white/80 md:text-base">
              Visual viewfinder glows green when you match the pose. No guessing.
            </p>
          </div>
          <div className="border border-white/5 bg-white/[0.02] p-6 md:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyber-emerald/90">
              Zero server magic
            </p>
            <p className="text-sm leading-relaxed text-white/80 md:text-base">
              Runs completely on your device. Zero lag, total privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="safe-bottom safe-left safe-right border-t border-white/10 px-5 py-8 md:px-12 lg:px-20">
        <p className="text-xs text-white/40 md:text-sm">
          © 2026 POSE.AI. Built by a solo operator.
        </p>
      </footer>
    </div>
  );
}
