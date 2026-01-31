/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jazz-cream': '#F5F3EE',
        'jazz-black': '#1A1A1A',
        'jazz-blue': '#2B4570',
        'jazz-amber': '#C4A962',
      },
      fontFamily: {
        'serif': ['Libre Baskerville', 'Georgia', 'serif'],
        'display': ['Bebas Neue', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
