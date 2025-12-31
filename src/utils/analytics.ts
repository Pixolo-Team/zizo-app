// lib/ga.ts

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export const GA_TRACKING_ID = "G-SW05KZD0XF";

export const trackEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window === "undefined") return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
