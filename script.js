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
        currentDisplay = number;
        shouldResetDisplay = false;
    } else {
        currentDisplay += number;
    }
    updateDisplay();
}

function appendDot() {
    if (shouldResetDisplay) {
        currentDisplay = '0.';
        shouldResetDisplay = false;
    } else if (!currentDisplay.includes('.')) {
        currentDisplay += '.';
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

function calculate() {
    if (operator === null || shouldResetDisplay) return;

    let result;
    const prev = parseFloat(previousDisplay);
    const current = parseFloat(currentDisplay);

    if (isNaN(prev) || isNaN(current)) return;

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

    currentDisplay = String(Math.round(result * 100000000) / 100000000); // 소수점 오차 방지
    previousOpElement.innerText = `${previousDisplay} ${operator} ${current} =`;
    operator = null;
    shouldResetDisplay = true;
    currentOpElement.innerText = currentDisplay;
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
    if (currentDisplay.length === 1) {
        currentDisplay = '0';
    } else {
        currentDisplay = currentDisplay.slice(0, -1);
    }
    updateDisplay();
}

// 키보드 입력 지원
window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendDot();
    if (e.key === '=') calculate();
    if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
    }
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearAll();
    if (e.key === '+') appendOperator('+');
    if (e.key === '-') appendOperator('-');
    if (e.key === '*') appendOperator('×');
    if (e.key === '/') {
        e.preventDefault();
        appendOperator('÷');
    }
});