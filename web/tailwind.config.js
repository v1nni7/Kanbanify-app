/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'open-notification': {
          '0%': { transform: 'translateX(300px)', opacity: 0 },
          '100%': { transform: 'translateX(0px)', opacity: 1 },
        },
      },
      animation: {
        'open-notification': 'open-notification 0.5s ease-in-out',
        'open-notification-reverse':
          'open-notification 0.5s ease-in-out reverse',
      },
      fontFamily: {
        sans: 'var(--font-roboto)',
        alt: 'var(--font-lexend-deca)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
