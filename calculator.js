let topScreenDisplayText = "";
let topScreenDisplay = document.getElementById("top-screen");
let mainScreenDisplayText = "";
let mainScreenDisplay = document.getElementById("main-screen");
let leftNumber = null;
let rightNumber = null;
let rightNumberDisplay = "";
let lastOperatorChosen = '';
let isLastOperatorEquals = false;

const numberButtons = Array.from(document.querySelectorAll('.number'));
numberButtons.forEach(number => number.addEventListener('click', () => displayNumberOnScreen(number.innerHTML)));

const operatorButtons = Array.from(document.querySelectorAll('.operator'));
operatorButtons.forEach(operator => operator.addEventListener('click', () => operatorSelected(operator.innerHTML)));

document.getElementById("acButton").addEventListener('click', () => allClear());
document.getElementById("clearButton").addEventListener('click', () => clearScreen());

function displayNumberOnScreen(number) {
    if(leftNumber !== null){
        rightNumberDisplay += number;
    }
    topScreenDisplayText += number;
    topScreenDisplay.innerHTML = topScreenDisplayText;
}

function operatorSelected(operator) {
    //Save first number
    if(leftNumber === null) {
        leftNumber =  parseInt(topScreenDisplayText);
        displayOperatorOnScreen(operator);
    }
    else if(operator === '=') {
        rightNumber = parseInt(rightNumberDisplay);
        leftNumber =  Calculate(lastOperatorChosen, leftNumber, rightNumber);
        EqualSelected(leftNumber);
        isLastOperatorEquals = true;
    }
    else if(isLastOperatorEquals) {
        topScreenDisplayText = '';
        topScreenDisplay.innerHTML = '';
        rightNumber = null;
        rightNumberDisplay = '';
        let numberToDisplay = leftNumber;
        leftNumber = null;
        displayNumberOnScreen(numberToDisplay);
        displayOperatorOnScreen(operator);
        leftNumber = numberToDisplay;
    }
    else {
        rightNumber = parseInt(rightNumberDisplay);
        rightNumberDisplay = '';
        leftNumber =  Calculate(lastOperatorChosen, leftNumber, rightNumber);
        mainScreenDisplayText = leftNumber;
        mainScreenDisplay.innerHTML = mainScreenDisplayText;
        topScreenDisplay.innerHTML = mainScreenDisplayText;
        topScreenDisplayText = mainScreenDisplayText;
        displayOperatorOnScreen(operator);
    }

    lastOperatorChosen = operator;
}

function EqualSelected(calculatedValue) {
    mainScreenDisplayText = calculatedValue;
    mainScreenDisplay.innerHTML = mainScreenDisplayText;
    mainScreenDisplayText = leftNumber;
}

function displayOperatorOnScreen(operator) {
    topScreenDisplayText += ' ' + operator + ' ';
    topScreenDisplay.innerHTML = topScreenDisplayText;
}

function allClear() {
    leftNumber = null;
    rightNumber = null;
    topScreenDisplayText = '';
    topScreenDisplay.innerHTML = '';
    mainScreenDisplayText = '';
    mainScreenDisplay.innerHTML = '';
    rightNumberDisplay = '';
}

function clearScreen() {
    topScreenDisplayText = '';
    topScreenDisplay.innerHTML = '';
}

//Operator Functions
function add(left, right) {
    return left + right;
}

function subtract(left, right) {
    return left - right;
}

function multiply(left, right) {
    return left * right;
}

function divide(left, right) {
    return left / right;
}

function operate(operator, left, right) {
    return operator(left, right);
}

function Calculate(operator, left, right) {
    switch(operator) {
        case '+':
            return operate(add, left, right);
        case '-':
            return operate(subtract, left, right);
        case 'x': 
            return operate(multiply, left, right);
        case '/':
            return operate(divide, left, right);
        default: 
            return 0;
    }

}