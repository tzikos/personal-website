import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import AnimatedBubbles from "./AnimatedBubbles";

interface ProjectDetailDialogProps {
  project: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    image: string;
    detailedDescription?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectDetailDialog: React.FC<ProjectDetailDialogProps> = ({
  project,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden p-0">
        {/* Wrapper for relative positioning context (needed for AnimatedBubbles) */}
        <div className="relative w-full h-full">
          {/* Animated Bubbles Background - positioned absolutely within the relative wrapper */}
          <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none z-0">
            <AnimatedBubbles />
          </div>

          {/* Scrollable content container */}
          <div className="relative z-10 overflow-y-auto max-h-[85vh] p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
              <VisuallyHidden.Root>
                <DialogDescription>
                  Details about {project.title}
                </DialogDescription>
              </VisuallyHidden.Root>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag, i) => (
                  <Badge key={i} className="bg-secondary text-secondary-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </DialogHeader>

            <div className="aspect-video overflow-hidden rounded-md mt-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 mt-4">
              <p className="text-muted-foreground">{project.description}</p>

              {project.detailedDescription && (
                <div className="bg-background/80 backdrop-blur-sm rounded-md p-4">
                  <h3 className="text-lg font-semibold mb-2">Detailed Overview</h3>
                  <p className="text-muted-foreground">{project.detailedDescription}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailDialog;
