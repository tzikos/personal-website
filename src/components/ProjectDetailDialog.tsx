
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag, i) => (
              <Badge key={i} className="bg-secondary text-secondary-foreground">
                {tag}
              </Badge>
            ))}
          </DialogDescription>
        </DialogHeader>
        
        <div className="aspect-video overflow-hidden rounded-md mb-4">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">{project.description}</p>
          
          {project.detailedDescription && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Detailed Overview</h3>
              <p className="text-muted-foreground">{project.detailedDescription}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailDialog;
