import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";

const groups = [
  { title: "Product", links: ["Features", "Pricing", "Virtual cards", "Security"] },
  { title: "Resources", links: ["Blog", "Docs", "Support", "Status"] },
  { title: "Company", links: ["About", "Careers", "Contact", "Press"] },
  { title: "Social", links: ["Twitter", "LinkedIn", "Discord", "Telegram"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/30 px-5 py-14">
      <div className="mx-auto w-[min(1200px,94vw)]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="font-display text-lg font-semibold">
                Nexa<span className="gradient-text">Fi</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Wealth, automated. An AI copilot that grows, protects and moves your money across
              150+ countries.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-sm font-semibold">{g.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NexaFi. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <a href="#" className="hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
