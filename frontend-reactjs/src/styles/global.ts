import { createGlobalStyle } from "styled-components";
import FontFace from "./fonts";

export const GlobalStyle = createGlobalStyle`

    :root{
        --header: #000;
        --footer: #000;
    }

    *{
        ${FontFace}
        margin: 0;
        padding:0;
        outline: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    body{
        font-family: 'Roboto-Black';      
    }

`;
