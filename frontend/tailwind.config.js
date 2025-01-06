module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#24ab8f",
        "primary-dark": "#268d77",
      },
      animation: {
        loader: "loader 1s linear infinite",
      },
      keyframes: {
        loader: {
          "0%": { transform: "rotate(0) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.5)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
      },
      backgroundImage: {
        "grid-slate-100":
          "linear-gradient(to right, rgb(241 245 249 / 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgb(241 245 249 / 0.1) 1px, transparent 1px)",
        "grid-slate-700":
          "linear-gradient(to right, rgb(51 65 85 / 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgb(51 65 85 / 0.1) 1px, transparent 1px)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "inherit",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
