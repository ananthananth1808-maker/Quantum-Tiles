export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        gold: '#D4AF37',
      },
      boxShadow: {
        glow: '0 35px 120px rgba(212,175,55,0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
