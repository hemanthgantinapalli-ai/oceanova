/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          navy: '#0A2540',
          blue: '#147EA8',
          aqua: '#38B7C9',
          green: '#43A047',
          softgreen: '#66B86A',
          mint: '#D8EEDB',
          white: '#FFFFFF',
          gray: '#F1F5F9',
          pale: '#E8F6F8',
          dark: '#071A2E',
          DEFAULT: '#147EA8',
        },
        primary: {
          DEFAULT: '#0A2540',
          hover: '#071A2E',
        },
        secondary: {
          DEFAULT: '#147EA8',
          hover: '#0A2540',
        },
        accent: {
          DEFAULT: '#43A047',
          soft: '#66B86A',
          mint: '#D8EEDB',
        },
        highlight: '#38B7C9',
        softgray: '#F1F5F9',
        paleocean: '#E8F6F8',
        mintgreen: '#D8EEDB',
        logo: {
          blue: '#147EA8',
          green: '#43A047',
          aqua: '#38B7C9',
          navy: '#0A2540',
          dark: '#0A2540',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'clean-hero': 'linear-gradient(180deg, #F1F5F9 0%, #FFFFFF 100%)',
        'pale-section': 'linear-gradient(180deg, #E8F6F8 0%, #FFFFFF 100%)',
        'mint-section': 'linear-gradient(180deg, #D8EEDB 0%, #FFFFFF 100%)',
        'ocean-gradient': 'linear-gradient(135deg, #0A2540 0%, #147EA8 100%)',
      }
    },
  },
  plugins: [],
}

