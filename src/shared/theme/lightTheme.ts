// theme/lightTheme.ts
import type { Theme } from "./themeType";


export const lightTheme: Theme = {
    layout: {
        sidebarWidth: 280,
        sidebarCollapsedWidth: 80,
        headerHeight: 70,
        sidebarTransitionDuration: 300,
        contentMaxWidth: 1400,
    },

    colors: {
        // Cores primárias (azul DeepSeek)
        primary: '#0066FF', // Azul principal do DeepSeek
        primaryLight: '#3388FF',
        primaryDark: '#0052D9',
        primaryExtraLight: '#E6F0FF',

        // Cores de fundo
        background: '#FFFFFF',
        backgroundLight: '#F8F9FA',
        backgroundDark: '#F1F3F5',
        backgroundCard: '#FFFFFF',

        // Cores de texto
        text: '#1A1A1A',
        textSecondary: '#666666',
        textLight: '#999999',
        textInverted: '#FFFFFF',

        // Cores de borda
        border: '#E1E5E9',
        borderLight: '#F0F2F5',
        borderDark: '#D1D5DB',

        // Cores de estado
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',

        // Cores neutras
        white: '#FFFFFF',
        black: '#000000',
        gray50: '#F9FAFB',
        gray100: '#F3F4F6',
        gray200: '#E5E7EB',
        gray300: '#D1D5DB',
        gray400: '#9CA3AF',
        gray500: '#6B7280',
        gray600: '#4B5563',
        gray700: '#374151',
        gray800: '#1F2937',
        gray900: '#111827',

        // Cores específicas para UI
        inputBackground: '#FFFFFF',
        placeholder: '#9CA3AF',
        disabled: '#D1D5DB',
        overlay: 'rgba(0, 0, 0, 0.5)',

        // Gradiente primário
        gradientPrimary: ['#0066FF', '#3388FF', '#66AAFF'],
    },

    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
        xxxl: 64,
    },

    typography: {
        sizes: {
            xs: 10,
            sm: 12,
            md: 14,
            base: 16,
            lg: 18,
            xl: 20,
            xxl: 24,
            xxxl: 32,
        },
        weights: {
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
    },

    borderRadius: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        round: 50,
        pill: 1000,
    },

    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 8,
        },
        xl: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 16,
        },
    },

    transitions: {
        fast: '150ms ease',
        medium: '250ms ease',
        slow: '350ms ease',
        bezier: 'cubic-bezier(0.2, 0, 0, 1)',
    },
};