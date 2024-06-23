const numberBtns = [...document.getElementsByClassName("btn-number")];
const operatorBtns = [...document.getElementsByClassName("btn-operator")];
const displayCurrent = document.getElementById("display-current");
const displayPrevious = document.getElementById("display-previous");

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
  percent(a, b) {
    return a * 0.01;
  },
};

function operate(firstNumber, operator, secondNumber) {
  if (operator === "+") return operation.add(firstNumber, secondNumber);
  if (operator === "–") return operation.subtract(firstNumber, secondNumber);
  if (operator === "×") return operation.multiply(firstNumber, secondNumber);
  if (operator === "÷") return operation.divide(firstNumber, secondNumber);

  return secondNumber;
}

let currNumber = "0";
let operator = "+";
let prevNumber = 0;

let previousOperator = "+";
let displayNumber;

function resetDisplay() {
  displayNumber = 0;
  currNumber = "0";
  operator = "+";
  prevNumber = 0;
  previousOperator = "+";
  displayPrevious.textContent = "";
  displayCurrent.textContent = "";
}

function updateCurrentDisplay(number) {
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
  number = parseFloat(number);

  // Convert to scientific notation if the integer part or the decimal part is too long
  let numberString = number.toString();
  let [integerPart, decimalPart] = numberString.split(".");

  if (
    integerPart.length + (decimalPart ? decimalPart.length : 0) > 9 ||
    (decimalPart && decimalPart.length > 9)
  ) {
    return number.toExponential(2);
  }

  // Handle negatives and decimals
  let isNegative = number < 0;
  [integerPart, decimalPart] = Math.abs(number).toFixed(9).split(".");

  // Remove trailing zeros from the decimal part
  decimalPart = decimalPart.replace(/0+$/, "");

  // Add comma every 3 places
  let numberArray = Array.from(integerPart).reverse();
  for (let i = 3; i < numberArray.length; i += 4) {
    numberArray.splice(i, 0, ",");
  }

  // Finalize results
  let result = numberArray.reverse().join("");
  if (decimalPart) result += "." + decimalPart;
  if (isNegative) result = "-" + result;
  return result;
}

// Number Keys
numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    // Length limit
    if (currNumber.length >= 10) return;

    if (previousOperator === "=") {
      previousOperator = "+";
      currNumber = "0";
      prevNumber = 0;
    }

    // Handle decimal button
    if (button.textContent === ".") {
      if (currNumber.includes(".")) return; // Already has a decimal
      currNumber += ".";
    } else {
      // Don't append more numbers if zero
      if (currNumber !== 0) currNumber += button.textContent;
    }

    // Display number
    updateCurrentDisplay(currNumber);
  });
});

let operatedNumber;

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
      currNumber = "0";
      previousOperator = currentOperator;
    }
  });
});
