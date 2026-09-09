function operate(previousNum, currentNum, operator){
    switch(operator){
        case "+":

            result.textContent = +previousNum + +currentNum    
            return +previousNum + +currentNum      
        
        case "-":

            result.textContent = +previousNum - +currentNum    
            return +previousNum - +currentNum       

        case "*":

            result.textContent = +previousNum * +currentNum    
            return +previousNum * +currentNum  
           
        case "/":
             
            result.textContent = +previousNum / +currentNum    
            return +previousNum / +currentNum
            
    }
}
const body = document.querySelector("body");
let result = document.querySelector(".bottom-res");
result.textContent = "0";
let topResult = document.querySelector(".top-res")

let currentNum = null;
let previousNum = null;
let operator;
let justCalculated = false;

function newInputNumber(){
    const numberBtns = document.querySelector(".btn-container")
    numberBtns.addEventListener("click", (e) => {
        let buttons = e.target.closest(".num-btn")

        if(!buttons) return

        displayScreen(buttons.textContent)

        numInput(buttons.textContent) 

    })
}

function keyboardPress(){
    
    body.addEventListener("keydown", (e)=> {
        if(!isNaN(e.key)){

            displayScreen(e.key)
        
            numInput(e.key)

        }

        if(e.key === "."){

            checkDecimal(e.key)

        }

        if(['+', '-', '*', '/'].includes(e.key)){

            handleOperator(e.key)

        }
    

        if(e.key === "Enter" || e.key === "="){

            e.preventDefault();

            calculateResult();

        }

        if(e.key === "Backspace"){

            backspace();

        }

        if(e.key === "Escape" || e.key.toLowerCase() === "c"){

            clearNumber();

        }
    })
}

function numInput(num){

    if(currentNum === null){
        currentNum = num
    }else{
        currentNum += num
    }

    if(justCalculated){
        result.textContent = currentNum;
        justCalculated = false
    }

}

function operatorPress(){
    const operatorContainer = document.querySelector(".btn-container");
    operatorContainer.addEventListener("click", (e) => {
        operatorBtns = e.target.closest(".operator-btn");

        if(!operatorBtns) return

        handleOperator(operatorBtns.textContent);
    })
}

function handleOperator(operators){
    if(previousNum === null){

        currentToPrev();

        operator = operators

        currentNum = null

        justCalculated = true

        topResult.textContent = `${previousNum} ${operator}`


    }else{

        if(!currentNum) return
        
        previousNum = operate(previousNum, currentNum, operator)

        operator = operators

        currentNum = null

        justCalculated = true

        topResult.textContent = `${previousNum} ${operator}`
          
    }
}


function displayScreen(num){
    if(result.textContent === "0"){
        if(num === "."){
            result.textContent += "."
        }else{
            result.textContent = num
        }
    }else{
        result.textContent += num
    }
}

function currentToPrev(){
    previousNum = +currentNum
}

function decimalBtn(){
    const decimal = document.querySelector(".decimal");

    decimal.addEventListener("click", (e)=>{
        checkDecimal(e.target.textContent)    
    })
    
}

function checkDecimal(num){

    if(result.textContent.includes(".")){
        return
    }else{
        result.textContent += num
        currentNum += num
    }

}

const clears = document.querySelector(".clear")

function clearBtn(){
    clears.addEventListener("click", ()=>{
        clearNumber();  
    })
}

const deleteNum = document.querySelector(".delete")

function deleteBtn(){
    deleteNum.addEventListener("click", ()=>{
    
        backspace();

    })
    
}

function backspace(){
    (result.textContent.length === 1) ? result.textContent = "0" :  result.textContent = result.textContent.slice(0, -1);

        (!currentNum) ? currentNum = null : currentNum = currentNum.slice(0, -1);

        if(justCalculated){
            clearNumber();
        }
}


function clearNumber(){
    currentNum = null;
    previousNum = null;
    operator = null;
    topResult.textContent = "";
    result.textContent = 0;
}


const equals = document.querySelector(".equalTo")
function equalBtn(){
    equals.addEventListener("click", ()=> {
        calculateResult();
    })
}

function calculateResult(){

    if(previousNum === null || currentNum === null){
        return
    }

    if(operator === "/"){
        if(currentNum == 0){
            currentNum = null;
            alert("Dividing by 0 is not allowed")
            return
           }
    }

        justCalculated = true

        result.textContent = operate(previousNum, currentNum, operator)

        topResult.textContent = `${previousNum} ${operator} ${currentNum} =`
        
}


newInputNumber();
keyboardPress();
operatorPress();
clearBtn();
equalBtn();
decimalBtn();
deleteBtn();