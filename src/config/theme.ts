/**
 * Single source of truth for the visual system. The same values are mirrored
 * as Tailwind tokens in src/styles.css (@theme) — change both together.
 */
export const theme = {
  colors: {
    graphite: "#0E1012",
    charcoal: "#17191C",
    warmGrey: "#252525",
    metallic: "#3A3D42",
    offWhite: "#F1EEE9",
    warmLight: "#E8E4DD",
    lightGrey: "#D8D4CE",
    orange: "#E8732A",
    burntOrange: "#C85A1C",
    amber: "#E6A23C",
    deepRed: "#8B2E2E",
    textDark: "#1A1A1A",
    textLight: "#F5F3F0",
    textMuted: "#9A9A9A",
    textMutedDark: "#5F5B55",
    borderDark: "#2A2D33",
    borderLight: "#D0CCC4",
  },
  fonts: {
    display: '"Bebas Neue", Impact, sans-serif',
    sans: '"Inter", system-ui, sans-serif',
  },
  radius: { sm: "8px", md: "14px", lg: "20px", xl: "28px", full: "9999px" },
  shadows: {
    soft: "0 4px 24px rgba(0,0,0,0.12)",
    elevated: "0 18px 60px rgba(0,0,0,0.35)",
    glow: "0 0 48px rgba(232,115,42,0.28)",
  },
  duration: { fast: "200ms", base: "350ms", slow: "700ms" },
} as const;