"use client";
// REACT //
import { useEffect, useState } from "react";

// COMPONENTS //
import { Button } from "@/components/ui/button";
import Copy1 from "@/components/icons/neevo-icons/Copy1";
import InstagramLogo from "@/components/icons/neevo-icons/InstagramLogo";
import WhatsappLogo from "@/components/icons/neevo-icons/WhatsappLogo";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { toast } from "sonner";

// UTILS //
import { generateTournamentLink } from "@/utils/generate";

interface ShareDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tournamentId: string;
}

export default function ShareDrawer({
  isOpen,
  onOpenChange,
  tournamentId,
}: Readonly<ShareDrawerProps>) {
  // Define Navigation

  // Define States
  const [copyLink, setCopyLink] = useState<string>("");

  // Helper Functions
  /** Copy link to clipboard */
  const copyToClipboard = () => {
    // Exit if not possible to Copy
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(copyLink);
    toast.success("Link copied");
  };

  /** Share on WhatsApp */
  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(copyLink)}`;
    window.open(url, "_blank");
  };

  /** Share on Instagram */
  const shareOnInstagram = () => {
    copyToClipboard();
    const url = `https://instagram.com`;
    window.open(url, "_blank");
    toast.info("Link copied! Paste it on Instagram.");
  };

  // UseEffects
  useEffect(() => {
    setCopyLink(
      `${window.location.origin}${generateTournamentLink(tournamentId)}`
    );
  }, [tournamentId]);

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader
          title="Invite your team"
          subTitle="Share the tournament link with players"
        />

        {/* Drawer Body */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            {/* WhatsApp Button */}
            <Button
              className="h-11 rounded-full border-none shadow-none hover:opacity-90 transition-opacity items-center justify-center pointer-events-auto cursor-pointer"
              style={{
                background:
                  "linear-gradient(0deg, #00E510 0%, #00E510 100%), var(--color-n-100, #F1F5F9)",
              }}
              onClick={shareOnWhatsApp}
            >
              {/* WhatsApp Icon */}
              <WhatsappLogo
                className="size-6"
                primaryColor="var(--color-n-950)"
              />
            </Button>

            {/* Instagram Button */}
            <Button
              className="h-11 rounded-full border-none shadow-none hover:opacity-90 transition-opacity items-center justify-center pointer-events-auto cursor-pointer"
              style={{
                background:
                  "linear-gradient(45deg, #FAAD4F 14.61%, #DD2A7B 39.38%, #9537B0 58.49%, #515BD4 85.39%), linear-gradient(0deg, #B43199 0%, #B43199 100%), var(--color-n-100, #F1F5F9)",
              }}
              onClick={shareOnInstagram}
            >
              {/* Instagram Icon */}
              <InstagramLogo
                className="size-6"
                primaryColor="var(--color-n-950)"
              />
            </Button>
          </div>

          {/* Copy Link */}
          <div className="py-2 rounded-[99px] pl-4 pr-2 flex items-center justify-between border border-n-200">
            <p className="text-sm text-n-500 w-2/3 overflow-hidden text-ellipsis whitespace-nowrap">
              {copyLink}
            </p>
            <Button
              className="size-10 flex justify-center rounded-full hover:bg-n-200 items-center bg-n-200"
              onClick={copyToClipboard}
            >
              {/* Copy Icon */}
              <Copy1 primaryColor="var(--color-n-500)" className="size-5" />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
