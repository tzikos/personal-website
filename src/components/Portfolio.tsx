import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart, Code, ExternalLink } from "lucide-react";
import ProjectDetailDialog from "./ProjectDetailDialog";
import { Presentation } from "lucide-react"; 
import Gallery from "./Gallery"; // Import the new Gallery component

const dataProjects = [
  {
    id: 1,
    title: "Plant Leaf Health Classification",
    description: "MLOps project with model training and deployment on Google Cloud (VertexAI, Cloud Run) using FastAPI, Streamlit, Docker, and GitHub Actions.",
    detailedDescription: "This project leverages deep learning techniques to identify plant diseases from leaf images. I built a complete MLOps pipeline with automated CI/CD using GitHub Actions, containerized the application with Docker, and deployed it on Google Cloud. The system includes a Streamlit frontend for easy interaction and a FastAPI backend for efficient inference.",
    tags: ["Python", "MLOps", "Google Cloud", "Docker", "CI/CD"],
    image: "/images/plants.png",
  },
  {
    id: 2,
    title: "Patient Mortality Classification",
    description: "Deep Learning project using EHRMamba model on Physionet2012 dataset, achieving 85% accuracy with PyTorch and HPC/GPU resources.",
    detailedDescription: "I implemented and fine-tuned an EHRMamba model to predict patient mortality from electronic health records. The project involved processing time-series medical data, implementing custom loss functions, and leveraging DTU's high-performance computing cluster to efficiently train deep neural networks with large datasets.",
    tags: ["Deep Learning", "PyTorch", "Healthcare", "HPC"],
    image: "/images/patient.png",
  },
  {
    id: 3,
    title: "Copenhagen Apartments Price Prediction",
    description: "Built a neural network model using PyTorch to predict rental prices with a Mean Absolute Error of 2000 DKK.",
    detailedDescription: "This regression project focused on predicting apartment rental prices in Copenhagen using features like location, size, and amenities. I engineered custom features, performed data cleaning and normalization, and developed a neural network architecture optimized for pricing predictions with strong real-world performance.",
    tags: ["Neural Networks", "PyTorch", "Regression", "Real Estate"],
    image: "/images/cph.png",
  },
];

const workExperience = [
  {
    id: 4,
    title: "Data & Research Analyst at Recognyte",
    description: "End-to-end reporting, automations with Python web scraping, NLP processing, and machine learning model development (AVM).",
    detailedDescription: "At Recognyte, I lead end-to-end data analytics projects from data collection to actionable insights. My work includes building automated valuation models (AVMs), creating ETL pipelines for financial data processing, and developing interactive dashboards for decision-makers. I've also implemented NLP solutions to extract insights from unstructured text data.",
    tags: ["Remote", "09/2023-Present", "SQL", "Python", "ML"],
    image: "/images/recognyte.png",
  },
  {
    id: 5,
    title: "Data Analyst at Data to Action",
    description: "Data gathering (SQL, web scraping), manipulation, visualization (Tableau), and forecasting (scikit-learn).",
    detailedDescription: "At Data to Action, I specialized in transforming raw data into business insights through advanced analytics and visualization. I created demand forecasting models for retail clients, built automated data reporting systems, and developed web scraping solutions for market intelligence gathering.",
    tags: ["Athens", "11/2022-08/2023", "BI", "Forecasting"],
    image: "images/action.jpg",
  },
];

const talks = [
  {
    id: 6,
    title: "Athens Tableau User Group",
    description: "Delivered an educational presentation for the Tableau user community, sharing data visualization best practices.",
    detailedDescription: "I presented advanced visualization techniques and best practices to the Athens Tableau user community, demonstrating how to effectively communicate complex data insights. The presentation covered creating interactive dashboards, optimizing for performance, and design principles for clear data storytelling.",
    tags: ["Talk", "Teaching", "03/2024", "Volunteering"],
    image: "images/tableau.jpeg",
  },
];

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    detailedDescription?: string;
    tags: string[];
    image: string;
  };
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
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
          <button
            onClick={() => setShowDetails(true)}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
      
      <ProjectDetailDialog
        project={project}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
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
                href="https://www.linkedin.com/in/dimitris-papantzikos/details/projects/"
                target="_blank"
                rel="noopener noreferrer"
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
                href="https://www.linkedin.com/in/dimitris-papantzikos/details/projects/"
                target="_blank"
                rel="noopener noreferrer"
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
                href="/CV2025_Dimitris_Papantzikos.pdf"
                className="hidden md:inline-flex items-center text-sm font-medium px-4 py-2 rounded-md border hover:bg-secondary transition-colors"
                download
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
                href="/CV2025_Dimitris_Papantzikos.pdf"
                className="inline-flex items-center text-sm font-medium px-4 py-2 rounded-md border hover:bg-secondary transition-colors"
                download
              >
                Download CV <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="talks"
        className="py-20 md:py-28 bg-white dark:bg-gray-950"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div className="max-w-2xl">
                <span className="badge bg-secondary text-secondary-foreground mb-4">
                  Talks
                </span>
                <h2 className="section-heading flex items-center">
                  <Presentation className="mr-2 h-8 w-8" /> Sharing Knowledge
                </h2>
                <p className="text-muted-foreground text-lg">
                  Engaging with the community through talks and presentations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {talks.map((talk, index) => (
                <div
                  key={talk.id}
                  className="animate-on-scroll opacity-0 transition-opacity duration-700"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <ProjectCard project={talk} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add the Gallery section here */}
      <Gallery />
    </>
  );
};

export default Portfolio;