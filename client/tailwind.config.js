/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          black: '#000000',    // Pure Void Black for contrast
          charcoal: '#0F0F0F', // Rich Dark Gray for cards/sections
          obsidian: '#141414', // Slightly lighter black for headers
          platinum: '#E5E4E2', // Platinum (Luxury White) for Accents/Buttons
          silver: '#C0C0C0',   // Metallic Silver
          gold: '#FFFFFF',     // White (Mapped to Gold for compatibility)
          ivory: '#FAFAFA',    // Crisp White text
          gray: '#1A1A1A',     // Dark Gray separation
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
