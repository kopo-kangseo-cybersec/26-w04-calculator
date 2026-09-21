let currentDisplay = '0';
let previousDisplay = '';
let operator = null;
let shouldResetDisplay = false;

const currentOpElement = document.getElementById('current-op');
const previousOpElement = document.getElementById('previous-op');

function updateDisplay() {
  currentOpElement.innerText = currentDisplay;
  if (operator !== null) {
    previousOpElement.innerText = `${previousDisplay} ${operator}`;
  } else {
    previousOpElement.innerText = '';
  }
}

function appendNumber(number) {
  if (currentDisplay === '0' || shouldResetDisplay) {
    currentDisplay = number === '.' ? '0.' : number;
    shouldResetDisplay = false;
  } else {
    if (number === '.' && currentDisplay.includes('.')) return;
    currentDisplay += number;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (operator !== null && !shouldResetDisplay) {
    calculate();
  }
  previousDisplay = currentDisplay;
  operator = op;
  shouldResetDisplay = true;
  updateDisplay();
}

function clearAll() {
  currentDisplay = '0';
  previousDisplay = '';
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteNumber() {
  if (shouldResetDisplay) return;
  if (currentDisplay.length === 1 || (currentDisplay.length === 2 && currentDisplay.startsWith('-'))) {
    currentDisplay = '0';
  } else {
    currentDisplay = currentDisplay.slice(0, -1);
  }
  updateDisplay();
}

function calculate() {
  if (operator === null || shouldResetDisplay) return;

  const prev = parseFloat(previousDisplay);
  const current = parseFloat(currentDisplay);
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
        clearAll();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  // 소수점 연산 오차 방지 및 반올림 처리
  currentDisplay = Math.round(result * 100000000) / 100000000 + '';
  operator = null;
  previousDisplay = '';
  shouldResetDisplay = true;
  updateDisplay();
}

// 키보드 입력을 위한 이벤트 리스너
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
  if (e.key === '.') appendNumber('.');
  if (e.key === '+') appendOperator('+');
  if (e.key === '-') appendOperator('-');
  if (e.key === '*') appendOperator('×');
  if (e.key === '/') appendOperator('÷');
  if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    calculate();
  }
  if (e.key === 'Backspace') deleteNumber();
  if (e.key === 'Escape') clearAll();
});
