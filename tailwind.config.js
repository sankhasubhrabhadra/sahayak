/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paytm: {
          blue: '#00BAF2',
          navy: '#002970',
          dark: '#001944',
          light: '#E6F8FE',
          accent: '#00A3D8',
          success: '#00B37E',
          warning: '#F59E0B',
          danger: '#EF4444'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 41, 112, 0.08)',
        'card': '0 10px 30px -4px rgba(0, 41, 112, 0.1)',
        'glow': '0 0 25px rgba(0, 186, 242, 0.35)',
      }
    },
  },
  plugins: [],
}
