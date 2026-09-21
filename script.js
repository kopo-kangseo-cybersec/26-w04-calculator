class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  // 초기화 (C)
  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.updateDisplay();
  }

  // 한 글자 지우기 (⌫)
  delete() {
    if (this.currentOperand === '0') return;
    if (this.currentOperand.length === 1) {
      this.currentOperand = '0';
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
    this.updateDisplay();
  }

  // 숫자 추가
  appendNumber(number) {
    // 소수점 중복 입력 방지
    if (number === '.' && this.currentOperand.includes('.')) return;
    
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    this.updateDisplay();
  }

  // 연산자 선택
  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '0';
    this.updateDisplay();
  }

  // 계산 수행
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
          alert('0으로 나눌 수 없습니다.');
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    // 소수점 연산 오차 방지 (최대 8자리)
    this.currentOperand = Math.round(computation * 100000000) / 100000000;
    this.operation = undefined;
    this.previousOperand = '';
    this.updateDisplay();
  }

  // 화면 업데이트
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

// DOM 요소 선택 및 이벤트 바인딩
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// 숫자 버튼 이벤트
document.querySelectorAll('[data-number]').forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.dataset.number);
  });
});

// 연산자 버튼 이벤트
document.querySelectorAll('[data-operator]').forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.dataset.operator);
  });
});

// = 버튼 이벤트
document.getElementById('equals-btn').addEventListener('click', () => {
  calculator.compute();
});

// C 버튼 이벤트
document.getElementById('clear-btn').addEventListener('click', () => {
  calculator.clear();
});

// 지우기 버튼 이벤트
document.querySelector('[data-action="delete"]').addEventListener('click', () => {
  calculator.delete();
});

// 키보드 지원
document.addEventListener('keydown', e => {
  if (e.key >= '0' && e.key <= '9') calculator.appendNumber(e.key);
  if (e.key === '.') calculator.appendNumber('.');
  if (e.key === '+') calculator.chooseOperation('+');
  if (e.key === '-') calculator.chooseOperation('-');
  if (e.key === '*') calculator.chooseOperation('×');
  if (e.key === '/') {
    e.preventDefault();
    calculator.chooseOperation('÷');
  }
  if (e.key === 'Enter' || e.key === '=') calculator.compute();
  if (e.key === 'Backspace') calculator.delete();
  if (e.key === 'Escape') calculator.clear();
});