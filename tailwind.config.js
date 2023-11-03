/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    options: {
      safelist: [
        // Prevent these classes from being purged as we need to add them dynamically from json
        "text-red",
        "border-red",
      ],
    },
  },
  theme: {
    colors: {
      "deep-violet": "rgba(33, 9, 47, 1)",
      "purplish-grey": "rgba(143, 134, 148, 1)",
      "light-grey": "rgba(223, 222, 224, 1)",
      white: "rgba(255, 255, 255, 1)",
      red: "rgba(255, 80, 80, 1)",
      "light-violet": "rgba(99, 72, 254, 1)",
      violet: "rgba(97, 5, 149, 1)",
    },
    extend: {},
  },
  plugins: [],
};
