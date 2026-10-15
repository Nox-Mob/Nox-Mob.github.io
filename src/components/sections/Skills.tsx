import { getResume } from "@/lib/resume";
import Section from "./Section";

const Skills = () => {
  const { skills } = getResume();
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="The toolkit."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.category}
            className="group rounded-xl border border-border/70 bg-paper p-6 shadow-soft transition-smooth hover:shadow-card"
          >
            <h3 className="font-serif-display text-xl text-ink">{group.category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-sm text-ink-soft transition-smooth hover:border-ochre hover:text-ink"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
