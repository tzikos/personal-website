
import React, { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300">
            <span className="badge bg-secondary text-secondary-foreground mb-4 animate-slide-down">
              Data Analyst & Photographer
            </span>
          </div>
          
          <h1 className="animate-on-scroll opacity-0 transition-opacity duration-1000 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
            <span className="block mb-2">Alex Morgan</span>
            <span className="text-2xl md:text-3xl lg:text-4xl font-normal text-muted-foreground">
              Translating data into insights & moments into memories
            </span>
          </h1>
          
          <p className="animate-on-scroll opacity-0 transition-opacity duration-1000 delay-500 text-lg md:text-xl text-muted-foreground mt-6 mb-10 max-w-2xl mx-auto">
            Where analytical precision meets creative vision. I help businesses derive meaningful insights from data while capturing moments that tell compelling stories.
          </p>
          
          <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 delay-700 flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button 
              onClick={() => scrollToAbout()}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-300"
            >
              Explore My Work
            </button>
            <a 
              href="#contact"
              className="px-8 py-3 border border-primary/20 rounded-md hover:bg-secondary transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute left-0 right-0 bottom-10 flex justify-center animate-pulse-subtle">
        <button
          onClick={scrollToAbout}
          className="rounded-full bg-secondary p-2 hover:bg-secondary/80 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
      
      {/* Background subtle gradient */}
      <div className="absolute -top-40 -left-20 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/10 rounded-full blur-3xl opacity-50"></div>
    </section>
  );
};

export default Hero;
