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

const INITIAL_COMPARE_ARRAY = DEFAULT_SORT_ARRAY.slice(0, 16);

type Side = "left" | "right";

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="m8 6 10 6-10 6V6Z" />
    </svg>
  );
}

function PauseIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function StepIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6h2v12H6V6Zm4 0 8 6-8 6V6Z" />
    </svg>
  );
}

function RewindIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6v12h-2V6h2ZM6 12l8-6v12l-8-6Z" />
    </svg>
  );
}

function RefreshIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

function DiceIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect height="14" rx="2.2" stroke="currentColor" strokeWidth="1.8" width="14" x="5" y="5" />
      <circle cx="10" cy="10" fill="currentColor" r="1.2" />
      <circle cx="14" cy="14" fill="currentColor" r="1.2" />
      <circle cx="14" cy="10" fill="currentColor" r="1.2" />
      <circle cx="10" cy="14" fill="currentColor" r="1.2" />
    </svg>
  );
}

function ShuffleIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

function AlgorithmSelector({
  id,
  label,
  onChange,
  value,
}: {
  id: string;
  label: string;
  onChange: (id: SortingAlgorithmId) => void;
  value: SortingAlgorithmId;
}) {
  return (
    <label className="space-y-1.5">
      <span className="ds-label text-slate-500">{label}</span>
      <select
        className="ds-body w-full rounded-lg border border-cyan-100/15 bg-[#050A16] px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-300"
        id={id}
        onChange={(event) => onChange(event.target.value as SortingAlgorithmId)}
        value={value}
      >
        {SORTING_ALGORITHMS.map((algorithm) => (
          <option key={algorithm.id} value={algorithm.id}>
            {algorithm.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function BarStrip({ bars, side }: { bars: BarState[]; side: Side }) {
  return (
    <div className="flex h-[260px] xl:h-[330px] items-end gap-1 rounded-lg border border-cyan-100/8 bg-[#040916] px-3 pb-4 pt-2">
      {bars.map((bar, index) => {
        const toneClass =
          bar.tone === "pivot"
            ? "from-violet-500 to-violet-700"
            : bar.tone === "comparing"
              ? "from-emerald-300 to-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
              : bar.tone === "sorted"
                ? side === "left"
                  ? "from-cyan-300 to-cyan-500"
                  : "from-violet-300 to-violet-500"
                : bar.tone === "muted"
                  ? "from-slate-700/20 to-slate-800/20 opacity-30"
                  : side === "left"
                    ? "from-cyan-800 to-cyan-600"
                    : "from-violet-800 to-violet-600";

        return (
          <span
            className={`w-full rounded-t-sm bg-gradient-to-t transition-all duration-300 ${toneClass}`}
            key={`${bar.value}-${index}`}
            style={{ height: `${Math.max(14, bar.value * 2.8)}px` }}
          />
        );
      })}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded border border-cyan-100/12 bg-[#111827] px-3 py-2.5">
      <p className="ds-label text-slate-500">{label}</p>
      <p className="ds-metric mt-1 text-slate-100">{value}</p>
    </div>
  );
}

function AlgorithmPanel({
  accent,
  algorithm,
  side,
  step,
}: {
  accent: "cyan" | "violet";
  algorithm: SortingAlgorithmId;
  side: Side;
  step: SortingStep;
}) {
  const data = SORTING_ALGORITHMS_BY_ID[algorithm];

  return (
    <article className="rounded-xl border border-cyan-100/10 bg-[#090f1d] p-3 md:p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="ds-title text-slate-100">
          <span className={`mr-2 ${accent === "cyan" ? "text-cyan-300" : "text-violet-300"}`}>●</span>
          {data.name}
        </p>
        <span
          className={`rounded border px-3 py-1 text-sm ${
            accent === "cyan"
              ? "border-cyan-300/40 bg-cyan-400/8 text-cyan-300"
              : "border-violet-300/40 bg-violet-400/8 text-violet-300"
          }`}
        >
          {data.complexity.avg}
        </span>
      </div>

      <div className="mt-4">
        <BarStrip bars={step.bars} side={side} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Metric label="Comparisons" value={step.comparisons} />
        <Metric label="Swaps / Writes" value={step.swaps} />
      </div>

      <div className="mt-3 rounded border border-cyan-100/12 bg-[#0f1728] p-3">
        <p className="ds-label text-slate-500">Current Step</p>
        <p className="ds-body mt-2 text-slate-200">{step.systemMessage}</p>
        <p className="ds-small mt-2 text-slate-400">{step.explanation}</p>
      </div>
    </article>
  );
}

const fallbackStep = (values: number[]): SortingStep => ({
  bars: values.map((value) => ({ value, tone: "default" })),
  highlightedLine: 0,
  comparisons: 0,
  swaps: 0,
  systemMessage: "Ready to compare.",
  explanation: "Press play or step through to compare two sorting algorithms side by side.",
});

export default function ComparisonPage() {
  const [leftAlgorithm, setLeftAlgorithm] = useState<SortingAlgorithmId>("quick");
  const [rightAlgorithm, setRightAlgorithm] = useState<SortingAlgorithmId>("merge");
  const [arrayValues, setArrayValues] = useState<number[]>(INITIAL_COMPARE_ARRAY);
  const [csvInput, setCsvInput] = useState<string>(INITIAL_COMPARE_ARRAY.join(", "));
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);

  const rebuildComparison = (values: number[]) => {
    setArrayValues(values);
    setCurrentFrame(0);
    setIsPlaying(false);
  };

  const handleLeftAlgorithmChange = (algorithm: SortingAlgorithmId) => {
    setLeftAlgorithm(algorithm);
    setCurrentFrame(0);
    setIsPlaying(false);
  };

  const handleRightAlgorithmChange = (algorithm: SortingAlgorithmId) => {
    setRightAlgorithm(algorithm);
    setCurrentFrame(0);
    setIsPlaying(false);
  };

  const leftSteps = useMemo(
    () => generateSortingSteps(leftAlgorithm, arrayValues),
    [arrayValues, leftAlgorithm],
  );
  const rightSteps = useMemo(
    () => generateSortingSteps(rightAlgorithm, arrayValues),
    [arrayValues, rightAlgorithm],
  );

  const totalFrames = Math.max(1, leftSteps.length, rightSteps.length);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying && totalFrames > 1) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev < totalFrames - 1) {
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
  }, [isPlaying, speed, totalFrames]);

  const leftStep = leftSteps[Math.min(currentFrame, Math.max(0, leftSteps.length - 1))] ?? fallbackStep(arrayValues);
  const rightStep = rightSteps[Math.min(currentFrame, Math.max(0, rightSteps.length - 1))] ?? fallbackStep(arrayValues);

  const leftWork = leftStep.comparisons + leftStep.swaps;
  const rightWork = rightStep.comparisons + rightStep.swaps;

  const telemetry = useMemo(() => {
    const difference = Math.abs(leftWork - rightWork);
    const denominator = Math.max(1, Math.max(leftWork, rightWork));
    const percent = (difference / denominator) * 100;

    if (leftWork === rightWork) {
      return {
        gap: "0.0%",
        message: "Both algorithms are currently tied on operation count.",
        leader: "Tie",
      };
    }

    const leftFaster = leftWork < rightWork;
    const leader = leftFaster ? SORTING_ALGORITHMS_BY_ID[leftAlgorithm].name : SORTING_ALGORITHMS_BY_ID[rightAlgorithm].name;

    return {
      gap: `${percent.toFixed(1)}%`,
      message: `${leader} is currently ahead with fewer operations.`,
      leader,
    };
  }, [leftAlgorithm, leftWork, rightAlgorithm, rightWork]);

  const handleApplyInput = () => {
    const parsed = filterInput(csvInput);
    if (parsed.length === 0) return;
    rebuildComparison(parsed);
  };

  const handleRandom = () => {
    const randomValues = createRandomArray(16);
    setCsvInput(randomValues.join(", "));
    rebuildComparison(randomValues);
  };

  const handleShuffle = () => {
    const shuffled = shuffleArray(arrayValues);
    setCsvInput(shuffled.join(", "));
    rebuildComparison(shuffled);
  };

  const frameProgress = totalFrames > 1 ? (currentFrame / (totalFrames - 1)) * 100 : 0;

  return (
    <main className="min-h-screen border-x border-cyan-300/20 bg-[#020612] text-slate-100">
      <section className="mx-auto w-full max-w-[1920px] p-2 md:p-4 xl:p-2">
        <div className="rounded-xl border border-cyan-100/10 bg-[#060c19]/95 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] md:p-4">
          <header className="border-b border-cyan-100/10 pb-3">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="ds-display text-slate-100">Advanced Comparison</h1>
                <p className="ds-body mt-1 text-slate-400">
                  Real-time operation comparison: {SORTING_ALGORITHMS_BY_ID[leftAlgorithm].name} vs {SORTING_ALGORITHMS_BY_ID[rightAlgorithm].name}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="ds-body inline-flex h-11 items-center rounded-md border border-cyan-100/12 bg-[#161d2d] px-4 text-slate-400">
                  Array Size: <strong className="ml-2 text-cyan-300">{arrayValues.length}</strong>
                </span>
                <span className="ds-body inline-flex h-11 items-center rounded-md border border-cyan-100/12 bg-[#161d2d] px-4 text-slate-400">
                  Algorithms:
                  <strong className="ml-2 text-violet-300">{SORTING_ALGORITHMS.length}</strong>
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {SORTING_ALGORITHMS.map((algorithm) => (
                <span
                  className="rounded border border-cyan-100/12 bg-[#0f1728] px-3 py-1 text-xs uppercase tracking-[0.12em] text-slate-300"
                  key={algorithm.id}
                >
                  {algorithm.name}
                </span>
              ))}
            </div>
          </header>

          <div className="mt-3 grid gap-3 xl:grid-cols-3">
            <div className="space-y-3">
              <AlgorithmSelector id="left-algorithm" label="Left Algorithm" onChange={handleLeftAlgorithmChange} value={leftAlgorithm} />
              <AlgorithmPanel accent="cyan" algorithm={leftAlgorithm} side="left" step={leftStep} />
            </div>

            <article className="space-y-3">
              <section className="rounded-xl border border-cyan-100/10 bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,0.16),rgba(22,30,47,0.95)_48%)] px-4 py-6 text-center">
                <p className="ds-subtitle uppercase tracking-[0.08em] text-slate-400">Efficiency Gap</p>
                <p className="ds-metric mt-3 text-cyan-300">{telemetry.gap}</p>
                <p className="ds-body mx-auto mt-3 max-w-[360px] text-slate-400">{telemetry.message}</p>
              </section>

              <section className="rounded-xl border border-cyan-100/10 bg-[#090f1d] p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <h2 className="ds-title uppercase tracking-[0.1em] text-slate-200">Live Telemetry</h2>
                  <span className={`ds-label ${isPlaying ? "text-emerald-300" : "text-slate-400"}`}>
                    ● {isPlaying ? "Playing" : "Paused"}
                  </span>
                </div>

                <div className="mt-4 grid gap-2">
                  <Metric label="Leader" value={telemetry.leader} />
                  <Metric label="Left Ops (Comp + Swaps)" value={leftWork} />
                  <Metric label="Right Ops (Comp + Swaps)" value={rightWork} />
                </div>

                <div className="mt-4 space-y-2">
                  <p className="ds-label text-slate-500">Visualization Speed</p>
                  <div className="flex items-center gap-3">
                    <span className="ds-small text-slate-500">Slow</span>
                    <input
                      type="range"
                      min="50"
                      max="1500"
                      step="50"
                      value={1550 - speed}
                      onChange={(event) => setSpeed(1550 - Number.parseInt(event.target.value, 10))}
                      className="w-full accent-cyan-400"
                    />
                    <span className="ds-small text-slate-500">Fast</span>
                  </div>
                </div>
              </section>
            </article>

            <div className="space-y-3">
              <AlgorithmSelector id="right-algorithm" label="Right Algorithm" onChange={handleRightAlgorithmChange} value={rightAlgorithm} />
              <AlgorithmPanel accent="violet" algorithm={rightAlgorithm} side="right" step={rightStep} />
            </div>
          </div>

          <footer className="mt-3 space-y-3 rounded-xl border border-cyan-100/10 bg-[#0a1120] p-3 md:p-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                className="grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-md border border-cyan-100/15 bg-slate-700/20 text-slate-300 transition hover:bg-slate-700/35"
                type="button"
                onClick={() => {
                  setCurrentFrame(0);
                  setIsPlaying(false);
                }}
              >
                <RewindIcon className="h-4 w-4 md:h-5 md:w-5" />
              </button>

              <button
                className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-xl border border-cyan-300/40 bg-cyan-200 text-[#073943] transition hover:bg-cyan-100 disabled:opacity-40"
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                disabled={currentFrame >= totalFrames - 1}
              >
                {isPlaying ? <PauseIcon className="h-5 w-5 md:h-6 md:w-6" /> : <PlayIcon className="h-5 w-5 md:h-6 md:w-6" />}
              </button>

              <button
                className="grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-md border border-cyan-100/15 bg-slate-700/20 text-slate-300 transition hover:bg-slate-700/35 disabled:opacity-40"
                type="button"
                onClick={() => setCurrentFrame((prev) => Math.min(totalFrames - 1, prev + 1))}
                disabled={currentFrame >= totalFrames - 1}
              >
                <StepIcon className="h-4 w-4 md:h-5 md:w-5" />
              </button>

              <button
                className="ml-1 grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-md border border-cyan-100/15 bg-slate-700/20 text-slate-300 transition hover:bg-slate-700/35"
                type="button"
                onClick={() => {
                  setCurrentFrame(0);
                  setIsPlaying(false);
                }}
              >
                <RefreshIcon className="h-4 w-4 md:h-5 md:w-5" />
              </button>

              <div className="ml-auto min-w-[220px] flex-1">
                <p className="ds-label text-slate-500">Execution Timeline</p>
                <div className="mt-1 flex items-baseline gap-2 text-slate-200">
                  <p className="ds-metric">{currentFrame + 1}</p>
                  <span className="ds-title">/</span>
                  <p className="ds-metric">{totalFrames}</p>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-700">
                  <div className="h-full rounded-full bg-cyan-400 transition-all duration-200" style={{ width: `${frameProgress}%` }} />
                </div>
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="ds-label text-slate-500">Custom Input (CSV)</p>
                <textarea
                  value={csvInput}
                  onChange={(event) => setCsvInput(event.target.value)}
                  className="mt-2 h-[95px] w-full resize-none rounded-lg border border-cyan-100/10 bg-[#050A16] p-3 text-slate-200 focus:outline-none focus:border-cyan-300"
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:min-w-[220px]">
                <button
                  className="ds-button flex items-center justify-center gap-2 rounded border border-cyan-100/15 bg-[#171e2d] px-4 py-2 uppercase tracking-[0.12em] text-slate-300 transition hover:bg-slate-700/30"
                  type="button"
                  onClick={handleRandom}
                >
                  <DiceIcon className="h-4 w-4" />
                  Generate Random
                </button>
                <button
                  className="ds-button flex items-center justify-center gap-2 rounded border border-cyan-100/15 bg-[#171e2d] px-4 py-2 uppercase tracking-[0.12em] text-slate-300 transition hover:bg-slate-700/30"
                  type="button"
                  onClick={handleShuffle}
                >
                  <ShuffleIcon className="h-4 w-4" />
                  Shuffle Current
                </button>
                <button
                  className="ds-button flex items-center justify-center gap-2 rounded border border-cyan-300/35 bg-cyan-400 px-4 py-2 uppercase tracking-[0.12em] text-[#063C45] transition hover:bg-cyan-300"
                  type="button"
                  onClick={handleApplyInput}
                >
                  <CheckIcon className="h-4 w-4 text-[#063C45]" />
                  Apply Input
                </button>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
