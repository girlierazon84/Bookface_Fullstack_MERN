// client/src/styles/theme.ts

import "styled-components";


export const theme = {
    colors: {
        primary: "#cfd8dc",
        secondary: "#000099",
        thirdly: "#e1d5e7",
        fourthly: "#e6e6e6",
        card_shadow: "0px 2px 6px rgba(0,0,0,0.08)",
        text_primary: "#2c2e2e",
        text_secondary: "#616161",
    },
    spacing: (factor: number) => `${0.25 * factor}rem`,
    radius: {
        sm: "4px",
        md: "8px",
        lg: "16px"
    }
} as const;

export type AppTheme = typeof theme;

// 👇 Integrate strongly typed theme into styled-components
declare module "styled-components" {
    export interface DefaultTheme extends AppTheme { }
}