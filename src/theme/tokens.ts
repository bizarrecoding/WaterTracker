export const colors = {
  white: '#ffffff',
  black: '#000000',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  blue500: '#3b82f6',
  blue600: '#2563eb',
  red500: '#ef4444',
};

export const tokens = {
  background: {
    light: colors.gray100,
    dark: colors.gray900,
  },
  card: {
    light: colors.white,
    dark: colors.gray800,
  },
  text: {
    light: colors.gray900,
    dark: colors.white,
  },
  textSecondary: {
    light: colors.gray500,
    dark: colors.gray400,
  },
  primary: {
    light: colors.blue500,
    dark: colors.blue500,
  },
  border: {
    light: colors.gray200,
    dark: colors.gray700,
  },
  error: {
    light: colors.red500,
    dark: colors.red500,
  },
  tint: {
    light: colors.blue500,
    dark: colors.white
  }
}; 

export default {
  light: {
    text: tokens.text.light,
    background: tokens.background.light,
    tint: tokens.tint.light,
    panel: tokens.card.light,
    accent: tokens.primary.light,
    primary: tokens.primary.light,
    border: tokens.border.light,
    error: tokens.error.light,
    card: tokens.card.light,
    textSecondary: tokens.textSecondary.light,
    notification: tokens.error.light,
  },
  dark: {
    text: tokens.text.dark,
    background: tokens.background.dark,
    tint: tokens.tint.dark,
    panel: tokens.card.dark,
    accent: tokens.primary.dark,
    primary: tokens.primary.dark,
    border: tokens.border.dark,
    error: tokens.error.dark,
    card: tokens.card.dark,
    textSecondary: tokens.textSecondary.dark,
    notification: tokens.error.dark,
  },
};

export type DesignToken = keyof typeof tokens;
