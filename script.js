let currentInput = '0';
let shouldResetDisplay = false;

const display = document.getElementById('display');

// 화면 업데이트
function updateDisplay() {
  display.innerText = currentInput;
}

// 숫자 입력
function appendNumber(number) {
  // 소수점 중복 입력 방지
  if (number === '.' && currentInput.includes('.') && !shouldResetDisplay) {
    return;
  }

  if (currentInput === '0' || shouldResetDisplay) {
    currentInput = number === '.' ? '0.' : number;
    shouldResetDisplay = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

// 연산자 입력
function appendOperator(operator) {
  const lastChar = currentInput.slice(-1);

  // 이미 마지막 글자가 연산자인 경우 교체
  if (['+', '-', '*', '/'].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  
  shouldResetDisplay = false;
  updateDisplay();
}

// 초기화 (C)
function clearDisplay() {
  currentInput = '0';
  shouldResetDisplay = false;
  updateDisplay();
}

// 계산 실행 (=)
function calculate() {
  try {
    // eval 실행 전 마지막 글자가 연산자면 제거
    let expression = currentInput;
    const lastChar = expression.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
      expression = expression.slice(0, -1);
    }

    // 0으로 나누기 예외 처리 및 계산
    const result = eval(expression);

    if (!isFinite(result)) {
      currentInput = '오류';
    } else {
      // 소수점 연산 오차 방지 (최대 8자리)
      currentInput = String(Math.round(result * 100000000) / 100000000);
    }
  } catch (error) {
    currentInput = '오류';
  }

  shouldResetDisplay = true;
  updateDisplay();
}