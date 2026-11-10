/* Tailwind theme: the site's colours and fonts, so classes like "text-volt" work. */
window.tailwind = window.tailwind || {};
tailwind.config = {
  theme: {
    extend: {
      colors: {
        carbon: "#170302",
        signal: "#e10600",
        flare: "#ff5a1f",
        amber: "#ffb800",
        volt: "#ffd23f",
        paper: "#fff3dc"
      },
      fontFamily: {
        display: ["Unbounded", "system-ui", "sans-serif"],
        body: ["Instrument Sans", "system-ui", "sans-serif"],
        math: ["STIX Two Text", "Georgia", "serif"]
      }
    }
  }
};
