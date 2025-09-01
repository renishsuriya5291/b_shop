/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // BarberQ Brand Colors - Perfect for Gujarati Culture
        primary: {
          50: '#fefcf0',
          100: '#fdf6dc', 
          200: '#fbecb3',
          300: '#f8dc80',
          400: '#f1c338', // Main Kesari/Saffron
          500: '#e6a82c',
          600: '#c78a24',
          700: '#a56b1f',
          800: '#87551f',
          900: '#70471e',
        },
        secondary: {
          50: '#f7f3f0',
          100: '#ede3dc',
          200: '#d9c4b6',
          300: '#c0a089',
          400: '#8c4030', // Rich Brown
          500: '#7a3728',
          600: '#6d3024',
          700: '#5a2820',
          800: '#4d241f',
          900: '#42221e',
        },
        accent: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#f0f0f0',
          400: '#e5e5e5',
          500: '#d4d4d4',
          600: '#a3a3a3',
          700: '#737373',
          800: '#525252',
          900: '#404040',
        }
      },
      fontFamily: {
        'gujarati': ['Noto Sans Gujarati', 'system-ui', 'sans-serif'],
        'english': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}