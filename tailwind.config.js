/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*', './views/**/*'],
  theme: {
    extend: {
      backgroundImage: {
        'boho': "url('./img/orangeboho.jpg')",
        'sun': "url('/img/sun.jpg')"
      },
      fontFamily: {
        dosis: ['Dosis', 'serif'],
      },
    },
  },
  plugins: [],
};
