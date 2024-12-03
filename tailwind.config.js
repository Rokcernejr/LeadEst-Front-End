/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'beige': {
          200: '#E5DDD3',
        }
      }
    },
  },
  plugins: [],
};