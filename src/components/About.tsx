
import React, { useEffect, useRef } from "react";
import { Database, Code, Activity, LineChart, BookOpen, Award } from "lucide-react";

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
                  Mathematics & Data Science Enthusiast
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  I'm a Data Analyst with a strong mathematical background, currently pursuing an M.Sc. in Mathematical Modelling and Computation at DTU in Copenhagen, Denmark. My professional journey combines analytical rigor with practical data engineering solutions.
                </p>
                <p className="text-muted-foreground text-lg mb-8">
                  When I'm not analyzing data, you'll find me engaged in sports like calisthenics, marathons, and kickboxing, or exploring the outdoors through hiking and camping. Photography is another passion that helps me capture and share the world from a different perspective.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">Python</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">SQL</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">Tableau</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">Machine Learning</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">Google Cloud</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">Docker</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">R</span>
                  <span className="badge border-primary/20 bg-primary/5 text-primary-foreground">Git/GitHub</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-on-scroll opacity-0 transition-opacity duration-700 delay-300 space-y-4">
                <div className="glass-card p-6 hover-lift">
                  <Database className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Data Engineering</h3>
                  <p className="text-muted-foreground">
                    Building automated pipelines and preprocessing workflows for complex datasets.
                  </p>
                </div>
                
                <div className="glass-card p-6 hover-lift">
                  <LineChart className="h-10 w-10 text-green-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Data Visualization</h3>
                  <p className="text-muted-foreground">
                    Creating insightful reports and interactive dashboards with Tableau.
                  </p>
                </div>
              </div>
              
              <div className="animate-on-scroll opacity-0 transition-opacity duration-700 delay-500 space-y-4 mt-6">
                <div className="glass-card p-6 hover-lift">
                  <Code className="h-10 w-10 text-purple-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Machine Learning</h3>
                  <p className="text-muted-foreground">
                    Developing predictive models and algorithms for business insights.
                  </p>
                </div>
                
                <div className="glass-card p-6 hover-lift">
                  <Activity className="h-10 w-10 text-amber-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Forecasting</h3>
                  <p className="text-muted-foreground">
                    Applying statistical methods to predict trends and patterns in data.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="animate-on-scroll opacity-0 transition-opacity duration-700 delay-200">
              <div className="glass-card p-8 hover-lift h-full">
                <BookOpen className="h-10 w-10 text-blue-500 mb-6" />
                <h3 className="text-2xl font-medium mb-4">Education</h3>
                <ul className="space-y-4">
                  <li>
                    <div className="font-medium">M.Sc. Mathematical Modelling and Computation</div>
                    <div className="text-muted-foreground">DTU (Copenhagen) | 2024-2026</div>
                  </li>
                  <li>
                    <div className="font-medium">B.Sc. Mathematics</div>
                    <div className="text-muted-foreground">Aristotle University of Thessaloniki | 2016-2021</div>
                    <div className="text-sm text-muted-foreground mt-1">Focus: Data Analysis</div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="animate-on-scroll opacity-0 transition-opacity duration-700 delay-400">
              <div className="glass-card p-8 hover-lift h-full">
                <Award className="h-10 w-10 text-amber-500 mb-6" />
                <h3 className="text-2xl font-medium mb-4">Achievements & Certifications</h3>
                <ul className="space-y-4">
                  <li>
                    <div className="font-medium">Tableau Certified Data Analyst</div>
                    <div className="text-muted-foreground">Professional certification</div>
                  </li>
                  <li>
                    <div className="font-medium">Top 4% in Data Art & Storytelling</div>
                    <div className="text-muted-foreground">Data2Speak Competition | 05/2024</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
