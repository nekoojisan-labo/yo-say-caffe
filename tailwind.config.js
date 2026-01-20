/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // パステル系メインカラー
        'fairy-pink': {
          50: '#FFF5F7',
          100: '#FFE4E9',
          200: '#FFB6C1', // メインピンク
          300: '#FF8FA3',
          400: '#FF6B85',
          500: '#FF4D6D',
        },
        'fairy-lavender': {
          50: '#F5F3FF',
          100: '#E6E6FA', // メインラベンダー
          200: '#D4D0F0',
          300: '#B8B0E8',
          400: '#9B8FE0',
        },
        'fairy-mint': {
          50: '#F0FFF4',
          100: '#98FF98', // メインミント
          200: '#7AE582',
          300: '#5CD66C',
          400: '#3EC756',
        },
        // アクセントカラー
        'fairy-gold': '#FFD700',
        'fairy-heart': '#FF6B6B',
        // ゲームUI用
        'game-bg': '#FFF8FA',
        'game-card': '#FFFFFF',
        'game-border': '#FFE4E9',
      },
      fontFamily: {
        'game': ['"游ゴシック"', '"Yu Gothic"', '"Rounded Mplus 1c"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(255, 182, 193, 0.3)',
        'card': '0 8px 30px rgba(255, 182, 193, 0.2)',
        'button': '0 4px 15px rgba(255, 107, 107, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
