import Link from "next/link";
import type { ReactNode } from "react";
import type { SortingAlgorithmId } from "../../components/sortingAlgorithms";

type SortingAlgorithm = {
  name: string;
  family: "Comparison-Based" | "Non-Comparison";
  sortStudioId?: SortingAlgorithmId;
  best: string;
  average: string;
  worst: string;
  space: string;
  stable: "Yes" | "No" | "Variant";
  inPlace: "Yes" | "No" | "Mostly";
  note: string;
};

const SORTING_ALGORITHMS: SortingAlgorithm[] = [
  {
    name: "Bubble Sort",
    family: "Comparison-Based",
    sortStudioId: "bubble",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "Yes",
    inPlace: "Yes",
    note: "Simple and educational; practical only for tiny inputs.",
  },
  {
    name: "Selection Sort",
    family: "Comparison-Based",
    sortStudioId: "selection",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "No",
    inPlace: "Yes",
    note: "Minimizes swaps, useful when writes are expensive.",
  },
  {
    name: "Insertion Sort",
    family: "Comparison-Based",
    sortStudioId: "insertion",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: "Yes",
    inPlace: "Yes",
    note: "Very fast for nearly sorted or small datasets.",
  },
  {
    name: "Merge Sort",
    family: "Comparison-Based",
    sortStudioId: "merge",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    stable: "Yes",
    inPlace: "No",
    note: "Predictable performance and stable ordering.",
  },
  {
    name: "Quick Sort",
    family: "Comparison-Based",
    sortStudioId: "quick",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    stable: "No",
    inPlace: "Yes",
    note: "Great in practice with randomized/median pivots.",
  },
  {
    name: "Heap Sort",
    family: "Comparison-Based",
    sortStudioId: "heap",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(1)",
    stable: "No",
    inPlace: "Yes",
    note: "Consistent upper bound and low memory footprint.",
  },
  {
    name: "Shell Sort",
    family: "Comparison-Based",
    best: "O(n log n)",
    average: "Depends on gaps",
    worst: "O(n²)",
    space: "O(1)",
    stable: "No",
    inPlace: "Yes",
    note: "Practical mid-ground between insertion and advanced sorts.",
  },
  {
    name: "TimSort",
    family: "Comparison-Based",
    best: "O(n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    stable: "Yes",
    inPlace: "Mostly",
    note: "Hybrid used in Python/Java for real-world data patterns.",
  },
  {
    name: "IntroSort",
    family: "Comparison-Based",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(log n)",
    stable: "No",
    inPlace: "Yes",
    note: "Starts as quicksort, falls back to heapsort to avoid worst case.",
  },
  {
    name: "Counting Sort",
    family: "Non-Comparison",
    best: "O(n + k)",
    average: "O(n + k)",
    worst: "O(n + k)",
    space: "O(k)",
    stable: "Yes",
    inPlace: "No",
    note: "Excellent for bounded integer keys.",
  },
  {
    name: "Radix Sort",
    family: "Non-Comparison",
    best: "O(d(n + k))",
    average: "O(d(n + k))",
    worst: "O(d(n + k))",
    space: "O(n + k)",
    stable: "Variant",
    inPlace: "No",
    note: "Sorts by digits/characters using stable sub-sort.",
  },
  {
    name: "Bucket Sort",
    family: "Non-Comparison",
    best: "O(n + k)",
    average: "O(n + k)",
    worst: "O(n²)",
    space: "O(n + k)",
    stable: "Variant",
    inPlace: "No",
    note: "Works well with uniformly distributed values.",
  },
  {
    name: "Pigeonhole Sort",
    family: "Non-Comparison",
    best: "O(n + r)",
    average: "O(n + r)",
    worst: "O(n + r)",
    space: "O(r)",
    stable: "No",
    inPlace: "No",
    note: "Useful when range `r` is small relative to input size.",
  },
];

function InfoPill({ children }: { children: ReactNode }) {
  return (
    <span className="ds-label inline-flex rounded border border-cyan-300/30 bg-cyan-400/8 px-3 py-1 text-cyan-300">
      {children}
    </span>
  );
}

function AlgorithmCard({ algorithm }: { algorithm: SortingAlgorithm }) {
  const isStudioSupported = Boolean(algorithm.sortStudioId);
  const cardContent = (
    <article className="rounded-xl border border-cyan-100/10 bg-[linear-gradient(125deg,rgba(8,14,28,0.95)_0%,rgba(4,9,20,0.96)_100%)] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="ds-title text-slate-100">{algorithm.name}</h3>
        <span
          className={`ds-label rounded border px-2.5 py-1 ${
            algorithm.family === "Comparison-Based"
              ? "border-cyan-300/35 bg-cyan-400/10 text-cyan-300"
              : "border-violet-300/40 bg-violet-400/10 text-violet-300"
          }`}
        >
          {algorithm.family}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
        <div className="rounded border border-cyan-100/10 bg-[#111827] px-3 py-2">
          <p className="ds-label text-slate-500">Best</p>
          <p className="ds-body mt-1 text-cyan-300">{algorithm.best}</p>
        </div>
        <div className="rounded border border-cyan-100/10 bg-[#111827] px-3 py-2">
          <p className="ds-label text-slate-500">Average</p>
          <p className="ds-body mt-1 text-slate-200">{algorithm.average}</p>
        </div>
        <div className="rounded border border-cyan-100/10 bg-[#111827] px-3 py-2">
          <p className="ds-label text-slate-500">Worst</p>
          <p className="ds-body mt-1 text-slate-200">{algorithm.worst}</p>
        </div>
        <div className="rounded border border-cyan-100/10 bg-[#111827] px-3 py-2">
          <p className="ds-label text-slate-500">Space</p>
          <p className="ds-body mt-1 text-slate-200">{algorithm.space}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="ds-label rounded border border-cyan-100/12 bg-[#0E1727] px-2.5 py-1 text-slate-400">
          Stable:{" "}
          <strong className="ml-1 text-slate-200">{algorithm.stable}</strong>
        </span>
        <span className="ds-label rounded border border-cyan-100/12 bg-[#0E1727] px-2.5 py-1 text-slate-400">
          In-place:{" "}
          <strong className="ml-1 text-slate-200">{algorithm.inPlace}</strong>
        </span>
      </div>

      <p className="ds-body mt-3 text-slate-400">{algorithm.note}</p>

      <div className="mt-4">
        {isStudioSupported ? (
          <span className="ds-button inline-flex h-10 items-center rounded-md border border-cyan-300/35 bg-cyan-400/12 px-3 text-cyan-300">
            Open In Sort Studio
          </span>
        ) : (
          <span className="ds-label inline-flex rounded border border-cyan-100/12 bg-[#0E1727] px-2.5 py-1 text-slate-500">
            Sort Studio support coming soon
          </span>
        )}
      </div>
    </article>
  );

  if (!isStudioSupported) return cardContent;

  return (
    <Link
      className="block transition-transform hover:-translate-y-0.5"
      href={`/sorting?algorithm=${algorithm.sortStudioId}`}
    >
      {cardContent}
    </Link>
  );
}

export default function SortingAlgorithmsPage() {
  const comparisonAlgorithms = SORTING_ALGORITHMS.filter(
    (algorithm) => algorithm.family === "Comparison-Based",
  );
  const nonComparisonAlgorithms = SORTING_ALGORITHMS.filter(
    (algorithm) => algorithm.family === "Non-Comparison",
  );

  return (
    <main className="min-h-screen border-x border-cyan-300/20 bg-[#020612]">
      <section className="mx-auto w-full max-w-[1700px] px-5 py-10 md:px-8 md:py-12">
        <header className="rounded-xl border border-cyan-100/10 bg-[#070E1C] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="flex flex-wrap items-center gap-2">
            <InfoPill>Sorting Atlas</InfoPill>
            <InfoPill>{SORTING_ALGORITHMS.length} Algorithms</InfoPill>
          </div>
          <h1 className="ds-display mt-4 text-slate-100">
            All Sorting Algorithms
          </h1>
          <p className="ds-body mt-3 max-w-4xl text-slate-300/82">
            Unified reference for common sorting techniques with complexity,
            stability, memory profile, and practical usage notes.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              className="ds-button inline-flex h-12 items-center rounded-md border border-cyan-300/35 bg-cyan-400 px-5 text-[#073943] transition hover:bg-cyan-300"
              href="/sorting"
            >
              Open Sort Studio
            </Link>
            <Link
              className="ds-button inline-flex h-12 items-center rounded-md border border-cyan-300/35 bg-cyan-400/10 px-5 text-cyan-300 transition hover:bg-cyan-300/20"
              href="/comparison"
            >
              Open Compare Lab
            </Link>
          </div>
        </header>

        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="ds-title text-slate-100">Comparison-Based</h2>
            <p className="ds-small text-slate-500">
              Generally rely on pairwise element comparison.
            </p>
          </div>
          <div className="mt-3 grid gap-4 lg:grid-cols-2">
            {comparisonAlgorithms.map((algorithm) => (
              <AlgorithmCard algorithm={algorithm} key={algorithm.name} />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="ds-title text-slate-100">Non-Comparison</h2>
            <p className="ds-small text-slate-500">
              Use key/index properties instead of direct comparisons.
            </p>
          </div>
          <div className="mt-3 grid gap-4 lg:grid-cols-2">
            {nonComparisonAlgorithms.map((algorithm) => (
              <AlgorithmCard algorithm={algorithm} key={algorithm.name} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
