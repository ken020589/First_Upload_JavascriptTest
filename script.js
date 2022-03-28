const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
var oc = false;
let hue = 0;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.Height = window.innerHeight;
})

const mouse = {
    x: null,
    y: null,
}
canvas.addEventListener('mousedown', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    oc = true;
    for(let i = 0; i < 10; i++){
        particlesArray.push(new Particle());
    }
})

canvas.addEventListener('mouseup', function(e){
    oc = false;
})

canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    if(oc){
        for(let i = 0; i < 20; i++){
            particlesArray.push(new Particle());
        }
    }
})

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.01;
        if(this.size > 0.2){ this.size -= 0.01; }
        if(this.y >= canvas.height){ 
            this.speedY = -this.speedY; 
            this.speedY += 0.1;
        }
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        for(let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 25){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = particlesArray[i].size/10;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    hue+=2;
    handleParticles();
    requestAnimationFrame(animate);
}
animate();