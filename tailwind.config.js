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
          gainsboro: '#DBD9DB',
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
          Cultured: '#F5F5F5',
        },
        purple: {
          FrenchMauve: '#C47BCC',
          Purpureus: '#A545B0',
          DeepLilac: '#8954C2',
          PinkLavender: '#DEB6E2',
        },
      },
      fontFamily: {
        'Cabin-Regular': ['Cabin', 'sans-serif'],
        'Acme-Regular': ['Acme', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant(
        'ant-modal-header',
        '&>div.ant-modal-content>div.ant-modal-header'
      );
      addVariant(
        'ant-modal-header-hover',
        '&>div.ant-modal-content>div.ant-modal-header:hover'
      );
      addVariant(
        'ant-modal-title',
        '&>div.ant-modal-content>div.ant-modal-header>div.ant-modal-title'
      );
      addVariant(
        'ant-modal-title-hover',
        '&>div.ant-modal-content>div.ant-modal-header>div.ant-modal-title:hover'
      );
      addVariant(
        'ant-modal-body',
        '&>div.ant-modal-content>div.ant-modal-body'
      );
      addVariant(
        'ant-modal-body-hover',
        '&>div.ant-modal-content>div.ant-modal-body:hover'
      );
      addVariant(
        'ant-modal-footer-btn',
        '&>div.ant-modal-content>div.ant-modal-footer>button.ant-btn'
      );
      addVariant(
        'ant-modal-footer-btn-hover',
        '&>div.ant-modal-content>div.ant-modal-footer>button.ant-btn:hover'
      );
    }
  ],
};
