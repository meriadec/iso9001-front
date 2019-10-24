import "regenerator-runtime/runtime";

import React from "react";
import { render } from "react-dom";

import App from "./components/App";

const rootNode = document.createElement("div");

render(<App />, rootNode);

document.body.appendChild(rootNode);
