const c = document.getElementById("cnv");
const inp = document.getElementById("inp");
const congrat = document.getElementById("congrat")
let datas = [];

start();

function start(){
    inp.addEventListener("keydown", function (e){
        if(e.key === "Enter" && this.value !== ""){
            datas.push(this.value);
            this.value = "";
            draw(datas);
        };
    });
};

function draw(datas) {
    let n = datas.length
    const ctx = c.getContext("2d");
    const w = c.width;
    const h = c.height;
    const rot = 2 * Math.PI;
    let r,g,b;

    let x = rot/n;
    ctx.clearRect(0, 0, w, h);
    ctx.font = "50px Arial";
    for(let i = 0; i < n; i++){
        r = Math.floor(Math.random() * 255);
        g = Math.floor(Math.random() * 255);
        b = Math.floor(Math.random() * 255);

        ctx.beginPath();
        ctx.arc(0.5*w,0.5*h,0.5*w,i*x,(i+1)*x);
        ctx.lineTo(0.5*w , 0.5*h);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(w/2, h/2);
        ctx.rotate((i*x + (i+1)*x)/2);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgb(0,0,0)`;
        ctx.fillText(datas[i],100,0);
        ctx.restore();
    };
};

function spin(){
    congrat.style.display = "none";
    let end = Math.floor(Math.random() * 360);
    let deg = end + 360*(Math.floor(Math.random() * 10));
    let time = Math.floor(3 + Math.random() * 3);

    c.style.transition = `${time}s ease-out`;
    c.style.transform = `rotate(${deg}deg)`;
    
    let endrot = end/360;
    let n = datas.length;
    let winner = datas[Math.floor((1 - endrot) * n)];
    console.log(winner);
    decide(winner);
}

function decide(winner){
    cnv.addEventListener("transitionend", () => {
        
        congrat.style.display = "block";
        congrat.style.color = "rgb(35, 5, 27)"
        congrat.textContent = winner;
    }, {once: true});
}