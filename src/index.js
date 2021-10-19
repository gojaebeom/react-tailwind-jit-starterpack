import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";

ReactDOM.render(
    <RecoilRoot>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </RecoilRoot>,
    document.getElementById("root")
);
