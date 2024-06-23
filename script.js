const numberBtns = [...document.getElementsByClassName("btn-number")];
const operatorBtns = [...document.getElementsByClassName("btn-operator")];
const display = document.getElementById("display-current");

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
};

function operate(firstNumber, operator, secondNumber) {
  if (operator === "+") return operation.add(firstNumber, secondNumber);
  if (operator === "-") return operation.subtract(firstNumber, secondNumber);
  if (operator === "*") return operation.multiply(firstNumber, secondNumber);
  if (operator === "/") return operation.divide(firstNumber, secondNumber);
}

let firstNumber = 0;
let operator = "+";
let secondNumber = 0;

function addComma(number) {
  numberArray = Array.from(number);
  numberLength = numberArray.length;
  commaIndex = numberLength - (numberLength % 3);

  for (i = commaIndex; i > 0; i -= 3) {
    if (i !== numberLength) {
      numberArray.splice(i, 0, ",");
    }
  }
  return numberArray.join("");
}

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    let displayNumber = 0;
    // Length limit
    if (firstNumber.toString().length >= 9) return;

    // Don't append more numbers if zero
    if (firstNumber === 0) firstNumber = button.textContent;
    else firstNumber += button.textContent;

    // Display number
    displayNumber = addComma(firstNumber);
    firstNumber = parseInt(firstNumber);
    display.textContent = displayNumber;
  });
});
