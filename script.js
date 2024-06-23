const numberBtns = [...document.getElementsByClassName("btn-number")];
const operatorBtns = [...document.getElementsByClassName("btn-operator")];
const specialBtns = [...document.getElementsByClassName("btn-special")];
const displayCurrent = document.getElementById("display-current");
const displayPrevious = document.getElementById("display-previous");
const clearBtn = document.getElementById("btn-clear");

// Code
const operation = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
  multiply(a, b) {
    return a * b;
  },
  divide(a, b) {
    if (b === 0) return NaN;
    return a / b;
  },

  percent(a) {
    return a * 0.01;
  },
  sign(a) {
    return a * -1;
  },
};

function operate(firstNumber, operator, secondNumber) {
  if (operator === "+") return operation.add(firstNumber, secondNumber);
  if (operator === "–") return operation.subtract(firstNumber, secondNumber);
  if (operator === "×") return operation.multiply(firstNumber, secondNumber);
  if (operator === "÷") return operation.divide(firstNumber, secondNumber);

  if (operator === "%") return operation.percent(firstNumber);
  if (operator === "+/-") return operation.sign(firstNumber);
  if (operator === "AC") return resetDisplay();
  if (operator === "C") return resetDisplay();
  if (operator === "=") return secondNumber;
}

let currNumber = "";
let operator = "+";
let prevNumber = 0;

let operatedNumber = undefined;
let previousOperator = "+";
let displayNumber;

function resetDisplay() {
  displayNumber = 0;
  currNumber = "";
  operator = "+";
  prevNumber = 0;
  previousOperator = "+";
  operatedNumber = undefined;

  clearBtn.textContent = "AC";
  displayPrevious.textContent = "";
  displayCurrent.textContent = "0";
}

function updateCurrentDisplay(number) {
  if (number === "") return (displayCurrent.textContent = "0");
  displayNumber = formatNumber(number);
  displayCurrent.textContent = displayNumber;
}

function updatePreviousDisplay(operation) {
  if (operation !== "=") {
    return (displayPrevious.textContent = `${displayNumber} ${previousOperator}`);
  }
  displayPrevious.textContent = displayNumber;
  displayCurrent.textContent = displayNumber;
}

function formatNumber(number) {
  number = number.toString();
  let [integerPart, decimalPart] = number.split(".");

  // Convert to scientific notation if the integer part or the decimal part is too long
  if (
    integerPart.length + (decimalPart ? decimalPart.length : 0) > 9 ||
    (decimalPart && decimalPart.length > 9)
  ) {
    return number.toExponential(2);
  }

  // Add comma every 3 places
  let numberArray = Array.from(integerPart).reverse();
  for (let i = 3; i < numberArray.length; i += 4) {
    numberArray.splice(i, 0, ",");
  }

  // Finalize results
  let result = numberArray.reverse().join("");
  if (number.includes(".")) result += "." + decimalPart;
  return result;
}

// Number Keys
numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    // Length limit
    if (currNumber.length >= 10) return;

    if (previousOperator === "=") {
      previousOperator = "+";
      currNumber = "";
      prevNumber = 0;
    }

    // Handle decimal button
    if (button.textContent === ".") {
      if (currNumber.includes(".")) return; // Already has a decimal
      if (currNumber === "") currNumber += "0.";
      else currNumber += ".";
    } else {
      // Don't append more numbers if zero
      if (button.textContent === "0" && currNumber === "") return;
      currNumber += button.textContent;
    }

    // Display number
    clearBtn.textContent = "C";
    updateCurrentDisplay(currNumber);
  });
});

// Operator Keys
operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const currentOperator = button.textContent;

    // Do operations
    if (previousOperator !== "=") {
      currNumber = parseFloat(currNumber);
      console.log(prevNumber, previousOperator, currNumber);
      operatedNumber = operate(prevNumber, previousOperator, currNumber);
    }

    // User presses operator buttons
    previousOperator = currentOperator;
    prevNumber = currNumber;

    updateCurrentDisplay(operatedNumber);
    updatePreviousDisplay(previousOperator);

    // Handle equals
    if (currentOperator === "=") {
      prevNumber = operatedNumber;
    } else {
      prevNumber = operatedNumber;
      currNumber = "";
      previousOperator = currentOperator;
    }
  });
});

// Special Keys
specialBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (operatedNumber == undefined) operatedNumber = currNumber;
    else currNumber = operatedNumber;

    operatedNumber = operate(operatedNumber, button.textContent).toString();
    currNumber = operatedNumber;

    updateCurrentDisplay(operatedNumber);
  });
});

