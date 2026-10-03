// Seleciona os elementos da página
const elementoHoras = document.querySelector("#hours");
const elementoMinutos = document.querySelector("#minutes");
const elementoSegundos = document.querySelector("#seconds");

const botaoComecar = document.querySelector("#start");
const botaoParar = document.querySelector("#stop");
const botaoReset = document.querySelector("#reset");

const elementoStatus = document.querySelector(".status");

// Variáveis de controle
let intervalo = null;
let tempoDecorrido = 0;
let tempoDeInicio = 0;


// Atualiza o tempo exibido na página
function atualizaDisplay() {
    const totalSeconds = Math.floor(tempoDecorrido / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    elementoHoras.textContent = String(hours).padStart(2, "0");
    elementoMinutos.textContent = String(minutes).padStart(2, "0");
    elementoSegundos.textContent = String(seconds).padStart(2, "0");
}


// Começa ou retoma o cronômetro
function comecaCronometro() {

    // Impede múltiplos intervalos simultâneos
    if (intervalo !== null) return;

    tempoDeInicio = Date.now() - tempoDecorrido;

    intervalo = setInterval(() => {
        tempoDecorrido = Date.now() - tempoDeInicio;
        atualizaDisplay();
    }, 100);

    elementoStatus.innerHTML =
        '<span class="status-dot"></span> cronômetro em andamento';
}


// Pausa o cronômetro
function paraCronometro() {

    if (intervalo === null) return;

    tempoDecorrido = Date.now() - tempoDeInicio;

    clearInterval(intervalo);
    intervalo = null;

    atualizaDisplay();

    elementoStatus.innerHTML =
        '<span class="status-dot"></span> cronômetro pausado';
}


// Reseta o cronômetro
function resetaCronometro() {

    clearInterval(intervalo);

    intervalo = null;
    tempoDecorrido = 0;
    tempoDeInicio = 0;

    atualizaDisplay();

    elementoStatus.innerHTML =
        '<span class="status-dot"></span> pronto para começar';
}


// Eventos dos botões
botaoComecar.addEventListener("click", comecaCronometro);
botaoParar.addEventListener("click", paraCronometro);
botaoReset.addEventListener("click", resetaCronometro);


// Inicializa a exibição
atualizaDisplay();