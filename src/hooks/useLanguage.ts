import { useState, useEffect } from 'react'

interface LanguageContextType {
  language: 'en' | 'bn'
  setLanguage: (lang: 'en' | 'bn') => void
  isRTL: boolean
}

export const useLanguage = (): LanguageContextType => {
  const [language, setLanguageState] = useState<'en' | 'bn'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('abha-language')
      return (saved as 'en' | 'bn') || 'en'
    }
    return 'en'
  })

  const setLanguage = (lang: 'en' | 'bn') => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('abha-language', lang)
    }
  }

  const isRTL = language === 'bn'

  useEffect(() => {
    // Update document language
    document.documentElement.lang = language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [language, isRTL])

  return {
    language,
    setLanguage,
    isRTL
  }
}
