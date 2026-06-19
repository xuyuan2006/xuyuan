// 导航滚动阴影
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if(window.scrollY > 20){
        nav.style.boxShadow = "0 2px 10px rgba(22,93,255,0.08)";
    }else{
        nav.style.boxShadow = "none";
    }
})

// 点击蓝色星光特效
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let w, h;
let stars = [];

function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Star{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.r = Math.random() * 2 + 1;
        this.op = 1;
        this.vx = (Math.random()-0.5)*1.5;
        this.vy = (Math.random()-0.5)*1.5;
    }
    update(){
        this.x += this.vx;
        this.y += this.vy;
        this.op -= 0.03;
    }
    draw(){
        ctx.save();
        ctx.globalAlpha = this.op;
        ctx.fillStyle = "#165dff";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
}

document.addEventListener('click',e=>{
    for(let i=0;i<10;i++){
        stars.push(new Star(e.clientX,e.clientY));
    }
})

function animate(){
    ctx.clearRect(0,0,w,h);
    for(let i=stars.length-1;i>=0;i--){
        stars[i].update();
        stars[i].draw();
        if(stars[i].op <= 0) stars.splice(i,1);
    }
    requestAnimationFrame(animate);
}
animate();
// 樱花飘落特效
const sakuraCanvas = document.getElementById("sakuraCanvas");
const sakuraCtx = sakuraCanvas.getContext("2d");
let sakuraWidth, sakuraHeight;
let sakuraList = [];

function resizeSakura() {
    sakuraWidth = sakuraCanvas.width = window.innerWidth;
    sakuraHeight = sakuraCanvas.height = window.innerHeight;
}
resizeSakura();
window.addEventListener("resize", resizeSakura);

class Sakura {
    constructor() {
        this.x = Math.random() * sakuraWidth;
        this.y = Math.random() * sakuraHeight;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 1.2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.rotate = Math.random() * 360;
        this.rotSpeed = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotate += this.rotSpeed;

        if (this.y > sakuraHeight) {
            this.y = -10;
            this.x = Math.random() * sakuraWidth;
        }
        if (this.x > sakuraWidth + 10) this.x = -10;
        if (this.x < -10) this.x = sakuraWidth + 10;
    }

    draw() {
        sakuraCtx.save();
        sakuraCtx.translate(this.x, this.y);
        sakuraCtx.rotate(this.rotate * Math.PI / 180);
        sakuraCtx.globalAlpha = this.opacity;

        sakuraCtx.fillStyle = "#ffd1dc";
        sakuraCtx.beginPath();
        for (let i = 0; i < 5; i++) {
            sakuraCtx.ellipse(
                Math.cos((i * 72) * Math.PI / 180) * this.size * 0.5,
                Math.sin((i * 72) * Math.PI / 180) * this.size * 0.5,
                this.size * 0.4,
                this.size * 0.25,
                (i * 72) * Math.PI / 180,
                0,
                Math.PI * 2
            );
        }
        sakuraCtx.fill();
        sakuraCtx.restore();
    }
}

for (let i = 0; i < 45; i++) {
    sakuraList.push(new Sakura());
}

function animateSakura() {
    sakuraCtx.clearRect(0, 0, sakuraWidth, sakuraHeight);

    for (let i = 0; i < sakuraList.length; i++) {
        sakuraList[i].update();
        sakuraList[i].draw();
    }

    requestAnimationFrame(animateSakura);
}
animateSakura();