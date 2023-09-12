import { css } from "styled-components";
import Fonts from "./fonts/Roboto";

const FontFace = css`
  @font-face {
    font-family: "Roboto-Black";
    font-style: normal;
    src: url(${Fonts.RobotoBlack});
  }
  @font-face {
    font-family: "Roboto-BlackItalic";
    font-style: italic;
    src: url(${Fonts.RobotoBlackItalic});
  }
  @font-face {
    font-family: "Roboto-Bold";
    font-style: normal;
    src: url(${Fonts.RobotoBold});
  }
  @font-face {
    font-family: "Roboto-BoldItalic";
    font-style: italic;
    src: url(${Fonts.RobotoBoldItalic});
  }
  @font-face {
    font-family: "Roboto-Italic";
    font-style: italic;
    src: url(${Fonts.RobotoItalic});
  }
  @font-face {
    font-family: "Roboto-Light";
    font-style: normal;
    src: url(${Fonts.RobotoLight});
  }
  @font-face {
    font-family: "Roboto-LightItalic";
    font-style: italic;
    src: url(${Fonts.RobotoLightItalic});
  }
  @font-face {
    font-family: "Roboto-Medium";
    font-style: normal;
    src: url(${Fonts.RobotoMedium});
  }
  @font-face {
    font-family: "Roboto-MediumItalic";
    font-style: normal;
    src: url(${Fonts.RobotoMediumItalic});
  }
  @font-face {
    font-family: "Roboto-Regular";
    font-style: normal;
    src: url(${Fonts.RobotoRegular});
  }
  @font-face {
    font-family: "Roboto-Thin";
    font-style: normal;
    src: url(${Fonts.RobotoThin});
  }
  @font-face {
    font-family: "Roboto-ThinItalic";
    font-style: normal;
    src: url(${Fonts.RobotoThinItalic});
  }
`;

export default FontFace;
