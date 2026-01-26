// theme/darkTheme.ts

import type { Theme } from "./themeType";


export const darkTheme: Theme = {
    layout: {
        sidebarWidth: 280,
        sidebarCollapsedWidth: 80,
        headerHeight: 70,
        sidebarTransitionDuration: 300,
        contentMaxWidth: 1400,
    },

    colors: {
        // Cores primárias (azul DeepSeek)
        primary: '#3388FF', // Um pouco mais claro para o modo escuro
        primaryLight: '#66AAFF',
        primaryDark: '#0066FF',
        primaryExtraLight: 'rgba(51, 136, 255, 0.1)',

        // Cores de fundo
        background: '#0F172A',
        backgroundLight: '#1E293B',
        backgroundDark: '#0A0F1C',
        backgroundCard: '#1E293B',

        // Cores de texto
        text: '#F1F5F9',
        textSecondary: '#94A3B8',
        textLight: '#64748B',
        textInverted: '#0F172A',

        // Cores de borda
        border: '#334155',
        borderLight: '#475569',
        borderDark: '#1E293B',

        // Cores de estado (mantidas para contraste)
        success: '#34D399',
        warning: '#FBBF24',
        error: '#F87171',
        info: '#60A5FA',

        // Cores neutras ajustadas
        white: '#FFFFFF',
        black: '#000000',
        gray50: '#F8FAFC',
        gray100: '#F1F5F9',
        gray200: '#E2E8F0',
        gray300: '#CBD5E1',
        gray400: '#94A3B8',
        gray500: '#64748B',
        gray600: '#475569',
        gray700: '#334155',
        gray800: '#1E293B',
        gray900: '#0F172A',

        // Cores específicas para UI
        inputBackground: '#1E293B',
        placeholder: '#64748B',
        disabled: '#475569',
        overlay: 'rgba(0, 0, 0, 0.7)',

        // Gradiente primário
        gradientPrimary: ['#3388FF', '#66AAFF', '#99CCFF'],
    },

    // Os espaçamentos, tipografia, border radius e shadows
    // podem ser os mesmos do tema claro
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
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 2,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            elevation: 4,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 8,
        },
        xl: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.6,
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