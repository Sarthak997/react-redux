import React from "react";
import { ThemeProvider } from "styled-components";
import theme, { GlobalStyle } from "@theme";
import { AppShell } from "@screens";
import { Provider } from "react-redux";
import store from "@store";

import { configureFakeBackend } from "@helpers";
configureFakeBackend();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <AppShell />
      </Provider>
    </ThemeProvider>
  );
}
