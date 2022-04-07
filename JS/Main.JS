//varaiable

const textNum = document.getElementById("text");
const numberContainer = document.querySelector(".numbers-cntainer");
const dotNumbers = document.querySelector(".dot");
const del = document.querySelector(".del");
const mosaviOperator = document.querySelector(".mosavi");

const firstNum = document.querySelector(".first-num");
const secebdNum = document.querySelector(".secend-num");
const symbol = document.querySelector(".symbol");
const textOperateation = document.querySelector(".text-display-numbers ");

let totalNumbers = [];

let symbolOperator;
let isAdult = false;
let result = 0;

//select elemnet numbers
numberContainer.addEventListener("click", clickNumber);
del.addEventListener("click", Del);
mosaviOperator.addEventListener("click", mosavi);

const numbersFirst = [];

function clickNumber(e) {
    if (e.target.classList.contains("num")) {
        let number;

        if (textNum.value.length === 0 && e.target.classList.contains("dot")) {
            dotNumbers.setAttribute("disabled", "disabled");

            e.target.innerText = "0.";

            number = e.target.innerText;

            textNum.value = e.target.innerText;

            if (secebdNum.textContent == "") {
                secebdNum.textContent = number;
            } else {
                firstNum.textContent = number;
            }
            e.target.innerText = ".";
        } else {
            if (textNum.value.includes("0.") || textNum.value.includes(".")) {
                dotNumbers.setAttribute("disabled", "disabled");
                console.log(textNum.value.length);
            }

            if (textNum.value.includes(".")) {
                dotNumbers.setAttribute("disabled", "disabled");
            }

            number = e.target.innerText;

            textNum.value = textNum.value + number;

            console.log(totalNumbers);
            Number(totalNumbers);

            totalNumbers = totalNumbers.map((iteam) => Number(iteam));

            if (totalNumbers.length === 0 && isAdult === false) {
                secebdNum.textContent = textNum.value;
            } else {
                firstNum.textContent = textNum.value;
            }

            if (textNum.value.includes(".")) {
                dotNumbers.setAttribute("disabled", "disabled");
            }
        }

        const length =
            secebdNum.textContent.length +
            firstNum.textContent.length +
            symbol.textContent.length;
        checkLengthOperation(length);
    }

    if (e.target.classList.contains("operator-btn")) {
        if (textNum.value.length > 0) {
            textNum.style.color = "#FBFBFB";

            if (isAdult === true) {
                var firsrNumber = totalNumbers[0];
            } else {
                var firsrNumber = Number(textNum.value);
                totalNumbers.push(Number(textNum.value));
            }

            textNum.value = "";

            dotNumbers.disabled = false;

            symbolOperator = e.target.innerText;

            symbol.textContent = symbolOperator;

            if (isAdult === true) {
                let test = String(result);

                const a = test.split("");

                if (a.includes("-")) {
                    let numbers = 0;

                    const index = a.indexOf("-");

                    let b = a.splice(0, index);

                    b.forEach((element) => {
                        console.log(element);

                        numbers = numbers + element;
                    });

                    console.log(numbers.replace("0", "-"));

                    const newNumber = numbers.replace("0", "-");

                    secebdNum.textContent = newNumber;
                    firstNum.textContent = "";
                    symbol.textContent = symbol.textContent;
                } else {
                    secebdNum.textContent = result;
                    firstNum.textContent = "";
                    symbol.textContent = symbol.textContent;
                }
            }
        }
    }

    const length =
        secebdNum.textContent.length +
        firstNum.textContent.length +
        symbol.textContent.length;
    checkLengthOperation(length);
}

//function del numbers
function Del() {
    totalNumbers.length = 0;
    textNum.value = "";
    isAdult = false;
    dotNumbers.disabled = false;
    secebdNum.textContent = "";
    firstNum.textContent = "";
    symbol.textContent = "";
    textNum.style.color = "#FBFBFB";
    textOperateation.style.fontSize = "2em";
}

function mosavi() {
    if (textNum.value.length !== 0 && symbolOperator !== "") {
        totalNumbers.push(Number(textNum.value));
        switch (symbolOperator) {
            case "+":
                {
                    result = totalNumbers.reduce((a, b) => a + b);
                    break;
                }
            case "-":
                {
                    result = totalNumbers.reduce((a, b) => a - b);

                    break;
                }
            case "*":
                {
                    result = totalNumbers.reduce((a, b) => a * b);
                    break;
                }
            case "/":
                {
                    result = totalNumbers.reduce((a, b) => a / b);
                    break;
                }
        }

        if (Number(result) % 1 !== 0) {
            result = Number(result).toFixed(2);
        } else {
            result = Number(result);
        }

        console.log(result);
        textNum.value = result;

        totalNumbers.length = 0;

        totalNumbers.push(result);

        isAdult = true;

        if (result == 0 || result < 0) {
            textNum.style.color = "black";
        }

        if (result < 0) {
            result = result * -1;

            result = `${result}-`;

            textNum.value = result;
        } else {
            textNum.value = result;

            totalNumbers.length = 0;

            totalNumbers.push(result);

            isAdult = true;

            if (result !== 0) {
                textNum.style.color = "black";
            }
        }
    }
}

//checklength charactorOperation
function checkLengthOperation(length) {
    if (length > 14) {
        textOperateation.style.fontSize = "1.5em";
    }
}