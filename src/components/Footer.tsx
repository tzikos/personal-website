
import React from "react";
import { ChevronUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-12 bg-white dark:bg-gray-950 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <button
            onClick={scrollToTop}
            className="mb-8 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
          
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium mb-2">Alex Morgan</h3>
            <p className="text-muted-foreground">
              Data Analyst & Photographer
            </p>
          </div>
          
          <div className="flex space-x-6 mb-8">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Alex Morgan. All rights reserved.</p>
            <p className="mt-1">
              <a
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>{" "}
              •{" "}
              <a
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
