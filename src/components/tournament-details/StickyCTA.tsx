"use client";

// REACT //

// COMPONENTS //
import { Button } from "@/components/ui/button";

// OTHERS //
import Motion from "../animations/Motion";
import { shrinkIn } from "@/lib/animations";

interface StickyCTAProps {
  isContactRevealed?: boolean;
  onRequestInterest?: () => void;
  onContactClick?: () => void;
}

export default function StickyCTA({
  isContactRevealed = false,
  onRequestInterest,
  onContactClick,
}: Readonly<StickyCTAProps>) {
  const handleClick = () => {
    // WHY: First interaction converts intent → interest
    if (!isContactRevealed) {
      onRequestInterest?.();
      return;
    }

    // WHY: Second interaction should reveal contact options
    onContactClick?.();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-5 bg-n-100 border-t border-n-200 z-50">
      <Motion variants={shrinkIn} delay={1.3}>
        <Button
          onClick={handleClick}
          className={`w-full h-[56px] rounded-[24px] text-[16px] font-medium transition-colors ${
            isContactRevealed
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-n-950 hover:bg-n-900 text-n-50"
          }`}
        >
          {isContactRevealed ? "Show Contact Details" : "I'm Interested"}
        </Button>
      </Motion>
    </div>
  );
}
