function operate(previousNum, currentNum, operator){
    switch(operator){
        case "+":
            result.textContent = +previousNum + +currentNum    
            return +previousNum + +currentNum      
        
        case "-":
            result.textContent = +previousNum - +currentNum    
            return +previousNum - +currentNum       

        case "x":
            result.textContent = +previousNum * +currentNum    
            return +previousNum * +currentNum  
           
        case "÷":
            result.textContent = +previousNum / +currentNum    
            return +previousNum / +currentNum 
    }
}

let result = document.querySelector(".bottom-res");
result.textContent = "0";
let topResult = document.querySelector(".top-res")

let currentNum = null;
let previousNum = null;
let operator;
let justCalculated = false;

const adds = document.querySelector(".add");

function newInputNumber(){
    const numberBtns = document.querySelector(".btn-container")
    numberBtns.addEventListener("click", (e) => {
        let buttons = e.target.closest(".num-btn")

        if(!buttons) return

        displayScreen(buttons)

            if(currentNum === null){
                currentNum = buttons.textContent
            }else{
                currentNum += buttons.textContent
            }

            if(justCalculated){
                result.textContent = currentNum;
                justCalculated = false
            }

    })
}

function operatorPress(){
    const operatorContainer = document.querySelector(".btn-container");
    operatorContainer.addEventListener("click", (e) => {
        operatorBtns = e.target.closest(".operator-btn");

        if(!operatorBtns) return

        if(previousNum === null){

            currentToPrev();

            operator = operatorBtns.textContent

            currentNum = null

            justCalculated = true

            topResult.textContent = `${previousNum} ${operator}`


        }else{

            if(!currentNum) return
            
            previousNum = operate(previousNum, currentNum, operator)

            operator = operatorBtns.textContent

            currentNum = null

            justCalculated = true

            topResult.textContent = `${previousNum} ${operator}`
          
        }
    })
}

function displayScreen(btn){
    if(result.textContent === "0"){
        if(btn.textContent === "."){
            result.textContent += "."
        }else{
            result.textContent = btn.textContent
        }
    }else{
        result.textContent += btn.textContent
    }
}

function currentToPrev(){
    previousNum = +currentNum
}

function decimalBtn(){
    const decimal = document.querySelector(".decimal");

    decimal.addEventListener("click", (e)=>{
        if(result.textContent.includes(".")){
            e.preventDefault
        }else{
            result.textContent += e.target.textContent
            currentNum += e.target.textContent
        }      
    })
    
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
    
        (result.textContent.length === 1) ? result.textContent = "0" :  result.textContent = result.textContent.slice(0, -1);

        (!currentNum) ? currentNum = null : currentNum = currentNum.slice(0, -1);

        if(justCalculated){
            clearNumber();
        }
    })
    
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
    equals.addEventListener("click", (e)=> {
        if(previousNum === null || currentNum === null){
            return
        }
        justCalculated = true
        result.textContent = operate(previousNum, currentNum, operator)

        topResult.textContent = `${previousNum} ${operator} ${currentNum} =`
    })
}


newInputNumber();
operatorPress();
clearBtn();
equalBtn();
decimalBtn();
deleteBtn();