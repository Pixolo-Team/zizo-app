"use client";

// REACT //
import * as React from "react";

// OTHERS //
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

// ICONS //
import Close from "../icons/neevo-icons/Close";

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-n-800/80",
        className
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[85vh] data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          "px-5 py-8 pb-12 bg-n-50 rounded-tl-4xl rounded-tr-4xl",
          className
        )}
        {...props}
      >
        {/* Close Button */}
        <DrawerClose className="absolute -top-16 left-1/2 -translate-x-1/2 shadow-[0_0_6px_0_rgba(0,0,0,0.25)] bg-n-700 hover:bg-n-700/80 size-10 rounded-full text-n-50 transition-colors flex justify-center items-center">
          <Close primaryColor={"var(--color-n-300)"} className="size-5" />
        </DrawerClose>

        {/* Drawer Content */}
        {/* <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" /> */}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

interface DrawerHeaderProps extends React.ComponentProps<"div"> {
  title?: string;
  subTitle?: string;
}

function DrawerHeader({
  className,
  title,
  subTitle,
  ...props
}: Readonly<DrawerHeaderProps>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1 pb-8", className)}
      {...props}
    >
      {title && (
        <p className="text-lg font-semibold text-n-800 leading-tight">
          {title}
        </p>
      )}
      {subTitle && (
        <p className="text-sm text-n-600 leading-tight">{subTitle}</p>
      )}
    </div>
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
};
