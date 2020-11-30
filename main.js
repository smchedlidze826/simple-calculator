let numberBtns = document.querySelectorAll('.numbers');
let operationBtn = document.querySelectorAll('.operation');
let buttons = document.querySelectorAll('button')

let firstNumberDisplay = document.getElementById('firstNumberDisplay');
let secondNumberDisplay = document.getElementById('secondNumberDisplay');
let operationDisplay = document.getElementById('operationDisplay');

let firstNumber;
let secondNumber;
let operation;
let lastClickedButton;


let operationCounter = 0

function calculate() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            let output = buttons[i].textContent
            if (filter(output)) { // if output is a number
                if (operationCounter < 1) { // if operation btn was not pressed at all
                    firstNumberDisplay.textContent += output
                    firstNumber = Number(firstNumberDisplay.textContent)

                } else if (operationCounter == 1) { //if operation btn was pressed once
                    secondNumberDisplay.textContent += output
                    secondNumber = Number(secondNumberDisplay.textContent)
                }
            } else if (!filter(output) && buttons[i].textContent != 'C' && firstNumberDisplay.textContent != '') { // if output is not a number and is not a reset button
                if (operationCounter < 1 && buttons[i].textContent != '=') {
                    operationDisplay.textContent += output
                    operation = operationDisplay.textContent
                    operationCounter++
                } else if (operationCounter == 1) {
                    if (operation == '-') {
                        let sum = firstNumber - secondNumber
                        result()
                        secondNumberDisplay.textContent = sum
                    } else if (operation == '+') {
                        let sum = firstNumber + secondNumber
                        result()
                        secondNumberDisplay.textContent = sum
                    } else if (operation == '/') {
                        let sum = firstNumber / secondNumber
                        result()
                        secondNumberDisplay.textContent = sum
                    } else if (operation == '*') {
                        let sum = firstNumber * secondNumber
                        secondNumberDisplay.textContent = sum
                        result()
                    }
                    operationCounter = 0
                }
            } else if (buttons[i].textContent == 'C') {
                reset()
            }
        })
    }
}
calculate()

function filter(x) {
    if (isNaN(x)) {
        return false
    } else {
        return true
    }

}

function result() {
    firstNumberDisplay.style.color = `rgba(209, 209, 0, .5)`
    firstNumberDisplay.textContent = `${firstNumber} ${operation} ${secondNumber}`
    operationDisplay.textContent = ''
}

function reset() {
    firstNumberDisplay.style.color = 'rgb(209, 209, 0);'
    operationDisplay.textContent = ''
    firstNumberDisplay.textContent = ''
    secondNumberDisplay.textContent = ''
    firstNumber = ''
    secondNumber = ''
    operator = ''
}