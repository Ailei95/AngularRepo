module.exports = {
  purge: ['./projects/d3-exercise/src/**/*.html', './projects/d3-exercise/src/**/*.ts'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
