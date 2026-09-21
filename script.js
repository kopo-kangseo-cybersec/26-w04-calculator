class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.readyToReset = false;
  }

  delete() {
    if (this.readyToReset) {
      this.clear();
      return;
    }
    if (this.currentOperand === '0' || this.currentOperand === 'Error') return;
    if (this.currentOperand.length === 1) {
      this.currentOperand = '0';
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }

  appendNumber(number) {
    if (this.readyToReset) {
      this.currentOperand = '';
      this.readyToReset = false;
    }
    if (this.currentOperand === 'Error') {
      this.clear();
    }
    // 소수점 중복 방지
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === 'Error') return;
    if (this.currentOperand === '' && this.previousOperand !== '') {
      this.operation = operation;
      return;
    }
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        if (current === 0) {
          this.currentOperand = 'Error';
          this.previousOperand = '';
          this.operation = undefined;
          this.readyToReset = true;
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    // 부동소수점 오차 보정 (최대 10자리)
    this.currentOperand = Math.round(computation * 1e10) / 1e10;
    this.operation = undefined;
    this.previousOperand = '';
    this.readyToReset = true;
  }

  percent() {
    if (this.currentOperand === 'Error' || this.currentOperand === '') return;
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    this.currentOperand = (current / 100).toString();
  }

  getDisplayNumber(number) {
    if (number === 'Error') return 'Error';
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

// 요소 참조 및 이벤트 리스너 등록
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// 숫자 버튼 이벤트
document.querySelectorAll('[data-number]').forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.dataset.number);
    calculator.updateDisplay();
  });
});

// 연산자 버튼 이벤트
document.querySelectorAll('[data-operation]').forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.dataset.operation);
    calculator.updateDisplay();
  });
});

// 기능 버튼 이벤트 (C, ⌫, %, =)
document.querySelectorAll('[data-action]').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'clear') calculator.clear();
    if (action === 'delete') calculator.delete();
    if (action === 'percent') calculator.percent();
    if (action === 'equals') calculator.compute();
    calculator.updateDisplay();
  });
});

// 키보드 지원
window.addEventListener('keydown', e => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    calculator.appendNumber(e.key);
  } else if (e.key === '+') {
    calculator.chooseOperation('+');
  } else if (e.key === '-') {
    calculator.chooseOperation('-');
  } else if (e.key === '*') {
    calculator.chooseOperation('×');
  } else if (e.key === '/') {
    e.preventDefault();
    calculator.chooseOperation('÷');
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    calculator.compute();
  } else if (e.key === 'Backspace') {
    calculator.delete();
  } else if (e.key === 'Escape') {
    calculator.clear();
  }
  calculator.updateDisplay();
});