/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      textStroke: {
        '1': '0.05em black',
        '2': '0.1em black',
        '3': '0.15em black',
      },
    },
  },
  variants: {
    extend: {
      textStroke: ['responsive', 'hover', 'focus'],
    },
  },
}
