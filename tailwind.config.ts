import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        foreground: '#E2E8F0',
        accent: '#22D3EE',
        slate: '#334155',
        muted: '#64748B'
      }
    }
  },
  plugins: []
};

export default config;
