class Calculator {
  constructor(miniRes, finalRes) {
    this.minires = miniRes;
    this.finalres = finalRes;
    this.clear();
    // console.log(this.minires, this.finalres);
  }

  clear() {
    this.currentNumber = "";
    this.previousNumber = "";
    this.operation = undefined;
    // this.updateDisplay();
  }
  delete() {
    this.currentNumber = this.currentNumber.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentNumber.includes(".")) return;
    this.currentNumber = this.currentNumber.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentNumber === "") return;
    if (this.previousNumber !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousNumber = this.currentNumber;
    this.currentNumber = "";
    this.updateDisplay();
  }

  compute() {
    let computaion;
    const prev = parseFloat(this.previousNumber);
    const current = parseFloat(this.currentNumber);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computaion = prev + current;
        break;
      case "-":
        computaion = prev - current;
        break;
      case "×":
        computaion = prev * current;
        break;
      case "÷":
        computaion = prev / current;
        break;
      default:
        return;
    }
    this.currentNumber = computaion;
    this.operation = undefined;
    this.previousNumber = "";
  }

  updateDisplay() {
    this.finalres.innerText = this.currentNumber;
    if (this.operation != null) {
      this.minires.innerText = `${this.previousNumber} ${this.operation}`;
    } else {
      this.minires.innerText = "";
    }
    // this.minires.innerText = `${this.previousNumber} `;
    // console.log(this.currentNumber);
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalsBtn = document.querySelector("[data-equals]");
const miniRes = document.querySelector("[data-mini-res]");
const finalRes = document.querySelector("[data-final-res]");

const calculator = new Calculator(miniRes, finalRes);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearBtn.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
