const cells = document.querySelectorAll(".cell");
const state = document.querySelector("#state");
const restartbtn = document.querySelector("#restart");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const winCon = [];
//Vertical
let x = 0;
let a;
for (let i = 0; i < 165; i++){
    winCon[i] = [];
    a = x;
    for (let j = 0; j < 5; j++){
        winCon[i][j] = a;
        a += 15;
    };
    x++;
};
//Horizontal
x = 0;
for (let i = 165; i < 330; i++){
    winCon[i] = [];
    a = x;
    for (let j = 0; j < 5; j++){
        winCon[i][j] = a;
        a++;
    };
    (x % 15 == 10) ? (x+=5) : (x++);
};

//RightDiagonal
x = 4;
for (let i = 330; i < 451; i++){
    winCon[i] = [];
    a = x;
    for (let j = 0; j < 5; j++){
        winCon[i][j] = a;
        a += 14;
    };
    (x % 15 == 14) ? (x+=5) : (x++);
};
//LeftDiagonal
x = 0;
for (let i = 451; i < 572; i++){
    winCon[i] = [];
    a = x;
    for (let j = 0; j < 5; j++){
        winCon[i][j] = a;
        a += 16;
    };
    (x % 15 == 10) ? (x+=5) : (x++);
};


let options = [];
for (let i = 0; i < 225; i++){
  options[i] = "";
};

let curPlayer;
let running;



Initialize();

function Initialize(){
    curPlayer = 'X';
    running = true;
    state.textContent = curPlayer;
    restartbtn.addEventListener("click", restart);
    cells.forEach(cell => cell.addEventListener("click",clickCell));
};

function clickCell(){
    const index = this.getAttribute("id");
    if(!running || options[index] != ""){
        return;
    };
    clickSound.currentTime = 0;
    clickSound.play();
    updateCell(this, index);
    checkWin();
    if(running){
        switchPlayer();
    };
};

function updateCell(cell, index){
    cell.textContent = curPlayer;
    options[index] = curPlayer;
    cell.classList.remove("X", "O");
    cell.classList.add(curPlayer);
};

function restart(){
    cells.forEach(cell => {cell.textContent = "";
                  cell.classList.remove("win")}
    );
    winSound.pause();
    options.fill("");
    running = true;
    curPlayer = 'X';
    state.textContent = curPlayer;
};

function switchPlayer(){
    curPlayer = (curPlayer == "X") ? "O" : "X";
    state.textContent = curPlayer;
    state.classList.remove("X", "O");
    state.classList.add(curPlayer);
};

function checkWin(){
    let gamewin = false;
    let win1;
    let win2;
    let win3;
    let win4;
    let win5;
    let winComb;
    for( i of winCon ){
        win1 = options[i[0]];
        win2 = options[i[1]];
        win3 = options[i[2]];
        win4 = options[i[3]];
        win5 = options[i[4]];

        if( win1 != "" &&
            win1 == win2 &&
            win1 == win3 &&
            win1 == win4 &&
            win1 == win5 
        ){
            winComb = i;
            gamewin = true;
            break;
        };
    };
    if(gamewin){
        state.textContent = `${curPlayer} wins`;
        winComb.forEach(i => cells[i].classList.add('win'));
        winSound.currentTime = 0;
        winSound.play();
        running = false;
    }else if(!options.includes("")){
        state.textContent = `Draw`;
        running = false;
    };
};