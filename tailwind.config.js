/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Feature icon colors
    'bg-blue-100',
    'text-blue-600',
    'bg-green-100',
    'text-green-600',
    'bg-purple-100',
    'text-purple-600',
    'bg-yellow-100',
    'text-yellow-600',
    'bg-red-100',
    'text-red-600',
    'bg-indigo-100',
    'text-indigo-600',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter'],
      },
      colors: {
        'primary': {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}