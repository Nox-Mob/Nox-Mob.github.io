import { getResume } from "@/lib/resume";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";

const Hero = () => {
  const { profile } = getResume();
  return (
    <section className="relative overflow-hidden">
      {/* warm ambient blobs */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-glow" />
      <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-ochre-soft/25 blur-3xl animate-blob-drift" />
      <div className="pointer-events-none absolute top-40 -left-24 h-[360px] w-[360px] rounded-full bg-ochre/10 blur-3xl animate-blob-drift [animation-delay:-6s]" />

      <div className="container-prose relative pt-24 pb-16 md:pt-32 md:pb-20">



        <div className="border-l-2 border-ochre/70 pl-5 md:pl-7 animate-fade-up">
          <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] text-balance text-ink animate-fade-up">
            {profile.name}
          </h1>

          <p className="mt-5 max-w-2xl font-mono-clean text-sm uppercase tracking-[0.2em] text-ink-soft animate-fade-up [animation-delay:120ms]">
            {profile.title}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono-clean text-xs text-ink-soft animate-fade-up [animation-delay:160ms]">
            <span>{profile.location}</span>
            <span aria-hidden className="text-ochre">
              ·
            </span>
            <a href={`mailto:${profile.email}`} className="transition-smooth hover:text-ochre">
              {profile.email}
            </a>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-soft text-balance leading-relaxed animate-fade-up [animation-delay:200ms]">
          {profile.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:300ms]">
          <Button variant="hero" size="lg" asChild>
            <a href="#experience">
              View experience <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outlineWarm" size="lg" asChild>
            <a href="/resume.pdf" download>
              Download resume <Download className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
