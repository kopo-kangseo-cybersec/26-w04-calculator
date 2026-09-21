class Calculator {
  constructor(displayElement, historyElement) {
    this.displayElement = displayElement;
    this.historyElement = historyElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operator = null;
    this.shouldResetScreen = false;
    this.updateDisplay();
  }

  delete() {
    if (this.shouldResetScreen) return;
    if (this.currentOperand.length === 1) {
      this.currentOperand = '0';
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
    this.updateDisplay();
  }

  appendNumber(number) {
    if (this.currentOperand === '0' || this.shouldResetScreen) {
      if (number === '.') {
        this.currentOperand = '0.';
      } else {
        this.currentOperand = number;
      }
      this.shouldResetScreen = false;
    } else {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand += number;
    }
    this.updateDisplay();
  }

  setOperator(operator) {
    if (this.operator !== null && !this.shouldResetScreen) {
      this.calculate();
    }
    this.previousOperand = this.currentOperand;
    this.operator = operator;
    this.shouldResetScreen = true;
    this.updateDisplay();
  }

  calculate() {
    if (this.operator === null || this.shouldResetScreen) return;
    
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operator) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '×': result = prev * current; break;
      case '÷':
        if (current === 0) {
          alert("0으로 나눌 수 없습니다.");
          this.clear();
          return;
        }
        result = prev / current;
        break;
      default: return;
    }

    this.historyElement.innerText = `${this.previousOperand} ${this.operator} ${this.currentOperand} =`;
    this.currentOperand = String(Math.round(result * 100000000) / 100000000);
    this.operator = null;
    this.shouldResetScreen = true;
    this.updateDisplay();
  }

  percent() {
    this.currentOperand = String(parseFloat(this.currentOperand) / 100);
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayElement.innerText = this.currentOperand;
    if (this.operator !== null) {
      this.historyElement.innerText = `${this.previousOperand} ${this.operator}`;
    } else if (!this.historyElement.innerText.includes('=')) {
      this.historyElement.innerText = '';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const history = document.getElementById('history');
  const calculator = new Calculator(display, history);

  document.querySelector('.keypad').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const val = btn.dataset.val;
    const action = btn.dataset.action;

    if (val && !action) {
      calculator.appendNumber(val);
    } else if (action === 'operator') {
      calculator.setOperator(val);
    } else if (action === 'calculate') {
      calculator.calculate();
    } else if (action === 'clear') {
      calculator.clear();
    } else if (action === 'delete') {
      calculator.delete();
    } else if (action === 'percent') {
      calculator.percent();
    }
  });
});