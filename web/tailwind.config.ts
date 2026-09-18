import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdbff',
          300: '#8ec3ff',
          400: '#599fff',
          500: '#327bf6',
          600: '#1b5ce9',
          700: '#1446d6',
          800: '#163aa9',
          900: '#173385',
          950: '#102052'
        }
      }
    }
  },
  plugins: []
};

export default config;
