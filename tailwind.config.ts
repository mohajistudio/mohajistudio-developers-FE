import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: '#0A0A0A',
        secondary: '#F9F9F9',
        third: '#FF8C42',
        // Background colors
        bg: '#F2F3F5',
        'bg-2': '#E4E6EB',
        surface1: '#F9F9F9',
        surface2: '#FFFFFF',
        // State colors
        error: '#F73322',
        warning: '#E73322',
        success: '#3EC292',
        'success-2': '#388E3C',
        info: '#2196F3',
        // Font colors
        black: '#000000',
        gray: {
          1: '#4D4D4D',
          2: '#666666',
          3: '#999999',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#0A0A0A',
            a: {
              color: '#FF8C42',
              '&:hover': {
                color: '#FF8C42',
              },
            },
            h1: {
              fontWeight: 'bold',
              fontSize: '30pt',
            },
            h2: {
              fontWeight: 'bold',
              fontSize: '24pt',
            },
            h3: {
              fontWeight: 'bold',
              fontSize: '20pt',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              color: '#FF8C42',
              backgroundColor: '#F2F3F5',
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: '#1E1E1E',
              color: '#FFFFFF',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
