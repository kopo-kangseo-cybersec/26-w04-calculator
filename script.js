let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');

// 화면 업데이트
function updateDisplay() {
  display.innerText = currentInput;
}

// 숫자 입력 처리
function appendNumber(number) {
  if (currentInput === '0' || shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

// 연산자 입력 처리
function appendOperator(op) {
  if (operator !== null && !shouldResetDisplay) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  shouldResetDisplay = true;
}

// 초기화(C)
function clearDisplay() {
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
        alert('0으로 나눌 수 없습니다.');
        clearDisplay();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  // 소수점 연산 오차 방지 및 반올림 (최대 소수점 8자리)
  currentInput = Math.round(result * 1e8) / 1e8 + '';
  operator = null;
  previousInput = '';
  shouldResetDisplay = true;
  updateDisplay();
}