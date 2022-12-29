/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        background: "url('/src/assets/images/background.png')",
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: {
          default: '#FFFFFF',
          F1: '#F1F1F1',
          F1cc: '#F1F1F1cc',
        },
        red: {
          neon: '#F90716',
          dark: '#950101',
        },
        green: {
          neon: '#3EC70B',
          dark: '#A0C334',
        },
        blue: {
          fb: '#4267B2',
        },
        grey: {
          default: '#73777B',
          darkLight: '#383838',
          dark: '#2C3333',
          darkHover: '#111313',
        },
      },
    },
  },
  plugins: [],
};
