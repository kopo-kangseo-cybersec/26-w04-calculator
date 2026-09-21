let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function updateDisplay() {
  currentOperandElement.innerText = currentOperand;
  if (operation != null) {
    previousOperandElement.innerText = `${previousOperand} ${operation}`;
  } else {
    previousOperandElement.innerText = '';
  }
}

function clearDisplay() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
  updateDisplay();
}

function deleteNumber() {
  if (currentOperand === '0') return;
  if (currentOperand.length === 1) {
    currentOperand = '0';
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number.toString();
  } else {
    currentOperand = currentOperand.toString() + number.toString();
  }
  updateDisplay();
}

function chooseOperator(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    calculate();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '0';
  updateDisplay();
}

function calculate() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
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
        clearDisplay();
        return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }

  currentOperand = computation.toString();
  operation = undefined;
  previousOperand = '';
  updateDisplay();
}

// 키보드 입력 지원
document.addEventListener('keydown', (event) => {
  if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
    appendNumber(event.key);
  } else if (event.key === '+') {
    chooseOperator('+');
  } else if (event.key === '-') {
    chooseOperator('-');
  } else if (event.key === '*') {
    chooseOperator('×');
  } else if (event.key === '/') {
    event.preventDefault();
    chooseOperator('÷');
  } else if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    calculate();
  } else if (event.key === 'Backspace') {
    deleteNumber();
  } else if (event.key === 'Escape') {
    clearDisplay();
  }
});