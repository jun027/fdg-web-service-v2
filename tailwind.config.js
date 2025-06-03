/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        1440: '1440px',
        1520: '1520px',
        650: '650px',
      },
      zIndex: {},
      borderWidth: {},
      borderRadius: {},
      boxShadow: {},
      animation: {},
      keyframes: {},
      fontFamily: {
        jf: ['openhuninn', 'sans-serif'],
        fz: ['fzshujf', 'serif'],
      },
      fontSize: {
        88: '88px',
        72: '72px',
        64: '64px',
        60: '60px',
        56: '56px',
        48: '48px',
        44: '44px',
        40: '40px',
        36: '36px',
        32: '32px',
        30: '30px',
        24: '24px',
        22: '22px',
        20: '20px',
        16: '16px',
        14: '14px',
        12: '12px',
      },
    },
  },
  plugins: [],
}
