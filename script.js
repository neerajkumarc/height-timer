const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const heightEl = document.getElementById("height")
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const howBtn = document.getElementById("howBtn");

let minutes = 0;
let seconds = 0;
let tens = 0;
let interval;

function updateTimerDisplay() {
    millisecondsEl.textContent = tens < 10 ? "0" + tens : tens;
    secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
    minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
}

function timer() {
    tens++;
    if (tens > 99) {
        seconds++;
        tens = 0;
    }
    if (seconds > 59) {
        minutes++;
        seconds = 0;
    }
    updateTimerDisplay();
}

function startTimer() {
    clearInterval(interval);
    interval = setInterval(timer, 10);
}

function stopTimer() {
    clearInterval(interval);
}

function resetTimer() {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    tens = 0;
    updateTimerDisplay();
}

function toggleButtons(buttonToHide, buttonToShow) {
    buttonToHide.classList.add("hidden");
    buttonToShow.classList.remove("hidden");
}

startBtn.addEventListener("click", () => {
    startTimer()
    toggleButtons(startBtn, stopBtn)
});
stopBtn.addEventListener("click", () => {
    stopTimer()
    toggleButtons(stopBtn, resetBtn)
    let totalSec = (minutes * 60) + seconds + tens / 100
    heightEl.textContent = calculateHeight(totalSec)
});
resetBtn.addEventListener("click", () => {
    resetTimer()
    toggleButtons(resetBtn, startBtn)
});

function calculateHeight(totalSec) {
    let height = 0.5 * 9.81 * (totalSec * totalSec);
    return height;
}

howBtn.addEventListener("click", () => {
    document.getElementById("claculatorDiv").classList.toggle("hidden")
    document.getElementById("howItWorksDiv").classList.toggle("hidden")
    if (document.getElementById("claculatorDiv").classList.contains("hidden")) {
        howBtn.textContent = "Back"
    } else {
        howBtn.textContent = "How it works?"
    }
})