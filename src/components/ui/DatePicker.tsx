"use client";

// COMPONENTS //
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// OTHERS //
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: string | undefined;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) {
  const dateValue = value ? new Date(value) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between text-left font-normal text-n-950",
            !value && "text-n-950",
            className
          )}
        >
          {dateValue ? (
            format(dateValue, "dd/MM/yyyy")
          ) : (
            <span>{placeholder}</span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            className={cn("size-3 text-n-950 mr-2")}
          >
            <path
              d="M0.5 0.5L5 5L9.5 0.5"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 mr-4" align="start">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={(date) => onChange(date ? format(date, "yyyy-MM-dd") : "")}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
