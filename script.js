// script.js
let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

const resultDisplay = document.getElementById('result');
const expressionDisplay = document.getElementById('expression');

// 디스플레이 업데이트
function updateDisplay() {
  resultDisplay.innerText = currentInput;
  if (operator !== null) {
    expressionDisplay.innerText = `${previousInput} ${operator}`;
  } else {
    expressionDisplay.innerText = '';
  }
}

// 숫자 입력
function appendNumber(number) {
  if (currentInput === '0' || shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

// 소수점 입력
function appendDot() {
  if (shouldResetDisplay) {
    currentInput = '0.';
    shouldResetDisplay = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
}

// 연산자 입력
function appendOperator(op) {
  if (operator !== null && !shouldResetDisplay) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  shouldResetDisplay = true;
  updateDisplay();
}

// C (초기화)
function clearAll() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

// 계산 실행
function calculate() {
  if (operator === null || shouldResetDisplay) return;

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
    case '×':
      result = prev * current;
      break;
    case '÷':
      if (current === 0) {
        alert('0으로 눌눌 수는 없습니다.');
        clearAll();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  // 부동소수점 오차 처리 (소수점 최대 8자리까지 표시)
  currentInput = Math.round(result * 100000000) / 100000000 + '';
  expressionDisplay.innerText = `${previousInput} ${operator} ${current} =`;
  operator = null;
  previousInput = '';
  shouldResetDisplay = true;
  resultDisplay.innerText = currentInput;
}

// 키보드 입력을 지원
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key >= '0' && key <= '9') appendNumber(key);
  if (key === '.') appendDot();
  if (key === '+') appendOperator('+');
  if (key === '-') appendOperator('-');
  if (key === '*') appendOperator('×');
  if (key === '/') {
    event.preventDefault();
    appendOperator('÷');
  }
  if (key === 'Enter' || key === '=') calculate();
  if (key === 'Escape') clearAll();
});