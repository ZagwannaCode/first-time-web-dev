//UI
const settingToggleBtn = document.querySelector(".toggle-btn");
const setting = document.getElementById("setting");
const settingContainer = document.querySelector("#setting .container ul");
const settingValues= {
    gameVel: 1,
    birdAce: 1,
    flapPower: 1,
    minGap: 1,
    maxGap: 1,
    pipeWidth: 1,
    pipeSpawnRate: 1
}
const standardSettingState = {
    gameVel: 270,
    birdAce: 10,
    flapPower: 5.5,
    minGap: 85,
    maxGap: 120,
    pipeWidth: 35,
    pipeSpawnRate: 1.4
}

//Image
const playerImage = new Image();
playerImage.src = "./images/playerImage.png";

let staggerFrame = 3;
let playerFrame = 0;
let playerAction = 0;

let staggerFrameCount = staggerFrame;

//Game
const cvn = document.getElementById("cv");
      cvn.width = 1000;
      cvn.height = 500;
const ctx = cvn.getContext("2d");
const score = document.getElementById("score");
const highScore = document.getElementById("highScore");
const state = {
    isRunning: false,
    flap: false,
    highScore: 0,
    score: 0,

    gameVel: 270,
    dirPower: 5,
    dirTrans: 0.2,
    flapPower: 5.5,

    pipes: [],
    minGap: 85,
    maxGap: 120,
    pipeWidth: 35,
    pipeSpawnRate: 1.4,

    birdX: 200,
    birdY: 250,
    birdVisX: 60,
    birdVisY: 40,
    birdHitBoxX: 20,
    birdHitBoxY: 20,
    birdDir: 0,
    birdVel: 0,
    birdAce: 10,

    bgMusic: false
};

let lastTime = 0;
let deltaTime;
let sinceLastPipe = 0;
let sinceStart = 0;


//Audio
const Music = {
    bgMusic: [
        new Audio("./sounds/BG_Music/1.wav"),
        new Audio("./sounds/BG_Music/Happy01.wav"),
        new Audio("./sounds/BG_Music/Sad01.wav"),
        new Audio("./sounds/BG_Music/Sad02.wav")
    ],
    flap: new Audio("./sounds/Flap.m4a"),
    Hit: new Audio("./sounds/HitSound.m4a"),
    SettingUI: new Audio("./sounds/SettingUI.m4a"),
    SettingValueUp: new Audio("./sounds/SettingValueUp.m4a"),
    SettingValueDown: new Audio("./sounds/SettingValueDown.m4a")
}
Music.bgMusic.forEach(song => {
    song.volume = 0.3;
    song.addEventListener("ended", toNextSong)
})
let curSong = 0;


setUpUI();
playerImage.onload = init;

function setUpUI() {
    addEventListener('mousedown', HandleToggleBtn);
    settingContainer.addEventListener('mousedown', UpdateGameState);
}

function init(){
    ctx.translate(0,500);
    ctx.scale(1,-1);
    render(); 
    addEventListener('keydown', input);
}

function loop(ts){
    deltaTime = Math.min((ts - lastTime)/1000 , 0.05);
    lastTime = ts;

    update(deltaTime);
    render();
    handleMusic();

    if(state.isRunning) {requestAnimationFrame(loop)};
}

function createPipes(){
    let gap = getRandomBetween(state.maxGap, state.minGap);
    let gapY = getRandomBetween(20, 500 - gap);
    state.pipes.push({x: 1000,
                      gap: gap,
                      gapY: gapY,
    })
}

function update(dt){
    updateBird(dt);
    updatePipes(dt);
    updateScore(dt);
    checkCollions();
}

function render(){
    drawBackGround();
    drawBird();
    drawPipes();
    displayScore();
}

function reset(){
    state.isRunning = true;
    state.sinceStart = 0;
    state.birdX = 200;
    state.birdY = 250;
    state.birdVisX = 60;
    state.birdVisY = 40;
    state.birdDir = 0;
    state.birdVisDir = 0;
    state.birdVel = 0;

    state.pipes = [],
    sinceLastPipe = 0;
    state.score = 0;

    playerFrame = 0;
    staggerFrameCount = staggerFrame;

    requestAnimationFrame(loop);
}

function input(e){
    if(e.key == " "){
        if(state.isRunning){
            state.flap = true;
        }else{
            state.isRunning = true;
            reset();
        };
    };
    
}

function updateBird(dt){
    if(!state.flap){
        state.birdVel = state.birdVel + state.birdAce * dt;
        state.birdY = state.birdY - state.birdVel;
    }else{
        state.birdVel = -state.flapPower;

        playerAction = 1;
        playerFrame = 0;

        Music.flap.currentTime = 0.15;
        Music.flap.play();

        state.flap = false;
    }

    state.birdDir = Math.atan2(state.birdVel, state.dirPower);
    state.birdVisDir += (state.birdDir - state.birdVisDir) * state.dirTrans;

    if(staggerFrameCount == 0){
        staggerFrameCount = staggerFrame;
        (playerFrame > 4) ? playerFrame = 0 : playerFrame++;
    }else{
        staggerFrameCount--;
    }
    if(playerAction == 1 && playerFrame > 4){
        playerAction = 0;
    }
}

function updatePipes(dt){
    if(sinceLastPipe <= 0){
        createPipes();
        sinceLastPipe = state.pipeSpawnRate;
    }else{
        sinceLastPipe -= dt;
    };
    if(state.pipes.length == 0){
        return
    }
    for(let i = 0; i < state.pipes.length; i++){
        state.pipes[i].x -= state.gameVel * dt;
    };
    if(state.pipes[0].x <= -state.pipeWidth){
        state.pipes.shift();
    }
}

function checkCollions(){
    let isHit = false;
    if(state.birdY <= 0 ||
       state.birdY >= 500){
        isHit = true;
    }
    for(let i = 0; i < state.pipes.length; i++){
        if(state.birdX + state.birdHitBoxX/2 >= state.pipes[i].x &&
           state.birdX - state.birdHitBoxX/2 <= state.pipes[i].x + state.pipeWidth &&

           (state.birdY - state.birdHitBoxY/2 <= state.pipes[i].gapY ||
           state.birdY + state.birdHitBoxY/2 >= state.pipes[i].gapY + state.pipes[i].gap)
        ){
            isHit = true;
        }
    }
    if(isHit) {
        state.isRunning = false;

        Music.Hit.currentTime = 0.33;
        Music.Hit.play();
    }
}

function getRandomBetween(min, max){
    return Math.random() * (max - min) + min;
}

function drawBackGround(){
    ctx.clearRect(0, 0, 1000, 500);
}

function drawBird(){
    ctx.save();
    ctx.translate(state.birdX, state.birdY);
    ctx.rotate(-state.birdVisDir);
    ctx.scale(1, -1);
    ctx.drawImage(playerImage,
        state.birdVisX * playerFrame, state.birdVisY * playerAction, state.birdVisX, state.birdVisY,
        -state.birdVisX / 2, -state.birdVisY / 2, state.birdVisX, state.birdVisY);
    ctx.restore();
}

function drawPipes(){
    for(let i = 0; i < state.pipes.length; i++){
        ctx.fillStyle = "blue";
        ctx.fillRect(state.pipes[i].x, 0, state.pipeWidth, state.pipes[i].gapY);
        ctx.fillRect(state.pipes[i].x, 500, state.pipeWidth, - 500 + state.pipes[i].gap + state.pipes[i].gapY);
    }
}

//Score
function updateScore (dt) {
    state.score += dt;
    if(state.highScore < state.score){
        state.highScore = state.score;
    }
}
function displayScore() {
    score.textContent = Math.floor(state.score);
    highScore.textContent = Math.floor(state.highScore);
}

//UI setting
function HandleToggleBtn(e) {
    const settingTargeted = setting.contains(e.target);
    const iconSettingTargeted = e.target.closest(".toggle-btn");
    if(!settingTargeted && setting.classList.contains("close")) return
    if((!settingTargeted && !setting.classList.contains("close"))
       || iconSettingTargeted) {
        setting.classList.toggle("close");
        Music.SettingUI.currentTime = 0.1;
        Music.SettingUI.play();
    }
}
function UpdateGameState(e) {
    const btn = e.target.closest("button");
    if(!btn) return;
    const dataSetting = btn.closest("li").dataset.setting;
    const dataAction = btn.dataset.action;
    const values =  Number(btn.closest("li").querySelector(".scaler").textContent);
    if((values >= 2 && dataAction == "increase") || (values <= 0.1 && dataAction == "decrease")) return;
    UpdateSettingValues(dataSetting, dataAction);
    UpdateSettingUI(btn.closest("li"));
}
function UpdateSettingValues (dataSetting, dataAction) {
    if(dataAction == "increase") {
        settingValues[dataSetting] = Math.round(settingValues[dataSetting] * 10 + 1) / 10;

        Music.SettingValueUp.currentTime = 0.1;
        Music.SettingValueUp.play();
    }else{
        settingValues[dataSetting] = Math.round(settingValues[dataSetting] * 10 - 1) / 10;

        Music.SettingValueDown.currentTime = 0.1;
        Music.SettingValueDown.play();
    };
    state[dataSetting] = standardSettingState[dataSetting] * settingValues[dataSetting];
}
function UpdateSettingUI (li) {
    const values = li.querySelector(".scaler");
    values.textContent = settingValues[li.dataset.setting];
}

function handleMusic() {
    if(state.isRunning && !state.bgMusic) {
        state.bgMusic = true;
        playCurrentSong();
    }else if (!state.isRunning && state.bgMusic) {
        state.bgMusic = false;
        pauseCurrentSong();
        }
}

function playCurrentSong() {
    Music.bgMusic[curSong].play();
}

function pauseCurrentSong() {
    Music.bgMusic[curSong].pause();
}

function toNextSong() {
    curSong = (curSong + 1) % Music.bgMusic.length;
    playCurrentSong();
    console.log(curSong)
}