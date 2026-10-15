import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Service from "@/components/sections/Service";
import Skills from "@/components/sections/Skills";
import Credentials from "@/components/sections/Credentials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { useEffect } from "react";
import { getResume } from "@/lib/resume";

const Index = () => {
  const { profile } = getResume();

  useEffect(() => {
    document.title = `${profile.name} — ${profile.title}`;
    const desc = `${profile.name}: ${profile.title}. ${profile.tagline}`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc.slice(0, 158));

    // canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = `https://${profile.website}/`;

    // JSON-LD person schema
    const ldId = "person-jsonld";
    document.getElementById(ldId)?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = ldId;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      url: `https://${profile.website}`,
      email: profile.email,
      address: { "@type": "PostalAddress", addressLocality: profile.location },
    });
    document.head.appendChild(script);
  }, [profile]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Service />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
