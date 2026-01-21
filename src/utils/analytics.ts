// Extend Window interface
declare global {
  interface Window {
    gtag?: (
      command: "event",
      action: string,
      params?: Record<string, any>
    ) => void;
  }
}

export const GA_TRACKING_ID = "G-SW05KZD0XF";

type TrackEventArgs = {
  action: string;
  params?: Record<string, any>;
};

export const trackEvent = ({ action, params }: TrackEventArgs) => {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", action, {
    ...params,
  });
};
