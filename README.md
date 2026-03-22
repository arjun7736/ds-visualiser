# DS Visualiser

A modern, high-fidelity algorithm visualization dashboard built with Next.js App Router, React 19, TypeScript, and Tailwind CSS v4.

The project currently includes:

- A landing dashboard page for algorithm exploration
- A simulation workspace page with controls, chart area, and live code panel
- A comparison engine page for side-by-side algorithm performance visualization

## Tech Stack

- Next.js 16.2.1 (App Router)
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- ESLint 9 with eslint-config-next
- next/font (Google fonts: Manrope + Sora)

## Routes

- / : Landing dashboard
- /simulation : Simulation workspace UI
- /comparison : Comparison engine UI

## Project Structure

```text
app/
	components/
		dashboard/
			ConsoleShell.tsx
			ConsoleSidebar.tsx
			Header.tsx
			PageContent.tsx
			Sidebar.tsx
			TopHeader.tsx
		pages/
			ComparisonEngine.tsx
			SimulationWorkspace.tsx
	comparison/
		page.tsx
	simulation/
		page.tsx
	globals.css
	layout.tsx
	page.tsx
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

- npm run dev: Start local development server
- npm run build: Create production build
- npm run start: Run production server
- npm run lint: Run ESLint

## UI Architecture

- app/page.tsx renders the landing dashboard using Header + Sidebar + PageContent.
- app/simulation/page.tsx and app/comparison/page.tsx use a shared ConsoleShell for consistent chrome.
- Feature-level content blocks are isolated in app/components/pages for maintainability.

## Styling Notes

- Tailwind CSS v4 is used via app/globals.css.
- Typography is managed through next/font in app/layout.tsx.
- The visual system emphasizes dark gradients, neon-accent highlights, and dense information panels.

## Quality Checks

Recommended validation before pushing changes:

```bash
npm run lint
npm run build
```

## Deployment

The app can be deployed on any platform that supports Next.js.

Typical production flow:

1. npm run build
2. npm run start

For managed deployment, Vercel is the most straightforward option for Next.js projects.

## Contributing

1. Create a feature branch.
2. Keep components focused and reusable.
3. Follow existing naming and folder conventions.
4. Run lint and build checks locally.
5. Open a pull request with a concise summary of UI and structural changes.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
