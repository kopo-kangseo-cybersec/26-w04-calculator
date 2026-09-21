const display = document.getElementById('display');
let currentInput = '';

// 숫자 입력
function appendNumber(number) {
    if (display.value === '0' && number !== '0') {
        currentInput = number;
    } else if (display.value === '0' && number === '0') {
        return;
    } else {
        currentInput += number;
    }
    display.value = currentInput;
}

// 연산자 입력
function appendOperator(operator) {
    if (currentInput === '') return;

    const lastChar = currentInput.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + operator;
    } else {
        currentInput += operator;
    }
    display.value = currentInput;
}

// 화면 초기화 (C)
function clearDisplay() {
    currentInput = '';
    display.value = '0';
}

// 결과 계산 (=)
function calculate() {
    try {
        if (currentInput === '') return;
        
        let result = Function(`'use strict'; return (${currentInput})`)();

        if (!isFinite(result)) {
            display.value = '오류';
            currentInput = '';
        } else {
            // 소수점 정리 (최대 8자리)
            result = Math.round(result * 100000000) / 100000000;
            display.value = result;
            currentInput = String(result);
        }
    } catch (error) {
        display.value = '오류';
        currentInput = '';
    }
}