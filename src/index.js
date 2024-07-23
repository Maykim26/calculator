// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // index.css 파일이 src 폴더에 있어야 합니다.
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root") // index.html 파일의 root 요소가 있어야 합니다.
);
