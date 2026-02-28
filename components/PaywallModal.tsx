"use client";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/placeholder";

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
}

export function PaywallModal({ open, onClose }: PaywallModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative z-10 w-full max-w-md rounded-t-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 shadow-2xl sm:rounded-3xl">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/20">
          <svg
            className="h-7 w-7 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-center text-xl font-bold text-white">Pro Aesthetic Poses</h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Unlock a curated collection of premium poses designed for portraits and editorial shots.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-zinc-300">
          <li className="flex items-center gap-3">
            <span className="text-amber-400">✓</span>
            Exclusive pose templates
          </li>
          <li className="flex items-center gap-3">
            <span className="text-amber-400">✓</span>
            One-time purchase, yours forever
          </li>
          <li className="flex items-center gap-3">
            <span className="text-amber-400">✓</span>
            New poses added over time
          </li>
        </ul>
        <a
          href={STRIPE_PAYMENT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex w-full items-center justify-center rounded-2xl bg-amber-500 py-4 text-base font-semibold text-black transition hover:bg-amber-400"
        >
          Unlock all for $9.99
        </a>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2 text-sm text-zinc-500 hover:text-zinc-300"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
