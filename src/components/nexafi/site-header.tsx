import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoWordmark } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="mx-auto mt-3 flex w-[min(1200px,94vw)] items-center justify-between rounded-2xl glass px-4 py-2.5 soft-shadow">
        <Link to="/" aria-label="NexaFi home">
          <LogoWordmark />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/dashboard">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="brand-gradient rounded-full text-white glow">
            <Link to="/dashboard">Get Started</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 w-[min(1200px,94vw)] rounded-2xl glass p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
              Admin console
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
