module.exports = {
  content: [
    "./index.html",
    "./impressum.html",
    "./datenschutz.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Brand colours from the flia business card & folder
        'red-primary': '#5A0E2A',   // wine – primary text, buttons, dark sections
        'red-dark': '#45091F',      // wine hover state
        'rose-primary': '#E7C9C4',  // dusty rose – accents, numbers, rules, watermark
        'pink-primary': '#FBE9E7',  // blush – light section background
        'background': '#FFFAF9',    // near-white page background
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Jost", "Helvetica Neue", "Arial", "sans-serif"],
        // former script accent – now Playfair Display italic, as on the flyer
        decor: ["Playfair Display", "Georgia", "serif"],
      },
      // Playfair Display needs a bit more line height than Tailwind's default 1
      fontSize: {
        '4xl': ['2.25rem', { lineHeight: '1.15' }],
        '5xl': ['3rem', { lineHeight: '1.15' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.05' }],
      },
      letterSpacing: {
        label: '0.25em',
      },
      animation: {
        'loop-scroll': 'loop-scroll 40s linear infinite',
      },
      keyframes: {
        'loop-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/resources/images/hero_bg.png')",
      },
    },
  },
  plugins: [],
}
