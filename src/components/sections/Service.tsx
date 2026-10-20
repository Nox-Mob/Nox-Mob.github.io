import { getResume } from "@/lib/resume";
import Section from "./Section";

const Service = () => {
  const { service } = getResume();

  return (
    <Section id="service" eyebrow="National Guard Service" title={service.dateRange}>
      <div className="border-l-2 border-ochre/70 pl-5 md:pl-7">
        <h3 className="font-serif-display text-xl font-medium text-ink md:text-2xl">
          {service.organization}
        </h3>
        <div className="mt-5 space-y-6 md:space-y-8">
          {service.roles.map((serviceRole) => (
            <div
              key={serviceRole.role}
              className="border-t border-border/70 pt-5 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h4 className="font-serif-display text-lg font-medium text-ink md:text-xl">
                  {serviceRole.role}
                </h4>
                <span className="font-mono-clean text-xs uppercase text-ink-soft">
                  {serviceRole.type}
                </span>
              </div>
              <p className="mt-3 leading-relaxed text-ink-soft">{serviceRole.summary}</p>
              <ul className="mt-4 space-y-3">
                {serviceRole.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-ink-soft">
                    <span aria-hidden className="mt-2.5 h-1 w-3 flex-none bg-ochre" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Service;
