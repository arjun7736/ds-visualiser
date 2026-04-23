type BarProps = {
  value: number;
  tone?: "default" | "pivot" | "comparing";
};

type PseudoLineProps = {
  number: string;
  code: string;
  active?: boolean;
};

const SORT_BARS: BarProps[] = [
  { value: 32 },
  { value: 46 },
  { value: 24 },
  { value: 64 },
  { value: 54, tone: "comparing" },
  { value: 43, tone: "comparing" },
  { value: 78 },
  { value: 37 },
  { value: 87, tone: "pivot" },
  { value: 19 },
  { value: 51 },
  { value: 73 },
  { value: 28 },
  { value: 59 },
  { value: 41 },
  { value: 82 },
  { value: 16 },
  { value: 92 },
  { value: 34 },
  { value: 49 },
  { value: 26 },
];

const PSEUDOCODE_LINES: PseudoLineProps[] = [
  { number: "01", code: "function quickSort(arr, low, high):" },
  { number: "02", code: "if low < high:" },
  { number: "03", code: "pi = partition(arr, low, high)" },
  { number: "04", code: "quickSort(arr, low, pi - 1)", active: true },
  { number: "05", code: "quickSort(arr, pi + 1, high)" },
  { number: "06", code: "" },
  { number: "07", code: "function partition(arr, low, high):" },
  { number: "08", code: "pivot = arr[high]" },
  { number: "09", code: "i = low - 1" },
  { number: "10", code: "for j from low to high - 1:" },
  { number: "11", code: "if arr[j] < pivot:" },
  { number: "12", code: "i++" },
  { number: "13", code: "swap(arr[i], arr[j])" },
  { number: "14", code: "swap(arr[i + 1], arr[high])" },
  { number: "15", code: "return i + 1" },
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

function DiceIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="14"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.8"
        width="14"
        x="5"
        y="5"
      />
      <circle cx="10" cy="10" fill="currentColor" r="1.2" />
      <circle cx="14" cy="14" fill="currentColor" r="1.2" />
      <circle cx="14" cy="10" fill="currentColor" r="1.2" />
      <circle cx="10" cy="14" fill="currentColor" r="1.2" />
    </svg>
  );
}

function ShuffleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 4h4v4m0-4-6 6m-4 4-6 6m0-4v4h4m12-8 4 4-4 4m4-4H9a4 4 0 0 1-2.8-1.2L4 16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" fill="currentColor" r="9" />
      <path
        d="m8 12.5 2.4 2.4L16 9.5"
        stroke="#032028"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function Bar({ value, tone = "default" }: BarProps) {
  const toneClass =
    tone === "pivot"
      ? "from-violet-500 to-violet-700"
      : tone === "comparing"
        ? "from-emerald-300 to-emerald-500"
        : "from-cyan-500 to-cyan-700";

  return (
    <div
      className={`w-full rounded-t-sm bg-gradient-to-t ${toneClass}`}
      style={{ height: `${value * 4}px` }}
    />
  );
}

function PseudoLine({ number, code, active }: PseudoLineProps) {
  return (
    <li
      className={`grid grid-cols-[2.1rem_1fr] gap-3 px-3 py-1.5 ${
        active
          ? "bg-cyan-400/14 text-cyan-100 shadow-[inset_3px_0_0_#22D3EE]"
          : "text-slate-500"
      }`}
    >
      <span className={active ? "text-cyan-300" : "text-slate-600"}>{number}</span>
      <span>{code || "\u00A0"}</span>
    </li>
  );
}

export default function SortingPage() {
  return (
    <main className="min-h-screen border-x border-cyan-300/20 bg-[#020612] text-slate-100">
      <section className="mx-auto w-full max-w-[1920px] p-4 md:p-6">
        <div className="rounded-xl border border-cyan-100/10 bg-[#060C19]/95 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] md:p-5">
          <div className="grid gap-4 border-b border-cyan-100/10 pb-4 md:grid-cols-[1.1fr_auto_1fr_auto] md:items-center md:gap-6 md:pb-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="min-w-[180px] rounded-lg border border-cyan-100/10 bg-[#0A1220] px-4 py-2.5">
                <p className="ds-label text-slate-500">
                  Algorithm
                </p>
                <p className="ds-title mt-1 flex items-center gap-2 text-slate-100">
                  QuickSort
                  <span className="text-cyan-300">⌄</span>
                </p>
              </div>
              <button
                className="grid h-14 w-14 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-400 text-[#073B45] transition hover:bg-cyan-300"
                type="button"
              >
                <PlayIcon className="h-6 w-6" />
              </button>
              <button
                className="grid h-14 w-14 place-items-center rounded-xl border border-slate-500/35 bg-slate-700/20 text-slate-300 transition hover:bg-slate-700/30"
                type="button"
              >
                <StepIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="hidden h-10 w-px bg-cyan-100/10 md:block" />

            <div className="max-w-[340px] rounded-lg border border-cyan-100/10 bg-[#0A1220] px-4 py-3">
              <p className="ds-label text-slate-500">
                Visualization Speed
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="ds-small text-slate-500">1x</span>
                <div className="h-1.5 flex-1 rounded-full bg-slate-700">
                  <div className="h-full w-3/4 rounded-full bg-cyan-400" />
                </div>
                <span className="ds-small text-slate-500">10x</span>
              </div>
            </div>

            <div className="ds-button inline-flex h-14 items-center rounded-lg border border-cyan-300/25 bg-cyan-400/7 px-5 uppercase tracking-[0.12em] text-cyan-300">
              <span className="mr-2 text-cyan-300">●</span>
              Live Status: Running
            </div>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
            <div className="space-y-4">
              <section className="rounded-xl border border-cyan-100/10 bg-[#070E1C] p-4 md:p-5">
                <div className="ds-label flex flex-wrap items-center gap-5 text-slate-300">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-cyan-400" />
                    Element
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-violet-500" />
                    Pivot
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-emerald-400" />
                    Comparing
                  </span>
                </div>

                <div className="mt-6 flex h-[520px] items-end gap-1.5 rounded-lg border border-cyan-100/6 bg-[#050A16] px-4 pb-6 pt-3">
                  {SORT_BARS.map((bar, index) => (
                    <Bar key={`${bar.value}-${index}`} tone={bar.tone} value={bar.value} />
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-cyan-100/10 bg-[#070E1C] p-4 md:p-5">
                <p className="ds-label text-slate-500">
                  Custom Input (CSV)
                </p>
                <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_220px]">
                  <div className="ds-body rounded-lg border border-cyan-100/10 bg-[#050A16] p-4 text-slate-400">
                    45, 23, 89, 12, 56, 77, 34, 90, 11, 67, 3, 54, 88...
                  </div>

                  <div className="space-y-2">
                    <button
                      className="ds-button flex w-full items-center justify-center gap-2 rounded border border-cyan-100/15 bg-[#111827] px-3 py-3 uppercase tracking-[0.12em] text-slate-300 transition hover:bg-slate-700/30"
                      type="button"
                    >
                      <DiceIcon className="h-4 w-4" />
                      Generate Random
                    </button>
                    <button
                      className="ds-button flex w-full items-center justify-center gap-2 rounded border border-cyan-100/15 bg-[#111827] px-3 py-3 uppercase tracking-[0.12em] text-slate-300 transition hover:bg-slate-700/30"
                      type="button"
                    >
                      <ShuffleIcon className="h-4 w-4" />
                      Shuffle Current
                    </button>
                    <button
                      className="ds-button flex w-full items-center justify-center gap-2 rounded border border-cyan-300/35 bg-cyan-400 px-3 py-3 uppercase tracking-[0.12em] text-[#063C45] transition hover:bg-cyan-300"
                      type="button"
                    >
                      <CheckIcon className="h-4 w-4 text-[#063C45]" />
                      Apply Input
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <aside className="rounded-xl border border-cyan-100/10 bg-[#070E1C] p-0">
              <div className="flex items-center border-b border-cyan-100/10">
                <button
                  className="ds-button border-r border-cyan-100/10 px-5 py-3 uppercase tracking-[0.12em] text-cyan-300"
                  type="button"
                >
                  Pseudocode
                </button>
                <button
                  className="ds-button border-r border-cyan-100/10 px-5 py-3 uppercase tracking-[0.12em] text-slate-500"
                  type="button"
                >
                  Explanation
                </button>
                <button
                  className="ds-button px-5 py-3 uppercase tracking-[0.12em] text-slate-500"
                  type="button"
                >
                  Complexity
                </button>
              </div>

              <ol className="ds-body mt-2 space-y-0.5 px-2 pb-5 font-mono">
                {PSEUDOCODE_LINES.map((line) => (
                  <PseudoLine
                    active={line.active}
                    code={line.code}
                    key={line.number}
                    number={line.number}
                  />
                ))}
              </ol>

              <div className="mx-4 border-t border-cyan-100/10 pt-4">
                <p className="ds-label text-slate-500">
                  Current Metrics
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded border border-cyan-100/12 bg-[#111827] p-3">
                    <p className="ds-label text-slate-500">
                      Comparisons
                    </p>
                    <p className="ds-metric mt-1 text-cyan-300">14/2</p>
                  </div>
                  <div className="rounded border border-cyan-100/12 bg-[#111827] p-3">
                    <p className="ds-label text-slate-500">Swaps</p>
                    <p className="ds-metric mt-1 text-violet-300">97</p>
                  </div>
                </div>
              </div>

              <div className="mx-4 mt-5 rounded border border-cyan-100/12 bg-[#111827] p-4">
                <p className="ds-title uppercase tracking-[0.08em] text-slate-100">
                  Complexity Analysis
                </p>
                <div className="ds-body mt-3 space-y-1">
                  <p className="flex items-center justify-between text-slate-400">
                    <span>Best Case</span>
                    <span className="font-semibold text-cyan-300">O(n log n)</span>
                  </p>
                  <p className="flex items-center justify-between text-slate-400">
                    <span>Average Case</span>
                    <span className="font-semibold text-cyan-300">O(n log n)</span>
                  </p>
                  <p className="flex items-center justify-between text-slate-400">
                    <span>Worst Case</span>
                    <span className="font-semibold text-slate-300">O(n²)</span>
                  </p>
                </div>
              </div>

              <div className="m-4 mt-5 rounded border border-cyan-300/35 bg-[#061423] px-4 py-3">
                <p className="ds-label text-cyan-300">
                  [SYSTEM] Swapping indices 4 (value: 56) and 9 (value: 11)
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
