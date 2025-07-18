/// <reference types="vite/client" />
// ==========================================================================
// PWA Service Worker Registration
// ==========================================================================

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

// Register service worker for PWA functionality
export const registerSW = async (): Promise<void> => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, prompt user to refresh
              showUpdateNotification();
            }
          });
        }
      });

      console.log('ServiceWorker registered successfully');
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  }
};

// Show update notification to user
const showUpdateNotification = (): void => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('ABHA Website Updated', {
      body: 'A new version of the website is available. Refresh to update.',
      icon: '/icons/icon-192x192.png',
      tag: 'app-update'
    });
  } else {
    // Fallback to in-app notification
    const event = new CustomEvent('app-update-available');
    window.dispatchEvent(event);
  }
};

// Handle app installation prompt
export const handleInstallPrompt = (): void => {
  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show custom install button/banner
    const event = new CustomEvent('app-installable', { detail: { prompt: e } });
    window.dispatchEvent(event);
  });

  // Expose install function globally
  (window as any).installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      
      deferredPrompt = null;
    }
  };
};

// Check if app is running as PWA
export const isPWA = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};
