import { DarkTheme, DefaultTheme, Theme as ThemeType } from '@react-navigation/native';
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import Theme from './tokens';

interface ThemeContextType {
  isDark: boolean;
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  theme: DefaultTheme,
  toggleTheme: () => { },
  setTheme: () => { },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreference] = useState<'light' | 'dark' | 'system'>('system');
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    if (themePreference === 'system') {
      setIsDark(systemColorScheme === 'dark');
    } else {
      setIsDark(themePreference === 'dark');
    }
  }, [systemColorScheme, themePreference]);

  const toggleTheme = () => {
    setThemePreference(prev => {
      if (prev === 'system') {
        return isDark ? 'light' : 'dark';
      }
      return prev === 'dark' ? 'light' : 'dark';
    });
  };

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    setThemePreference(theme);
  }
  const theme = useMemo(() => ({
    dark: isDark,
    colors: isDark ? Theme.dark : Theme.light,
    fonts: isDark ? DarkTheme.fonts : DefaultTheme.fonts,
  }), [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
