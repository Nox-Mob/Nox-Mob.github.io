import { getResume } from "@/lib/resume";

const Footer = () => {
  const { profile } = getResume();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/70 bg-paper">
      <div className="container-prose flex flex-col items-start justify-between gap-3 py-8 md:flex-row md:items-center">
        <p className="font-mono-clean text-xs uppercase tracking-[0.2em] text-ink-soft">
          © {year} {profile.name} · {profile.website}
        </p>
        <p className="font-mono-clean text-xs text-ink-soft/70">
          Designed and built by hand. Powered by a single JSON file.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
