import { getResume } from "@/lib/resume";
import Section from "./Section";
import { Award, BadgeCheck, GraduationCap } from "lucide-react";

const Credentials = () => {
  const { education, certifications, awards } = getResume();
  return (
    <Section
      id="credentials"
      eyebrow="Credentials"
      title="Education, certifications, recognition."
    >
      <div className="divide-y divide-border/60 rounded-xl border border-border/70 bg-paper px-6 shadow-soft md:px-8">
        {/* Education */}
        <div className="grid gap-x-8 gap-y-3 py-5 md:grid-cols-[9rem_1fr]">
          <div className="flex items-center gap-2 font-mono-clean text-xs uppercase tracking-[0.2em] text-ochre md:self-start md:pt-1">
            <GraduationCap className="h-4 w-4" /> Education
          </div>
          <ul className="flex flex-wrap gap-x-10 gap-y-3">
            {education.map((e) => (
              <li key={e.school} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="w-full font-serif-display text-base text-ink md:w-auto md:text-lg">
                  {e.degree}
                </h3>
                <span aria-hidden className="hidden text-ochre md:inline">
                  ·
                </span>
                <span className="text-ink-soft">{e.school}</span>
                <span className="font-mono-clean text-xs whitespace-nowrap text-ink-soft/80">
                  {e.start} — {e.end}
                </span>
                {e.notes && <p className="w-full text-sm text-ink-soft">{e.notes}</p>}
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div className="grid gap-x-8 gap-y-3 py-5 md:grid-cols-[9rem_1fr]">
          <div className="flex items-center gap-2 font-mono-clean text-xs uppercase text-ochre md:self-start md:pt-1">
            <BadgeCheck className="h-4 w-4 shrink-0" /> Certifications
          </div>
          <ul className="flex flex-wrap gap-x-3 gap-y-2">
            {certifications.map((c) => (
              <li
                key={c.name}
                className="inline-flex items-baseline gap-2 rounded-md border border-border/70 px-3 py-1.5"
              >
                <span className="text-sm text-ink">{c.name}</span>
                <span className="font-mono-clean text-[10px] uppercase tracking-[0.15em] text-ink-soft">
                  {c.issuer} {c.year}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Awards */}
        <div className="grid gap-x-8 gap-y-3 py-5 md:grid-cols-[9rem_1fr]">
          <div className="flex items-center gap-2 font-mono-clean text-xs uppercase tracking-[0.2em] text-ochre md:self-start md:pt-1">
            <Award className="h-4 w-4" /> Awards
          </div>
          <ul className="space-y-2.5">
            {awards.map((a) => (
              <li key={a.title} className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5">
                <h4 className="font-serif-display text-base text-ink leading-snug text-balance">
                  {a.title}
                </h4>
                <span className="inline-flex items-baseline gap-x-2 whitespace-nowrap text-sm text-ink-soft">
                  {a.issuer}
                  <span className="font-mono-clean text-xs text-ink-soft/80">{a.year}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default Credentials;
