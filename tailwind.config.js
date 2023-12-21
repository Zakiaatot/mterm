/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}", "index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  darkMode: ['class', '[data-theme="dark"]']
}

