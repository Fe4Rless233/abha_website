import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Restore scroll position when navigating back/forward
export const useScrollRestoration = (): void => {
  const location = useLocation()

  useEffect(() => {
    const scrollPositions = new Map<string, number>()

    const saveScrollPosition = () => {
      scrollPositions.set(location.pathname, window.scrollY)
    }

    const restoreScrollPosition = () => {
      const savedPosition = scrollPositions.get(location.pathname)
      if (savedPosition !== undefined) {
        window.scrollTo(0, savedPosition)
      } else {
        window.scrollTo(0, 0)
      }
    }

    // Save scroll position before navigation
    window.addEventListener('beforeunload', saveScrollPosition)
    
    // Restore scroll position after navigation
    const timeoutId = setTimeout(restoreScrollPosition, 100)

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition)
      clearTimeout(timeoutId)
    }
  }, [location])
}
