import { getResume } from "@/lib/resume";
import Section from "./Section";
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";

const Contact = () => {
  const { profile, social } = getResume();
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something resilient."
    >
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <p className="text-lg text-ink-soft leading-relaxed text-balance">
            Whether you're modernizing infrastructure, scoping a migration, or just want to swap notes on FinOps
            and platform engineering — I'd love to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="hero" size="lg" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail className="mr-2 h-4 w-4" /> {profile.email}
              </a>
            </Button>
            <Button variant="outlineWarm" size="lg" asChild>
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Download resume
              </a>
            </Button>
          </div>
        </div>

        <ul className="md:col-span-2 space-y-px overflow-hidden rounded-xl border border-border/70 bg-border/70 shadow-soft">
          {social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between bg-paper px-5 py-4 transition-smooth hover:bg-secondary/60"
              >
                <span className="font-mono-clean text-xs uppercase tracking-[0.2em] text-ink-soft group-hover:text-ochre">
                  {s.label}
                </span>
                <span className="text-ink">{s.handle} →</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Contact;
