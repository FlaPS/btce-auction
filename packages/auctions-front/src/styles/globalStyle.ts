import {createGlobalStyle} from './styled'
import {layouts} from './index'

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: Stem;
        src: url('./STM55.otf') format("opentype");
    }

    @font-face {
        font-family: Stem;
        font-weight: bold;
        src: url('./STM75.otf') format("opentype");
    }

    html {
        -webkit-text-size-adjust: none;
        font-family: Stem;
        color: #2A2A2A;
        background-color: #F5F5F5;
    }

    @media (pointer: coarse){
        html {
            font-size: 10px;
        }
    }

    @media (pointer: fine){
        html {
            font-size: 8px;
        }
    }

    body {
        -webkit-text-size-adjust: none;
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
    }

    #root {
        width: 100vw;
        height: 100vh;
    }

    input[type=text], input[type=submit], textarea{
        -webkit-appearance: none;
    }

    .modal {
        position: absolute;
        top: 0px;
        height: 100vh;
        width: 100%;
        overflow: auto;
        z-index: 2000;
        background-color: rgba(0, 0, 0, 0.6);
    }

    /* add the following at the bottom of your css */

    .no-click {
      @media only screen and (max-width: 1024px) {
            display: none;
            pointer-events: none;
            cursor: none;
      }
    }

    .ov-scroll{
        overflow-y: auto;
        -webkit-overflow-scrolling:touch;
    }

    textarea {
      height: 100%;
      transition: all 0.2s ease-in-out;

      &:disabled {
        outline: none;
      }
      &:focus {
        box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
      }
      ${layouts.autoSizeText}
    }

    button {
      padding: 0px 0px;
    }
`

export default GlobalStyle
