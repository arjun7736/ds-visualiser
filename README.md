# DS Visualiser – AlgoVision

A high-fidelity, interactive algorithm and data structures visualization platform. Master sorting algorithms, explore data structures, and compare performance metrics through a modern, responsive dashboard built with Next.js, React 19, TypeScript, and Tailwind CSS v4.

## Overview

**AlgoVision** is an educational tool designed to help developers and computer science students deeply understand algorithms and data structures through visual, step-by-step execution with real-time metrics and pseudocode display in multiple programming languages.

### Key Features

- **Multi-Algorithm Sorting Visualizations**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort
- **Real-Time Metrics**: Track comparisons, swaps, and execution steps
- **Pseudocode Display**: View algorithm implementations in JavaScript, Python, Java, and C++
- **Algorithm Comparison**: Side-by-side performance visualization
- **Interactive Simulation**: Play, pause, step-through, and rewind controls
- **Data Structure Explorer**: Visualize Binary Search Trees, Linked Lists, Arrays, Graphs, Heaps, Stacks, Queues, and Tries
- **Responsive Design**: Works seamlessly on desktop and tablet devices

## Tech Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **UI Library**: React 19.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + PostCSS
- **Linting**: ESLint 9 with eslint-config-next
- **Typography**: Google Fonts (Manrope, Sora) via next/font

## Routes & Pages

| Route | Purpose | Features |
|-------|---------|----------|
| `/` | Landing Dashboard | Hero section, performance highlights, algorithm showcase, footer |
| `/sorting` | Sorting Studio | Full sorting algorithm visualizer with playback controls and pseudocode |
| `/algorithms/sorting` | Sorting Reference | Algorithm reference page with complexity analysis |
| `/simulation` | Data Structure Lab | Interactive simulation environment for BST, Linked Lists, Arrays, etc. |
| `/comparison` | Algorithm Comparison | Side-by-side performance comparison of sorting algorithms |
| `/search` | Search Algorithms *(placeholder)* | Search visualization (future expansion) |

## Project Structure

```text
app/
├── algorithms/
│   └── sorting/
│       └── page.tsx              # Sorting algorithm reference page
├── components/
│   ├── Header.tsx                 # Navigation header with search
│   ├── HeroSection.tsx            # Landing page hero with CTAs
│   ├── PerformanceSection.tsx     # Algorithm showcase cards
│   ├── FooterSection.tsx          # Footer with links & branding
│   └── sortingAlgorithms.ts       # Core sorting logic & pseudocode
├── comparison/
│   └── page.tsx                   # Algorithm comparison visualizer
├── search/
│   └── page.tsx                   # Search algorithm visualization (WIP)
├── simulation/
│   └── page.tsx                   # Data structure simulation workspace
├── sorting/
│   └── page.tsx                   # Sorting algorithm visualizer
├── assets/
│   └── comparison.png             # Reference imagery
├── globals.css                    # Tailwind & global styles
├── layout.tsx                     # Root layout with Header
└── page.tsx                       # Landing dashboard

public/
└── [static assets]
```

## Supported Algorithms

### Sorting Algorithms

All sorting algorithms include:
- Step-by-step visualization with bar chart representation
- Real-time comparison and swap counters
- Pseudocode in 4 languages (JavaScript, Python, Java, C++)
- Time complexity analysis (Best, Average, Worst case)
- Space complexity information

| Algorithm | Time (Best) | Time (Avg) | Time (Worst) | Space | Stable | In-Place |
|-----------|-------------|-----------|--------------|-------|--------|----------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✓ | ✓ |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ✗ | ✓ |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✓ | ✓ |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✓ | ✗ |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ✗* | ✓ |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | ✗ | ✓ |

### Data Structures (Simulation Mode)

- Binary Search Tree (BST)
- Binary Tree
- Singly Linked List
- Arrays
- Undirected Graphs
- Max Heap
- Stack (LIFO)
- Queue (FIFO)
- Trie (Prefix Tree)

## Getting Started

### Prerequisites

- **Node.js**: 20 or higher
- **npm**: 10 or higher
- **Git**: For version control (optional)

### Installation

1. **Clone or navigate to the repository**:
   ```bash
   cd ds-visualiser
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

**Hot Reload**: Changes to files are automatically reflected in the browser.

### Production Build

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server with hot reload on port 3000 |
| `npm run build` | Create production-optimized build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint to check code quality |

## UI Architecture

### Component Hierarchy

The application uses a modular component structure:

```
RootLayout (app/layout.tsx)
├── Header (persistent across routes)
└── Page Content
    ├── Landing Dashboard (app/page.tsx)
    │   ├── HeroSection
    │   ├── PerformanceSection
    │   └── FooterSection
    ├── Sorting Studio (app/sorting/page.tsx)
    ├── Comparison Engine (app/comparison/page.tsx)
    ├── Simulation Workspace (app/simulation/page.tsx)
    └── Algorithm Reference (app/algorithms/sorting/page.tsx)
```

### Component Overview

- **Header**: Persistent navigation with site branding ("AlgoVision"), search bar, and routing
- **HeroSection**: Landing page call-to-action with feature highlights
- **PerformanceSection**: Algorithm showcase cards with complexity metrics
- **FooterSection**: Multi-column footer with product links, resources, company info, and social buttons
- **Sorting Studio**: Interactive visualizer with:
  - Algorithm selector dropdown
  - Playback controls (play, pause, step, rewind)
  - Speed adjustment slider
  - Array input/randomization controls
  - Real-time bar chart visualization
  - Pseudocode panel with line highlighting
  - Statistics dashboard (comparisons, swaps, array size)

- **Comparison Engine**: Dual-side visualizer for:
  - Independent algorithm selection per side
  - Synchronized playback controls
  - Real-time performance comparison
  - Identical data across both visualizations

- **Simulation Workspace**: Interactive data structure builder with:
  - Data structure type selector (BST, Linked List, etc.)
  - Input field for custom values
  - Visual tree/graph rendering
  - Animation state tracking

### Styling Architecture

- **Typography System**:
  - `ds-title`: Branding and page headers
  - `ds-display`: Large section headings
  - `ds-body`: Body text and descriptions
  
- **Color Palette**:
  - **Primary**: Cyan (`#0fe4ff` / `cyan-400`)
  - **Background**: Deep navy (`#030712` to `#081223`)
  - **Text**: Light slate (`#e2e8f0` / `slate-100`)
  - **Accents**: Indigo (`#3c366b` / `indigo-900`), Purple tones

- **Visual Effects**:
  - Radial gradients for ambient lighting
  - Neon highlights on interactive elements
  - Smooth transitions and hover states
  - Shadow insets for depth
  - Glass-morphism borders (cyan with low opacity)

### Tailwind CSS v4 Configuration

- Custom gradient definitions
- Extended color palette with semantic naming
- Responsive breakpoints for mobile-first design
- Dark mode default (no light mode currently)
- PostCSS integration for advanced features

## Development Guide

### Code Organization

- **Page Components** (`app/[route]/page.tsx`): Full-page routes with client-side logic
- **UI Components** (`app/components/*.tsx`): Reusable, server-side components  
- **Utilities** (`app/components/sortingAlgorithms.ts`): Algorithm logic, type definitions, and pseudocode
- **Global Styles** (`app/globals.css`): Tailwind + custom CSS variables

### Key Type Definitions

Located in `app/components/sortingAlgorithms.ts`:

```typescript
type BarState = { value: number; tone?: BarTone };
type SortingStep = {
  bars: BarState[];
  highlightedLine: number;
  comparisons: number;
  swaps: number;
  systemMessage: string;
  explanation: string;
};
type SortingAlgorithmId = "bubble" | "selection" | "insertion" | "merge" | "quick" | "heap";
type PseudocodeLanguage = "javascript" | "python" | "java" | "cpp";
```

### Algorithm Implementation Pattern

Each sorting algorithm follows a consistent pattern:

1. **Pseudocode Definition**: Multi-language code blocks
2. **Complexity Metadata**: Best, average, and worst-case O() notation
3. **Step Generation**: `generateSortingSteps()` creates animated frames
4. **State Management**: Bars, highlighted lines, and metrics tracked per step

### State Management

- Uses React hooks (`useState`, `useEffect`, `useMemo`) for client-side state
- Animation frames stepped through manually (no external animation library)
- Playback speed controlled via slider (adjusts step interval)

## Quality Checks & Best Practices

### Pre-Commit Validation

Before pushing changes, run:

```bash
# Lint check
npm run lint

# Production build verification
npm run build

# Development server test
npm run dev
```

### Code Quality Guidelines

- **TypeScript**: Strict mode enabled; all components type-safe
- **ESLint**: Configuration enforces Next.js best practices
- **React 19**: Use latest hooks and concurrent rendering features
- **Accessibility**: ARIA labels on interactive elements, semantic HTML
- **Performance**: Memoized sorting steps, debounced input handlers

### Common Development Tasks

#### Adding a New Sorting Algorithm

1. Add algorithm ID to `SortingAlgorithmId` type
2. Define pseudocode in 4 languages (JavaScript, Python, Java, C++)
3. Create algorithm definition with complexity metadata
4. Add to `SORTING_ALGORITHMS` array
5. Implement sorting logic in `generateSortingSteps()`

#### Modifying Styling

1. Edit `app/globals.css` for global changes
2. Use Tailwind classes in component `className` props
3. Reference CSS variables for brand colors (e.g., `--cyan-primary`)
4. Test responsive design on mobile (320px), tablet (768px), desktop (1920px+)

#### Adding a New Route

1. Create folder: `app/[route-name]/`
2. Add `page.tsx` with React component
3. Link from Header or other navigation
4. Test navigation and ensure Header persists

## Browser Support

- Modern browsers (Chrome 120+, Firefox 121+, Safari 17+, Edge 120+)
- Mobile browsers (iOS Safari 17+, Chrome Android latest)
- Requires JavaScript enabled

## Performance Considerations

- **Sorting Visualization**: Limited to ~100 elements for smooth animation (O(n²) algorithms become slow beyond this)
- **Code Splitting**: Next.js App Router automatically code-splits by route
- **Font Loading**: Google Fonts preloaded via next/font for CLS optimization
- **Image Optimization**: Next.js Image component used where applicable

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 already in use | Use `npm run dev -- -p 3001` to run on different port |
| ESLint errors after changes | Run `npm run lint` to identify issues |
| Styles not applying | Clear `.next` folder: `rm -rf .next` and restart dev server |
| Type errors in IDE | Ensure `tsconfig.json` is recognized by editor; restart TypeScript server |

## Future Enhancements

- [ ] Dynamic programming visualizations
- [ ] Graph algorithms (BFS, DFS, Dijkstra, etc.)
- [ ] Custom algorithm input/execution
- [ ] Dark/Light theme toggle
- [ ] Export visualizations as GIFs/videos
- [ ] Multiplayer algorithm race mode


## Deployment

The app can be deployed on any platform that supports Next.js.

Typical production flow:

1. npm run build
2. npm run start

For managed deployment, Vercel is the most straightforward option for Next.js projects.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes with clear messages
4. Push and open a Pull Request
5. Ensure `npm run lint` and `npm run build` pass

## License

This project is licensed under the [MIT License](LICENSE). See LICENSE file for details.
