"use client";

// COMPONENTS //
import DialogBox from "@/components/ui/DialogBox";
import { Button } from "@/components/ui/button";

// OTHERS //
import { toast } from "sonner";
import Copy1 from "../../public/icons/neevo-icons/Copy1";
import InstagramLogo from "../../public/icons/neevo-icons/InstagramLogo";
import WhatsappLogo from "../../public/icons/neevo-icons/WhatsappLogo";

interface ShareDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  copyLink: string;
}

export default function ShareDialog({
  isOpen,
  onOpenChange,
  copyLink,
}: ShareDialogProps) {
  // Define Navigation

  // Define States

  // Define Helper Functions
  /** Copy link to clipboard */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyLink);
    toast.success("Link copied to clipboard");
  };

  // UseEffects

  return (
    <DialogBox
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Invite your team"
      description="Share the tournament link with players"
    >
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-4">
          {/* WhatsApp Button */}
          <Button
            className="h-11 rounded-[99px] border-none shadow-none text-n-50 hover:opacity-90 transition-opacity"
            style={{
              background:
                "linear-gradient(0deg, #00E510 0%, #00E510 100%), var(--n-100, #F1F5F9)",
            }}
          >
            {/* WhatsApp Icon */}
            <WhatsappLogo className="size-6" primaryColor="var(--color-n-50)" />
          </Button>

          {/* Instagram Button */}
          <Button
            className="h-11 rounded-[99px] border-none shadow-none text-n-50 hover:opacity-90 transition-opacity"
            style={{
              background:
                "linear-gradient(45deg, #FAAD4F 14.61%, #DD2A7B 39.38%, #9537B0 58.49%, #515BD4 85.39%), linear-gradient(0deg, #B43199 0%, #B43199 100%), var(--n-100, #F1F5F9)",
            }}
          >
            {/* Instagram Icon */}
            <InstagramLogo
              className="size-6"
              primaryColor="var(--color-n-50)"
            />
          </Button>
        </div>
        {/* Copy Link Button */}
        <div className="py-2 rounded-[99px] pl-4 pr-2 flex items-center justify-between border border-n-200">
          <p className="text-sm text-n-500 w-2/3">{copyLink}</p>
          <Button
            className="size-8 flex justify-center rounded-full hover:bg-n-200 items-center bg-n-100"
            onClick={copyToClipboard}
          >
            {/* Copy Icon */}
            <Copy1 primaryColor="var(--color-n-400)" className="size-3.5" />
          </Button>
        </div>
      </div>
    </DialogBox>
  );
}
