"use client"

import { useEffect, useMemo, useState } from "react";

import {
  createRandomArray,
  DEFAULT_SORT_ARRAY,
  filterInput,
  generateSortingSteps,
  shuffleArray,
  SORTING_ALGORITHMS,
  SORTING_ALGORITHMS_BY_ID,
  type BarState,
  type SortingAlgorithmId,
  type SortingStep,
} from "../components/sortingAlgorithms";

type PseudoLineProps = {
  number: string;
  code: string;
  active?: boolean;
};

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

function PauseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
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

function Bar({ value, tone = "default" }: BarState) {
  const toneClass =
    tone === "pivot"
      ? "from-violet-500 to-violet-700"
      : tone === "comparing"
        ? "from-emerald-300 to-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
        : tone === "sorted"
          ? "from-cyan-400 to-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
          : tone === "muted"
            ? "from-slate-700/20 to-slate-800/20 opacity-30"
            : "from-cyan-600 to-cyan-800";

  return (
    <div
      className={`w-full rounded-t-md bg-gradient-to-t transition-all duration-300 ${toneClass}`}
      style={{ height: `${Math.max(14, value * 2.8)}px` }}
    />
  );
}

function PseudoLine({ number, code, active }: PseudoLineProps) {
  return (
    <li
      className={`grid grid-cols-[2.1rem_1fr] gap-3 px-3 py-1.5 font-mono text-xs ${
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
  const [algorithm, setAlgorithm] = useState<SortingAlgorithmId>("quick");
  const [arrayValues, setArrayValues] = useState<number[]>(DEFAULT_SORT_ARRAY);
  const [csvInput, setCsvInput] = useState<string>(DEFAULT_SORT_ARRAY.join(", "));
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const [activeTab, setActiveTab] = useState<"pseudocode" | "explanation" | "complexity">("pseudocode");
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedAlgorithm = SORTING_ALGORITHMS_BY_ID[algorithm];
  const steps = useMemo(
    () => generateSortingSteps(algorithm, arrayValues),
    [algorithm, arrayValues],
  );

  const rebuildForArray = (nextValues: number[]) => {
    setArrayValues(nextValues);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleApplyInput = () => {
    const rawValues = filterInput(csvInput);
    if (rawValues.length === 0) return;
    rebuildForArray(rawValues);
  };

  const handleShuffle = () => {
    const shuffled = shuffleArray(arrayValues);
    setCsvInput(shuffled.join(", "));
    rebuildForArray(shuffled);
  };

  const handleGenerateRandom = () => {
    const randomVals = createRandomArray(20);
    setCsvInput(randomVals.join(", "));
    rebuildForArray(randomVals);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying && steps.length > 0) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          }
          setIsPlaying(false);
          return prev;
        });
      }, speed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, speed, steps.length]);

  const currentStep =
    steps[currentStepIndex] ||
    ({
      bars: arrayValues.map((value) => ({ value, tone: "default" as const })),
      highlightedLine: 0,
      comparisons: 0,
      swaps: 0,
      systemMessage: "Ready to simulate.",
      explanation: "Select an algorithm and apply input to start the sorting simulation.",
    } satisfies SortingStep);

  return (
    <main className="min-h-screen border-x border-cyan-300/20 bg-[#020612] text-slate-100 flex flex-col md:h-[calc(100dvh-5.5rem)] md:overflow-hidden">
      <section className="mx-auto w-full max-w-[1900px] flex-1 flex flex-col md:min-h-0">
        <div className="rounded-xl border border-cyan-100/10 bg-[#060C19]/95 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] md:p-4 flex flex-col flex-1 md:min-h-0">
          <div className="grid gap-3 border-b border-cyan-100/10 pb-3 md:grid-cols-[1.2fr_auto_1.1fr_auto] md:items-center md:gap-4 md:pb-4 shrink-0">
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="relative min-w-[200px] rounded-lg border border-cyan-100/10 bg-[#0A1220] px-3 py-2 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <p className="ds-label text-slate-500">Algorithm</p>
                <p className="ds-title flex items-center justify-between text-slate-100">
                  {selectedAlgorithm.name}
                  <span className="text-cyan-300">⌄</span>
                </p>

                {showDropdown && (
                  <div className="absolute left-0 right-0 mt-3.5 bg-[#0D1625] border border-cyan-300/20 rounded-lg shadow-xl z-20 overflow-hidden max-h-72 overflow-y-auto">
                    {SORTING_ALGORITHMS.map((item) => (
                      <div
                        className="px-4 py-2.5 text-sm hover:bg-cyan-400/10 transition text-slate-200"
                        key={item.id}
                        onClick={() => {
                          setAlgorithm(item.id);
                          setCurrentStepIndex(0);
                          setIsPlaying(false);
                          setShowDropdown(false);
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-400 text-[#073B45] transition hover:bg-cyan-300 disabled:opacity-40"
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={steps.length === 0 || currentStepIndex === steps.length - 1}
              >
                {isPlaying ? <PauseIcon className="h-5 w-5 md:h-6 md:w-6" /> : <PlayIcon className="h-5 w-5 md:h-6 md:w-6" />}
              </button>

              <button
                className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-xl border border-slate-500/35 bg-slate-700/20 text-slate-300 transition hover:bg-slate-700/30 disabled:opacity-40"
                type="button"
                onClick={() =>
                  setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1))
                }
                disabled={steps.length === 0 || currentStepIndex === steps.length - 1}
              >
                <StepIcon className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>

            <div className="hidden h-10 w-px bg-cyan-100/10 md:block" />

            <div className="max-w-[300px] rounded-lg border border-cyan-100/10 bg-[#0A1220] px-3 py-2 w-full">
              <p className="ds-label text-slate-500">Visualization Speed</p>
              <div className="mt-1 flex items-center gap-3">
                <span className="ds-small text-slate-500">Slow</span>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="50"
                  value={1550 - speed}
                  onChange={(e) => setSpeed(1550 - Number.parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-400"
                />
                <span className="ds-small text-slate-500">Fast</span>
              </div>
            </div>

            <div className="ds-button inline-flex h-10 md:h-12 items-center rounded-lg border border-cyan-300/25 bg-cyan-400/7 px-4 uppercase tracking-[0.12em] text-cyan-300">
              <span className="mr-2 text-cyan-300">●</span>
              Live Status: {steps.length > 0 ? (currentStepIndex === steps.length - 1 ? "Complete" : isPlaying ? "Sorting" : "Paused") : "Idle"}
            </div>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-[1.6fr_1fr] lg:grid-cols-[1.8fr_1fr] flex-1 md:min-h-0">
            <div className="flex flex-col gap-3 md:min-h-0">
              <section className="rounded-xl border border-cyan-100/10 bg-[#070E1C] p-3 md:p-4 flex flex-col flex-1 md:min-h-0">
                <div className="ds-label flex flex-wrap items-center gap-5 text-slate-300 shrink-0">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-cyan-600" />
                    Element
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-violet-500" />
                    Pivot / Key
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-emerald-400" />
                    Comparing
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-cyan-400" />
                    Sorted
                  </span>
                </div>

                <div className="mt-4 flex items-end gap-1 md:gap-1.5 rounded-lg border border-cyan-100/6 bg-[#050A16] px-3 pb-4 pt-2 flex-1 relative min-h-[220px]">
                  {currentStep.bars.map((bar, index) => (
                    <Bar key={`${bar.value}-${index}`} tone={bar.tone} value={bar.value} />
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-cyan-100/10 bg-[#070E1C] p-3 md:p-4 shrink-0">
                <p className="ds-label text-slate-500">Custom Input (CSV)</p>
                <div className="mt-2 grid gap-2 md:grid-cols-[1fr_160px] lg:grid-cols-[1fr_220px]">
                  <textarea
                    value={csvInput}
                    onChange={(e) => setCsvInput(e.target.value)}
                    className="ds-body rounded-lg border border-cyan-100/10 bg-[#050A16] p-3 text-slate-200 focus:outline-none focus:border-cyan-400 resize-none h-[100px] md:h-auto"
                  />

                  <div className="space-y-1.5">
                    <button
                      className="ds-button flex w-full items-center justify-center gap-2 rounded border border-cyan-100/15 bg-[#111827] px-3 py-2 uppercase tracking-[0.12em] text-slate-300 transition hover:bg-slate-700/30 text-xs md:text-sm"
                      type="button"
                      onClick={handleGenerateRandom}
                    >
                      <DiceIcon className="h-4 w-4" />
                      Generate Random
                    </button>
                    <button
                      className="ds-button flex w-full items-center justify-center gap-2 rounded border border-cyan-100/15 bg-[#111827] px-3 py-2 uppercase tracking-[0.12em] text-slate-300 transition hover:bg-slate-700/30 text-xs md:text-sm"
                      type="button"
                      onClick={handleShuffle}
                    >
                      <ShuffleIcon className="h-4 w-4" />
                      Shuffle Current
                    </button>
                    <button
                      className="ds-button flex w-full items-center justify-center gap-2 rounded border border-cyan-300/35 bg-cyan-400 px-3 py-2 uppercase tracking-[0.12em] text-[#063C45] transition hover:bg-cyan-300 text-xs md:text-sm"
                      type="button"
                      onClick={handleApplyInput}
                    >
                      <CheckIcon className="h-4 w-4 text-[#063C45]" />
                      Apply Input
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <aside className="rounded-xl border border-cyan-100/10 bg-[#070E1C] p-0 flex flex-col md:min-h-0">
              <div className="flex items-center border-b border-cyan-100/10 shrink-0">
                {(["pseudocode", "explanation", "complexity"] as const).map((tab) => (
                  <button
                    key={tab}
                    className={`ds-button border-r border-cyan-100/10 px-4 py-3 uppercase tracking-[0.12em] transition ${
                      activeTab === tab ? "text-cyan-300 bg-cyan-400/5 font-semibold" : "text-slate-500 hover:text-slate-300"
                    }`}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto mt-2 pr-1 custom-scrollbar min-h-[220px]">
                {activeTab === "pseudocode" && (
                  <ol className="ds-body space-y-0.5 px-2 pb-3 font-mono">
                    {selectedAlgorithm.code.map((line) => (
                      <PseudoLine
                        active={line.number === String(currentStep.highlightedLine).padStart(2, "0")}
                        code={line.code}
                        key={line.number}
                        number={line.number}
                      />
                    ))}
                  </ol>
                )}

                {activeTab === "explanation" && (
                  <div className="px-4 py-2 space-y-3">
                    <p className="ds-subtitle text-cyan-300 font-semibold uppercase tracking-wider text-sm">
                      Current Step Explanation
                    </p>
                    <p className="ds-body text-slate-300 text-sm leading-relaxed bg-[#050A16] p-3 rounded-lg border border-cyan-100/5">
                      {currentStep.explanation}
                    </p>
                  </div>
                )}

                {activeTab === "complexity" && (
                  <div className="px-4 py-2 space-y-4">
                    <div className="rounded border border-cyan-100/12 bg-[#111827] p-3.5">
                      <p className="ds-title uppercase tracking-[0.08em] text-slate-100 text-sm md:text-base">
                        Complexity Analysis
                      </p>
                      <div className="ds-body mt-3 space-y-2.5">
                        <p className="flex items-center justify-between text-slate-400 text-sm">
                          <span>Best Case</span>
                          <span className="font-semibold text-cyan-300">{selectedAlgorithm.complexity.best}</span>
                        </p>
                        <p className="flex items-center justify-between text-slate-400 text-sm">
                          <span>Average Case</span>
                          <span className="font-semibold text-cyan-300">{selectedAlgorithm.complexity.avg}</span>
                        </p>
                        <p className="flex items-center justify-between text-slate-400 text-sm">
                          <span>Worst Case</span>
                          <span className="font-semibold text-slate-300">{selectedAlgorithm.complexity.worst}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mx-3 md:mx-4 border-t border-cyan-100/10 pt-3 shrink-0">
                <p className="ds-label text-slate-500">Current Metrics</p>
                <div className="mt-2 grid grid-cols-2 gap-2 md:gap-3">
                  <div className="rounded border border-cyan-100/12 bg-[#111827] p-3">
                    <p className="ds-label text-slate-500">Comparisons</p>
                    <p className="ds-metric mt-1 text-cyan-300">{currentStep.comparisons}</p>
                  </div>
                  <div className="rounded border border-cyan-100/12 bg-[#111827] p-3">
                    <p className="ds-label text-slate-500">Swaps / Writes</p>
                    <p className="ds-metric mt-1 text-violet-300">{currentStep.swaps}</p>
                  </div>
                </div>
              </div>

              <div className="m-3 md:m-4 mt-3 md:mt-4 rounded border border-cyan-300/35 bg-[#061423] px-3 py-2 md:px-4 md:py-3 shrink-0">
                <p className="ds-label text-cyan-300 lowercase italic font-bold">{currentStep.systemMessage}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
