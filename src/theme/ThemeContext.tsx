import { DarkTheme, DefaultTheme, Theme as NavTheme } from '@react-navigation/native';
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import Theme from './tokens';

export type AppPalette = typeof Theme.light;
type ThemePreference = 'light' | 'dark' | 'system';

type ThemeContextType = {
  isDark: boolean;
  theme: NavTheme & {
    colors: AppPalette;
  };
  toggleTheme: () => void;
  setTheme: (theme: ThemePreference) => void;
  themePreference: ThemePreference;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  theme: { ...DefaultTheme, colors: Theme.light },
  toggleTheme: () => { },
  setTheme: () => { },
  themePreference: 'system',
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');
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

  const setTheme = (theme: ThemePreference) => {
    setThemePreference(theme);
  }
  const theme = useMemo(() => ({
    dark: isDark,
    colors: isDark ? Theme.dark : Theme.light,
    fonts: isDark ? DarkTheme.fonts : DefaultTheme.fonts,
  }), [isDark])

  theme.colors.error

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme, setTheme, themePreference }}>
      {children}
    </ThemeContext.Provider>
  );
};
