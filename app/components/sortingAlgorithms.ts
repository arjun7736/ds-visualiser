export type BarTone = "default" | "pivot" | "comparing" | "sorted" | "muted";

export type BarState = {
  value: number;
  tone?: BarTone;
};

export type SortingStep = {
  bars: BarState[];
  highlightedLine: number;
  comparisons: number;
  swaps: number;
  systemMessage: string;
  explanation: string;
};

export type SortingAlgorithmId =
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick"
  | "heap";

export type SortingComplexity = {
  best: string;
  avg: string;
  worst: string;
};

export type PseudoLine = {
  number: string;
  code: string;
};

export type SortingAlgorithmDefinition = {
  id: SortingAlgorithmId;
  name: string;
  complexity: SortingComplexity;
  code: PseudoLine[];
};

type ToneOptions = {
  comparing?: number[];
  pivot?: number[];
  sorted?: number[];
  muted?: number[];
};

const BUBBLE_PSEUDOCODE: PseudoLine[] = [
  { number: "01", code: "function bubbleSort(arr):" },
  { number: "02", code: "  n = arr.length" },
  { number: "03", code: "  for i from 0 to n - 1:" },
  { number: "04", code: "    for j from 0 to n - i - 2:" },
  { number: "05", code: "      if arr[j] > arr[j + 1]:" },
  { number: "06", code: "        swap(arr[j], arr[j + 1])" },
  { number: "07", code: "  return arr" },
];

const SELECTION_PSEUDOCODE: PseudoLine[] = [
  { number: "01", code: "function selectionSort(arr):" },
  { number: "02", code: "  n = arr.length" },
  { number: "03", code: "  for i from 0 to n - 2:" },
  { number: "04", code: "    minIndex = i" },
  { number: "05", code: "    for j from i + 1 to n - 1:" },
  { number: "06", code: "      if arr[j] < arr[minIndex]:" },
  { number: "07", code: "        minIndex = j" },
  { number: "08", code: "    if minIndex != i:" },
  { number: "09", code: "      swap(arr[i], arr[minIndex])" },
  { number: "10", code: "  return arr" },
];

const INSERTION_PSEUDOCODE: PseudoLine[] = [
  { number: "01", code: "function insertionSort(arr):" },
  { number: "02", code: "  for i from 1 to n - 1:" },
  { number: "03", code: "    key = arr[i]" },
  { number: "04", code: "    j = i - 1" },
  { number: "05", code: "    while j >= 0 and arr[j] > key:" },
  { number: "06", code: "      arr[j + 1] = arr[j]" },
  { number: "07", code: "      j = j - 1" },
  { number: "08", code: "    arr[j + 1] = key" },
  { number: "09", code: "  return arr" },
];

const MERGE_PSEUDOCODE: PseudoLine[] = [
  { number: "01", code: "function mergeSort(arr, left, right):" },
  { number: "02", code: "  if left >= right: return" },
  { number: "03", code: "  mid = floor((left + right) / 2)" },
  { number: "04", code: "  mergeSort(arr, left, mid)" },
  { number: "05", code: "  mergeSort(arr, mid + 1, right)" },
  { number: "06", code: "  merge(arr, left, mid, right)" },
  { number: "07", code: "function merge(arr, left, mid, right):" },
  { number: "08", code: "  while i <= mid and j <= right:" },
  { number: "09", code: "    if leftPart[i] <= rightPart[j]:" },
  { number: "10", code: "      arr[k] = leftPart[i]" },
  { number: "11", code: "    else arr[k] = rightPart[j]" },
  { number: "12", code: "  copy remaining elements" },
  { number: "13", code: "  write merged values back to arr" },
];

const QUICK_PSEUDOCODE: PseudoLine[] = [
  { number: "01", code: "function quickSort(arr, low, high):" },
  { number: "02", code: "  if low < high:" },
  { number: "03", code: "    pi = partition(arr, low, high)" },
  { number: "04", code: "    quickSort(arr, low, pi - 1)" },
  { number: "05", code: "    quickSort(arr, pi + 1, high)" },
  { number: "06", code: "" },
  { number: "07", code: "function partition(arr, low, high):" },
  { number: "08", code: "  pivot = arr[high]" },
  { number: "09", code: "  i = low - 1" },
  { number: "10", code: "  for j from low to high - 1:" },
  { number: "11", code: "    if arr[j] < pivot:" },
  { number: "12", code: "      i++" },
  { number: "13", code: "      swap(arr[i], arr[j])" },
  { number: "14", code: "  swap(arr[i + 1], arr[high])" },
  { number: "15", code: "  return i + 1" },
];

const HEAP_PSEUDOCODE: PseudoLine[] = [
  { number: "01", code: "function heapSort(arr):" },
  { number: "02", code: "  build max heap(arr)" },
  { number: "03", code: "  for end from n - 1 down to 1:" },
  { number: "04", code: "    swap(arr[0], arr[end])" },
  { number: "05", code: "    heapify(arr, 0, end)" },
  { number: "06", code: "function heapify(arr, root, size):" },
  { number: "07", code: "  largest = root" },
  { number: "08", code: "  left = 2 * root + 1, right = 2 * root + 2" },
  { number: "09", code: "  if left < size and arr[left] > arr[largest]: largest = left" },
  { number: "10", code: "  if right < size and arr[right] > arr[largest]: largest = right" },
  { number: "11", code: "  if largest != root: swap + recurse" },
  { number: "12", code: "  return" },
];

const ORDERED_IDS: SortingAlgorithmId[] = [
  "bubble",
  "selection",
  "insertion",
  "merge",
  "quick",
  "heap",
];

export const SORTING_ALGORITHMS_BY_ID: Record<
  SortingAlgorithmId,
  SortingAlgorithmDefinition
> = {
  bubble: {
    id: "bubble",
    name: "Bubble Sort",
    code: BUBBLE_PSEUDOCODE,
    complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)" },
  },
  selection: {
    id: "selection",
    name: "Selection Sort",
    code: SELECTION_PSEUDOCODE,
    complexity: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)" },
  },
  insertion: {
    id: "insertion",
    name: "Insertion Sort",
    code: INSERTION_PSEUDOCODE,
    complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)" },
  },
  merge: {
    id: "merge",
    name: "Merge Sort",
    code: MERGE_PSEUDOCODE,
    complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
  },
  quick: {
    id: "quick",
    name: "Quick Sort",
    code: QUICK_PSEUDOCODE,
    complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)" },
  },
  heap: {
    id: "heap",
    name: "Heap Sort",
    code: HEAP_PSEUDOCODE,
    complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
  },
};

export const SORTING_ALGORITHMS: SortingAlgorithmDefinition[] = ORDERED_IDS.map(
  (id) => SORTING_ALGORITHMS_BY_ID[id],
);

export const DEFAULT_SORT_ARRAY = [
  32, 46, 24, 64, 54, 43, 78, 37, 87, 19, 51, 73, 28, 59, 41, 82, 16, 92, 34,
  49, 26,
];

const toUniqueValidIndices = (indices: number[] = [], upperBound: number) => {
  const set = new Set<number>();
  for (const index of indices) {
    if (index >= 0 && index < upperBound) {
      set.add(index);
    }
  }
  return set;
};

const createBars = (values: number[], options: ToneOptions = {}): BarState[] => {
  const comparing = toUniqueValidIndices(options.comparing, values.length);
  const pivot = toUniqueValidIndices(options.pivot, values.length);
  const sorted = toUniqueValidIndices(options.sorted, values.length);
  const muted = toUniqueValidIndices(options.muted, values.length);

  return values.map((value, index) => {
    let tone: BarTone = "default";
    if (muted.has(index)) tone = "muted";
    if (comparing.has(index)) tone = "comparing";
    if (pivot.has(index)) tone = "pivot";
    if (sorted.has(index)) tone = "sorted";
    return { value, tone };
  });
};

const createStep = (
  values: number[],
  highlightedLine: number,
  comparisons: number,
  swaps: number,
  systemMessage: string,
  explanation: string,
  toneOptions: ToneOptions = {},
): SortingStep => ({
  bars: createBars(values, toneOptions),
  highlightedLine,
  comparisons,
  swaps,
  systemMessage,
  explanation,
});

const indicesBetween = (start: number, end: number): number[] => {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

const mutedOutside = (length: number, left: number, right: number): number[] => {
  const muted: number[] = [];
  for (let i = 0; i < length; i++) {
    if (i < left || i > right) muted.push(i);
  }
  return muted;
};

const generateBubbleSortSteps = (values: number[]): SortingStep[] => {
  const arr = [...values];
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push(
    createStep(
      arr,
      1,
      comparisons,
      swaps,
      "Bubble Sort initialized.",
      "Starting Bubble Sort. Adjacent elements are compared and swapped if out of order.",
    ),
  );

  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let didSwap = false;
    const sortedTail = Array.from({ length: i }, (_, idx) => n - 1 - idx);
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      steps.push(
        createStep(
          arr,
          5,
          comparisons,
          swaps,
          `Comparing ${arr[j]} and ${arr[j + 1]}.`,
          `Checking if ${arr[j]} is greater than ${arr[j + 1]}.`,
          { comparing: [j, j + 1], sorted: sortedTail },
        ),
      );

      if (arr[j] > arr[j + 1]) {
        didSwap = true;
        swaps++;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        steps.push(
          createStep(
            arr,
            6,
            comparisons,
            swaps,
            `Swapped indices ${j} and ${j + 1}.`,
            `${arr[j]} and ${arr[j + 1]} were swapped to move the larger value right.`,
            { pivot: [j, j + 1], sorted: sortedTail },
          ),
        );
      }
    }

    const newSortedTail = Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx);
    steps.push(
      createStep(
        arr,
        4,
        comparisons,
        swaps,
        `Pass ${i + 1} complete.`,
        "One full pass is complete and the largest remaining value has bubbled into place.",
        { sorted: newSortedTail },
      ),
    );

    if (!didSwap) {
      steps.push(
        createStep(
          arr,
          7,
          comparisons,
          swaps,
          "Early stop triggered: array already sorted.",
          "No swaps were needed in this pass, so the array is already sorted.",
          { sorted: indicesBetween(0, n - 1) },
        ),
      );
      break;
    }
  }

  steps.push(
    createStep(
      arr,
      7,
      comparisons,
      swaps,
      "Bubble Sort completed.",
      "All elements are sorted in ascending order.",
      { sorted: indicesBetween(0, n - 1) },
    ),
  );
  return steps;
};

const generateSelectionSortSteps = (values: number[]): SortingStep[] => {
  const arr = [...values];
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push(
    createStep(
      arr,
      1,
      comparisons,
      swaps,
      "Selection Sort initialized.",
      "Each pass selects the minimum value from the unsorted region.",
    ),
  );

  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    const sortedHead = indicesBetween(0, i - 1);

    steps.push(
      createStep(
        arr,
        4,
        comparisons,
        swaps,
        `Pass ${i + 1}: current minimum starts at index ${i}.`,
        `Set index ${i} as the temporary minimum before scanning the remaining elements.`,
        { pivot: [minIndex], sorted: sortedHead },
      ),
    );

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push(
        createStep(
          arr,
          6,
          comparisons,
          swaps,
          `Comparing arr[${j}] (${arr[j]}) with current minimum arr[${minIndex}] (${arr[minIndex]}).`,
          "Check whether the scanned value is smaller than the current minimum.",
          { comparing: [j, minIndex], sorted: sortedHead },
        ),
      );

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        steps.push(
          createStep(
            arr,
            7,
            comparisons,
            swaps,
            `New minimum found at index ${minIndex}.`,
            `Updated minimum candidate to ${arr[minIndex]}.`,
            { pivot: [minIndex], sorted: sortedHead },
          ),
        );
      }
    }

    if (minIndex !== i) {
      swaps++;
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      steps.push(
        createStep(
          arr,
          9,
          comparisons,
          swaps,
          `Placed minimum value at index ${i}.`,
          "Swapped the minimum candidate into the front of the unsorted region.",
          { pivot: [i, minIndex], sorted: sortedHead },
        ),
      );
    }

    steps.push(
      createStep(
        arr,
        8,
        comparisons,
        swaps,
        `Index ${i} is now sorted.`,
        "The next position in the array is finalized.",
        { sorted: indicesBetween(0, i) },
      ),
    );
  }

  steps.push(
    createStep(
      arr,
      10,
      comparisons,
      swaps,
      "Selection Sort completed.",
      "All elements are sorted in ascending order.",
      { sorted: indicesBetween(0, n - 1) },
    ),
  );
  return steps;
};

const generateInsertionSortSteps = (values: number[]): SortingStep[] => {
  const arr = [...values];
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push(
    createStep(
      arr,
      1,
      comparisons,
      swaps,
      "Insertion Sort initialized.",
      "Builds a sorted prefix by inserting one element at a time.",
      { sorted: arr.length > 0 ? [0] : [] },
    ),
  );

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    const sortedPrefix = indicesBetween(0, i - 1);

    steps.push(
      createStep(
        arr,
        3,
        comparisons,
        swaps,
        `Picked key ${key} at index ${i}.`,
        "This value will be inserted into the already sorted left portion.",
        { pivot: [i], sorted: sortedPrefix },
      ),
    );

    while (j >= 0) {
      comparisons++;
      steps.push(
        createStep(
          arr,
          5,
          comparisons,
          swaps,
          `Comparing key ${key} with arr[${j}] (${arr[j]}).`,
          "If the left element is greater than the key, shift it right.",
          { comparing: [j, j + 1], sorted: sortedPrefix },
        ),
      );

      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        swaps++;
        steps.push(
          createStep(
            arr,
            6,
            comparisons,
            swaps,
            `Shifted ${arr[j]} from index ${j} to ${j + 1}.`,
            "Larger element moves right to create space for the key.",
            { comparing: [j, j + 1], sorted: sortedPrefix },
          ),
        );
        j--;
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    swaps++;
    steps.push(
      createStep(
        arr,
        8,
        comparisons,
        swaps,
        `Inserted key ${key} at index ${j + 1}.`,
        "Key is now in the correct position within the sorted prefix.",
        { pivot: [j + 1], sorted: indicesBetween(0, i) },
      ),
    );
  }

  steps.push(
    createStep(
      arr,
      9,
      comparisons,
      swaps,
      "Insertion Sort completed.",
      "All elements are sorted in ascending order.",
      { sorted: indicesBetween(0, arr.length - 1) },
    ),
  );
  return steps;
};

const generateMergeSortSteps = (values: number[]): SortingStep[] => {
  const arr = [...values];
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push(
    createStep(
      arr,
      1,
      comparisons,
      swaps,
      "Merge Sort initialized.",
      "The array is repeatedly split and merged in sorted order.",
    ),
  );

  const merge = (left: number, mid: number, right: number) => {
    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);
    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftPart.length && j < rightPart.length) {
      comparisons++;
      const leftIndex = left + i;
      const rightIndex = mid + 1 + j;

      steps.push(
        createStep(
          arr,
          9,
          comparisons,
          swaps,
          `Comparing ${leftPart[i]} and ${rightPart[j]}.`,
          "Take the smaller value into the merged output.",
          {
            comparing: [leftIndex, rightIndex],
            muted: mutedOutside(arr.length, left, right),
          },
        ),
      );

      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i];
        swaps++;
        steps.push(
          createStep(
            arr,
            10,
            comparisons,
            swaps,
            `Wrote ${leftPart[i]} at index ${k}.`,
            "Left-side candidate was smaller and is copied into the merged range.",
            {
              pivot: [k],
              muted: mutedOutside(arr.length, left, right),
            },
          ),
        );
        i++;
      } else {
        arr[k] = rightPart[j];
        swaps++;
        steps.push(
          createStep(
            arr,
            11,
            comparisons,
            swaps,
            `Wrote ${rightPart[j]} at index ${k}.`,
            "Right-side candidate was smaller and is copied into the merged range.",
            {
              pivot: [k],
              muted: mutedOutside(arr.length, left, right),
            },
          ),
        );
        j++;
      }
      k++;
    }

    while (i < leftPart.length) {
      arr[k] = leftPart[i];
      swaps++;
      steps.push(
        createStep(
          arr,
          12,
          comparisons,
          swaps,
          `Copying remaining left value ${leftPart[i]} to index ${k}.`,
          "Remaining values are copied once one side is exhausted.",
          {
            pivot: [k],
            muted: mutedOutside(arr.length, left, right),
          },
        ),
      );
      i++;
      k++;
    }

    while (j < rightPart.length) {
      arr[k] = rightPart[j];
      swaps++;
      steps.push(
        createStep(
          arr,
          12,
          comparisons,
          swaps,
          `Copying remaining right value ${rightPart[j]} to index ${k}.`,
          "Remaining values are copied once one side is exhausted.",
          {
            pivot: [k],
            muted: mutedOutside(arr.length, left, right),
          },
        ),
      );
      j++;
      k++;
    }

    steps.push(
      createStep(
        arr,
        13,
        comparisons,
        swaps,
        `Merged range [${left}, ${right}].`,
        "This subrange is now sorted and ready for higher-level merges.",
        { sorted: indicesBetween(left, right), muted: mutedOutside(arr.length, left, right) },
      ),
    );
  };

  const sort = (left: number, right: number) => {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);

    steps.push(
      createStep(
        arr,
        3,
        comparisons,
        swaps,
        `Splitting range [${left}, ${right}] at ${mid}.`,
        "Divide the current range into two halves before merging.",
        { pivot: [mid], muted: mutedOutside(arr.length, left, right) },
      ),
    );

    sort(left, mid);
    sort(mid + 1, right);
    merge(left, mid, right);
  };

  sort(0, arr.length - 1);

  steps.push(
    createStep(
      arr,
      6,
      comparisons,
      swaps,
      "Merge Sort completed.",
      "All segments have been merged into one fully sorted array.",
      { sorted: indicesBetween(0, arr.length - 1) },
    ),
  );

  return steps;
};

const generateQuickSortSteps = (values: number[]): SortingStep[] => {
  const arr = [...values];
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push(
    createStep(
      arr,
      1,
      comparisons,
      swaps,
      "Quick Sort initialized.",
      "Select a pivot, partition the range, then recurse into both halves.",
    ),
  );

  const partition = (low: number, high: number): number => {
    const pivot = arr[high];
    const muted = mutedOutside(arr.length, low, high);

    steps.push(
      createStep(
        arr,
        8,
        comparisons,
        swaps,
        `Pivot selected: arr[${high}] = ${pivot}.`,
        "The last element is chosen as pivot for this partition.",
        { pivot: [high], muted },
      ),
    );

    let i = low - 1;
    for (let j = low; j < high; j++) {
      comparisons++;
      steps.push(
        createStep(
          arr,
          11,
          comparisons,
          swaps,
          `Comparing arr[${j}] (${arr[j]}) with pivot ${pivot}.`,
          "Values smaller than the pivot move to the left partition.",
          { comparing: [j, high], muted },
        ),
      );

      if (arr[j] < pivot) {
        i++;
        swaps++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        steps.push(
          createStep(
            arr,
            13,
            comparisons,
            swaps,
            `Swapped indices ${i} and ${j}.`,
            "Moved a smaller element into the left partition.",
            { pivot: [high], comparing: [i, j], muted },
          ),
        );
      }
    }

    swaps++;
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    steps.push(
      createStep(
        arr,
        14,
        comparisons,
        swaps,
        `Placed pivot at index ${i + 1}.`,
        "Pivot is now in its final sorted position.",
        { pivot: [i + 1], muted },
      ),
    );

    return i + 1;
  };

  const sort = (low: number, high: number) => {
    if (low < high) {
      const pivotIndex = partition(low, high);
      sort(low, pivotIndex - 1);
      sort(pivotIndex + 1, high);
    }
  };

  sort(0, arr.length - 1);

  steps.push(
    createStep(
      arr,
      2,
      comparisons,
      swaps,
      "Quick Sort completed.",
      "All partitions have been processed and the array is sorted.",
      { sorted: indicesBetween(0, arr.length - 1) },
    ),
  );
  return steps;
};

const generateHeapSortSteps = (values: number[]): SortingStep[] => {
  const arr = [...values];
  const steps: SortingStep[] = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push(
    createStep(
      arr,
      1,
      comparisons,
      swaps,
      "Heap Sort initialized.",
      "Build a max-heap, then repeatedly place the max at the end.",
    ),
  );

  const heapify = (heapSize: number, root: number) => {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;
    const sortedTail = indicesBetween(heapSize, arr.length - 1);

    if (left < heapSize) {
      comparisons++;
      steps.push(
        createStep(
          arr,
          9,
          comparisons,
          swaps,
          `Comparing root ${arr[largest]} with left child ${arr[left]}.`,
          "Check whether the left child should become the largest node.",
          { comparing: [root, left], sorted: sortedTail },
        ),
      );
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < heapSize) {
      comparisons++;
      steps.push(
        createStep(
          arr,
          10,
          comparisons,
          swaps,
          `Comparing current largest ${arr[largest]} with right child ${arr[right]}.`,
          "Check whether the right child should become the largest node.",
          { comparing: [largest, right], sorted: sortedTail },
        ),
      );
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== root) {
      swaps++;
      const temp = arr[root];
      arr[root] = arr[largest];
      arr[largest] = temp;

      steps.push(
        createStep(
          arr,
          11,
          comparisons,
          swaps,
          `Swapped root index ${root} with child index ${largest}.`,
          "Heap property was violated, so we swapped and continue heapifying downward.",
          { pivot: [root, largest], sorted: sortedTail },
        ),
      );

      heapify(heapSize, largest);
    }
  };

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    steps.push(
      createStep(
        arr,
        2,
        comparisons,
        swaps,
        `Building max-heap from root index ${i}.`,
        "Heapify each non-leaf node from bottom to top.",
        { pivot: [i] },
      ),
    );
    heapify(arr.length, i);
  }

  for (let end = arr.length - 1; end > 0; end--) {
    swaps++;
    const temp = arr[0];
    arr[0] = arr[end];
    arr[end] = temp;

    steps.push(
      createStep(
        arr,
        4,
        comparisons,
        swaps,
        `Moved max value to index ${end}.`,
        "The heap root is the largest value and is placed at the end.",
        { pivot: [0, end], sorted: indicesBetween(end, arr.length - 1) },
      ),
    );

    steps.push(
      createStep(
        arr,
        5,
        comparisons,
        swaps,
        `Re-heapifying reduced heap [0, ${end - 1}].`,
        "Restore max-heap property for the unsorted prefix.",
        { sorted: indicesBetween(end, arr.length - 1) },
      ),
    );
    heapify(end, 0);
  }

  steps.push(
    createStep(
      arr,
      5,
      comparisons,
      swaps,
      "Heap Sort completed.",
      "All elements are sorted in ascending order.",
      { sorted: indicesBetween(0, arr.length - 1) },
    ),
  );
  return steps;
};

export const generateSortingSteps = (
  algorithm: SortingAlgorithmId,
  values: number[],
): SortingStep[] => {
  if (values.length === 0) {
    return [
      createStep(
        [],
        1,
        0,
        0,
        "No input values.",
        "Provide at least one value to begin the simulation.",
      ),
    ];
  }

  switch (algorithm) {
    case "bubble":
      return generateBubbleSortSteps(values);
    case "selection":
      return generateSelectionSortSteps(values);
    case "insertion":
      return generateInsertionSortSteps(values);
    case "merge":
      return generateMergeSortSteps(values);
    case "quick":
      return generateQuickSortSteps(values);
    case "heap":
      return generateHeapSortSteps(values);
    default:
      return generateQuickSortSteps(values);
  }
};

export const createRandomArray = (size: number = 20): number[] => {
  const result: number[] = [];
  for (let i = 0; i < size; i++) {
    result.push(Math.floor(Math.random() * 85) + 10);
  }
  return result;
};

export const shuffleArray = (values: number[]): number[] => {
  const next = [...values];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = next[i];
    next[i] = next[j];
    next[j] = temp;
  }
  return next;
};

export const filterInput = (input: string): number[] =>
  input
    .split(",")
    .map((chunk) => Number(chunk.trim()))
    .filter((value) => Number.isFinite(value) && value >= 0);
