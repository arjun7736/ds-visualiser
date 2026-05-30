"use client"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Icons used in UI
function InfoIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" fill="currentColor" r="10" />
      <path d="M12 11.2v5.1m0-9.3h.01" stroke="#02111B" strokeLinecap="round" strokeWidth="2.2" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" fill="currentColor" r="10" />
      <path d="m8 12 2.5 2.5L16 9" stroke="#02111B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" fill="currentColor" r="10" />
      <path d="m15 9-6 6m0-6 6 6" stroke="#02111B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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

// Data structures supported
type DSType = "array" | "bst" | "linkedlist";
type SearchAlg = "linear" | "binary" | "bst_search";

type NodeData = {
  id: string;
  value: number;
  label?: string;
  active?: boolean;
  comparing?: boolean;
  found?: boolean;
  muted?: boolean;
  top?: number; // for BST
  left?: number; // for BST
};

type EdgeData = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
  dashed?: boolean;
};

type LogEntry = {
  message: string;
  type: "success" | "info" | "comparing" | "error";
};

type CodeLine = {
  text: string;
  indent: number;
};

type SimulationStep = {
  nodes: NodeData[];
  edges: EdgeData[];
  logs: LogEntry[];
  highlightedCodeLine: number; // 1-indexed code line highlight
  explanation: { title: string; body: React.ReactNode };
  properties: { label: string; value: string }[];
};

// Raw Algorithms Code Snippets
const CODE_SNIPPETS: Record<SearchAlg, CodeLine[]> = {
  linear: [
    { text: "function linearSearch(arr, target) {", indent: 0 },
    { text: "  for (let i = 0; i < arr.length; i++) {", indent: 1 },
    { text: "    if (arr[i] === target) {", indent: 2 },
    { text: "      return i; // Found target", indent: 3 },
    { text: "    }", indent: 2 },
    { text: "  }", indent: 1 },
    { text: "  return -1; // Not found", indent: 1 },
    { text: "}", indent: 0 }
  ],
  binary: [
    { text: "function binarySearch(arr, target) {", indent: 0 },
    { text: "  let low = 0, high = arr.length - 1;", indent: 1 },
    { text: "  while (low <= high) {", indent: 1 },
    { text: "    let mid = Math.floor((low + high) / 2);", indent: 2 },
    { text: "    if (arr[mid] === target) return mid;", indent: 2 },
    { text: "    else if (arr[mid] < target) low = mid + 1;", indent: 2 },
    { text: "    else high = mid - 1;", indent: 2 },
    { text: "  }", indent: 1 },
    { text: "  return -1;", indent: 1 },
    { text: "}" },
  ],
  bst_search: [
    { text: "function searchBST(root, target) {", indent: 0 },
    { text: "  if (!root || root.val === target) return root;", indent: 1 },
    { text: "  if (target < root.val) {", indent: 1 },
    { text: "    return searchBST(root.left, target);", indent: 2 },
    { text: "  } else {", indent: 1 },
    { text: "    return searchBST(root.right, target);", indent: 2 },
    { text: "  }", indent: 1 },
    { text: "}", indent: 0 }
  ]
};

// Dynamic creation of data arrays
const createArray = (size: number = 8) => {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 90) + 10);
  }
  return arr;
};

const filterInput = (input: string) => {
  return input
    .split(",")
    .map((num) => Number(num.trim()))
    .filter((num) => !isNaN(num) && num >= 0);
};

export default function SearchStudioPage() {
  const [dsType, setDsType] = useState<DSType>("array");
  const [alg, setAlg] = useState<SearchAlg>("linear");
  const [dsValues, setDsValues] = useState<number[]>([15, 23, 40, 48, 55, 67, 82, 90]);
  const [searchTarget, setSearchTarget] = useState<number>(48);

  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // ms per step

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto filter algorithms on DS change
  useEffect(() => {
    if (dsType === "array") {
      setAlg("linear");
    } else if (dsType === "bst") {
      setAlg("bst_search");
    } else if (dsType === "linkedlist") {
      setAlg("linear");
    }
    setSteps([]);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [dsType]);

  // Handle building dynamic search simulations
  const handleBuildAndSearch = () => {
    if (dsValues.length === 0) return;
    setIsPlaying(false);

    let generatedSteps: SimulationStep[] = [];

    if (dsType === "array" && alg === "linear") {
      generatedSteps = generateLinearSearch(dsValues, searchTarget);
    } else if (dsType === "array" && alg === "binary") {
      // Binary search requires a sorted array. Auto-sort for premium user experience.
      const sortedValues = [...dsValues].sort((a, b) => a - b);
      setDsValues(sortedValues);
      generatedSteps = generateBinarySearch(sortedValues, searchTarget);
    } else if (dsType === "bst") {
      generatedSteps = generateBSTSearch(dsValues, searchTarget);
    } else if (dsType === "linkedlist") {
      generatedSteps = generateLinkedListSearch(dsValues, searchTarget);
    }

    setSteps(generatedSteps);
    setCurrentStepIndex(0);
  };

  // Linear search simulator
  const generateLinearSearch = (arr: number[], target: number): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const logs: LogEntry[] = [];
    const baseNodes: NodeData[] = arr.map((val, idx) => ({
      id: `node-${idx}`,
      value: val,
      label: `[${idx}]`,
      active: false,
    }));

    // Initial step
    logs.push({ message: `Starting Linear Search for target: ${target}`, type: "info" });
    steps.push({
      nodes: baseNodes.map(n => ({ ...n })),
      edges: [],
      logs: [...logs],
      highlightedCodeLine: 1,
      explanation: { title: "Initialization", body: `Starting Linear Search to find target ${target} inside array of size ${arr.length}.` },
      properties: [
        { label: "Target", value: target.toString() },
        { label: "Comparisons", value: "0" },
        { label: "Complexity", value: "O(N)" },
        { label: "Status", value: "Searching" }
      ]
    });

    let comparisons = 0;
    let foundIdx = -1;

    for (let i = 0; i < arr.length; i++) {
      comparisons++;
      const currentNodes = arr.map((val, idx) => {
        const isCurrent = idx === i;
        return {
          id: `node-${idx}`,
          value: val,
          label: isCurrent ? `i = ${idx}` : `[${idx}]`,
          active: isCurrent,
          comparing: isCurrent,
          muted: idx < i,
        };
      });

      logs.push({ message: `Comparing index ${i} (value ${arr[i]}) with target ${target}`, type: "comparing" });
      steps.push({
        nodes: currentNodes,
        edges: [],
        logs: [...logs],
        highlightedCodeLine: 3,
        explanation: {
          title: `Step ${comparisons}: Comparison`,
          body: <span>Comparing value at index <span className="text-cyan-300">{i}</span> (<span className="text-violet-300">{arr[i]}</span>) with target <span className="text-cyan-300">{target}</span>.</span>
        },
        properties: [
          { label: "Target", value: target.toString() },
          { label: "Comparisons", value: comparisons.toString() },
          { label: "Complexity", value: "O(N)" },
          { label: "Status", value: "Comparing" }
        ]
      });

      if (arr[i] === target) {
        foundIdx = i;
        const successNodes = currentNodes.map((n, idx) => ({
          ...n,
          active: idx === i,
          comparing: false,
          found: idx === i,
        }));

        logs.push({ message: `Target ${target} found at index ${i}!`, type: "success" });
        steps.push({
          nodes: successNodes,
          edges: [],
          logs: [...logs],
          highlightedCodeLine: 4,
          explanation: {
            title: "Target Found",
            body: <span>Success! The target <span className="text-cyan-300">{target}</span> was found at index <span className="text-green-300">{i}</span> after <span className="text-cyan-300">{comparisons}</span> comparisons.</span>
          },
          properties: [
            { label: "Target", value: target.toString() },
            { label: "Comparisons", value: comparisons.toString() },
            { label: "Complexity", value: "O(N)" },
            { label: "Status", value: "Found" }
          ]
        });
        break;
      }
    }

    if (foundIdx === -1) {
      logs.push({ message: `Target ${target} not found in the array.`, type: "error" });
      steps.push({
        nodes: arr.map((val, idx) => ({ id: `node-${idx}`, value: val, label: `[${idx}]`, muted: true })),
        edges: [],
        logs: [...logs],
        highlightedCodeLine: 7,
        explanation: {
          title: "Search Complete",
          body: <span>Target <span className="text-cyan-300">{target}</span> was not found in the array after scanning all elements.</span>
        },
        properties: [
          { label: "Target", value: target.toString() },
          { label: "Comparisons", value: comparisons.toString() },
          { label: "Complexity", value: "O(N)" },
          { label: "Status", value: "Not Found" }
        ]
      });
    }

    return steps;
  };

  // Binary search simulator
  const generateBinarySearch = (arr: number[], target: number): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const logs: LogEntry[] = [];
    let comparisons = 0;

    const getNodesState = (low: number, high: number, mid: number | null, foundIdx: number | null = null) => {
      return arr.map((val, idx) => {
        const isMid = idx === mid;
        const inRange = idx >= low && idx <= high;
        let label = `[${idx}]`;
        if (idx === low && idx === high) label = `L,H [${idx}]`;
        else if (idx === low) label = `Low [${idx}]`;
        else if (idx === high) label = `High [${idx}]`;

        return {
          id: `node-${idx}`,
          value: val,
          label,
          active: isMid,
          comparing: isMid && foundIdx === null,
          found: idx === foundIdx,
          muted: !inRange && idx !== foundIdx,
        };
      });
    };

    logs.push({ message: "Auto-sorted array for Binary Search.", type: "info" });
    logs.push({ message: `Starting Binary Search for target: ${target}`, type: "info" });

    let low = 0;
    let high = arr.length - 1;

    steps.push({
      nodes: getNodesState(low, high, null),
      edges: [],
      logs: [...logs],
      highlightedCodeLine: 2,
      explanation: { title: "Initialization", body: `Low pointer at index 0, High pointer at index ${high}.` },
      properties: [
        { label: "Target", value: target.toString() },
        { label: "Comparisons", value: "0" },
        { label: "Complexity", value: "O(log N)" },
        { label: "Status", value: "Searching" }
      ]
    });

    let found = false;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      comparisons++;

      logs.push({ message: `Calculating middle index: mid = (${low} + ${high}) / 2 = ${mid} (value: ${arr[mid]})`, type: "info" });
      steps.push({
        nodes: getNodesState(low, high, mid),
        edges: [],
        logs: [...logs],
        highlightedCodeLine: 4,
        explanation: {
          title: `Step ${comparisons}: Middle Index`,
          body: <span>Pointers: Low = {low}, High = {high}. Middle calculated at index <span className="text-cyan-300">{mid}</span> (value: <span className="text-violet-300">{arr[mid]}</span>).</span>
        },
        properties: [
          { label: "Target", value: target.toString() },
          { label: "Comparisons", value: (comparisons - 1).toString() },
          { label: "Complexity", value: "O(log N)" },
          { label: "Status", value: "Calculating" }
        ]
      });

      logs.push({ message: `Comparing mid value ${arr[mid]} with target ${target}`, type: "comparing" });
      steps.push({
        nodes: getNodesState(low, high, mid),
        edges: [],
        logs: [...logs],
        highlightedCodeLine: 5,
        explanation: {
          title: `Step ${comparisons}: Comparison`,
          body: <span>Comparing middle value <span className="text-cyan-300">{arr[mid]}</span> with target <span className="text-cyan-300">{target}</span>.</span>
        },
        properties: [
          { label: "Target", value: target.toString() },
          { label: "Comparisons", value: comparisons.toString() },
          { label: "Complexity", value: "O(log N)" },
          { label: "Status", value: "Comparing" }
        ]
      });

      if (arr[mid] === target) {
        found = true;
        logs.push({ message: `Target found at middle index ${mid}!`, type: "success" });
        steps.push({
          nodes: getNodesState(low, high, mid, mid),
          edges: [],
          logs: [...logs],
          highlightedCodeLine: 5,
          explanation: {
            title: "Target Found",
            body: <span>Success! The target <span className="text-cyan-300">{target}</span> was found at middle index <span className="text-green-300">{mid}</span>.</span>
          },
          properties: [
            { label: "Target", value: target.toString() },
            { label: "Comparisons", value: comparisons.toString() },
            { label: "Complexity", value: "O(log N)" },
            { label: "Status", value: "Found" }
          ]
        });
        break;
      } else if (arr[mid] < target) {
        const prevLow = low;
        low = mid + 1;
        logs.push({ message: `${arr[mid]} < ${target}. Target must be in right half. Setting low = ${low}`, type: "info" });
        steps.push({
          nodes: getNodesState(low, high, mid),
          edges: [],
          logs: [...logs],
          highlightedCodeLine: 6,
          explanation: {
            title: "Shrink Search Space",
            body: <span>Since middle value <span className="text-violet-300">{arr[mid]}</span> &lt; <span className="text-cyan-300">{target}</span>, the target must be in the right half. Low pointer updated to index <span className="text-cyan-300">{low}</span>.</span>
          },
          properties: [
            { label: "Target", value: target.toString() },
            { label: "Comparisons", value: comparisons.toString() },
            { label: "Complexity", value: "O(log N)" },
            { label: "Status", value: "Updating Bounds" }
          ]
        });
      } else {
        const prevHigh = high;
        high = mid - 1;
        logs.push({ message: `${arr[mid]} > ${target}. Target must be in left half. Setting high = ${high}`, type: "info" });
        steps.push({
          nodes: getNodesState(low, high, mid),
          edges: [],
          logs: [...logs],
          highlightedCodeLine: 7,
          explanation: {
            title: "Shrink Search Space",
            body: <span>Since middle value <span className="text-violet-300">{arr[mid]}</span> &gt; <span className="text-cyan-300">{target}</span>, the target must be in the left half. High pointer updated to index <span className="text-cyan-300">{high}</span>.</span>
          },
          properties: [
            { label: "Target", value: target.toString() },
            { label: "Comparisons", value: comparisons.toString() },
            { label: "Complexity", value: "O(log N)" },
            { label: "Status", value: "Updating Bounds" }
          ]
        });
      }
    }

    if (!found) {
      logs.push({ message: `Target ${target} not found. (low > high: ${low} > ${high})`, type: "error" });
      steps.push({
        nodes: arr.map((val, idx) => ({ id: `node-${idx}`, value: val, label: `[${idx}]`, muted: true })),
        edges: [],
        logs: [...logs],
        highlightedCodeLine: 9,
        explanation: {
          title: "Search Complete",
          body: <span>Target <span className="text-cyan-300">{target}</span> was not found in the array. Pointers crossed.</span>
        },
        properties: [
          { label: "Target", value: target.toString() },
          { label: "Comparisons", value: comparisons.toString() },
          { label: "Complexity", value: "O(log N)" },
          { label: "Status", value: "Not Found" }
        ]
      });
    }

    return steps;
  };

  // BST search simulator
  const generateBSTSearch = (values: number[], target: number): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const logs: LogEntry[] = [];

    type BSTNode = {
      value: number;
      leftNode: BSTNode | null;
      rightNode: BSTNode | null;
      x: number;
      y: number;
      depth: number;
      id: string;
    };

    // First build the BST
    let rootNode: BSTNode | null = null;
    const treeNodes: NodeData[] = [];
    const treeEdges: EdgeData[] = [];

    const insertNode = (val: number, idx: number) => {
      if (!rootNode) {
        rootNode = { value: val, leftNode: null, rightNode: null, x: 50, y: 12, depth: 1, id: `node-${idx}` };
        treeNodes.push({ id: `node-${idx}`, value: val, top: 12, left: 50 });
      } else {
        let curr = rootNode;
        let depth = 1;
        let dx = 20;
        while (true) {
          if (val < curr.value) {
            if (!curr.leftNode) {
              const newX = curr.x - dx;
              const newY = curr.y + 16;
              curr.leftNode = { value: val, leftNode: null, rightNode: null, x: newX, y: newY, depth: depth + 1, id: `node-${idx}` };
              treeNodes.push({ id: `node-${idx}`, value: val, top: newY, left: newX });
              treeEdges.push({ id: `edge-${idx}`, x1: curr.x, y1: curr.y, x2: newX, y2: newY });
              break;
            } else {
              curr = curr.leftNode;
              depth++;
              dx /= 1.5;
            }
          } else {
            if (!curr.rightNode) {
              const newX = curr.x + dx;
              const newY = curr.y + 16;
              curr.rightNode = { value: val, leftNode: null, rightNode: null, x: newX, y: newY, depth: depth + 1, id: `node-${idx}` };
              treeNodes.push({ id: `node-${idx}`, value: val, top: newY, left: newX });
              treeEdges.push({ id: `edge-${idx}`, x1: curr.x, y1: curr.y, x2: newX, y2: newY });
              break;
            } else {
              curr = curr.rightNode;
              depth++;
              dx /= 1.5;
            }
          }
        }
      }
    };

    // Insert all values
    values.forEach((v, i) => insertNode(v, i));

    logs.push({ message: "BST constructed from values.", type: "info" });
    logs.push({ message: `Searching for target: ${target}`, type: "info" });

    let comparisons = 0;
    let curr: BSTNode | null = rootNode;

    // Initial root search step
    steps.push({
      nodes: treeNodes.map(n => ({ ...n, active: n.id === curr?.id })),
      edges: treeEdges.map(e => ({ ...e })),
      logs: [...logs],
      highlightedCodeLine: 2,
      explanation: { title: "Start Search", body: `Starting search at BST root node (value: ${curr?.value}).` },
      properties: [
        { label: "Target", value: target.toString() },
        { label: "Comparisons", value: "0" },
        { label: "Complexity", value: "O(log N)" },
        { label: "Status", value: "Searching" }
      ]
    });

    let found = false;

    while (curr) {
      comparisons++;
      const currentId = curr.id;

      logs.push({ message: `Comparing BST node value ${curr.value} with target ${target}`, type: "comparing" });
      steps.push({
        nodes: treeNodes.map(n => ({
          ...n,
          active: n.id === currentId,
          comparing: n.id === currentId,
          muted: n.id !== currentId
        })),
        edges: treeEdges.map(e => ({ ...e })),
        logs: [...logs],
        highlightedCodeLine: 2,
        explanation: {
          title: `Step ${comparisons}: Compare`,
          body: <span>Comparing node <span className="text-cyan-300">{curr.value}</span> with target <span className="text-cyan-300">{target}</span>.</span>
        },
        properties: [
          { label: "Target", value: target.toString() },
          { label: "Comparisons", value: comparisons.toString() },
          { label: "Complexity", value: "O(log N)" },
          { label: "Status", value: "Comparing" }
        ]
      });

      if (curr.value === target) {
        found = true;
        logs.push({ message: `Target found in BST!`, type: "success" });
        steps.push({
          nodes: treeNodes.map(n => ({
            ...n,
            active: n.id === currentId,
            found: n.id === currentId,
            muted: n.id !== currentId
          })),
          edges: treeEdges.map(e => ({ ...e })),
          logs: [...logs],
          highlightedCodeLine: 2,
          explanation: {
            title: "Target Found",
            body: <span>Success! Target <span className="text-cyan-300">{target}</span> was found in the BST.</span>
          },
          properties: [
            { label: "Target", value: target.toString() },
            { label: "Comparisons", value: comparisons.toString() },
            { label: "Complexity", value: "O(log N)" },
            { label: "Status", value: "Found" }
          ]
        });
        break;
      } else if (target < curr.value) {
        logs.push({ message: `${target} < ${curr.value}. Moving to left child: ${curr.leftNode ? curr.leftNode.value : "None"}`, type: "info" });
        
        // Before actual moving step
        steps.push({
          nodes: treeNodes.map(n => ({
            ...n,
            active: n.id === currentId,
            muted: n.id !== currentId
          })),
          edges: treeEdges.map(e => ({
            ...e,
            active: e.x1 === curr?.x && e.x2 === curr?.leftNode?.x
          })),
          logs: [...logs],
          highlightedCodeLine: 4,
          explanation: {
            title: "Move Left",
            body: <span>Since target <span className="text-cyan-300">{target}</span> &lt; <span className="text-violet-300">{curr.value}</span>, we follow the left pointer.</span>
          },
          properties: [
            { label: "Target", value: target.toString() },
            { label: "Comparisons", value: comparisons.toString() },
            { label: "Complexity", value: "O(log N)" },
            { label: "Status", value: "Moving Left" }
          ]
        });

        curr = curr.leftNode;
      } else {
        logs.push({ message: `${target} >= ${curr.value}. Moving to right child: ${curr.rightNode ? curr.rightNode.value : "None"}`, type: "info" });
        
        // Before actual moving step
        steps.push({
          nodes: treeNodes.map(n => ({
            ...n,
            active: n.id === currentId,
            muted: n.id !== currentId
          })),
          edges: treeEdges.map(e => ({
            ...e,
            active: e.x1 === curr?.x && e.x2 === curr?.rightNode?.x
          })),
          logs: [...logs],
          highlightedCodeLine: 6,
          explanation: {
            title: "Move Right",
            body: <span>Since target <span className="text-cyan-300">{target}</span> &gt;= <span className="text-violet-300">{curr.value}</span>, we follow the right pointer.</span>
          },
          properties: [
            { label: "Target", value: target.toString() },
            { label: "Comparisons", value: comparisons.toString() },
            { label: "Complexity", value: "O(log N)" },
            { label: "Status", value: "Moving Right" }
          ]
        });

        curr = curr.rightNode;
      }
    }

    if (!found) {
      logs.push({ message: `Target ${target} was not found in the BST.`, type: "error" });
      steps.push({
        nodes: treeNodes.map(n => ({ ...n, muted: true })),
        edges: treeEdges.map(e => ({ ...e })),
        logs: [...logs],
        highlightedCodeLine: 2,
        explanation: {
          title: "Search Complete",
          body: <span>Target <span className="text-cyan-300">{target}</span> was not found in the tree (reached a null pointer).</span>
        },
        properties: [
          { label: "Target", value: target.toString() },
          { label: "Comparisons", value: comparisons.toString() },
          { label: "Complexity", value: "O(log N)" },
          { label: "Status", value: "Not Found" }
        ]
      });
    }

    return steps;
  };

  // Linked list search simulator
  const generateLinkedListSearch = (arr: number[], target: number): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const logs: LogEntry[] = [];

    // Map list nodes coordinates horizontally
    const baseNodes: NodeData[] = arr.map((val, idx) => {
      const horizontalOffset = 10 + idx * 11;
      return {
        id: `node-${idx}`,
        value: val,
        label: idx === 0 ? "Head" : `Node [${idx}]`,
        left: horizontalOffset,
        top: 45,
      };
    });

    const baseEdges: EdgeData[] = [];
    for (let i = 0; i < arr.length - 1; i++) {
      baseEdges.push({
        id: `edge-${i}`,
        x1: 10 + i * 11 + 4,
        y1: 45,
        x2: 10 + (i + 1) * 11 - 4,
        y2: 45,
      });
    }

    logs.push({ message: `Starting Linked List search for target: ${target}`, type: "info" });
    steps.push({
      nodes: baseNodes.map(n => ({ ...n })),
      edges: baseEdges.map(e => ({ ...e })),
      logs: [...logs],
      highlightedCodeLine: 1,
      explanation: { title: "Initialization", body: "Start checking from the Head node." },
      properties: [
        { label: "Target", value: target.toString() },
        { label: "Comparisons", value: "0" },
        { label: "Complexity", value: "O(N)" },
        { label: "Status", value: "Searching" }
      ]
    });

    let comparisons = 0;
    let found = false;

    for (let i = 0; i < arr.length; i++) {
      comparisons++;
      const currentNodes = baseNodes.map((n, idx) => ({
        ...n,
        active: idx === i,
        comparing: idx === i,
        muted: idx !== i,
      }));

      logs.push({ message: `Comparing node value ${arr[i]} at index ${i} with target ${target}`, type: "comparing" });
      steps.push({
        nodes: currentNodes,
        edges: baseEdges.map(e => ({ ...e, active: e.id === `edge-${i - 1}` })),
        logs: [...logs],
        highlightedCodeLine: 3,
        explanation: {
          title: `Step ${comparisons}: Compare Node`,
          body: <span>Comparing Linked List Node value <span className="text-cyan-300">{arr[i]}</span> with target <span className="text-cyan-300">{target}</span>.</span>
        },
        properties: [
          { label: "Target", value: target.toString() },
          { label: "Comparisons", value: comparisons.toString() },
          { label: "Complexity", value: "O(N)" },
          { label: "Status", value: "Comparing" }
        ]
      });

      if (arr[i] === target) {
        found = true;
        logs.push({ message: `Target found at node index ${i}!`, type: "success" });
        steps.push({
          nodes: baseNodes.map((n, idx) => ({
            ...n,
            active: idx === i,
            found: idx === i,
            muted: idx !== i,
          })),
          edges: baseEdges.map(e => ({ ...e })),
          logs: [...logs],
          highlightedCodeLine: 4,
          explanation: {
            title: "Target Found",
            body: <span>Success! The target <span className="text-cyan-300">{target}</span> was found in the Linked List at Node index <span className="text-green-300">{i}</span>.</span>
          },
          properties: [
            { label: "Target", value: target.toString() },
            { label: "Comparisons", value: comparisons.toString() },
            { label: "Complexity", value: "O(N)" },
            { label: "Status", value: "Found" }
          ]
        });
        break;
      }
    }

    if (!found) {
      logs.push({ message: `Target ${target} was not found in Linked List (reached end / Null pointer).`, type: "error" });
      steps.push({
        nodes: baseNodes.map(n => ({ ...n, muted: true })),
        edges: baseEdges.map(e => ({ ...e })),
        logs: [...logs],
        highlightedCodeLine: 7,
        explanation: {
          title: "Search Complete",
          body: <span>Target <span className="text-cyan-300">{target}</span> was not found. Reached end of the Linked List.</span>
        },
        properties: [
          { label: "Target", value: target.toString() },
          { label: "Comparisons", value: comparisons.toString() },
          { label: "Complexity", value: "O(N)" },
          { label: "Status", value: "Not Found" }
        ]
      });
    }

    return steps;
  };

  // Playback timers
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && steps.length > 0) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length, speed]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStepIndex, steps]);

  const currentStep = steps[currentStepIndex] || {
    nodes: [],
    edges: [],
    logs: [],
    highlightedCodeLine: 0,
    explanation: { title: "Ready", body: "Click BUILD + SEARCH to start the visualization." },
    properties: [
      { label: "Target", value: "-" },
      { label: "Comparisons", value: "0" },
      { label: "Complexity", value: "-" },
      { label: "Status", value: "Ready" }
    ]
  };

  return (
    <main className="border-x border-cyan-300/20 bg-[#020612] text-slate-100 md:h-[calc(100dvh-5.5rem)] md:overflow-hidden flex flex-col">
      <div className="mx-auto grid w-full max-w-[1900px] flex-1 md:h-full md:min-h-0 md:grid-cols-[220px_1fr_260px] lg:grid-cols-[270px_1fr_320px] xl:grid-cols-[320px_1fr_360px]">
        
        {/* Left Sidebar — Input Panel */}
        <aside className="border-b border-cyan-100/10 bg-[#030916] p-3 md:h-full md:min-h-0 flex flex-col md:border-b-0 md:border-r md:p-4">
          <div className="flex items-center justify-between shrink-0">
            <h1 className="ds-title text-slate-100">
              Input Panel
            </h1>
          </div>

          {/* DS Selector */}
          <div className="mt-5 shrink-0">
            <p className="ds-label text-slate-400">Data Structure</p>
            <div className="mt-2 grid grid-cols-3 gap-1.5 rounded-lg border border-cyan-100/10 bg-slate-900/40 p-1">
              {(["array", "bst", "linkedlist"] as DSType[]).map((type) => (
                <button
                  key={type}
                  className={`ds-button rounded px-1.5 py-2 text-xs tracking-wider uppercase transition ${
                    dsType === type
                      ? "bg-cyan-400 text-[#073B45]"
                      : "text-slate-400 hover:bg-cyan-400/5 hover:text-cyan-300"
                  }`}
                  onClick={() => setDsType(type)}
                >
                  {type === "linkedlist" ? "List" : type}
                </button>
              ))}
            </div>
          </div>

          {/* Algorithm Selector */}
          {dsType === "array" && (
            <div className="mt-4 shrink-0">
              <p className="ds-label text-slate-400">Search Algorithm</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5 rounded-lg border border-cyan-100/10 bg-slate-900/40 p-1">
                {(["linear", "binary"] as SearchAlg[]).map((algItem) => (
                  <button
                    key={algItem}
                    className={`ds-button rounded px-1.5 py-2 text-xs tracking-wider uppercase transition ${
                      alg === algItem
                        ? "bg-cyan-400 text-[#073B45]"
                        : "text-slate-400 hover:bg-cyan-400/5 hover:text-cyan-300"
                    }`}
                    onClick={() => setAlg(algItem)}
                  >
                    {algItem}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Values */}
          <div className="mt-4 shrink-0">
            <p className="ds-label text-slate-400">Values (Comma Separated)</p>
            <input
              type="text"
              value={dsValues.join(", ")}
              onChange={(e) => setDsValues(filterInput(e.target.value))}
              className="ds-body mt-2 rounded-lg border border-cyan-100/12 bg-[#0A111F] px-4 py-2.5 text-slate-200 w-full focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Search Target */}
          <div className="mt-4 shrink-0">
            <p className="ds-label text-slate-400">Search Target</p>
            <input
              type="number"
              value={searchTarget}
              onChange={(e) => setSearchTarget(parseInt(e.target.value) || 0)}
              className="ds-body mt-2 rounded-lg border border-cyan-100/12 bg-[#0A111F] px-4 py-2.5 text-slate-200 w-full focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-4 grid grid-cols-2 gap-3 shrink-0">
            <button
              className="ds-button rounded border border-cyan-300/40 bg-cyan-400 px-3 py-2.5 tracking-[0.2em] text-[#073B45] hover:bg-cyan-300 transition"
              type="button"
              onClick={handleBuildAndSearch}
            >
              BUILD & RUN
            </button>
            <button
              className="ds-button rounded border border-violet-400/60 bg-violet-400/5 px-3 py-2.5 tracking-[0.2em] text-violet-200 hover:bg-violet-400/20 transition"
              type="button"
              onClick={() => setDsValues(createArray(dsType === "linkedlist" ? 6 : dsType === "bst" ? 7 : 8))}
            >
              RANDOMIZE
            </button>
          </div>

          {/* Operations Log */}
          <div className="mt-5 border-t border-cyan-100/10 pt-4 flex-1 flex flex-col min-h-0">
            <p className="ds-label text-slate-400 shrink-0">
              Operations Log
            </p>
            <div className="flex-1 overflow-y-auto mt-3 pr-2 custom-scrollbar">
              <ul className="ds-small space-y-2.5">
                {currentStep.logs.map((log, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-2 ${
                      log.type === "success"
                        ? "text-cyan-300"
                        : log.type === "comparing"
                        ? "text-violet-300"
                        : log.type === "error"
                        ? "text-red-400"
                        : "text-slate-400"
                    }`}
                  >
                    {log.type === "success" && <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />}
                    {log.type === "comparing" && <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />}
                    {log.type === "error" && <CrossIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />}
                    <span>{log.message}</span>
                  </li>
                ))}
                {currentStep.logs.length === 0 && (
                  <li className="text-slate-500 italic">Waiting for simulation run...</li>
                )}
                <div ref={logsEndRef} />
              </ul>
            </div>
          </div>
        </aside>

        {/* Center — Live Visualization */}
        <section className="flex min-h-[450px] flex-col border-b border-cyan-100/10 bg-[#0A101D] md:h-full md:min-h-0 md:border-b-0 md:border-r">
          <div className="flex flex-wrap items-center gap-2 border-b border-cyan-100/10 p-3 md:p-4 shrink-0">
            <span className="ds-label inline-flex items-center rounded border border-cyan-300/25 bg-cyan-300/8 px-3 py-1 text-cyan-300">
              Search Studio
            </span>
            <span className="ds-label inline-flex rounded border border-slate-500/35 bg-slate-500/8 px-3 py-1 text-slate-300 uppercase">
              {dsType} : {alg}
            </span>
          </div>

          {/* Visualization Sandbox */}
          <div className="relative min-h-[320px] flex-1 overflow-hidden bg-[linear-gradient(rgba(71,102,145,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(71,102,145,0.07)_1px,transparent_1px)] bg-[size:38px_38px] md:min-h-0 flex items-center justify-center">
            
            {/* SVG Render Layer */}
            <div className="absolute inset-0 pointer-events-none">
              <svg aria-hidden="true" className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                {currentStep.edges.map((edge) => (
                  <line
                    key={edge.id}
                    stroke={edge.active ? "#22D3EE" : "#334155"}
                    strokeOpacity={edge.active ? "0.9" : "0.45"}
                    strokeWidth={edge.active ? "0.6" : "0.35"}
                    strokeDasharray={edge.dashed ? "1 1" : "none"}
                    x1={edge.x1}
                    x2={edge.x2}
                    y1={edge.y1}
                    y2={edge.y2}
                    className="transition-all duration-300"
                  />
                ))}
              </svg>
            </div>

            {/* Arrays & Linked Lists Horizontal Visualizer Container */}
            {dsType !== "bst" && (
              <div className="w-full max-w-5xl px-8 flex items-center justify-center gap-4 relative py-12">
                {currentStep.nodes.map((node, index) => {
                  const isLinkedList = dsType === "linkedlist";
                  
                  // Setup clean design classes
                  let nodeBorder = "border-slate-700/50 bg-[#0E1726]/60 text-slate-300";
                  if (node.found) {
                    nodeBorder = "border-cyan-400 bg-cyan-500 text-[#063C46] shadow-[0_0_20px_rgba(34,211,238,0.45)]";
                  } else if (node.comparing) {
                    nodeBorder = "border-violet-400 bg-violet-500/20 text-violet-200 shadow-[0_0_15px_rgba(167,139,250,0.3)]";
                  } else if (node.active) {
                    nodeBorder = "border-cyan-300 bg-cyan-400/20 text-cyan-200";
                  } else if (node.muted) {
                    nodeBorder = "border-slate-800/30 bg-[#050B14]/40 text-slate-600";
                  }

                  return (
                    <div key={node.id} className="flex items-center relative">
                      {/* Node circle/square */}
                      <div className={`h-16 w-16 border rounded-xl flex flex-col items-center justify-center font-semibold transition-all duration-300 relative ${nodeBorder}`}>
                        <span className="text-xl">{node.value}</span>
                        {node.label && (
                          <span className="ds-label absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] text-cyan-300 font-bold tracking-widest whitespace-nowrap">
                            {node.label}
                          </span>
                        )}
                      </div>

                      {/* Line arrow for Linked List nodes */}
                      {isLinkedList && index < currentStep.nodes.length - 1 && (
                        <div className="w-6 h-[2px] bg-slate-700 flex items-center justify-center relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-slate-700 rotate-45" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tree Specific Rendering */}
            {dsType === "bst" && (
              <div className="absolute inset-0">
                {currentStep.nodes.map(node => {
                  let activeStyle = false;
                  let mutedStyle = false;
                  let labelText = node.label;
                  if (node.found) {
                    activeStyle = true;
                    labelText = "FOUND";
                  } else if (node.comparing) {
                    activeStyle = true;
                    labelText = "COMPARING";
                  } else if (node.active) {
                    activeStyle = true;
                    labelText = "ACTIVE";
                  } else if (node.muted) {
                    mutedStyle = true;
                  }

                  // Custom render for BST Node
                  const baseClass =
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border text-center font-semibold transition-all duration-300";
                  const activeClass = activeStyle
                    ? "h-18 w-18 border-cyan-300/80 bg-cyan-400 text-[#063C46] shadow-[0_0_0_1px_rgba(34,211,238,0.5),0_0_26px_rgba(34,211,238,0.65)] z-10"
                    : mutedStyle
                      ? "h-16 w-16 border-slate-500/25 bg-slate-900/45 text-slate-500 z-0"
                      : "h-16 w-16 border-slate-300/20 bg-slate-900/55 text-slate-200 z-0";

                  return (
                    <div
                      key={node.id}
                      className={`${baseClass} ${activeClass}`}
                      style={{ left: `${node.left}%`, top: `${node.top}%` }}
                    >
                      <span className="absolute inset-0 grid place-items-center text-xl">{node.value}</span>
                      {labelText ? (
                        <span className="ds-label absolute -bottom-7 left-1/2 -translate-x-1/2 text-cyan-300 whitespace-nowrap">
                          {labelText}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-2.5 border-t border-cyan-100/10 bg-[#0A111F] px-3 py-2.5 md:flex-nowrap md:gap-3 md:px-4 md:py-3 shrink-0">
            <button
              className="rounded-md border border-slate-400/35 px-3 py-2 text-slate-300 transition hover:bg-slate-700/20 disabled:opacity-30 disabled:cursor-not-allowed"
              type="button"
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0 || steps.length === 0}
            >
              <span aria-hidden="true">|◀</span>
              <span className="sr-only">Rewind</span>
            </button>
            <button
              className="ds-button rounded-xl bg-cyan-400 px-4 py-2 font-bold text-[#083C45] transition hover:bg-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed w-[70px] flex justify-center"
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={steps.length === 0 || currentStepIndex === steps.length - 1}
            >
              {isPlaying ? <PauseIcon className="h-5 w-5" /> : <span aria-hidden="true">▶</span>}
              <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button
              className="rounded-md border border-slate-400/35 px-3 py-2 text-slate-300 transition hover:bg-slate-700/20 disabled:opacity-30 disabled:cursor-not-allowed"
              type="button"
              onClick={() => setCurrentStepIndex(Math.min(steps.length - 1, currentStepIndex + 1))}
              disabled={currentStepIndex === steps.length - 1 || steps.length === 0}
            >
              <span aria-hidden="true">▶|</span>
              <span className="sr-only">Forward</span>
            </button>

            {/* Speed slider */}
            <div className="ml-auto flex min-w-[130px] items-center gap-2.5 md:min-w-[160px]">
              <span className="ds-label text-slate-500">
                Speed
              </span>
              <input
                type="range"
                min="200"
                max="2000"
                step="100"
                value={2200 - speed}
                onChange={(e) => setSpeed(2200 - parseInt(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div className="text-right">
              <p className="ds-label text-slate-500">Step</p>
              <p className="ds-metric text-cyan-300">{steps.length > 0 ? currentStepIndex + 1 : 0}/{steps.length > 0 ? steps.length : 0}</p>
            </div>
          </div>
        </section>

        {/* Right Sidebar — Explanation, Snippet and properties */}
        <aside className="bg-[#030916] p-3 md:h-full md:min-h-0 md:overflow-y-auto md:p-4 xl:p-5 flex flex-col">
          <div className="flex items-center gap-2 shrink-0">
            <InfoIcon className="h-5 w-5 md:h-6 md:w-6 text-cyan-300" />
            <h2 className="ds-title text-slate-100">
              Explanation
            </h2>
          </div>

          {/* Explanation Panel */}
          <section className="mt-4 rounded-lg border border-cyan-100/10 bg-[#0B1221] p-3.5 shrink-0">
            <p className="ds-label text-cyan-300">
              {currentStep.explanation.title}
            </p>
            <p className="ds-body mt-2 text-slate-200 text-xs md:text-sm">
              {currentStep.explanation.body}
            </p>
          </section>

          {/* Code Snippet Viewer */}
          <section className="mt-5 flex-1 flex flex-col min-h-0">
            <h3 className="ds-label text-slate-400 shrink-0 mb-3.5">
              Algorithm Code
            </h3>
            <div className="flex-1 overflow-auto rounded-lg border border-cyan-100/10 bg-[#111725] p-3.5 font-mono text-[10px] md:text-xs text-slate-300 custom-scrollbar">
              {CODE_SNIPPETS[alg].map((line, idx) => {
                const isHighlighted = idx + 1 === currentStep.highlightedCodeLine;
                return (
                  <div
                    key={idx}
                    className={`py-0.5 px-2 rounded ${
                      isHighlighted ? "bg-cyan-400/25 border-l-2 border-cyan-400 text-cyan-200 font-bold" : "text-slate-400"
                    }`}
                    style={{ paddingLeft: `${line.indent * 0.75 + 0.5}rem` }}
                  >
                    {line.text}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Live Properties */}
          <section className="mt-5 shrink-0">
            <h3 className="ds-label text-slate-400">
              Live Properties
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {currentStep.properties.map((item) => (
                <div
                  className="rounded border border-cyan-100/10 bg-[#111725] px-3 py-2.5"
                  key={item.label}
                >
                  <p className="ds-label text-slate-500">
                    {item.label}
                  </p>
                  <p className="ds-metric mt-1 text-slate-200">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
