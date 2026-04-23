type IconProps = {
  className?: string;
};

function RealtimeIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 17.5h16M6 15V10m4 5V7m4 8V12m4 3V6M5.5 8.2l4.3-3.2 3.4 2.5L18 4.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function InputIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="13"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2.2"
        width="17"
        x="3.5"
        y="5.5"
      />
      <path
        d="M8 12h8m-3-3 3 3-3 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function CompareIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 4H6.5A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20H11m2-16h4.5A1.5 1.5 0 0 1 19 5.5v13a1.5 1.5 0 0 1-1.5 1.5H13m-2-16v16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path d="m9 12 2-2m4 4-2 2" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

function CodeIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m9 7-5 5 5 5m6-10 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

const BAR_HEIGHTS = [
  20, 26, 31, 28, 36, 40, 45, 37, 42, 50, 44, 55, 61, 58, 66, 62, 70, 65, 74,
  69, 79, 72,
];

export default function PerformanceSection() {
  return (
    <section className="relative overflow-hidden border-x border-cyan-400/20 bg-[#020613]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(9,233,255,0.08),transparent_40%),linear-gradient(180deg,#030712_0%,#020612_100%)]" />

      <div className="relative mx-auto w-full max-w-[1700px] px-5 py-18 md:px-8 md:py-24">
        <header className="mx-auto max-w-4xl text-center">
          <h3 className="font-heading text-[clamp(2rem,4.2vw,3.85rem)] font-semibold tracking-tight text-slate-100">
            Engineered for Performance
          </h3>
          <p className="mx-auto mt-4 max-w-4xl text-[clamp(1rem,1.55vw,1.65rem)] text-slate-300/70">
            Precision tools for modern software engineers who demand clarity in
            complexity.
          </p>
        </header>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          <article className="group relative overflow-hidden rounded-xl border border-cyan-100/10 bg-[linear-gradient(125deg,rgba(8,14,28,0.95)_0%,rgba(5,11,23,0.96)_100%)] p-7 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_16px_50px_rgba(1,5,16,0.6)] md:col-span-2">
            <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
              <div>
                <RealtimeIcon className="h-9 w-9 text-cyan-400" />
                <h4 className="mt-7 font-heading text-[clamp(1.7rem,2.7vw,2.4rem)] font-semibold tracking-tight text-slate-100">
                  Real-time Visualization
                </h4>
                <p className="mt-4 max-w-[52ch] text-[clamp(1rem,1.4vw,1.55rem)] leading-relaxed text-slate-300/75">
                  Watch your logic unfold stroke-by-stroke. Our rendering engine
                  processes step-throughs at 60fps for seamless transitions.
                </p>
              </div>

              <div className="relative min-h-54 overflow-hidden rounded-lg border border-cyan-100/10 bg-[radial-gradient(circle_at_45%_28%,rgba(56,174,255,0.28),transparent_48%),linear-gradient(130deg,#12234a_0%,#0e1830_44%,#1b1142_100%)] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(155,23,255,0.2)_100%)]" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end gap-[3px]">
                  {BAR_HEIGHTS.map((height, index) => (
                    <span
                      className="w-full rounded-t-sm bg-[linear-gradient(180deg,rgba(37,241,255,0.8)_0%,rgba(148,38,255,0.95)_100%)]"
                      key={height + index}
                      style={{ height: `${height}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-xl border border-cyan-100/10 bg-[linear-gradient(120deg,rgba(8,14,28,0.95)_0%,rgba(4,9,20,0.96)_100%)] p-7 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_16px_50px_rgba(1,5,16,0.6)]">
            <InputIcon className="h-9 w-9 text-cyan-400" />
            <h4 className="mt-7 font-heading text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold tracking-tight text-slate-100">
              Custom Input
            </h4>
            <p className="mt-4 text-[clamp(1rem,1.35vw,1.5rem)] leading-relaxed text-slate-300/75">
              Inject JSON, CSV, or raw binary streams to test edge cases in
              minutes, not hours.
            </p>
          </article>

          <article className="rounded-xl border border-cyan-100/10 bg-[linear-gradient(120deg,rgba(8,14,28,0.95)_0%,rgba(4,9,20,0.96)_100%)] p-7 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_16px_50px_rgba(1,5,16,0.6)]">
            <CompareIcon className="h-9 w-9 text-cyan-400" />
            <h4 className="mt-7 font-heading text-[clamp(1.7rem,2.6vw,2.35rem)] font-semibold tracking-tight text-slate-100">
              Comparison
            </h4>
            <p className="mt-4 text-[clamp(1rem,1.35vw,1.5rem)] leading-relaxed text-slate-300/75">
              Benchmarking two solutions side-by-side with real-time complexity
              analysis.
            </p>
          </article>

          <article className="rounded-xl border border-cyan-100/10 bg-[linear-gradient(120deg,rgba(8,14,28,0.95)_0%,rgba(4,9,20,0.96)_100%)] p-7 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_16px_50px_rgba(1,5,16,0.6)] md:col-span-2">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <CodeIcon className="h-9 w-9 text-cyan-400" />
                <h4 className="mt-7 font-heading text-[clamp(1.7rem,2.6vw,2.35rem)] font-semibold tracking-tight text-slate-100">
                  Multi-language Code
                </h4>
                <p className="mt-4 max-w-[52ch] text-[clamp(1rem,1.35vw,1.5rem)] leading-relaxed text-slate-300/75">
                  Native support for Python, C++, Go, and Rust. View
                  assembly-level traces for deep optimization.
                </p>
              </div>

              <div className="rounded-lg border border-cyan-100/12 bg-[#070C1A] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
                <pre className="overflow-x-auto font-mono text-[clamp(0.95rem,1.1vw,1.3rem)] leading-relaxed text-cyan-300">
                  <code>
                    <span className="text-cyan-300">func </span>
                    <span className="text-cyan-200">main</span>
                    <span className="text-cyan-300">() {"{"}</span>
                    {"\n"}
                    <span className="text-fuchsia-200">  visualize</span>
                    <span className="text-slate-300">.Graph</span>
                    <span className="text-violet-200">(nodes)</span>
                    {"\n"}
                    <span className="text-cyan-300">{"}"}</span>
                  </code>
                </pre>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
