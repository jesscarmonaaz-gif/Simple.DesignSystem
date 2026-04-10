import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export const simplePreset: Partial<Config> = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: {
          DEFAULT: "hsl(var(--border))",
          accent: "hsl(var(--border-accent))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          body: "hsl(var(--foreground-body))",
        },
        surface: "hsl(var(--surface))",
        highlight: "hsl(var(--highlight))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          light: "hsl(var(--destructive-light))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          blue: {
            DEFAULT: "hsl(var(--accent-blue))",
            dark: "hsl(var(--accent-blue-dark))",
            light: "hsl(var(--accent-blue-light))",
            foreground: "hsl(var(--accent-blue-foreground))",
          },
          green: {
            DEFAULT: "hsl(var(--accent-green))",
            dark: "hsl(var(--accent-green-dark))",
            light: "hsl(var(--accent-green-light))",
            foreground: "hsl(var(--accent-green-foreground))",
          },
          earth: {
            DEFAULT: "hsl(var(--accent-earth))",
            dark: "hsl(var(--accent-earth-dark))",
            light: "hsl(var(--accent-earth-light))",
            foreground: "hsl(var(--accent-earth-foreground))",
          },
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          light: "hsl(var(--success-light))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          light: "hsl(var(--warning-light))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
          light: "hsl(var(--info-light))",
        },
        cancelled: {
          DEFAULT: "hsl(var(--cancelled))",
          foreground: "hsl(var(--cancelled-foreground))",
        },
        "status-ativo": {
          DEFAULT: "hsl(var(--status-ativo))",
          bg: "hsl(var(--status-ativo-bg))",
          foreground: "hsl(var(--status-ativo-foreground))",
        },
        "status-inativo": {
          DEFAULT: "hsl(var(--status-inativo))",
          bg: "hsl(var(--status-inativo-bg))",
          foreground: "hsl(var(--status-inativo-foreground))",
        },
        "status-prospecto": {
          DEFAULT: "hsl(var(--status-prospecto))",
          bg: "hsl(var(--status-prospecto-bg))",
          foreground: "hsl(var(--status-prospecto-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: {
            DEFAULT: "hsl(var(--sidebar-primary))",
            foreground: "hsl(var(--sidebar-primary-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--sidebar-accent))",
            foreground: "hsl(var(--sidebar-accent-foreground))",
          },
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
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
    },
  },
  plugins: [tailwindcssAnimate],
};
