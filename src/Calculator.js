// src/Calculator.js
import React, { useState } from "react";
import Button from "./Button";
import Display from "./Display";
import { evaluate, sqrt, pow } from "mathjs";
import "./Calculator.css";

const Calculator = () => {
	const [input, setInput] = useState("");
	const [isError, setIsError] = useState(false);

	const handleButtonClick = (value) => {
		if (value === "=") {
			try {
				let result = evaluate(input);
				if (isNaN(result)) {
					throw new Error("Invalid result");
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
				if (isNaN(result)) {
					throw new Error(
						"Invalid square root result"
					);
				}
				setInput(result.toString());
				setIsError(false);
			} catch {
				setInput("Error");
				setIsError(true);
			}
		} else if (value === "^2") {
			try {
				const result = pow(evaluate(input), 2); // 제곱 계산
				setInput(result.toString());
				setIsError(false);
			} catch {
				setInput("Error");
				setIsError(true);
			}
		} else {
			setInput(input + value);
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
	];

	return (
		<div className={`calculator ${isError ? "error" : ""}`}>
			<Display value={input} />
			<div className="button-grid">
				{buttons.map((btn) => (
					<Button
						key={btn}
						value={btn}
						onClick={handleButtonClick}
					/>
				))}
			</div>
		</div>
	);
};

export default Calculator;
