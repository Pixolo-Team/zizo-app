"use client";

// REACT //
import { useEffect, useRef, useState } from "react";
import type { ReactNode, ElementType } from "react";

// OTHERS //
import { motion, type MotionProps, type Variants } from "framer-motion";

interface MotionWrapperProps extends MotionProps {
  as?: string;
  variants?: any;
  delay?: number;
  children?: ReactNode;
  isFixed?: boolean;
}

export default function Motion({
  as = "div",
  variants,
  delay = 0,
  children,
  isFixed = true,
  ...props
}: MotionWrapperProps) {
  const ref = useRef<HTMLElement | null>(null);

  // Patch variants with delay
  const patchedVariants = variants
    ? {
        ...variants,
        show: {
          ...(variants.show as object),
          transition: {
            ...(variants.show as any)?.transition,
            delay,
          },
        },
      }
    : undefined;

  const motionMap = motion as unknown as Record<string, ElementType>;
  const Component = motionMap[as] || motion.div;

  return (
    <Component
      ref={ref as any}
      variants={patchedVariants}
      initial="hidden"
      {...(isFixed
        ? { animate: "show" } // Auto: fixed → animate
        : {
            whileInView: "show", // Normal → whileInView
            viewport: { once: true, amount: 0.2 },
          })}
      {...props}
    >
      {children}
    </Component>
  );
}
