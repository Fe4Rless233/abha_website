import { useEffect } from 'react'
import { trackPerformance } from '@/utils/analytics'

export const usePerformanceMetrics = (): void => {
  useEffect(() => {
    // Function to send metrics to analytics
    const sendMetric = (name: string, value: number) => {
      trackPerformance(name, value)
    }

    // Track Core Web Vitals using web-vitals library (when available)
    const trackWebVitals = async () => {
      try {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals')
        
        getCLS(({ value }) => sendMetric('CLS', value))
        getFID(({ value }) => sendMetric('FID', value))
        getFCP(({ value }) => sendMetric('FCP', value))
        getLCP(({ value }) => sendMetric('LCP', value))
        getTTFB(({ value }) => sendMetric('TTFB', value))
      } catch (error) {
        console.log('Web Vitals not available:', error)
      }
    }

    // Track basic timing metrics
    const trackBasicMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const navStart = performance.timing.navigationStart
      
      if (navigation) {
        // Time to First Byte
        const ttfb = navigation.responseStart - navStart
        sendMetric('TTFB_Basic', ttfb)
        
        // DOM Content Loaded
        const dcl = navigation.domContentLoadedEventEnd - navStart
        sendMetric('DCL', dcl)
        
        // Load Complete
        const loadComplete = navigation.loadEventEnd - navStart
        sendMetric('Load_Complete', loadComplete)
      }
    }

    // Run performance tracking
    if (typeof window !== 'undefined') {
      trackWebVitals()
      
      // Track basic metrics after page load
      if (document.readyState === 'complete') {
        trackBasicMetrics()
      } else {
        window.addEventListener('load', trackBasicMetrics)
      }
    }

    return () => {
      window.removeEventListener('load', trackBasicMetrics)
    }
  }, [])
}
