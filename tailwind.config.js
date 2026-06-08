export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37',
        secondary: '#000000',
        background: '#FFFFFF',
        surface: '#F8FAFC',
        textPrimary: '#1F2937',
        textSecondary: '#6B7280',
        border: '#E5E7EB',
      },
      boxShadow: {
        glow: '0 20px 25px -5px rgba(212, 175, 55, 0.1)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(212, 175, 55, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        glass: '10px',
      },
    },
  },
  plugins: [],
};
