
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart, Code, ExternalLink } from "lucide-react";

const dataProjects = [
  {
    id: 1,
    title: "Plant Leaf Health Classification",
    description: "MLOps project with model training and deployment on Google Cloud (VertexAI, Cloud Run) using FastAPI, Streamlit, Docker, and GitHub Actions.",
    tags: ["Python", "MLOps", "Google Cloud", "Docker", "CI/CD"],
    image: "/lovable-uploads/7de6f91c-62f6-49d9-87a4-0bb34ff95a03.png",
  },
  {
    id: 2,
    title: "Patient Mortality Classification",
    description: "Deep Learning project using EHRMamba model on Physionet2012 dataset, achieving 85% accuracy with PyTorch and HPC/GPU resources.",
    tags: ["Deep Learning", "PyTorch", "Healthcare", "HPC"],
    image: "/lovable-uploads/66250694-5eff-4b35-bca4-eed7980b647d.png",
  },
  {
    id: 3,
    title: "Copenhagen Apartments Price Prediction",
    description: "Built a neural network model using PyTorch to predict rental prices with a Mean Absolute Error of 2000 DKK.",
    tags: ["Neural Networks", "PyTorch", "Regression", "Real Estate"],
    image: "/lovable-uploads/cf34e9cd-b118-40d2-8572-8928cba35708.png",
  },
];

const workExperience = [
  {
    id: 4,
    title: "Data & Research Analyst at Recognvte",
    description: "End-to-end reporting, automations with Python web scraping, NLP processing, and machine learning model development (AVM).",
    tags: ["Remote", "09/2023-Present", "SQL", "Python", "ML"],
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 5,
    title: "Data Analyst at Data to Action",
    description: "Data gathering (SQL, web scraping), manipulation, visualization (Tableau), and forecasting (scikit-learn).",
    tags: ["Athens", "11/2022-08/2023", "BI", "Forecasting"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 6,
    title: "Athens Tableau User Group",
    description: "Delivered an educational presentation for the Tableau user community, sharing data visualization best practices.",
    tags: ["Talk", "Teaching", "03/2024", "Volunteering"],
    image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&q=80&w=1000",
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
          View Details <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const dataSectionRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLDivElement>(null);
  
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
    if (workSectionRef.current) observer.observe(workSectionRef.current);

    return () => {
      if (dataSectionRef.current) observer.unobserve(dataSectionRef.current);
      if (workSectionRef.current) observer.unobserve(workSectionRef.current);
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
                  Projects
                </span>
                <h2 className="section-heading flex items-center">
                  <BarChart className="mr-2 h-8 w-8" /> Data Science Portfolio
                </h2>
                <p className="text-muted-foreground text-lg">
                  A selection of my data science and machine learning projects, showcasing my technical skills and analytical approaches.
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
        id="experience"
        ref={workSectionRef}
        className="py-20 md:py-28 bg-white dark:bg-gray-950"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div className="max-w-2xl">
                <span className="badge bg-secondary text-secondary-foreground mb-4">
                  Experience
                </span>
                <h2 className="section-heading flex items-center">
                  <Code className="mr-2 h-8 w-8" /> Professional Journey
                </h2>
                <p className="text-muted-foreground text-lg">
                  My work experience and contributions in data analysis, research, and community involvement.
                </p>
              </div>
              <a
                href="#"
                className="hidden md:inline-flex items-center text-sm font-medium px-4 py-2 rounded-md border hover:bg-secondary transition-colors"
              >
                Download CV <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workExperience.map((project, index) => (
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
                Download CV <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
