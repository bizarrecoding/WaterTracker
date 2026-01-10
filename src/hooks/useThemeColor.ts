import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import { tokens, DesignToken } from '../theme/tokens';

type ThemeOverrides = {
  light?: string;
  dark?: string;
};

export const useThemeColor = (overrides: ThemeOverrides, designToken: DesignToken) => {
  const { isDark } = useContext(ThemeContext);
  if(isDark && overrides.dark) return overrides.dark;
  if(!isDark && overrides.light) return overrides.light;
  
  return tokens[designToken][isDark ? 'dark' : 'light'];
}
