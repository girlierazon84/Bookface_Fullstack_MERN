// frontend/src/styles/globalStyle.ts

import { createGlobalStyle } from "styled-components";


export const globalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    @font-face {
        font-family: "Oxygen - Regular";
        src: local("Oxygen-Regular"),
            url("/utils/global/fonts/OxygenRegular/Oxygen-Regular.ttf") format("truetype");
        font-display: swap;
    }

    @font-face {
        font-family: "Oleo Script";
        src: local("Oleo-Script"),
            url("/utils/global/fonts/OleoScript/OleoScript-Regular.ttf") format("truetype");
        font-display: swap;
    }

    body {
        margin: 0;
        padding: 0;
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.text_primary};
        font-family: "Oxygen - Regular", "Oleo Script", sans-serif;
    }
`;
