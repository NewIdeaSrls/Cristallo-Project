
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js", 
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    debugScreens: {
      position: ['bottom', 'left'],
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require('tailwindcss-debug-screens'),
    require('flowbite/plugin'),
    require("tw-elements/dist/plugin.cjs"),
    require('@tailwindcss/container-queries'),
    require("@tailwindcss/forms")({
      strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
    require('@gradin/tailwindcss-scrollbar'),
]
  
}