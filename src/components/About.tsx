
import React, { useEffect, useRef } from "react";
import { Database, Camera, Sparkles, LineChart } from "lucide-react";

const About = () => {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 bg-white dark:bg-gray-950"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="animate-on-scroll opacity-0 transition-opacity duration-700">
                <span className="badge bg-secondary text-secondary-foreground mb-6">
                  About Me
                </span>
                <h2 className="section-heading">
                  Merging data science and visual storytelling
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  I'm a data analyst with a passion for photography, bringing together analytical precision and creative expression. With over 8 years of experience in data analysis and 5 years as a professional photographer, I offer a unique perspective that bridges both worlds.
                </p>
                <p className="text-muted-foreground text-lg mb-8">
                  My approach combines rigorous data methodology with the aesthetic sensibility of a photographer—finding patterns, revealing insights, and telling compelling stories through both numbers and images.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">Data Visualization</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">Python</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">SQL</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">Tableau</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">Portrait Photography</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">Landscape Photography</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">Adobe Lightroom</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">Photoshop</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-on-scroll opacity-0 transition-opacity duration-700 delay-300 space-y-4">
                <div className="glass-card p-6 hover-lift">
                  <Database className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Data Analysis</h3>
                  <p className="text-muted-foreground">
                    Transforming complex datasets into actionable business insights.
                  </p>
                </div>
                
                <div className="glass-card p-6 hover-lift">
                  <LineChart className="h-10 w-10 text-green-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Data Visualization</h3>
                  <p className="text-muted-foreground">
                    Creating clear, compelling visual narratives from data.
                  </p>
                </div>
              </div>
              
              <div className="animate-on-scroll opacity-0 transition-opacity duration-700 delay-500 space-y-4 mt-6">
                <div className="glass-card p-6 hover-lift">
                  <Camera className="h-10 w-10 text-purple-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Photography</h3>
                  <p className="text-muted-foreground">
                    Capturing meaningful moments with artistic perspective.
                  </p>
                </div>
                
                <div className="glass-card p-6 hover-lift">
                  <Sparkles className="h-10 w-10 text-amber-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Creative Direction</h3>
                  <p className="text-muted-foreground">
                    Guiding visual storytelling with strategic creative vision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
