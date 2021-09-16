"use strict";
const startGame = document.getElementsByClassName("start");
startGame.addEventListener("submit", (event) => {

        event.preventDefault();
    })
    // Must reset timer, then randomize cards, and then start timer on every click
    // OR it can pause timer, and pause game (not allow flipCard to activate) and unpause upon reactivation

function flipCard() {

}
// on event 'click', switch from card back to card front, and possibly 
// work in reverse- optional, when 2 cards are picked either flip back 
// over if no match, or keep flipped if match

function randomize() {

}
// possible solution: assign each div a random #1-12 and assign them 1 of
// 6 classes using math.random

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