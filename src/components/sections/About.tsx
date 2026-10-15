import { getResume } from "@/lib/resume";
import Section from "./Section";

const About = () => {
  const { profile, stats } = getResume();
  const phrases = profile.aboutSubtitle.split(/,\s*/).filter(Boolean);
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        phrases.length > 1 ? (
          <span>
            {phrases.map((phrase, i) => (
              <span key={phrase}>
                <span className="whitespace-nowrap">{phrase}</span>
                {i < phrases.length - 1 ? ", " : ""}
              </span>
            ))}
          </span>
        ) : (
          profile.aboutSubtitle
        )
      }
    >
      <div className="grid gap-12 md:grid-cols-5">
        <p className="md:col-span-3 text-lg leading-relaxed text-ink-soft text-balance">
          {profile.summary}
        </p>
        <dl className="md:col-span-2 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border/70 bg-border/70 shadow-soft">
          {stats.map((s) => (
            <div key={s.label} className="bg-paper p-5">
              <dt className="font-mono-clean text-[11px] uppercase tracking-widest text-ink-soft">
                {s.label}
              </dt>
              <dd className="mt-2 font-serif-display text-3xl font-medium text-ink">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
};

export default About;
