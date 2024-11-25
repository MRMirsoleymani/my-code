let displayBox = document.querySelector(".display");

function showDisplay(event) {
    const x = event.target.innerText;
    if (displayBox.innerHTML == 0) {
        return displayBox.innerHTML = x;
    } 
    return displayBox.innerHTML += x;
};

function calculat() {
    let result = displayBox.innerText;
    displayBox.innerText = eval(result);
};

function allClear() {
    displayBox.innerText = 0;
};

function clear() {
    let text = displayBox.innerText;
    if (text.length === 1) {
        displayBox.innerText = 0;
    } else {
        displayBox.innerText = text.substring(0, text.length - 1);
    };
};



document.querySelector(".all-clear").addEventListener("click", allClear);
document.querySelector(".calculat-buttom").addEventListener("click", calculat);
document.querySelector(".last-clear").addEventListener("click", clear);


let list = document.querySelectorAll(".show-display");
list.forEach (item => item.addEventListener("click", showDisplay));