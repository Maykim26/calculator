// src/Calculator.js
import React, { useState } from "react";
import Button from "./Button";
import Display from "./Display";
import { evaluate, sqrt, unit, sin, cos, tan, pow } from "mathjs";
import Fraction from "fraction.js";
import "./Calculator.css";

const Calculator = () => {
    const [input, setInput] = useState("");
    const [isError, setIsError] = useState(false);
    const [fractionInput, setFractionInput] = useState({
        numerator: "",
        denominator: "",
    });
    const [activeField, setActiveField] = useState(""); // "numerator" or "denominator"

    const handleButtonClick = (value) => {
        if (value === "=") {
            try {
                let result = evaluate(input);
                if (typeof result === "number") {
                    result = new Fraction(result).toFraction();
                }
                setInput(result.toString());
                setIsError(false);
            } catch {
                setInput("Error");
                setIsError(true);
            }
        } else if (value === "C") {
            setInput("");
            setIsError(false);
        } else if (value === "←") {
            setInput(input.slice(0, -1));
            setIsError(false);
        } else if (value === "√") {
            try {
                const result = sqrt(evaluate(input));
                setInput(new Fraction(result).toFraction());
                setIsError(false);
            } catch {
                setInput("Error");
                setIsError(true);
            }
        } else if (value === "^2") {
            try {
                const result = pow(evaluate(input), 2); // 제곱 계산
                setInput(new Fraction(result).toFraction());
                setIsError(false);
            } catch {
                setInput("Error");
                setIsError(true);
            }
        } else if (["sin", "cos", "tan"].includes(value)) {
            try {
                const angle = evaluate(input);
                const radians = unit(angle, "deg").to("rad");
                const result = {
                    sin: sin(radians),
                    cos: cos(radians),
                    tan: tan(radians),
                }[value];
                setInput(new Fraction(result).toFraction());
                setIsError(false);
            } catch {
                setInput("Error");
                setIsError(true);
            }
        } else if (value === "fraction") {
            setActiveField("numerator");
        } else if (value === "submit") {
            handleFractionSubmit();
        } else if (
            value === "0" ||
            value === "1" ||
            value === "2" ||
            value === "3" ||
            value === "4" ||
            value === "5" ||
            value === "6" ||
            value === "7" ||
            value === "8" ||
            value === "9"
        ) {
            if (activeField) {
                setFractionInput((prev) => ({
                    ...prev,
                    [activeField]: prev[activeField] + value,
                }));
            } else {
                setInput(input + value);
            }
        } else {
            setInput(input + value);
        }
    };

    const handleFractionSubmit = () => {
        try {
            const { numerator, denominator } = fractionInput;
            if (denominator === "0") {
                throw new Error("Denominator cannot be zero");
            }
            const result = new Fraction(numerator, denominator).toFraction();
            setInput(result.toString());
            setFractionInput({ numerator: "", denominator: "" });
            setActiveField(""); // Reset active field
            setIsError(false);
        } catch {
            setInput("Error");
            setIsError(true);
        }
    };

    const handleFractionChange = (e) => {
        const value = e.target.value;
        if (activeField) {
            setFractionInput((prev) => ({
                ...prev,
                [activeField]: value,
            }));
        }
    };

    const buttons = [
        "7",
        "8",
        "9",
        "/",
        "4",
        "5",
        "6",
        "*",
        "1",
        "2",
        "3",
        "-",
        "0",
        ".",
        "=",
        "+",
        "C",
        "←",
        "√",
        "^2",
        "sin",
        "cos",
        "tan",
        "fraction",
        "submit",
    ];

    return (
        <div className={`calculator ${isError ? "error" : ""}`}>
            <Display value={input} />
            {activeField && (
                <div className="fraction-input">
                    <div className="fraction-box">
                        <input
                            type="number"
                            value={fractionInput.numerator}
                            onChange={handleFractionChange}
                            placeholder="분자"
                            onFocus={() => setActiveField("numerator")}
                        />
                        <span>/</span>
                        <input
                            type="number"
                            value={fractionInput.denominator}
                            onChange={handleFractionChange}
                            placeholder="분모"
                            onFocus={() => setActiveField("denominator")}
                        />
                    </div>
                    <button onClick={handleFractionSubmit}>확인</button>
                </div>
            )}
            <div className="button-grid">
                {buttons.map((btn) => (
                    <Button key={btn} value={btn} onClick={handleButtonClick} />
                ))}
            </div>
        </div>
    );
};

export default Calculator;
