
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart, Camera, ExternalLink } from "lucide-react";

const dataProjects = [
  {
    id: 1,
    title: "E-commerce Customer Behavior Analysis",
    description: "Analyzed purchase patterns and user engagement to optimize conversion rates and user experience.",
    tags: ["Python", "SQL", "Tableau", "A/B Testing"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    title: "Healthcare Patient Data Dashboard",
    description: "Created interactive dashboard visualizing patient outcomes and treatment efficacy across demographics.",
    tags: ["R", "Power BI", "Statistical Analysis"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    title: "Financial Market Trend Prediction",
    description: "Developed predictive models for market trends using historical data and machine learning algorithms.",
    tags: ["Python", "Machine Learning", "Time Series Analysis"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
  },
];

const photoProjects = [
  {
    id: 4,
    title: "Urban Architecture Series",
    description: "Exploration of modern urban structures and their interaction with light and shadow.",
    tags: ["Architecture", "Urban", "Black & White"],
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 5,
    title: "Portraits of Innovation",
    description: "Portrait series of innovators and creators in their natural work environments.",
    tags: ["Portrait", "Environmental", "Natural Light"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 6,
    title: "Natural Landscapes",
    description: "Capturing the serene beauty and dramatic moments of natural landscapes and environments.",
    tags: ["Landscape", "Nature", "Long Exposure"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000",
  },
];

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    image: string;
  };
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`glass-card overflow-hidden group hover-lift ${className}`}>
      <div className="aspect-video relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 image-fade-in ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span key={i} className="badge text-xs bg-secondary text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
        <a
          href="#"
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View Project <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const dataSectionRef = useRef<HTMLDivElement>(null);
  const photoSectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".animate-on-scroll");
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("opacity-100");
                el.classList.remove("opacity-0");
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (dataSectionRef.current) observer.observe(dataSectionRef.current);
    if (photoSectionRef.current) observer.observe(photoSectionRef.current);

    return () => {
      if (dataSectionRef.current) observer.unobserve(dataSectionRef.current);
      if (photoSectionRef.current) observer.unobserve(photoSectionRef.current);
    };
  }, []);

  return (
    <>
      <section
        id="data"
        ref={dataSectionRef}
        className="py-20 md:py-28 bg-secondary/50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div className="max-w-2xl">
                <span className="badge bg-secondary text-secondary-foreground mb-4">
                  Data Projects
                </span>
                <h2 className="section-heading flex items-center">
                  <BarChart className="mr-2 h-8 w-8" /> Data Analysis Portfolio
                </h2>
                <p className="text-muted-foreground text-lg">
                  A selection of my data analysis and visualization projects, showcasing a range of analytical approaches and business solutions.
                </p>
              </div>
              <a
                href="#"
                className="hidden md:inline-flex items-center text-sm font-medium px-4 py-2 rounded-md border hover:bg-secondary transition-colors"
              >
                View All Projects <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-on-scroll opacity-0 transition-opacity duration-700"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex justify-center md:hidden">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium px-4 py-2 rounded-md border hover:bg-secondary transition-colors"
              >
                View All Projects <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="photography"
        ref={photoSectionRef}
        className="py-20 md:py-28 bg-white dark:bg-gray-950"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div className="max-w-2xl">
                <span className="badge bg-secondary text-secondary-foreground mb-4">
                  Photography
                </span>
                <h2 className="section-heading flex items-center">
                  <Camera className="mr-2 h-8 w-8" /> Photography Portfolio
                </h2>
                <p className="text-muted-foreground text-lg">
                  Selected photography works spanning various styles and subjects, from portraiture to landscapes.
                </p>
              </div>
              <a
                href="#"
                className="hidden md:inline-flex items-center text-sm font-medium px-4 py-2 rounded-md border hover:bg-secondary transition-colors"
              >
                View Full Gallery <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photoProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-on-scroll opacity-0 transition-opacity duration-700"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex justify-center md:hidden">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium px-4 py-2 rounded-md border hover:bg-secondary transition-colors"
              >
                View Full Gallery <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
