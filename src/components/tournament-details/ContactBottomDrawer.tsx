"use client";

// COMPONENTS //
import Motion from "@/components/animations/Motion";
import WhatsappIcon from "@/components/icons/neevo-icons/WhatsappLogo";
import PhoneIcon from "@/components/icons/neevo-icons/Phone";
import Copy1Icon from "@/components/icons/neevo-icons/Copy1";

// OTHERS //
import { slideInUp, shrinkIn } from "@/lib/animations";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerHeader } from "../ui/drawer";
import { toast } from "sonner";

// ICONS //

interface ContactBottomDrawerProps {
  phone: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ContactBottomDrawer({
  phone,
  isOpen,
  onOpenChange,
}: Readonly<ContactBottomDrawerProps>) {
  const whatsappLink = `https://wa.me/91${phone}`;

  // Helper Functions
  /** Copy link to clipboard */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(phone);
    toast.success("Phone number copied");
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader
          title="Contact"
          subTitle="Reach out to the organiser to confirm your spot"
        />
        <Motion variants={slideInUp} delay={0.1}>
          <div className="flex flex-col gap-2">
            {/* WhatsApp */}
            <Motion variants={shrinkIn} delay={0.2}>
              <div className="flex items-center gap-3">
                {/* WhatsApp Button */}
                <Button
                  className="flex-1 flex items-center justify-center gap-2 h-14 rounded-full bg-green-500 text-n-50 text-base font-medium hover:bg-green-600"
                  onClick={() => window.open(whatsappLink, "_blank")}
                >
                  {/* WhatsApp Icon */}
                  <WhatsappIcon className="size-5" />
                  {phone}
                </Button>

                <Button
                  className="size-14 flex justify-center rounded-full hover:bg-n-200 items-center bg-n-100"
                  onClick={copyToClipboard}
                >
                  {/* Copy Icon */}
                  <Copy1Icon
                    primaryColor="var(--color-n-400)"
                    className="size-5"
                  />
                </Button>
              </div>
            </Motion>

            {/* Call */}
            <Motion variants={shrinkIn} delay={0.3}>
              <div className="flex items-center gap-3">
                {/* Call Button */}
                <Button
                  className="flex-1 flex items-center text-base justify-center gap-2 h-14 rounded-full bg-n-900 text-n-50 font-medium hover:bg-n-800"
                  onClick={() => window.open(`tel:${phone}`, "_blank")}
                >
                  {/* Phone Icon */}
                  <PhoneIcon className="size-5" />
                  {phone}
                </Button>

                <Button
                  className="size-14 flex justify-center rounded-full hover:bg-n-200 items-center bg-n-100"
                  onClick={copyToClipboard}
                >
                  {/* Copy Icon */}
                  <Copy1Icon
                    primaryColor="var(--color-n-400)"
                    className="size-5"
                  />
                </Button>
              </div>
            </Motion>
          </div>
        </Motion>
      </DrawerContent>
    </Drawer>
  );
}
