import { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

const Section = ({ id, eyebrow, title, children, className = "" }: SectionProps) => (
  <section id={id} className={`container-prose py-12 md:py-16 ${className}`}>
    <div className="mb-10 border-b border-border/70 pb-6">
      <h2 className="font-serif-display text-3xl md:text-5xl font-medium text-ink text-balance">
        {eyebrow}
      </h2>
      <p className="mt-3 font-mono-clean text-sm uppercase tracking-[0.2em] text-ink-soft">
        {title}
      </p>
    </div>
    {children}
  </section>
);

export default Section;
