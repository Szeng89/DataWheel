// script.js
const startStopButton = document.getElementById('start-stop-button');
const timerDisplay = document.createElement('div');
timerDisplay.id = 'timer-display';
document.body.appendChild(timerDisplay);

let timerInterval;
let startTime;

function startTimer() {
    startTime = Date.now();

    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const milliseconds = elapsedTime % 1000;
        const seconds = Math.floor(elapsedTime / 1000) % 60;
        const minutes = Math.floor(elapsedTime / (1000 * 60));

        // Format and display the time
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
        timerDisplay.textContent = formattedTime;
    }, 10);

    startStopButton.textContent = "Stop";
    startStopButton.removeEventListener('click', startTimer);
    startStopButton.addEventListener('click', stopTimer);

    // Get the initial location when the timer starts
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(logPosition);
    } else {
        console.error('Geolocation is not supported');
    }
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
    startStopButton.textContent = "Start";
    startStopButton.removeEventListener('click', stopTimer);
    startStopButton.addEventListener('click', startTimer);

    // Get the final location when the timer stops
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(logPosition);
    }
}

function logPosition(position) {
    console.log(position.coords.latitude, position.coords.longitude);
}

// Initial event listener
startStopButton.addEventListener('click', startTimer);
