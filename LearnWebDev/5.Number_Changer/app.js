const countTags = document.getElementById("count");
const decrease = document.getElementById("decrease");
const reset = document.getElementById("reset");
const increase = document.getElementById("increase");
let count = 0;

reset.onclick = function(){
    count = 0;
    countTags.textContent = count;
}

decrease.onclick = function(){
    count--;
    countTags.textContent = count;
}

increase.onclick = function(){
    count++;
    countTags.textContent = count;
}