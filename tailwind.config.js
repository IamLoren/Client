/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { opacity: '0.8', transform: 'translate(-50%, -50%) scale(0.5)' },
          '70%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1.1)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        appear: 'appear 0.8s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};

