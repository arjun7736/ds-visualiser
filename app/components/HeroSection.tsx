import Link from "next/link";

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12h13m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-x border-cyan-400/20 bg-[#030712]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_42%,rgba(15,228,255,0.1),transparent_45%),linear-gradient(90deg,#030611_0%,#02050d_40%,#081223_100%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-[1700px] items-center gap-10 px-5 py-12 md:grid-cols-[1fr_1.05fr] md:gap-14 md:px-8 md:py-18">
        <div className="max-w-[760px]">
          <p className="ds-label inline-flex border border-cyan-400/30 bg-cyan-400/8 px-3.5 py-1.5 font-mono text-cyan-300">
            v2.0 ENGINE NOW LIVE
          </p>

          <h2 className="ds-display mt-6 text-slate-100">
            Master Algorithms
            <br />
            with{" "}
            <span className="text-cyan-400">
              Visual
              <br />
              Intelligence
            </span>
          </h2>

          <p className="ds-body mt-6 max-w-[710px] text-slate-300/82">
            Deep-dive into data structures through a surgical, high-fidelity
            lens. Build, trace, and debug complex logic with custom data inputs
            in real-time.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              className="ds-button inline-flex min-h-14 items-center gap-2.5 border border-cyan-300/40 bg-cyan-400 px-7 py-3 tracking-tight text-[#08343D] transition hover:bg-cyan-300"
              href="/algorithms/sorting"
            >
              Start Visualizing
              <ArrowRightIcon />
            </Link>

            <button
              className="ds-button inline-flex min-h-14 items-center border border-cyan-200/35 bg-cyan-500/5 px-7 py-3 tracking-tight text-slate-100 transition hover:bg-cyan-300/10"
              type="button"
            >
              View Documentation
            </button>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-cyan-200/10 bg-[#0A1421]/80 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_28px_80px_rgba(3,6,18,0.7)]">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-slate-300/40 bg-[#f6f7f8]">
            <div className="absolute right-4 top-3 flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-[#f2c3c3]" />
              <span className="h-3.5 w-3.5 rounded-full bg-[#20d4a4]" />
            </div>

            <div className="absolute inset-x-[23%] top-[33%] rounded-[2.15rem] border border-slate-300/70 bg-white px-7 py-8 text-slate-700 shadow-[0_16px_30px_rgba(0,0,0,0.08)] md:px-10">
              <p className="ds-body font-semibold tracking-[0.08em] text-slate-700/95">
                SOFTWARE
              </p>
              <p className="ds-body mt-2 font-semibold tracking-[0.08em] text-slate-700/95">
                VISUALZER; MOUB.
              </p>
              <div className="mt-4 h-[3px] w-12 bg-cyan-300/80" />
              <p className="ds-small mt-3 font-semibold tracking-[0.12em] text-slate-700/85">
                SAFE YOUR WORK:
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-[25%] h-[2px] bg-black/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
