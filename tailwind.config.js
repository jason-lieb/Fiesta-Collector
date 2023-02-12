/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*', './views/**/*'],
  theme: {
    extend: {
      // backgroundImage: {
      //   'boho': "url('./img/orangeboho.png')"
      // }
      fontFamily: {
        dosis: ['Dosis', 'serif'],
      },
    },
  },
  plugins: [],
};
