const canvas = document.getElementById('heart');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- Volcano Background ---
function drawVolcano() {
    // Sky
    let grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, "#2d1b00");
    grad.addColorStop(0.5, "#ff6a00");
    grad.addColorStop(1, "#1a0500");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Volcano base
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 - 180, canvas.height);
    ctx.lineTo(canvas.width/2 - 60, canvas.height/2 + 120);
    ctx.lineTo(canvas.width/2 + 60, canvas.height/2 + 120);
    ctx.lineTo(canvas.width/2 + 180, canvas.height);
    ctx.closePath();
    ctx.fillStyle = "#3d1f00";
    ctx.shadowColor = "#ffae42";
    ctx.shadowBlur = 40;
    ctx.fill();
    ctx.restore();

    // Lava
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 - 30, canvas.height/2 + 120);
    ctx.lineTo(canvas.width/2, canvas.height/2 + 80 + Math.sin(Date.now()/500)*8);
    ctx.lineTo(canvas.width/2 + 30, canvas.height/2 + 120);
    ctx.closePath();
    ctx.fillStyle = "#ffae42";
    ctx.shadowColor = "#ffae42";
    ctx.shadowBlur = 30 + Math.sin(Date.now()/300)*10;
    ctx.globalAlpha = 0.8 + Math.sin(Date.now()/400)*0.2;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
}

// --- Comet ---
let comet = {
    x: canvas.width/2,
    y: canvas.height + 80,
    vx: 0,
    vy: -2.2,
    tail: []
};
function drawComet() {
    // Tail
    for (let i = comet.tail.length-1; i >= 0; i--) {
        let t = comet.tail[i];
        ctx.beginPath();
        ctx.arc(t.x, t.y, 18-i*2, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,200,${0.08 + 0.08*i})`;
        ctx.fill();
    }
    // Head
    ctx.save();
    ctx.beginPath();
    ctx.arc(comet.x, comet.y, 18, 0, Math.PI*2);
    ctx.shadowColor = "#fffbe6";
    ctx.shadowBlur = 60;
    ctx.fillStyle = "#fffbe6";
    ctx.globalAlpha = 0.95;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
}

// --- Heart ---
const particles = [];
function Heart(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 1;
    this.radius = Math.random() * 2 + 1.5;
}
Heart.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 0, 70, ${this.alpha})`;
    ctx.shadowColor = "#ff0033";
    ctx.shadowBlur = 20;
    ctx.fill();
};
Heart.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.012;
};
function drawHeartshape() {
    for (let t = 0; t < Math.PI * 2; t += 0.05) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        const posX = canvas.width / 2 + x * 15;
        const posY = canvas.height / 2 - y * 15;
        const vx = (Math.random() - 0.5) * 2;
        const vy = (Math.random() - 0.5) * 2;
        particles.push(new Heart(posX, posY, vx, vy));
    }
}

// --- Chinese Dragon ---
let dragonProgress = 0;
function drawDragon(progress) {
    // progress: 0 (offscreen) to 1 (center)
    ctx.save();
    ctx.translate(canvas.width/2 - 300 + 600*progress, canvas.height/2 - 60);
    // Body (wavy)
    ctx.beginPath();
    for (let i = 0; i < 60; i++) {
        let angle = i * 0.18 + Math.sin(Date.now()/700 + i/8)*0.2;
        let r = 60 - i;
        let x = i * 12;
        let y = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.lineWidth = 22;
    ctx.strokeStyle = "#e63946";
    ctx.shadowColor = "#ffae42";
    ctx.shadowBlur = 30;
    ctx.stroke();

    // Belly
    ctx.beginPath();
    for (let i = 0; i < 60; i++) {
        let angle = i * 0.18 + Math.sin(Date.now()/700 + i/8)*0.2;
        let r = 60 - i;
        let x = i * 12;
        let y = Math.sin(angle) * r + 8;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#ffd166";
    ctx.shadowBlur = 0;
    ctx.stroke();

    // Head
    ctx.save();
    ctx.translate(720, 0);
    ctx.rotate(Math.sin(Date.now()/300)*0.08);
    ctx.beginPath();
    ctx.ellipse(0, 0, 38, 28, 0, 0, Math.PI*2);
    ctx.fillStyle = "#e63946";
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 20;
    ctx.fill();
    // Eyes
    ctx.beginPath();
    ctx.arc(18, -8, 6, 0, Math.PI*2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(20, -8, 2, 0, Math.PI*2);
    ctx.fillStyle = "#0f0";
    ctx.fill();
    // Horns
    ctx.beginPath();
    ctx.moveTo(-20, -18);
    ctx.lineTo(-38, -38);
    ctx.lineTo(-10, -10);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();

    ctx.restore();
}

// --- Fire Breath ---
let fireParticles = [];
function FireParticle(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 8 + 6;
    this.vy = (Math.random() - 0.5) * 3;
    this.alpha = 1;
    this.radius = Math.random() * 10 + 10;
    this.color = `rgba(${255},${Math.floor(Math.random()*120+80)},0,`;
}
FireParticle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.alpha + ")";
    ctx.shadowColor = "#ffae42";
    ctx.shadowBlur = 30;
    ctx.fill();
};
FireParticle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.025;
};

// --- Animated Name ---
let nameAlpha = 0;
let nameLetters = [
    {char: "r", x: -100, y: canvas.height/2 + 120, tx: canvas.width/2 - 120, ty: canvas.height/2 + 120, alpha: 0},
    {char: "a", x: canvas.width+100, y: canvas.height/2 + 120, tx: canvas.width/2 - 60, ty: canvas.height/2 + 120, alpha: 0},
    {char: "y", x: canvas.width/2, y: -100, tx: canvas.width/2, ty: canvas.height/2 + 120, alpha: 0},
    {char: "b", x: -100, y: canvas.height/2 + 200, tx: canvas.width/2 + 60, ty: canvas.height/2 + 120, alpha: 0},
    {char: "i", x: canvas.width+100, y: canvas.height/2 + 200, tx: canvas.width/2 + 120, ty: canvas.height/2 + 120, alpha: 0},
    {char: "n", x: canvas.width/2, y: canvas.height+100, tx: canvas.width/2 + 180, ty: canvas.height/2 + 120, alpha: 0}
];
function drawNameFire() {
    ctx.save();
    ctx.font = "bold 70px Arial";
    ctx.shadowColor = "#ffae42";
    ctx.shadowBlur = 40;
    for (let i = 0; i < nameLetters.length; i++) {
        let l = nameLetters[i];
        // Animate position and alpha
        l.x += (l.tx - l.x) * 0.07;
        l.y += (l.ty - l.y) * 0.07;
        l.alpha += (1 - l.alpha) * 0.07;
        let grad = ctx.createLinearGradient(l.x, l.y, l.x+40, l.y);
        grad.addColorStop(0, "#fff");
        grad.addColorStop(0.3, "#ffae42");
        grad.addColorStop(1, "#ff0033");
        ctx.fillStyle = grad;
        ctx.globalAlpha = l.alpha;
        ctx.fillText(l.char, l.x, l.y);
    }
    ctx.globalAlpha = 1;
    ctx.restore();
}

// --- Animation Phases ---
let phase = "comet"; // "comet", "heart", "dragon", "fireName"
let heartDestroyed = false;
let heartTimer = 0;

function animate() {
    drawVolcano();

    if (phase === "comet") {
        drawComet();
        comet.tail.unshift({x: comet.x, y: comet.y});
        if (comet.tail.length > 10) comet.tail.pop();
        comet.y += comet.vy;
        if (comet.y < canvas.height/2 + 40) {
            phase = "heart";
            drawHeartshape();
        }
    } else if (phase === "heart") {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.update();
            p.draw();
            if (p.alpha <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        heartTimer++;
        if (particles.length < 50 && !heartDestroyed && heartTimer > 80) {
            phase = "dragon";
        }
    } else if (phase === "dragon") {
        // Dragon slithers in slowly
        if (dragonProgress < 1) {
            dragonProgress += 0.008;
        }
        drawDragon(dragonProgress);
        if (dragonProgress >= 1) {
            // Fire breath
            for (let i = 0; i < 8; i++) {
                fireParticles.push(new FireParticle(canvas.width/2 + 420, canvas.height/2 - 60));
            }
            // Destroy heart particles
            particles.length = 0;
            heartDestroyed = true;
            // Draw fire
            for (let i = 0; i < fireParticles.length; i++) {
                const f = fireParticles[i];
                f.update();
                f.draw();
                if (f.alpha <= 0) {
                    fireParticles.splice(i, 1);
                    i--;
                }
            }
            // After fire, show name
            if (fireParticles.length < 10) {
                phase = "fireName";
            }
        }
    } else if (phase === "fireName") {
        drawNameFire();
    }

    requestAnimationFrame(animate);
}
animate();