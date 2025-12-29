"use client";

// COMPONENTS //
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// OTHERS //
import { cn } from "@/lib/utils";

interface DialogBoxProps {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export default function DialogBox({
  trigger,
  title,
  description,
  children,
  isOpen,
  onOpenChange,
  className,
}: DialogBoxProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        <DialogHeader>
          {title && (
            <DialogTitle className="text-left text-lg text-n-700 leading-[20px]">
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription className="text-left text-xs text-n-500 leading-[20px]">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
