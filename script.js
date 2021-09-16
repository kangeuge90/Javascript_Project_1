"use strict";
const startGame = document.getElementsByClassName("start");
startGame.addEventListener("submit", (event) => {

    event.preventDefault();
})

function flipCard() {

}

function randomize() {

}

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

function startTimer() {
    pause();
    cron = setInterval(() => { timer(); }, 10);
}

function pauseTimer() {
    clearInterval(cron);
}

function resetTimer() {
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;
    document.getElementById('hour').innerText = '00';
    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';
    document.getElementById('millisecond').innerText = '000';
}