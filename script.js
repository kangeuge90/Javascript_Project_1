"use strict";
let paused = false;

const startGame = document.querySelector(".start");
startGame.addEventListener("click", (event) => {
    if (document.getElementById('timer').innerText == '00:00:00:000') {
        startTimer();
        console.log(`${paused}1`);
    };
    if (document.getElementById('timer').innerText > '00:00:00:000' && paused === false) {
        pauseTimer();
        paused = true;
        console.log(`${paused}2`);
    } else if (document.getElementById('timer').innerText > '00:00:00:000' && paused === true) {
        startTimer();
        paused = false;
        console.log(`${paused}3`);
    };
});

// Must reset timer, then randomize cards(set facedown), and then start timer on every click
// OR it can pause timer, and pause game (not allow flipCard to activate) and unpause upon reactivation

// const flipCard = document.getElementsByClassName("foods");
// flipCard.addEventListener("click", event => {

// })
const card = document.getElementById("card")
card.addEventListener("click", flipCard);
function flipCard(e) {
    card.classList.toggle("flip-card");
}

// on event 'click', switch from facedown to faceup, and possibly 
// work in reverse- optional, when 2 cards are picked either flip back 
// over if no match, or keep flipped if match

// Must remove cards if matched, after a short time
// If cards do not match, must flip back to facedown after a short time

// const randomize = document.getElementsByClassName("reset");
// randomize.addEventListener('click', (event) => {

// })

// possible solution: assign each div a random #1-12 and assign them 1 of
// 6 classes using math.random
// Must also refresh the game, bring back all cards to facedown

// OR possible make an array of 6 images, that can only be assigned a maximum 
// of two times to each div

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

function startTimer() {
    pauseTimer();
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

function timer() {
    console.log('hello');
    if ((millisecond += 10) == 1000) {
        millisecond = 0;
        second++;
    }
    if (second == 60) {
        second = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hour++;
    }
    document.getElementById('hour').innerText = returnData(hour);
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
    document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
    return input > 10 ? input : `0${input}`
}