// STYLES //
import "./globals.css";

// COMPONENTS //
import Script from "next/script";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";

// DATA //
import type { Metadata } from "next";
import Motion from "@/components/animations/Motion";
import { fadeIn, shrinkIn } from "@/lib/animations";
import BrandLogo from "@/components/brand-logo/BrandLogo";
import PageHeader from "@/components/PageHeader";
import SideMenu from "@/components/SideMenu";
import Home3 from "@/components/icons/neevo-icons/Home3";
import MagnifyingGlass from "@/components/icons/neevo-icons/MagnifyingGlass";
import MailSendEmailMessage from "@/components/icons/neevo-icons/MailSendEmailMessage";
import BellNotification from "@/components/icons/neevo-icons/BellNotification";
import UserCircleSingle from "@/components/icons/neevo-icons/UserCircleSingle";
import Bookmark from "@/components/icons/neevo-icons/Bookmark";

/* GT Walsheim Font */
const gtWalsheimFont = localFont({
  src: [
    {
      path: "../../public/fonts/gt-walsheim/gt-walsheim-thin.otf",
      weight: "100",
      style: "thin",
    },
    {
      path: "../../public/fonts/gt-walsheim/gt-walsheim-ultra-light.otf",
      weight: "200",
      style: "ultra-light",
    },
    {
      path: "../../public/fonts/gt-walsheim/gt-walsheim-light.otf",
      weight: "300",
      style: "light",
    },
    {
      path: "../../public/fonts/gt-walsheim/gt-walsheim-regular.otf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../../public/fonts/gt-walsheim/gt-walsheim-medium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../public/fonts/gt-walsheim/gt-walsheim-bold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/fonts/gt-walsheim/gt-walsheim-ultra-bold.otf",
      weight: "800",
      style: "ultra-bold",
    },
    {
      path: "../../public/fonts/gt-walsheim/gt-walsheim-black.otf",
      weight: "900",
      style: "black",
    },
  ],
  variable: "--font-gtwalsheim",
  display: "swap",
});

// Metadata
export const metadata: Metadata = {
  title: "Zizo App",
  description: "Zizo App",
};

const menuItems = [
  {
    label: "Home",
    href: "/",
    icon: <Home3 primaryColor="var(--color-n-900)" className="size-5" />,
  },
  {
    label: "Search",
    href: "/search",
    icon: (
      <MagnifyingGlass primaryColor="var(--color-n-900)" className="size-5" />
    ),
  },
  {
    label: "Message",
    href: "/message",
    icon: (
      <MailSendEmailMessage
        primaryColor="var(--color-n-900)"
        className="size-5"
      />
    ),
  },

  {
    label: "Notifications",
    href: "/notifications",
    icon: (
      <BellNotification primaryColor="var(--color-n-900)" className="size-5" />
    ),
  },

  {
    label: "Saved",
    href: "/saved",
    icon: <Bookmark primaryColor="var(--color-n-900)" className="size-5" />,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: (
      <UserCircleSingle primaryColor="var(--color-n-900)" className="size-5" />
    ),
  },
];

/** Root Layout */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={gtWalsheimFont.className}>
      <head>
        <meta name="color-scheme" content="light dark" />
        {/* Favicon for light mode */}
        <link
          rel="icon"
          href="/favicon-light.svg"
          media="(prefers-color-scheme: light)"
        />

        {/* Favicon for dark mode */}
        <link
          rel="icon"
          href="/favicon-dark.svg"
          media="(prefers-color-scheme: dark)"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SW05KZD0XF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SW05KZD0XF', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="antialiased font-sans min-h-screen bg-n-100 overflow-x-hidden">
        <AuthProvider>
          {/* Backdrop Image */}
          <Motion as="div" variants={fadeIn} delay={0.1}>
            <div className="fixed -top-[13px] -right-[60px]">
              <BrandLogo
                variant="color-icon"
                size={260}
                className="hidden dark-mode-block lg:hidden!"
              />
              <BrandLogo
                variant="color-icon"
                size={260}
                className="block dark-mode-hidden lg:hidden!"
              />
            </div>
          </Motion>

          <div className="flex flex-col lg:gap-8">
            {/* PageHeader */}
            <div className="px-5 lg:px-9 pt-6 pb-3">
              <Motion as="div" variants={shrinkIn} delay={0.1}>
                {/* PageHeader component */}
                <PageHeader />
              </Motion>
            </div>
            <div className="flex px-5 lg:px-9 lg:gap-15 2xl:gap-50">
              <div className="hidden lg:block">
                <Motion as="div" variants={fadeIn} delay={0.2}>
                  <SideMenu menuItems={menuItems} />
                </Motion>
              </div>
              <div className="flex-1">{children}</div>
            </div>
          </div>
          <Toaster duration={2000} />
        </AuthProvider>
      </body>
    </html>
  );
}
