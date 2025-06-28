'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, Theme } from '@styles/theme'; // theme.ts 경로는 실제 프로젝트에 맞게 조정해주세요.

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const getInitialTheme = (): 'light' | 'dark' => {
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (storedTheme) {
        return storedTheme;
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const initialTheme = getInitialTheme();
    setThemeMode(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', themeMode);
      // Optional: Add class to body for global CSS targeting if not using styled-components for everything
      // document.body.className = themeMode;
    }
  }, [themeMode, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only change if no theme is manually set in localStorage
      if (!localStorage.getItem('theme')) {
        setThemeMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted]);


  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (theme: 'light' | 'dark') => {
    setThemeMode(theme);
  };

  const currentThemeObject: Theme = themeMode === 'light' ? lightTheme : darkTheme;

  if (!mounted) {
    // Prevent flash of unstyled content or incorrect theme during SSR/initial load
    // You could return a loader or a default-themed (e.g., light) version
    // For simplicity, returning children directly might be acceptable if handled carefully
    // Or, to ensure styled-components ThemeProvider always has a theme:
    // return <StyledThemeProvider theme={lightTheme}>{children}</StyledThemeProvider>;
    return <>{children}</>; // Or a loading spinner
  }

  return (
    <ThemeContext.Provider value={{ theme: themeMode, toggleTheme, setTheme }}>
      <StyledThemeProvider theme={currentThemeObject}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
