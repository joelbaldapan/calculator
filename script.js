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
    if ((b === 0)) return NaN;
    return a / b;
  },
};

let firstNumber = 0;
let operator = "+";
let secondNumber = 0;

function operate(firstNumber, operator, secondNumber) {
  if ((operator === "+")) return operation.add(firstNumber, secondNumber);
  if ((operator === "-")) return operation.subtract(firstNumber, secondNumber);
  if ((operator === "*")) return operation.multiply(firstNumber, secondNumber);
  if ((operator === "/")) return operation.divide(firstNumber, secondNumber);
}
