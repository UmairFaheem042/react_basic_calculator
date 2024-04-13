import React, { useState } from "react";
import Keys from "./Keys";

const Calculator = () => {
  const keys = [
    "AC",
    "C",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    ".",
    "0",
    "EQUALS",
  ];

  const [showResult, setShowResult] = useState(false);
  const [display, setDisplay] = useState("");

  const maxLimit = 15;

  function calculateResult() {
    if (display.length !== 0) {
      try {
        let calcResult = eval(display);
        calcResult = parseFloat(calcResult.toFixed(3));
        setDisplay(calcResult);
        setShowResult(true);
      } catch (error) {
        setDisplay("Error");
      }
    } else setDisplay("");
  }

  function handleButton(value) {
    setShowResult(false);
    if (value === "AC") setDisplay("");
    else if (value === "C") setDisplay(display.slice(0, -1));
    else if (isOperator(value)) {
      if (display == "" || isOperator(display[display.length - 1])) return;
      setDisplay(display + value);
    } else if (value === "EQUALS") calculateResult();
    else if (display.length >= maxLimit)
      alert(`maximum characters allowed : ${maxLimit}`);
    else setDisplay(display + value);
  }

  function isOperator(char) {
    return ["*", "/", "%"].includes(char);
  }

  const operationClass =
    "text-[1.2rem] tracking-[2px] flex gap-[5px] items-center text-[rgba(255,255,255,0.5)] justify-end";
  const resultClass = "text-[1.7rem]";

  return (
    <div className="min-w-[320px] bg-black flex flex-col gap-4 p-4 rounded-2xl">
      <div className="overflow-x-auto bg-[#141414] min-h-[100px] flex items-end justify-end flex-col p-4 rounded-[10px]">
        <div className={`${showResult ? resultClass : operationClass}`}>
          {display}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(4,1fr)] gap-[0.3rem]">
        {keys.map((item, index) => (
          <Keys
            label={item}
            key={index}
            keyClass={item === "EQUALS" && "equals"}
            onButtonClick={handleButton}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
