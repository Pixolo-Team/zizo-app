"use client";

// COMPONENTS //
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

/** Filter Drawer Props */
interface FilterDrawerProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Filter Drawer Component */
export default function FilterDrawer({
  title = "Game Preferences",
  description = "Select your preferences",
  children,
  isOpen,
  onOpenChange,
}: FilterDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      {/* Drawer Content  */}
      <DrawerContent>
        {/* Close Button on Overlay */}
        {isOpen && (
          <DrawerClose asChild>
            <button
              className="absolute  shadow-[0_0_6px_0_rgba(0,0,0,0.25)]
 -top-20 left-1/2 -translate-x-1/2 bg-n-700 hover:bg-n-700/80 size-[41px] rounded-full text-n-50 transition-colors flex justify-center items-center"
            >
              {/* Close Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M17.1245 5.11108L5.11108 17.1245"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.1245 17.1245L5.11108 5.11108"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </DrawerClose>
        )}

        {/* Drawer Header */}
        <DrawerHeader>
          <DrawerTitle className="text-n-950 text-left">{title}</DrawerTitle>
          <DrawerDescription className="text-n-500 text-xs text-left">
            {description}
          </DrawerDescription>
        </DrawerHeader>

        {/* Drawer Body */}
        <div className="px-3 pt-3 pb-20 overflow-y-auto">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
