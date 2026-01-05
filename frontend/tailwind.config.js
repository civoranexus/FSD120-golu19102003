/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'civora-blue': '#0066CC',
        'civora-dark': '#1a1a2e',
        'civora-light': '#f8f9fa',
      },
    },
  },
  plugins: [],
}
