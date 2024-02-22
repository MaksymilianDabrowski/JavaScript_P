// główne elementy canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// rozmiar
canvas.width = 1024;
canvas.height = 768;

// wartości początkowe kulki: 
const ballRadius = 15; // rozmiar 
let ballX = canvas.width / 4;
let ballY = canvas.height; // kulka pojawia sie w lewym dolnym rogu

// wartości początkowe dziury:
const holeRadius = 25;
const holeX = canvas.width - 25;
const holeY = (canvas.width - 25) / 4; // dziura pojawia się w prawym górnym rogu
const maxDistance = 400;

// początkowa orientacja planszy 
let beta = 0;
let gamma = 0;

// timer
let startTime;
let elapsedTime = 0;
const startBtn = document.getElementById('startBtn').addEventListener('click', startTimer);
const clearTimeRecordsBtn = document.getElementById('clearTimeRecordsBtn').addEventListener('click', resetTime);


// funkcja śledząca pozycję piłki
function updateBallPosition() {

    // obliczanie pozycji piłki poprzez ustawienia żyroskopu
    const deltaX = gamma / 10;
    const deltaY = beta / 10;

    // update pozycji
    ballX += deltaX;
    ballY += deltaY;

    // piłka pomiędzy barierą
    ballX = Math.max(ballRadius, Math.min(canvas.width - ballRadius, ballX));
    ballY = Math.max(ballRadius, Math.min(canvas.height - ballRadius, ballY));

    if (ballInTheHole()) {
        stopTimer();
        alert("Piłka w dziurze!");
        cancelAnimationFrame(updateBallPosition);
        document.location.reload();
        return;
    }
    
    // stałe usuwanie ścieżki kulki
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // piłka
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'pink';
    ctx.fill();


    // dziura
    ctx.beginPath();
    ctx.arc(holeX, holeY, holeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();


    // requestAnimationFrame()
    requestAnimationFrame(updateBallPosition);
};

// użycie żyroskopu 
window.addEventListener('deviceorientation', (event) => {
    beta = event.beta;
    gamma = event.gamma;
});

// funkcja start - rozpoczyna grę i włącza timer
function startTimer() {
    startTime = Date.now();
    setInterval(() => {
        elapsedTime = Date.now() - startTime;
        document.getElementById('time').innerHTML = (elapsedTime / 1000).toFixed(2);
    }, 10);
}

// funkcja zatrzymuje timer i zapisuje czas w local storage
function stopTimer() {
    clearInterval();
    const timeRecords = JSON.parse(localStorage.getItem('timeRecords')) || [];
    timeRecords.push(elapsedTime);
    localStorage.setItem('timeRecords', JSON.stringify(timeRecords));
}


// wyświetlanie czasu 
function getTime() {

    const timeRecords = JSON.parse(localStorage.getItem('timeRecords')) || [];

    // sortowanie czasu
    timeRecords.sort((a, b) => a - b);

    // wyświetlanie twoiego czasu 
    const timeRecordsElement = document.getElementById('timeRecords');
    timeRecordsElement.innerHTML = 'Twój czas:<br>';

    // pętla szuka najlepszego czasu 
    timeRecords.forEach((record, index) => {
        const formattedTime = (record / 1000).toFixed(2);
        timeRecordsElement.innerHTML += `${index + 1}. ${formattedTime} <br>`;
    });
}

// funkcja sprawdza czy piłka trafiła do dziury
function ballInTheHole() {
    const dx = ballX - holeX;
    const dy = ballY - holeY;
    const squaredDistance = dx * dx + dy * dy;
    if (squaredDistance < maxDistance) {
        return true;
    }
    return false;
}


// czyszczenie local storage
function resetTime() {
    localStorage.clear();
    getTime();
}

// start
requestAnimationFrame(updateBallPosition);
getTime();