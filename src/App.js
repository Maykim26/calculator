// src/App.js
import React from "react";
import Calculator from "./Calculator"; // Calculator.js 파일이 src 폴더에 있어야 합니다.
import "./App.css";

const App = () => {
    return (
        <div className="App">
            <h3>공학 계산기</h3>
            <Calculator />
        </div>
    );
};

export default App;
