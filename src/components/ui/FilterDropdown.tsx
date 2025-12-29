"use client";

// COMPONENTS //
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Interface Props
interface FilterDropdownProps {
  title: string;
  options: string[];
  onChange: (value: string) => void;
  selectedOption: string;
  className?: string;
}

/** Filter Component */
export default function FilterDropdown({
  title = "",
  options = [],
  onChange,
  selectedOption,
  className,
}: FilterDropdownProps) {
  // Define Navigation

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects
  return (
    <Select value={selectedOption} onValueChange={onChange}>
      {/* Select Trigger */}
      <SelectTrigger
        isSelected={Boolean(selectedOption)}
        className={
          cn(selectedOption ? "bg-n-900 text-n-50" : "") + " " + className
        }
      >
        <SelectValue placeholder={title} />
      </SelectTrigger>

      {/* Select Content */}
      <SelectContent className="">
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
