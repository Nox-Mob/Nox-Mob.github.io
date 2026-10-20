import { getResume } from "@/lib/resume";
import Section from "./Section";

const Experience = () => {
  const { experience } = getResume();
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="10+ years of delivering results"
    >
      <ol className="relative space-y-10 border-l border-border/70 pl-6 md:pl-10">
        {experience.map((job) => (
          <li key={job.company + job.start} className="group relative">
            <span className="absolute -left-[33px] md:-left-[45px] top-2 grid h-3 w-3 place-items-center">
              <span className="h-3 w-3 rounded-full border border-ochre bg-paper transition-smooth group-hover:bg-ochre" />
            </span>
            <div className="rounded-xl border border-border/70 bg-paper p-6 md:p-8 shadow-soft transition-smooth hover:shadow-card hover:-translate-y-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="font-serif-display text-xl md:text-2xl font-medium text-ink">
                  {job.role} <span className="text-ochre">·</span> {job.company}
                </h3>
                <span className="font-mono-clean text-xs uppercase tracking-[0.2em] text-ink-soft">
                  {job.start} — {job.end}
                </span>
              </div>
              <p className="mt-1 font-mono-clean text-xs uppercase tracking-widest text-ink-soft/80">
                {job.location}
              </p>
              <p className="mt-4 text-ink-soft leading-relaxed">{job.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {job.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-ink-soft">
                    <span aria-hidden className="mt-2.5 h-1 w-3 flex-none bg-ochre" />
                    <span className="text-balance">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
};

export default Experience;
