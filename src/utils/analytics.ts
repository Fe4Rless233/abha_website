/// <reference types="vite/client" />
// ==========================================================================
// Analytics Integration
// ==========================================================================

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface AnalyticsConfig {
  trackingId: string;
  debug: boolean;
  anonymizeIp: boolean;
  siteSpeedSampleRate: number;
}

interface CustomEvent {
  event_category: string;
  event_label?: string;
  value?: number;
  custom_parameter?: string;
  content_type?: string;
  language?: string;
  media_type?: string;
  interaction_type?: string;
  page_number?: number;
  reading_time?: number;
}

const config: AnalyticsConfig = {
  trackingId: import.meta.env.VITE_GA_TRACKING_ID || 'G-PLACEHOLDER',
  debug: import.meta.env.DEV,
  anonymizeIp: true,
  siteSpeedSampleRate: 10
};

// Initialize Google Analytics
export const initAnalytics = (): void => {
  if (typeof window === 'undefined' || !config.trackingId || config.trackingId === 'G-PLACEHOLDER') {
    console.log('Analytics not initialized - missing tracking ID');
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${config.trackingId}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: any[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', config.trackingId, {
    anonymize_ip: config.anonymizeIp,
    site_speed_sample_rate: config.siteSpeedSampleRate,
    debug_mode: config.debug
  });

  if (config.debug) {
    console.log('Analytics initialized with tracking ID:', config.trackingId);
  }
};

// Track page views
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', config.trackingId, {
      page_path: path,
      page_title: title
    });
  }
};

// Track custom events
export const trackEvent = (eventName: string, parameters: CustomEvent): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters);
    
    if (config.debug) {
      console.log('Analytics event tracked:', eventName, parameters);
    }
  }
};

// Cultural content engagement tracking
export const trackCulturalEngagement = (contentType: string, language: string, action?: string): void => {
  trackEvent('cultural_engagement', {
    event_category: 'content',
    content_type: contentType,
    language: language,
    custom_parameter: action
  });
};

// Event interaction tracking
export const trackEventInteraction = (eventId: string, action: string): void => {
  trackEvent('event_interaction', {
    event_category: 'engagement',
    event_label: eventId,
    custom_parameter: action
  });
};

// Gallery interaction tracking
export const trackGalleryInteraction = (action: string, mediaType: string): void => {
  trackEvent('gallery_interaction', {
    event_category: 'media',
    media_type: mediaType,
    interaction_type: action
  });
};

// Magazine reading tracking
export const trackMagazineReading = (pageNumber: number, timeSpent: number): void => {
  trackEvent('magazine_reading', {
    event_category: 'content',
    page_number: pageNumber,
    reading_time: Math.round(timeSpent / 1000)
  });
};

// Performance tracking
export const trackPerformance = (metric: string, value: number): void => {
  trackEvent('performance_metric', {
    event_category: 'performance',
    event_label: metric,
    value: Math.round(value)
  });
};

// Error tracking
export const trackError = (error: string, fatal: boolean = false): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'exception', {
      description: error,
      fatal: fatal
    });
  }
};
