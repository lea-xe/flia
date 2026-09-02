module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'red-primary': '#800511',
        'pink-primary': '#EDDFDD',
        'background': '#FFF9F4',
      },
      fontFamily: {
        serif: ["Gloock", "sans-serif"],
        sans: ["Space Grotesk", "sans-serif"],
        decor: ["Italianno", "cursive"],
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