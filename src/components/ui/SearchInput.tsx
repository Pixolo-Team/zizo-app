"use client";

// COMPONENTS //
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NewFilterSlide from "@/components/icons/neevo-icons/NewFilterSlide";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
  rightIcon?: boolean;
  onRightIconClick?: () => void;
};

export default function SearchInput({
  value = "",
  onChange,
  placeholder = "Search...",
  onClear,
  className,
  rightIcon,
  onRightIconClick,
}: Props) {
  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects

  return (
    <div className={`flex relative items-center gap-2 ${className ?? ""}`}>
      {/* Left Search Icon */}
      <div className="absolute top-1/2 -translate-y-1/2 left-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.12356 0.013203C6.4891 0.124463 5.03296 0.511383 3.88583 1.1392C1.89834 2.22694 0.639567 3.996 0.183336 6.34256C0.117571 6.68086 0.0730293 6.98186 0.027932 7.39256C-0.00934273 7.73212 -0.00929995 9.25368 0.0279962 9.59256C0.150443 10.705 0.349555 11.5226 0.704969 12.3726C0.836008 12.6859 1.15064 13.264 1.35516 13.5672C2.58912 15.3964 4.55899 16.5168 7.18186 16.8813C8.11418 17.0109 9.45175 17.0357 10.4306 16.9417C12.2828 16.7637 13.8091 16.2427 15.0441 15.3666L15.212 15.2475L16.6257 16.5672C17.7545 17.6209 18.0609 17.8963 18.146 17.9338C18.3053 18.0039 18.573 18.0117 18.7447 17.9512C18.9225 17.8886 19.1147 17.7086 19.1812 17.5426C19.2465 17.3795 19.2387 17.1297 19.1638 16.9826C19.1234 16.9032 18.8224 16.6101 17.7024 15.5598L16.292 14.237L16.4193 14.0798C17.3556 12.924 17.9117 11.4979 18.1027 9.76256C18.2027 8.85402 18.1759 7.59084 18.0381 6.72256C17.6487 4.26868 16.4504 2.42444 14.4951 1.26942C14.1723 1.07872 13.5542 0.784223 13.2198 0.661783C12.3429 0.340703 11.4852 0.153383 10.3765 0.040843C10.0139 0.00402299 8.52643 -0.014217 8.12356 0.013203ZM8.6673 1.42448C6.60774 1.5073 5.12974 1.94984 3.92246 2.84516C3.689 3.0183 3.22328 3.4541 3.03825 3.67256C2.16807 4.70002 1.69194 5.96174 1.54765 7.62256C1.51031 8.0523 1.51595 9.0434 1.55823 9.48256C1.73272 11.2954 2.33166 12.6649 3.39835 13.6901C3.86913 14.1425 4.35001 14.4753 4.93909 14.7563C5.81563 15.1744 6.70317 15.401 7.9513 15.5254C8.38105 15.5683 9.66831 15.5747 10.0886 15.5362C11.3903 15.4167 12.2754 15.1972 13.1832 14.7686C15.0749 13.8755 16.225 12.2192 16.5411 9.93256C16.6139 9.40568 16.6278 9.16906 16.6267 8.47256C16.6252 7.59184 16.5792 7.12452 16.4229 6.40256C15.9704 4.31336 14.7099 2.80932 12.7603 2.03226C12.0422 1.74608 11.0885 1.53818 10.1527 1.46382C9.78419 1.43454 8.95998 1.41272 8.6673 1.42448Z"
            fill="#62748E"
          />
        </svg>
      </div>

      {/* Input */}
      <Input
        type="search"
        value={value}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`pl-12 ${rightIcon ? "pr-12" : ""} h-[50px] ${className}`}
      />

      {/* Right Icon */}
      {rightIcon && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={onRightIconClick}
          className="absolute right-5 size-5 rounded-full hover:bg-n-100"
        >
          <NewFilterSlide
            className="size-5 rotate-90"
            primaryColor="var(--color-n-700)"
          />
        </Button>
      )}
    </div>
  );
}
