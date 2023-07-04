/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-poppins)',
        alt: 'var(--font-lexend-deca)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'open-notification': {
          '0%': { transform: 'translateX(300px)', opacity: 0 },
          '100%': { transform: 'translateX(0px)', opacity: 1 },
        },
      },
      blur: {
        full: '194px',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'open-notification': 'open-notification 0.5s ease-in-out',
        'open-notification-reverse':
          'open-notification 0.5s ease-in-out reverse',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial-indigo':
          'radial-gradient(at center center, #4438ca41 0%, #FFFFFF00 75%)',
      },
    },
  },
  plugins: [],
}
