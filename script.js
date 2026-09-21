const currentEl = document.getElementById('current');
const historyEl = document.getElementById('history');

let currentValue = '0';
let firstOperand = null;
let pendingOperator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
  currentEl.textContent = currentValue;
}

function updateHistory(text) {
  historyEl.textContent = text;
}

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    currentValue = digit;
    waitingForSecondOperand = false;
  } else {
    currentValue = currentValue === '0' ? digit : currentValue + digit;
  }
  updateDisplay();
}

function operatorSymbol(action) {
  return { add: '+', subtract: '-', multiply: '×', divide: '÷' }[action];
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentValue);

  if (pendingOperator && waitingForSecondOperand) {
    pendingOperator = nextOperator;
    updateHistory(`${firstOperand} ${operatorSymbol(pendingOperator)}`);
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (pendingOperator) {
    const result = calculate(firstOperand, inputValue, pendingOperator);
    currentValue = String(result);
    firstOperand = result;
    updateDisplay();
  }

  waitingForSecondOperand = true;
  pendingOperator = nextOperator;
  updateHistory(`${firstOperand} ${operatorSymbol(pendingOperator)}`);
}

function calculate(first, second, operator) {
  switch (operator) {
    case 'add':
      return first + second;
    case 'subtract':
      return first - second;
    case 'multiply':
      return first * second;
    case 'divide':
      return second === 0 ? 'Error' : first / second;
    default:
      return second;
  }
}

function handleEquals() {
  if (pendingOperator === null || waitingForSecondOperand) return;

  const inputValue = parseFloat(currentValue);
  const result = calculate(firstOperand, inputValue, pendingOperator);

  updateHistory(`${firstOperand} ${operatorSymbol(pendingOperator)} ${inputValue} =`);
  currentValue = String(result);
  firstOperand = null;
  pendingOperator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

function handleClear() {
  currentValue = '0';
  firstOperand = null;
  pendingOperator = null;
  waitingForSecondOperand = false;
  updateHistory('');
  updateDisplay();
}

document.querySelectorAll('.key').forEach((button) => {
  button.addEventListener('click', () => {
    const { value, action } = button.dataset;

    if (value !== undefined) {
      inputDigit(value);
      return;
    }

    switch (action) {
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        handleOperator(action);
        break;
      case 'equals':
        handleEquals();
        break;
      case 'clear':
        handleClear();
        break;
    }
  });
});
