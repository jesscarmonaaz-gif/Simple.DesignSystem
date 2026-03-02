import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const theme = create({
  base: "light",
  brandTitle: "Simple Design System",
  brandUrl: "https://thatsimple.com",
  colorPrimary: "hsl(40, 95%, 58%)",
  colorSecondary: "hsl(40, 95%, 58%)",
  fontBase: '"Inter", "system-ui", sans-serif',
});

addons.setConfig({
  theme,
});
