"use client";

import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  next: () => void;
  threshold?: number;
  root?: Element | null;
  children?: React.ReactNode;
  className?: string;
  loadingComponent?: React.ReactNode;
}

export default function InfiniteScroll({
  hasMore,
  isLoading,
  next,
  threshold = 1,
  root = null,
  children,
  className,
  loadingComponent,
}: InfiniteScrollProps) {
  const observer = useRef<IntersectionObserver>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = elementRef.current;

    // Disconnect existing observer
    if (observer.current) {
      observer.current.disconnect();
    }

    // Don't observe if:
    // 1. Loading
    // 2. No more items to load
    // 3. No element to observe
    if (isLoading || !hasMore || !currentElement) return;

    // Create new observer
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          next();
        }
      },
      {
        root,
        threshold: 0,
        rootMargin: `0px 0px ${threshold * 100}px 0px`,
      }
    );

    observer.current.observe(currentElement);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, isLoading, next, threshold, root]);

  return (
    <div className={className}>
      {children}
      <div ref={elementRef} style={{ height: 1 }} />
      {isLoading && loadingComponent}
    </div>
  );
}
