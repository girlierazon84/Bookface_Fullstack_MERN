// frontend/src/styles/GlobalStyle.ts

import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    @font-face {
        font-family: "Oxygen";
        src:
            local("Oxygen-Regular"),
            url("./fonts/Oxygen-Regular.ttf") format("truetype");
        font-display: swap;
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: "Oleo Script";
        src:
            local("OleoScript-Regular"),
            url("./fonts/OleoScript-Regular.ttf") format("truetype");
        font-display: swap;
        font-weight: 400;
        font-style: normal;
    }

    /* ✅ Title font */
    @font-face {
        font-family: "Ananda Black";
        src:
            local("AnandaBlack-Regular"),
            url("./fonts/AnandaBlack-Regular.ttf") format("truetype");
        font-display: swap;
        font-weight: 400;
        font-style: normal;
    }

    html, body {
        height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.text_primary};

        /* ✅ Keep Oxygen as app default */
        font-family: "Oxygen", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
    }

    /* Nice defaults */
    a {
        color: inherit;
    }

    button, input, textarea {
        font: inherit;
    }
`;

export default GlobalStyle;
