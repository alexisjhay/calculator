function addition(total, currentNum){
    total = total + currentNum;
}

function subtraction(total, currentNum){
    total = total - currentNum;
}

function multiplication(total, currentNum){
    total = total * currentNum;
}

function division(total, currentNum){
    total = total / currentNum;
}

function operate(){
    switch(operator){
        case "+":
            addition(total, currentNum)
            break;
        case "-":
            subtraction(total, currentNum)
            break;
        case "x":
            multiplication(total, currentNum)
            break;
        case "÷":
            division(total, currentNum)
            break;
    }
}

let total = null;
let operator;