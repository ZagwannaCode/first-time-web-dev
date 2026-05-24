const cvn = document.getElementById("cvn");
const ctx = cvn.getContext("2d");
const width = 1528;
const height = 779;
const pi = Math.PI;
let AllEntities = [];

const Input = {
    mouseX: 0,
    mouseY: 0,
    keyPressed: '',
}

class Entity {
    constructor(id, x, y, shape, size, direction) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.shape = shape;
        this.size = size;
        this.direction = direction;
    }
}
class Player extends Entity {
}

function ini() {
    addEventListener("mousemove", handleMousemove);
    createPlayer();
    resizeCanvas();
    setUpFirstScreen(AllEntities[0]);
    requestAnimationFrame(gameLoop);
}
function handleMousemove(e) {
    Input.mouseX = e.clientX;
    Input.mouseY = e.clientY;
}

function createPlayer() {
    let player = new Player(0, width/2 , height * 3/4, 'circle', 100, pi * 3/4);
    AllEntities.push(player);
}

function resizeCanvas() {
    cvn.width = width;
    cvn.height = height;
}

function setUpFirstScreen(Player) {
    ctx.beginPath();
    ctx.arc(Player.x, Player.y, Player.size * 1/2, 0, 2 * pi);
    ctx.fillStyle = "red";
    ctx.fill();
}

function gameLoop(dt) {
    update(dt);
    render();
    requestAnimationFrame(gameLoop);
}

function update(dt) {
    updatePlayer(dt, AllEntities[0]);
}
function updatePlayer(dt, player) {
    player.direction = Math.atan2(
        Input.mouseX - player.x,
        Input.mouseY - player.y
    );
    console.log(player.direction);
}

function render() {
    renderBackground();
    renderPlayer(AllEntities[0]);
}
function renderBackground() {
    ctx.clearRect(0, 0, width, height);
}
function renderPlayer(Player) {
    ctx.arc(Player.x, Player.y, Player.size * 1/2, 0, 2 * pi);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.save();
    ctx.fillStyle = "green";
    ctx.translate(Player.x, Player.y);
    ctx.rotate(-Player.direction);
    ctx.fillRect(-Player.size * 1/4, Player.size , Player.size * 1/2, Player.size * 1/2);
    ctx.restore();
}

ini();