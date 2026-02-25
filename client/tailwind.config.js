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
          black: '#000000',      // Pure Black for contrast
          charcoal: '#1a1a1a',   // Near-black for text
          obsidian: '#2a2a2a',   // Soft dark for subtle contrast
          platinum: '#E5E4E2',   // Platinum for accents
          silver: '#C0C0C0',     // Metallic Silver
          gold: '#C9A96E',       // Warm Royal Gold
          goldLight: '#E8C98A',  // Light Gold highlight
          ivory: '#FAFAF8',      // Warm White
          cream: '#F8F6F2',      // Soft Cream background
          linen: '#F2EFE9',      // Warm Linen tone
          muted: '#9CA3AF',      // Muted Gray for secondary text
          white: '#FFFFFF',      // Pure White
          maroon: '#7B1A1A',     // Deep Maroon accent
        }
      },
      fontFamily: {
        serif: ['"Futura PT"', 'Futura', 'Poppins', 'sans-serif'],
        sans: ['"Futura PT"', 'Futura', 'Poppins', 'sans-serif'],
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