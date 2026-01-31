"use client";

// COMPONENTS //
import BrandLogo from "@/components/brand-logo/BrandLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Interface props
interface SideMenuProps {
  menuItems: {
    label: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

// Side Menu Component
export default function SideMenu({ menuItems }: SideMenuProps) {
  const pathname = usePathname();

  

  const isActive = (href: string) => {
    // exact match
    if (pathname === href) return true;

    return false;
  };

  return (
    <div className="fixed hidden h-screen flex-col justify-between py-10 pl-9 lg:flex">
      <Link href="/football-tournaments" className="cursor-pointer">
        <BrandLogo
          variant="text-logo"
          size={80}
          className="block dark-mode-hidden lg:w-30"
        />
        <BrandLogo
          variant="text-logo-white"
          size={80}
          className="hidden dark-mode-block lg:w-30"
        />
      </Link>

      <div className="flex flex-col justify-center gap-9">
        {menuItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "group relative flex items-center gap-4 rounded-lg px-3 py-2 transition-all duration-200",
                active ? "bg-n-100" : "hover:bg-n-100",
              ].join(" ")}
            >
              {/* Left indicator */}
              <span
                className={[
                  "absolute left-0 top-1/2 w-0.75 -translate-y-1/2 rounded-full transition-all duration-300",
                  active
                    ? "h-6 bg-lime-500 opacity-100"
                    : "h-0 bg-n-900 opacity-0 group-hover:h-6 group-hover:opacity-100",
                ].join(" ")}
              />

              {/* Icon */}
              <div className="size-5 text-n-700 transition-colors duration-200 group-hover:text-lime-500">
                <span>{item.icon}</span>
              </div>

              {/* Label */}
              <p
                className={[
                  "text-lg transition-colors duration-200",
                  active
                    ? "text-n-950 font-medium"
                    : "text-n-900 group-hover:text-n-950",
                ].join(" ")}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div />
    </div>
  );
}
