import { getResume } from "@/lib/resume";
import Section from "./Section";

const Service = () => {
  const { service } = getResume();

  return (
    <Section id="service" eyebrow="Military Service" title={service.organization}>
      <div className="border-l-2 border-ochre/70 pl-5 md:pl-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="font-serif-display text-xl font-medium text-ink md:text-2xl">
            {service.role}
          </h3>
          <span className="font-mono-clean text-xs uppercase text-ink-soft">
            {service.status}
          </span>
        </div>
        <p className="mt-4 leading-relaxed text-ink-soft">{service.summary}</p>
        <ul className="mt-5 space-y-3">
          {service.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-ink-soft">
              <span aria-hidden className="mt-2.5 h-1 w-3 flex-none bg-ochre" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Service;
