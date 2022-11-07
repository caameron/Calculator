let topScreenDisplayText = "";
let topScreenDisplay = document.getElementById("top-screen");
let mainScreenDisplayText = "";
let mainScreenDisplay = document.getElementById("main-screen");
let leftNumber = null;
let rightNumber = null;
let rightNumberDisplay = "";

const numberButtons = Array.from(document.querySelectorAll('.number'));
numberButtons.forEach(number => number.addEventListener('click', () => displayNumberOnScreen(number.innerHTML)));

const operatorButtons = Array.from(document.querySelectorAll('.operator'));
operatorButtons.forEach(operator => operator.addEventListener('click', () => operatorSelected(operator.innerHTML)));

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
    else {
        rightNumber = parseInt(rightNumberDisplay);
        leftNumber =  Calculate(operator, leftNumber, rightNumber);
        mainScreenDisplayText = leftNumber;
        mainScreenDisplay.innerHTML = mainScreenDisplayText;
        topScreenDisplay.innerHTML = '';
        topScreenDisplay.innerHTML = mainScreenDisplayText;
        topScreenDisplayText = mainScreenDisplayText;
        displayOperatorOnScreen(operator);
    }

    
}

function displayOperatorOnScreen(operator) {
    topScreenDisplayText += ' ' + operator + ' ';
    topScreenDisplay.innerHTML = topScreenDisplayText;
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