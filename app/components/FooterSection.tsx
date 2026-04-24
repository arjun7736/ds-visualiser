import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

type SocialButtonProps = {
  label: string;
  children: ReactNode;
};

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: ["Features", "Visualizer", "API", "Changelog"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Tutorials", "Community", "Support"],
  },
  {
    title: "Company",
    links: ["About", "Privacy", "Terms", "Security"],
  },
];

function TerminalIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        width="20"
        x="2"
        y="4"
      />
      <path
        d="m7 10 3 2.5L7 15m6 0h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function GlobeIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M3.8 9h16.4M3.8 15h16.4M12 3c2.6 2.3 4 5.6 4 9s-1.4 6.7-4 9c-2.6-2.3-4-5.6-4-9s1.4-6.7 4-9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function NetworkIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="4.5" fill="currentColor" r="2.2" />
      <circle cx="4.8" cy="12" fill="currentColor" r="2.2" />
      <circle cx="19.2" cy="12" fill="currentColor" r="2.2" />
      <circle cx="12" cy="19.5" fill="currentColor" r="2.2" />
      <path
        d="M12 6.7v10.6M7 12h10.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SocialButton({ label, children }: SocialButtonProps) {
  return (
    <button
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-400 transition hover:bg-cyan-400/10 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
      type="button"
    >
      {children}
    </button>
  );
}

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden  bg-[#030712]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#030712_0%,#020610_100%)]" />

      <div className="relative mx-auto w-full max-w-[1700px] px-5 pt-12 md:px-8 md:pt-14">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:gap-10 md:pb-14">
          <section className="max-w-[490px]">
            <h4 className="ds-title text-cyan-400">
              AlgoVision
            </h4>
            <p className="ds-body mt-4 text-slate-400">
              The ultimate platform for algorithm visualization and data
              structure mastery.
            </p>
            <div className="mt-5 flex items-center">
              <SocialButton label="Terminal">
                <TerminalIcon className="h-6 w-6" />
              </SocialButton>
              <SocialButton label="Global community">
                <GlobeIcon className="h-6 w-6" />
              </SocialButton>
              <SocialButton label="Network">
                <NetworkIcon className="h-6 w-6" />
              </SocialButton>
            </div>
          </section>

          {FOOTER_COLUMNS.map((column) => (
            <section key={column.title}>
              <h5 className="ds-subtitle font-heading text-slate-100">
                {column.title}
              </h5>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      className="ds-body text-slate-400 transition hover:text-cyan-300"
                      href="#"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <div className="relative border-t border-cyan-100/10 px-5 py-7 md:px-8 md:py-8">
        <p className="ds-small text-center text-slate-500">
          © 2024 AlgoVision. Built for high-velocity engineering.
        </p>
      </div>
    </footer>
  );
}
