document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '0';
    let operator = null;
    let firstOperand = null;
    let secondOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '0';
                operator = null;
                firstOperand = null;
                secondOperand = null;
                updateDisplay();
                return;
            }

            if (value === '=') {
                if (operator && firstOperand !== null) {
                    secondOperand = parseFloat(currentInput);
                    currentInput = calculate(firstOperand, secondOperand, operator).toString();
                    operator = null;
                    firstOperand = null;
                    secondOperand = null;
                    updateDisplay();
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                } else if (operator) {
                    secondOperand = parseFloat(currentInput);
                    firstOperand = calculate(firstOperand, secondOperand, operator);
                }
                operator = value;
                currentInput = '0';
                updateDisplay();
                return;
            }

            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }

            updateDisplay();
        });
    });

    function calculate(first, second, operator) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            default:
                return second;
        }
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }
});
