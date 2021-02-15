let numberBtns = document.querySelectorAll('.num');
let operationBtn = document.querySelectorAll('.operation-btn');
let buttons = document.querySelectorAll('button')

let firstNumberDisplay = document.getElementById('firstNumberDisplay');
let secondNumberDisplay = document.getElementById('secondNumberDisplay');
let operationDisplay = document.getElementById('operationDisplay');

let resultIsDisplayed = false


let firstNumber;
let secondNumber;
let operation;


function calculate() {

    let operationCounter = 0;
    let lastChar;
    let sum;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            // click animation
            buttons[i].style.boxShadow = 'inset 0 0 45px rgba(0, 0, 0, .7) '
            setTimeout(() => {
                buttons[i].style.boxShadow = 'none'
            }, 300)

            let output = buttons[i].textContent
            if (output != 'CE') {
                lastChar = output
            }

            if (resultIsDisplayed == false) {
                if (filter(output) || output == '.') { // if output is a number
                    if (operationCounter < 1) { // if operation btn was not pressed at all
                        firstNumberDisplay.textContent += output
                        firstNumber = Number(firstNumberDisplay.textContent)
                    } else if (operationCounter == 1) { //if operation btn was pressed once
                        secondNumberDisplay.textContent += output
                        secondNumber = Number(secondNumberDisplay.textContent)
                    }
                } else if (!filter(output) && buttons[i].textContent != 'C' && buttons[i].textContent != 'CE' && firstNumberDisplay.textContent != '') { // if output is not a number and is not a reset button
                    if (operationCounter < 1 && buttons[i].textContent != '=') {
                        operationDisplay.textContent = output
                        operation = operationDisplay.textContent
                        operationCounter = 1
                    } else if (operationCounter == 1) {
                        if (operation == '-') {
                            sum = firstNumber - secondNumber
                            result()
                            secondNumberDisplay.textContent = sum
                        } else if (operation == '+') {
                            sum = firstNumber + secondNumber
                            result()
                            secondNumberDisplay.textContent = sum
                        } else if (operation == '/') {
                            sum = firstNumber / secondNumber
                            result()
                            secondNumberDisplay.textContent = sum
                        } else if (operation == '*') {
                            sum = firstNumber * secondNumber
                            secondNumberDisplay.textContent = sum
                            result()
                        }
                        operationCounter = 0
                    }
                } else if (buttons[i].textContent == 'C') {
                    reset()
                    operationCounter = 0
                } else if (buttons[i].textContent == 'CE') {
                    if (operationCounter < 1) { // if operation btn was not pressed at all
                        firstNumberDisplay.textContent = firstNumberDisplay.textContent.substring(0, firstNumberDisplay.textContent.length - 1)
                        firstNumber = Number(firstNumberDisplay.textContent)

                    } else if (operationCounter == 1 && filter(lastChar)) { //if operation btn was pressed once
                        secondNumberDisplay.textContent = secondNumberDisplay.textContent.substring(0, secondNumberDisplay.textContent.length - 1)
                        secondNumber = Number(secondNumberDisplay.textContent)
                    } else {
                        operationDisplay.textContent = ''
                        operationCounter = 0
                    }
                }
            } else {
                reset()
                if (filter(output) || output == ',') { // if output is a number
                    if (operationCounter < 1) { // if operation btn was not pressed at all
                        firstNumberDisplay.textContent += output
                        firstNumber = Number(firstNumberDisplay.textContent)
                    }
                } else if (buttons[i].value == 'operator') {
                    firstNumberDisplay.textContent = sum;
                    firstNumber = Number(firstNumberDisplay.textContent)
                    operationDisplay.textContent = output
                    operationCounter = 1
                }
                resultIsDisplayed = false
            }
        })
    }
}

function filter(x) {
    if (isNaN(x)) {
        return false
    } else {
        return true
    }
}

function result() {
    resultIsDisplayed = true
    firstNumberDisplay.textContent = `${firstNumber} ${operation} ${secondNumber}`
    operationDisplay.textContent = ''
}
function reset() {
    operationDisplay.textContent = ''
    firstNumberDisplay.textContent = ''
    secondNumberDisplay.textContent = ''
    firstNumber = ''
    secondNumber = ''
    operator = ''
}


let lightIsOff = true

function light() {
    if (lightIsOff) {
        document.querySelector('body').style.background = 'white';
        document.querySelector('.calculator-body').style.boxShadow = ' 0 0 35px rgba(0, 0, 0, 0.5)';
        document.querySelector('i').style.color = 'rgba(0, 0, 0, 0.7)';
        lightIsOff = false
    } else {
        document.querySelector('body').style.background = 'black';
        document.querySelector('.calculator-body').style.boxShadow = ' 0 0 35px rgba(255, 255, 255, 0.5)';
        document.querySelector('i').style.color = 'white';
        lightIsOff = true
    }
}

calculate()
