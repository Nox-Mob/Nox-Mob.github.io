import { useEffect, useState } from "react";
import { getResume } from "@/lib/resume";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

const Nav = () => {
  const { profile } = getResume();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-smooth ${
        scrolled
          ? "border-b border-border/70 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-prose flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-serif-display text-lg text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-paper font-mono-clean text-xs">
            {initials}
          </span>
          <span className="hidden sm:inline italic">{profile.name}</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-ink-soft transition-smooth hover:bg-secondary/60 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/resume.pdf"
          download
          className="rounded-full border border-border bg-paper px-4 py-1.5 text-xs font-mono-clean uppercase tracking-widest text-ink-soft transition-smooth hover:border-ochre hover:text-ink"
        >
          Resume
        </a>
      </nav>
    </header>
  );
};

export default Nav;
