type SeriesBar = {
  value: number;
  tone?: "base" | "highlight";
};

const QUICKSORT_SERIES: SeriesBar[] = [
  { value: 46 },
  { value: 72 },
  { value: 31 },
  { value: 55, tone: "highlight" },
  { value: 84 },
  { value: 22 },
  { value: 94 },
  { value: 41 },
  { value: 65 },
  { value: 78 },
  { value: 14 },
];

const MERGESORT_SERIES: SeriesBar[] = [
  { value: 18 },
  { value: 35 },
  { value: 51 },
  { value: 28, tone: "highlight" },
  { value: 66 },
  { value: 79 },
  { value: 39 },
  { value: 88 },
  { value: 48 },
  { value: 70 },
  { value: 58 },
  { value: 35 },
];

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m8 6 10 6-10 6V6Z" />
    </svg>
  );
}

function StepIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 6h2v12H6V6Zm4 0 8 6-8 6V6Z" />
    </svg>
  );
}

function RewindIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 6v12h-2V6h2ZM6 12l8-6v12l-8-6Z" />
    </svg>
  );
}

function RefreshIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 6v5h-5m4.2-1.2A7 7 0 1 0 12 19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ShareIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="12" fill="currentColor" r="2.2" />
      <circle cx="18" cy="6" fill="currentColor" r="2.2" />
      <circle cx="18" cy="18" fill="currentColor" r="2.2" />
      <path
        d="m8 11 7.8-4.2M8 13l7.8 4.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5v9m0 0 4-4m-4 4-4-4M5 18h14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function FlaskIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 4h6m-5 0v5.5L6 18a2 2 0 0 0 1.8 3h8.4A2 2 0 0 0 18 18l-4-8.5V4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M8.2 14h7.6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function SeriesBars({
  series,
  baseClass,
  highlightClass,
}: {
  series: SeriesBar[];
  baseClass: string;
  highlightClass: string;
}) {
  return (
    <div className="flex h-[700px] items-end gap-1.5 rounded-lg border border-cyan-100/8 bg-[#040916] px-5 pb-6 pt-4">
      {series.map((bar, idx) => (
        <span
          className={`w-full rounded-t-sm ${
            bar.tone === "highlight" ? highlightClass : baseClass
          }`}
          key={`${bar.value}-${idx}`}
          style={{ height: `${bar.value * 5}px` }}
        />
      ))}
    </div>
  );
}

function StatRow({
  label,
  value,
  delta,
  accent = "text-cyan-300",
}: {
  label: string;
  value: string;
  delta: string;
  accent?: string;
}) {
  return (
    <div className="rounded border border-cyan-100/10 bg-[#151c2b] px-4 py-3">
      <div className="flex items-center justify-between">
        <p className="ds-label text-slate-500">
          {label}
        </p>
        <p className="ds-label text-slate-500">
          Delta
        </p>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="ds-metric text-slate-200">{value}</p>
        <p className={`ds-metric ${accent}`}>{delta}</p>
      </div>
    </div>
  );
}

export default function ComparisonPage() {
  return (
    <main className="min-h-screen border-x border-cyan-300/20 bg-[#020612] text-slate-100">
      <section className="mx-auto w-full max-w-[1920px] p-4 md:p-6">
        <div className="rounded-xl border border-cyan-100/10 bg-[#060c19]/95 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] md:p-5">
          <header className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan-100/10 pb-4">
            <div>
              <h1 className="ds-display text-slate-100">
                Advanced Comparison
              </h1>
              <p className="ds-body mt-1 text-slate-400">
                Real-time complexity analysis: QuickSort vs MergeSort
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="ds-body inline-flex h-11 items-center rounded-md border border-cyan-100/12 bg-[#161d2d] px-4 text-slate-400">
                Array Size: <strong className="ml-2 text-cyan-300">10,000</strong>
              </span>
              <span className="ds-body inline-flex h-11 items-center rounded-md border border-cyan-100/12 bg-[#161d2d] px-4 text-slate-400">
                Distribution:
                <strong className="ml-2 text-violet-300">Random</strong>
              </span>
            </div>
          </header>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr_1fr]">
            <article className="rounded-xl border border-cyan-100/10 bg-[#090f1d] p-4">
              <div className="flex items-center justify-between">
                <p className="ds-title uppercase tracking-[0.1em] text-slate-200">
                  <span className="mr-2 text-cyan-300">●</span>
                  QuickSort
                </p>
                <span className="ds-subtitle rounded border border-cyan-300/40 bg-cyan-400/8 px-3 py-1 text-cyan-300">
                  O(n log n)
                </span>
              </div>
              <div className="mt-4">
                <SeriesBars
                  baseClass="bg-gradient-to-t from-cyan-800 to-cyan-600"
                  highlightClass="bg-gradient-to-t from-cyan-400 to-cyan-300"
                  series={QUICKSORT_SERIES}
                />
              </div>
            </article>

            <article className="space-y-4">
              <section className="rounded-xl border border-cyan-100/10 bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,0.16),rgba(22,30,47,0.95)_48%)] px-6 py-8 text-center">
                <p className="ds-subtitle uppercase tracking-[0.08em] text-slate-400">
                  Efficiency Gap
                </p>
                <p className="ds-metric mt-3 text-cyan-300">
                  +24.8% ↗
                </p>
                <p className="ds-body mx-auto mt-3 max-w-[360px] text-slate-400">
                  QuickSort is performing faster on current dataset
                </p>
              </section>

              <section className="rounded-xl border border-cyan-100/10 bg-[#090f1d] p-4">
                <div className="flex items-center justify-between">
                  <h2 className="ds-title uppercase tracking-[0.1em] text-slate-200">
                    Live Telemetry
                  </h2>
                  <span className="ds-label text-rose-400">
                    ● Live
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <StatRow
                    accent="text-cyan-300"
                    delta="-1,204"
                    label="Comparisons"
                    value="24,802"
                  />
                  <StatRow
                    accent="text-violet-300"
                    delta="+4,110"
                    label="Swaps / Writes"
                    value="12,491"
                  />
                  <StatRow
                    accent="text-cyan-300"
                    delta="-124 KB"
                    label="Memory Overhead"
                    value="4 KB"
                  />
                </div>
              </section>
            </article>

            <article className="rounded-xl border border-cyan-100/10 bg-[#090f1d] p-4">
              <div className="flex items-center justify-between">
                <p className="ds-title uppercase tracking-[0.1em] text-slate-200">
                  <span className="mr-2 text-violet-300">●</span>
                  MergeSort
                </p>
                <span className="ds-subtitle rounded border border-violet-300/35 bg-violet-400/8 px-3 py-1 text-violet-300">
                  O(n log n)
                </span>
              </div>
              <div className="mt-4">
                <SeriesBars
                  baseClass="bg-gradient-to-t from-violet-800 to-violet-500"
                  highlightClass="bg-gradient-to-t from-violet-300 to-violet-200"
                  series={MERGESORT_SERIES}
                />
              </div>
            </article>
          </div>

          <footer className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-cyan-100/10 bg-[#0a1120] p-3 md:gap-5">
            <div className="flex items-center gap-2">
              <button
                className="grid h-11 w-11 place-items-center rounded-md border border-cyan-100/15 bg-slate-700/20 text-slate-300 transition hover:bg-slate-700/35"
                type="button"
              >
                <RewindIcon className="h-5 w-5" />
              </button>
              <button
                className="grid h-14 w-14 place-items-center rounded-xl border border-cyan-300/40 bg-cyan-200 text-[#073943] transition hover:bg-cyan-100"
                type="button"
              >
                <PlayIcon className="h-6 w-6" />
              </button>
              <button
                className="grid h-11 w-11 place-items-center rounded-md border border-cyan-100/15 bg-slate-700/20 text-slate-300 transition hover:bg-slate-700/35"
                type="button"
              >
                <StepIcon className="h-4.5 w-4.5" />
              </button>
              <button
                className="ml-1 grid h-11 w-11 place-items-center rounded-md border border-cyan-100/15 bg-slate-700/20 text-slate-300 transition hover:bg-slate-700/35"
                type="button"
              >
                <RefreshIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="min-w-[220px] flex-1">
              <p className="ds-label text-slate-500">
                Playback Speed
              </p>
              <div className="mt-1 flex items-center gap-3">
                <p className="ds-metric text-cyan-300">1.0x</p>
                <div className="h-1.5 flex-1 rounded-full bg-slate-700">
                  <div className="h-full w-2/5 rounded-full bg-cyan-400" />
                </div>
              </div>
            </div>

            <div className="min-w-[220px]">
              <p className="ds-label text-slate-500">
                Execution Timeline
              </p>
              <div className="mt-1 flex items-baseline gap-2 text-slate-200">
                <p className="ds-metric">00:12.45</p>
                <span className="ds-title">/</span>
                <p className="ds-metric">00:45.00</p>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-slate-700">
                <div className="h-full w-[27%] rounded-full bg-cyan-400" />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                className="ds-button flex h-14 items-center gap-2 rounded-md border border-cyan-100/15 bg-[#171e2d] px-4 uppercase tracking-[0.12em] text-slate-300 transition hover:bg-slate-700/30"
                type="button"
              >
                <ShareIcon className="h-4.5 w-4.5" />
                Share Report
              </button>
              <button
                className="ds-button flex h-14 items-center gap-2 rounded-md border border-cyan-100/15 bg-[#171e2d] px-4 uppercase tracking-[0.12em] text-slate-300 transition hover:bg-slate-700/30"
                type="button"
              >
                <DownloadIcon className="h-4.5 w-4.5" />
                Export Data
              </button>
              <button
                className="grid h-14 w-14 place-items-center rounded-xl border border-cyan-300/40 bg-cyan-400 text-[#073A44] transition hover:bg-cyan-300"
                type="button"
              >
                <FlaskIcon className="h-5 w-5" />
              </button>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
