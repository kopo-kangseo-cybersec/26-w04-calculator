let currentInput = '0';
let previousInput = null;
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');

function updateDisplay() {
  display.textContent = currentInput;
}

function handleNumber(number) {
  if (currentInput === '0' || shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function handleOperator(op) {
  if (operator !== null && !shouldResetDisplay) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  shouldResetDisplay = true;
}

function calculate() {
  if (operator === null || shouldResetDisplay) return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result = 0;

  switch (operator) {
    case 'add':
      result = prev + current;
      break;
    case 'subtract':
      result = prev - current;
      break;
    case 'multiply':
      result = prev * current;
      break;
    case 'divide':
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

  // 소수점 연산 오차 방지 및 정리
  currentInput = String(Math.round(result * 1e8) / 1e8);
  operator = null;
  previousInput = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function clearAll() {
  currentInput = '0';
  previousInput = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function addDot() {
  if (shouldResetDisplay) {
    currentInput = '0.';
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}

// 이벤트 리스너 등록
document.querySelectorAll('[data-number]').forEach((btn) => {
  btn.addEventListener('click', () => {
    handleNumber(btn.dataset.number);
  });
});

document.querySelectorAll('[data-action]').forEach((btn) => {
  btn.addEventListener('click', () => {
    handleOperator(btn.dataset.action);
  });
});

document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clearAll);
document.getElementById('dot').addEventListener('click', addDot);