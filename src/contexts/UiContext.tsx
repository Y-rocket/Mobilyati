import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language } from '../types';

interface UiContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRtl: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  scrollToTop: boolean;
  setScrollToTop: (scroll: boolean) => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export function UiProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(true);

  // Update document direction based on language
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <UiContext.Provider value={{
      language,
      setLanguage,
      isRtl: language === 'ar',
      isDarkMode,
      toggleDarkMode,
      isMobileMenuOpen,
      setMobileMenuOpen,
      scrollToTop,
      setScrollToTop
    }}>
      {children}
    </UiContext.Provider>
  );
}

export function useUi() {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error('useUi must be used within a UiProvider');
  }
  return context;
}