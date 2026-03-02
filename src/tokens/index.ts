export const colors = {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  muted: "hsl(var(--muted))",
  mutedForeground: "hsl(var(--muted-foreground))",
  primary: "hsl(var(--primary))",
  primaryForeground: "hsl(var(--primary-foreground))",
  secondary: "hsl(var(--secondary))",
  secondaryForeground: "hsl(var(--secondary-foreground))",
  border: "hsl(var(--border))",
  card: "hsl(var(--card))",
  cardForeground: "hsl(var(--card-foreground))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  accent: "hsl(var(--accent))",
  accentForeground: "hsl(var(--accent-foreground))",
  popover: "hsl(var(--popover))",
  popoverForeground: "hsl(var(--popover-foreground))",
  destructive: "hsl(var(--destructive))",
  destructiveForeground: "hsl(var(--destructive-foreground))",
  success: "hsl(var(--success))",
  successForeground: "hsl(var(--success-foreground))",
  warning: "hsl(var(--warning))",
  warningForeground: "hsl(var(--warning-foreground))",
  info: "hsl(var(--info))",
  infoForeground: "hsl(var(--info-foreground))",
  cancelled: "hsl(var(--cancelled))",
  cancelledForeground: "hsl(var(--cancelled-foreground))",
} as const;

export const badgeStatusMap = {
  pending: "warning",
  complete: "success",
  confirmed: "info",
  cancelled: "cancelled",
  archived: "muted",
} as const;

export type BadgeStatus = keyof typeof badgeStatusMap;
