class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    // 초기화
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // 숫자 입력
    appendNumber(number) {
        // 소수점이 이미 존재할 경우 중복 입력 방지
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // 초기 '0'일 때 소수점이 아니면 입력한 숫자로 교체
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    // 연산자 선택
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        
        // 이미 이전 연산이 존재하면 중간 계산 수행
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // 실제 계산 수행
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
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
                    alert("0으로 나눌 수 없습니다.");
                    this.clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    // 화면 업데이트
    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

// DOM 요소 연결
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// 숫자 버튼 이벤트 리스너
document.querySelectorAll('.btn.number').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.getAttribute('data-number'));
        calculator.updateDisplay();
    });
});

// 연산자 버튼 이벤트 리스너 (+, -, ×, ÷)
document.querySelectorAll('.btn.operator').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// '=' 버튼 이벤트 리스너
document.querySelector('.btn.equals').addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

// 'C' 버튼 이벤트 리스너 (초기화)
document.querySelector('.btn.clear').addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});