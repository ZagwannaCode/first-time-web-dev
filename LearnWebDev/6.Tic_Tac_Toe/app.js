const cells = document.querySelectorAll(".cells");
const state = document.querySelector("#state");
const newGame = document.querySelector("#newGame");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let curPlayer = "X";
let options =["","","","","","","","",""];
let running = false;

startGame();

function startGame(){
    newGame.addEventListener("click", restart);
    state.textContent = `${curPlayer}'s turn`;
    cells.forEach(cell => cell.addEventListener("click",clickCell))
    running = true;
};
function clickCell(){
    const index = this.dataset.value;

    if(options[index] != "" || !running){
        return;
    }
    updateCell(this, index);
    checkWin();
};
function updateCell(cell, index){
    options[index] = curPlayer;
    cell.textContent = curPlayer;
};
function switchPlayer(){
    curPlayer = (curPlayer == "X") ? "O" : "X";
    state.textContent = `${curPlayer}'s turn`;
};
function checkWin(){
    let win = false;
    for(let i=0;i<8;i++){
        let a = winConditions[i][0];
        let b = winConditions[i][1];
        let c = winConditions[i][2];

        if(options[a] == options[b] && options[a] == options[c] && options[a] != ""){
            win = true;
        }
    }
    if(win){
        state.textContent = `${curPlayer} win`;
        running = false;
    }else if(!options.includes("")){
        state.textContent = `Draw`;
        running = false;
    }else{
        switchPlayer();
    };
};
function restart(){
    options =["","","","","","","","",""];
    curPlayer = "X";
    cells.forEach(cell => cell.textContent="")
    running = true;
}