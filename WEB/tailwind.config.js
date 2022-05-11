module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {
      'sans': ['Inter', ...defaultTheme.fontFamily.sans],
      'display': ['Inter','ui-sans-serif', 'system-ui',]
    },
    extend: {
      colors:{
        brand:{
          500: '#8257E6',
          300: '#996DFF'
        }
      },
      borderRadius:{
        md:'4px'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-scrollbar'),
  ],
}
