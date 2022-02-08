// require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./index";

const appElement = document.getElementById("root");

ReactDOM.render(<App />, appElement);
