/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'civora-blue': '#1e40af',
        'civora-green': '#059669',
        'civora-orange': '#ea580c',
      },
    },
  },
  plugins: [],
}

