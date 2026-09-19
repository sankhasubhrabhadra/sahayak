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
          warning: '#FFD200',
          danger: '#FF4D4D',
          cream: '#FFFDF0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px #000000',
        'brutal': '4px 4px 0px #000000',
        'brutal-lg': '6px 6px 0px #000000',
        'brutal-xl': '8px 8px 0px #000000',
        'brutal-navy': '4px 4px 0px #002970',
        'brutal-cyan': '4px 4px 0px #00BAF2',
        'brutal-yellow': '4px 4px 0px #FFD200',
        'brutal-green': '4px 4px 0px #10B981',
      }
    },
  },
  plugins: [],
}

