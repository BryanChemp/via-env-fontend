export interface ThemeLayout {
  sidebarWidth: number;
  headerHeight: number;
  sidebarCollapsedWidth: number;
  sidebarTransitionDuration: number;
  contentMaxWidth: number;
}

// types/theme.ts
export interface ThemeColors {
  // Cores primárias (azul DeepSeek)
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryExtraLight: string;
  
  // Cores de fundo
  background: string;
  backgroundLight: string;
  backgroundDark: string;
  backgroundCard: string;
  
  // Cores de texto
  text: string;
  textSecondary: string;
  textLight: string;
  textInverted: string;
  
  // Cores de borda
  border: string;
  borderLight: string;
  borderDark: string;
  
  // Cores de estado
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Cores neutras
  white: string;
  black: string;
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
  
  // Cores específicas para UI
  inputBackground: string;
  placeholder: string;
  disabled: string;
  overlay: string;
  
  // Gradientes
  gradientPrimary: string[];
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface ThemeTypography {
  sizes: {
    xs: number;
    sm: number;
    md: number;
    base: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  weights: {
    light: string;
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
}

export interface ThemeBorderRadius {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  round: number;
  pill: number;
}

export interface ThemeShadows {
  sm: object;
  md: object;
  lg: object;
  xl: object;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  layout: ThemeLayout; 
   transitions: {
    fast: string;
    medium: string;
    slow: string;
    bezier: string;
  };
}

export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme?: () => void;
}