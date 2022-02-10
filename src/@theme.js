import { createGlobalStyle } from "styled-components";

const theme = {
  colors: {
    default: {
      primary: "#f5f6fa",
      primaryDark: "#5851d3",
      black: "#000000",
      lightBlack: "#888",
      fadedBlack: "#757575",
      green: "#B8E986",
      lightGray: "#F8F8F8",
      gray: "#e9e9e9",
      dark: "#0B3954",
      darker: "#0e2533",
      darkGray: "#a9a9a9",
      whiteDark: "#FAFAFA",
      white: "#FFFFFF",
      alert: "#ff5252",
      alertDark: "red",
    },
  },
};

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    height:100%;
  }

  body {
    padding: 0;
    margin: 0;
    font-family:sans-serif;
    font-weight: normal;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    height: 100%;
  }

  a{
    text-decoration:none;
    color: #000;
    :visited{
      color: #000;
    }
  }


  * {
    box-sizing: border-box;
  }

  #root{
    height:100%;
  }
`;

export default theme;
export { GlobalStyle };
