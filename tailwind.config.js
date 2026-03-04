// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Из брендбука MENTE
        "spanish-sun":   "#AA0607",
        "persian-plum":  "#601C1D",
        "blush":         "#F7D1BA",
        "espresso":      "#392727",
        "bone":          "#FBF0DA",
        "lemon-pie":     "#F9DD8A",
        "golden-matcha": "#E0C993",
      },
      fontFamily: {
        // Druk Wide Cyr — заголовки (15%)
        display: ["'Druk Wide Cyr'", "sans-serif"],
        // Anonymous Pro — основной текст (80%)
        mono:    ["'Anonymous Pro'", "monospace"],
        // Caveat — акценты/рукопись (5%)
        script:  ["'Caveat'", "cursive"],
      },
    },
  },
};