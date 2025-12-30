"use client";

import { Button } from "@/components/ui/button";
import Motion from "../animations/Motion";
import { shrinkIn } from "@/lib/animations";

interface StickyCTAProps {
  onInterested: () => void;
}

export default function StickyCTA({ onInterested }: StickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-5 bg-n-100 border-t border-n-200 z-50">
      <Motion variants={shrinkIn} delay={1.3}>
        <Button
          onClick={onInterested}
          className="w-full bg-n-950 hover:bg-n-900 text-n-50 text-[16px] font-medium h-[56px] rounded-[24px]"
        >
          I'm Interested
        </Button>
      </Motion>
    </div>
  );
}
