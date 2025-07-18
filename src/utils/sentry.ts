// ==========================================================================
// Sentry Error Tracking
// ==========================================================================

// Initialize Sentry error tracking
export const initSentry = (): void => {
  // Sentry will be initialized when @sentry/react is properly installed
  console.log('Sentry initialization placeholder');
};

// Capture custom errors
export const captureError = (error: Error, context?: Record<string, any>): void => {
  console.error('Error captured:', error, context);
};

// Capture custom messages
export const captureMessage = (message: string, level: string = 'info'): void => {
  console.log(`[${level.toUpperCase()}] ${message}`);
};

// Add breadcrumb for debugging
export const addBreadcrumb = (message: string, category: string, data?: Record<string, any>): void => {
  console.log(`[${category}] ${message}`, data);
};
