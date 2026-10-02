// Seleciona os elementos da página
const hoursElement = document.querySelector("#hours");
const minutesElement = document.querySelector("#minutes");
const secondsElement = document.querySelector("#seconds");

const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");

const statusElement = document.querySelector(".status");

// Variáveis de controle
let intervalId = null;
let elapsedTime = 0;
let startTime = 0;


// Atualiza o tempo exibido na página
function updateDisplay() {
    const totalSeconds = Math.floor(elapsedTime / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}


// Começa ou retoma o cronômetro
function startStopwatch() {

    // Impede múltiplos intervalos simultâneos
    if (intervalId !== null) return;

    startTime = Date.now() - elapsedTime;

    intervalId = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 100);

    statusElement.innerHTML =
        '<span class="status-dot"></span> cronômetro em andamento';
}


// Pausa o cronômetro
function stopStopwatch() {

    if (intervalId === null) return;

    elapsedTime = Date.now() - startTime;

    clearInterval(intervalId);
    intervalId = null;

    updateDisplay();

    statusElement.innerHTML =
        '<span class="status-dot"></span> cronômetro pausado';
}


// Reseta o cronômetro
function resetStopwatch() {

    clearInterval(intervalId);

    intervalId = null;
    elapsedTime = 0;
    startTime = 0;

    updateDisplay();

    statusElement.innerHTML =
        '<span class="status-dot"></span> pronto para começar';
}


// Eventos dos botões
startButton.addEventListener("click", startStopwatch);
stopButton.addEventListener("click", stopStopwatch);
resetButton.addEventListener("click", resetStopwatch);


// Inicializa a exibição
updateDisplay();