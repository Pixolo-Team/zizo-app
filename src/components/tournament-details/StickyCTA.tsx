"use client";

// REACT //

// COMPONENTS //
import { Button } from "@/components/ui/button";

// OTHERS //
import Motion from "../animations/Motion";
import { shrinkIn } from "@/lib/animations";
import UploadBox2 from "../icons/neevo-icons/UploadBox2";

interface StickyCTAProps {
  isContactRevealed?: boolean;
  onRequestInterest?: () => void;
  onContactClick?: () => void;
  onShareBtnClick?: () => void;
}

export default function StickyCTA({
  isContactRevealed = false,
  onRequestInterest,
  onContactClick,
  onShareBtnClick,
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
    <div className="p-5 lg:p-7 bg-n-50 border-t border-n-200 z-50">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Motion variants={shrinkIn} delay={1.3}>
            <Button
              onClick={handleClick}
              className={`w-full h-[50px] rounded-[24px] lg:h-[63px] text-[16px] lg:text-xl font-medium transition-colors ${
                isContactRevealed
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-n-950 hover:bg-n-900 text-n-50"
              }`}
            >
              {isContactRevealed ? "Show Contact Details" : "I'm Interested"}
            </Button>
          </Motion>
        </div>

        {/* Share Icon */}
        {/* Share Button */}
        <Button
          variant={"ghost"}
          size="icon"
          className="size-[50px] lg:size-[63px] bg-n-100 rounded-full flex items-center justify-center"
          onClick={onShareBtnClick}
        >
          <UploadBox2
            primaryColor="var(--color-n-800)"
            className="size-[18px] lg:size-5"
          />
        </Button>
      </div>
    </div>
  );
}
