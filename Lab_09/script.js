var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var balls = [];
var lines = [];

function start() {
    // 10 piłek na planszy
    for (var i = 0; i < 15; i++) {
        var ball = {
            x: Math.random() * (canvas.width - 2 * 16) + 16, // unikaj brzegów
            y: Math.random() * (canvas.height - 2 * 16) + 16,
            radius: 16,
            color: "red",
            dx: (Math.random() - 0.5) * 5, // przyspieszenie piłek
            dy: (Math.random() - 0.5) * 5,
        };
        balls.push(ball);
    }

    // początek animacji
    requestAnimationFrame(animate);
}

// reset pozycji wszystkich piłek na ekranie
function reset() {
    balls = [];
    lines = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 15; i++) {
        var ball = {
            x: Math.random() * (canvas.width - 2 * 16) + 16, // unikaj brzegów
            y: Math.random() * (canvas.height - 2 * 16) + 16,
            radius: 16,
            color: "red",
            dx: (Math.random() - 0.5) * 5,
            dy: (Math.random() - 0.5) * 5,
        };
        balls.push(ball);
    }
}

var lastFrame = 0;

// funkcja animacji piłek
function animate(currentFrame) {

    // Oblicz czas od ostatniej klatki
    var deltaTime = currentFrame - lastFrame;
    lastFrame = currentFrame;

    // usuwanie śladu piłek
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // śledzenie miejsca poruszania się piłki
    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i];

        ball.x += ball.dx * deltaTime / 16; // Skalowanie przez czas
        ball.y += ball.dy * deltaTime / 16;

        // czy kolizja - odwróć kierunek
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
            ball.dx *= -1;
        }
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.dy *= -1;
        }

        // twórz linie
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    }

    drawLines();
    requestAnimationFrame(animate);
}

// sprawdzaj dystans piłek - pitagoras
function distance(ball1, ball2) {
    return Math.sqrt(Math.pow(ball1.x - ball2.x, 2) + Math.pow(ball1.y - ball2.y, 2));
}

function drawLines() {
    // Łączenie piłek w odległości [150px]
    for (var i = 0; i < balls.length - 1; i++) {
        for (var j = i + 1; j < balls.length; j++) {
            if (distance(balls[i], balls[j]) < 150) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.strokeStyle = "black";
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// 22-23 do 60fps

