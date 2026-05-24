

const container = document.getElementById("container");
const grids = document.querySelectorAll(".grids");
const upKey = document.getElementById("up");
const leftKey = document.getElementById("left");
const downKey = document.getElementById("down");
const rightKey = document.getElementById("right");
const anounce = document.getElementById("anounce");
const timer = document.getElementById("timer");
let elapse = 0;
let count = 10;
let cur = 46;
let pos = 1;
let point = 0;
let isRunning = true;


function main(){
    
    createPos();
    window.addEventListener("keydown", () =>{
        if(!isRunning){
            return;
        }
        anounce.style.display = 'none';
        time();
    }, {once: true});
    window.addEventListener("keydown", (e) =>{
        if(!isRunning){
            return;
        }
        switch (e.key){
            case "ArrowUp":
            board("up");
            arrowKeys("up");
            break;
            case "w":
            board("up");
            arrowKeys("up");
            break;
            case "ArrowLeft":
            board("left");
            arrowKeys("left");
            break;
            case "a":
            board("left");
            arrowKeys("left");
            break;
            case "ArrowDown":
            board("down");
            arrowKeys("down");
            break;
            case "s":
            board("down");
            arrowKeys("down");
            break;
            case "ArrowRight":
            board("right");
            arrowKeys("right");
            break;
            case "d":
            board("right");
            arrowKeys("right");
            break;
        }
    });
};

function board(a){
    switch(true){
        case (a == "up" && cur > 7):
        document.querySelector(`.grids:nth-child(${cur})`).style.backgroundColor = "rgb(255, 255, 255)";
        cur-=7;
        document.querySelector(`.grids:nth-child(${cur})`).style.backgroundColor = "rgba(125, 93, 88, 0.807)";
        break;
        case (a == "left" && cur%7 != 1):
        document.querySelector(`.grids:nth-child(${cur})`).style.backgroundColor = "rgb(255, 255, 255)";
        cur-=1;
        document.querySelector(`.grids:nth-child(${cur})`).style.backgroundColor = "rgba(125, 93, 88, 0.807)";
        break;
        case (a == "down" && cur < 43):
        document.querySelector(`.grids:nth-child(${cur})`).style.backgroundColor = "rgb(255, 255, 255)";
        cur+=7;
        document.querySelector(`.grids:nth-child(${cur})`).style.backgroundColor = "rgba(125, 93, 88, 0.807)";
        break;
        case (a == "right" && cur%7 != 0):
        document.querySelector(`.grids:nth-child(${cur})`).style.backgroundColor = "rgb(255, 255, 255)";
        cur+=1;
        document.querySelector(`.grids:nth-child(${cur})`).style.backgroundColor = "rgba(125, 93, 88, 0.807)";
        break;
    };
    check(cur);
}

function arrowKeys(a){
    document.querySelectorAll(".arrows").forEach(a => {a.style.backgroundColor = "white"});
    document.getElementById(a).style.backgroundColor = "black";
}



function createPos(){
    pos = Math.floor(1 + Math.random() * 48);
    if(pos == cur){
        pos++;
    }
    document.querySelector(`.grids:nth-child(${pos})`).style.backgroundColor = "rgba(192, 89, 85, 0.81)";
}

function check(cur){
    if(cur == pos){
        createPos();
        updatePoint();
    }
}

function updatePoint(){
    point++;
    document.getElementById("point").style.setProperty("--score", `"${point}"`);
    //progress bar
    //rounder
}
function time(){
    const tim = setInterval(() => {
        count--;
        updateTime(count);
        if(count == 0){
            clearInterval(tim);
            endGame();
        }
    }, 1000);

}
function updateTime(count){
    timer.textContent = count;
}
function endGame(){
    isRunning = false;
    //anouce
}
function startGame(){
    //redeclare
    
}
main();
