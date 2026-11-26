/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nexus: {
          void: '#080D19',
          navy: '#111B31',
          card: '#17243B',
          cyan: '#16D9F5',
          violet: '#9B5CFF',
          orange: '#FF7139',
          green: '#32C98A',
          text: '#F4F7FC',
          muted: '#A9B5C9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'nexus-card': '0 12px 32px -12px rgba(4, 8, 20, 0.75)',
        'nexus-cyan': '0 0 24px -6px rgba(22, 217, 245, 0.35)',
        'nexus-violet': '0 0 24px -6px rgba(155, 92, 255, 0.35)',
        'nexus-orange': '0 0 24px -6px rgba(255, 113, 57, 0.38)',
        'nexus-green': '0 0 24px -6px rgba(50, 201, 138, 0.35)',
      },
    },
  },
  plugins: [],
};
