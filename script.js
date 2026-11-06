let currentInput = '0';
let operator = null;
let previousInput = null;

const display = document.getElementById('display');

function updateDisplay() {
  display.innerText = currentInput;
}

function clearDisplay() {
  currentInput = '0';
  operator = null;
  previousInput = null;
  updateDisplay();
}

function appendNumber(number) {
  if (currentInput === '0') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (operator !== null) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  currentInput = '0';
}

function calculate() {
  if (operator === null || previousInput === null) return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result = 0;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        alert('0으로 나눌 수 없습니다.');
        clearDisplay();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  // 연산 결과를 문자열로 변환 (소수점 정리)
  currentInput = Math.round(result * 100000000) / 100000000 + '';
  operator = null;
  previousInput = null;
  updateDisplay();
}