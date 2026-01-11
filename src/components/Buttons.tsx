import { useContext } from 'react';
import { AppPalette, ThemeContext } from '../theme/ThemeContext';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { useThemeColor } from '../hooks/useThemeColor';

type  ButtonVariants = 'primary' | 'error' | 'clear';

type ThemedButtonProps = {
  title: string;
  variant?: ButtonVariants;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
} 

const getStyles = (themeColors: AppPalette, variant: ButtonVariants) => {
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: themeColors.primary,
        borderColor: themeColors.primary,
        color: 'white',
      };
    case 'error':
      return {
        backgroundColor: 'transparent',
        borderColor: themeColors.error,
        color: themeColors.error,
      };
    case 'clear':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: themeColors.primary,
      };  
  }
};

export const ThemedButton = ({ title, variant = 'primary', onPress, style }: ThemedButtonProps) => {
  const { theme } = useContext(ThemeContext); 
  const { backgroundColor, color, borderColor } = getStyles(theme.colors, variant);

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor, borderColor, borderWidth: 1 }, style]} onPress={onPress}>
      <Text style={[styles.buttonText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
