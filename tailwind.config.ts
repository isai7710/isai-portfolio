import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./posts/**/*.{md,mdx}"],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary: "#1A4D2E", // dark forrest green
        palette: {
          1: "#4F6F52", // lighter muted forrest green
          2: "#E8DFCA", // light beige
          3: "#F5E5E6", // off-white
          4: "#F28D35", // ACCENT: Vibrant Orange
        },
      },
      // accordion animations used by shadcn-ui
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "85ch",
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
        offwhite: {
          css: {
            // Simplified version of your existing styles
            code: {
              color: "#F28D35", // Your palette-4 color
              backgroundColor: "#1A4D2E", // Your primary color
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            pre: {
              padding: "0",
              backgroundColor: "transparent",
              margin: "0",
              border: "1px solid #4F6F52", // Your palette-1 color
              borderRadius: "0.5rem",
              overflow: "hidden",
            },
            "pre code.hljs": {
              display: "block",
              padding: "1em",
              overflowX: "auto",
              fontSize: "0.875rem",
              lineHeight: "1.7142857",
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
            // Your color variables (keeping the most important ones)
            "--tw-prose-body": "#F5E5E6",
            "--tw-prose-headings": "#E8DFCA",
            "--tw-prose-links": "#F28D35",
            "--tw-prose-bold": "#E8DFCA",
            "--tw-prose-quotes": "#E8DFCA",
            "--tw-prose-quote-borders": "#4F6F52",
            "--tw-prose-hr": "#4F6F52",
            "--tw-prose-th-borders": "#4F6F52",
            "--tw-prose-td-borders": "#4F6F52",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;

export default config;
