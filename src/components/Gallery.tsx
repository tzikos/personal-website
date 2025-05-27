import React, { useRef, useEffect, useState } from "react";
import { ArrowLeftCircle, ArrowRightCircle, Camera } from "lucide-react";

// Sample gallery data - replace with your actual photos
const galleryImages = [
 {
    id: 1,
    src: "/images/gallery/norway_aurora.jpg",
    alt: "Gallery Image 6",
    caption: "Aurora Borealis in Norway"
},
  {
    id: 2,
    src: "/images/gallery/asty_milky.jpg",
    alt: "Gallery Image 1",
    caption: "Milky way core in Astypalea island"
  },
  {
    id: 3,
    src: "/images/gallery/ikaria_sunset.jpg",
    alt: "Gallery Image 5",
    caption: "Sunset in Ikaria island"
  },
  {
    id: 4,
    src: "/images/gallery/asty_psarema.jpg",
    alt: "Gallery Image 2",
    caption: "Fishing in Astypalea island"
  },
  {
    id: 5,
    src: "/images/gallery/asty_sea.jpg",
    alt: "Gallery Image 3",
    caption: "Sea view in Astypalea island"
  },
  {
    id: 6,
    src: "/images/gallery/cph_proposal.jpg",
    alt: "Gallery Image 4",
    caption: "Rosenborg Castle proposal"
  },
];

const Gallery = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  const handleImageLoad = (id: number) => {
    setImagesLoaded(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 400; // Adjust this value as needed
    const currentScrollPosition = scrollContainerRef.current.scrollLeft;
    
    scrollContainerRef.current.scrollTo({
      left: direction === "left" 
        ? currentScrollPosition - scrollAmount 
        : currentScrollPosition + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="badge bg-secondary text-secondary-foreground mb-4">
              Gallery
            </span>
            <h2 className="section-heading flex items-center">
              <Camera className="mr-2 h-8 w-8" /> Photography
            </h2>
            <p className="text-muted-foreground text-lg">
              Some of my favorite photographs from various adventures.
            </p>
          </div>

          <div className="relative">
            {showLeftArrow && (
              <button 
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/80 rounded-full p-1 shadow-md hover:bg-background transition-colors"
                aria-label="Scroll left"
              >
                <ArrowLeftCircle className="h-8 w-8" />
              </button>
            )}
            
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {galleryImages.map((image) => (
                <div 
                  key={image.id}
                  className="flex-none w-80 glass-card overflow-hidden hover-lift"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        imagesLoaded[image.id] ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => handleImageLoad(image.id)}
                    />
                    {!imagesLoaded[image.id] && (
                      <div className="absolute inset-0 bg-secondary/20 animate-pulse" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {showRightArrow && (
              <button 
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/80 rounded-full p-1 shadow-md hover:bg-background transition-colors"
                aria-label="Scroll right"
              >
                <ArrowRightCircle className="h-8 w-8" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;