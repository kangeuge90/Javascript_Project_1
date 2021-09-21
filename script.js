"use strict";
let started = false;
let paused = false;
let matchingPair = false;
let victory = false;

const startGame = document.querySelector(".start");
startGame.addEventListener("click", (event) => {
    if (document.getElementById('timer').innerText == '00:00:00:000') {
        startTimer();
        started = true;
    };
    if (document.getElementById('timer').innerText > '00:00:00:000' && paused === false) {
        pauseTimer();
        paused = true;
        started = true;
        console.log(`${paused}2`);
    } else if (document.getElementById('timer').innerText > '00:00:00:000' && paused === true) {
        startTimer();
        paused = false;
        started = true;
        console.log(`${paused}3`);
    };
});

// Must reset timer, then randomize cards(set facedown), and then start timer on every click
// OR it can pause timer, and pause game (not allow flipCard to activate) and unpause upon reactivation

// const flipCard = document.getElementsByClassName("foods");
// flipCard.addEventListener("click", event => {

// })
let cardOne = null;
let cardTwo = null;

// const card = document.getElementById("card")
// card.addEventListener("click", flipCard);
function flipCard(e) {
    e.currentTarget.classList.toggle("flip-card");
        if (cardOne === null) {
        cardOne = e.currentTarget;
    } else {
        cardTwo = e.currentTarget;
        // check to see if it's a match
        // if it's a match
        // then remove cardOne and cardTwo
        // if it's not a match
        // flip cardOne and cardTwo back over
        // reset both cards to null no matter what
        let cardOneFood = cardOne.dataset.food;
        let cardTwoFood = cardTwo.dataset.food;
        setTimeout(() => {
        if (cardOneFood === cardTwoFood) {
           cardOne.style.visibility="hidden";
           cardTwo.style.visibility="hidden";

        } else {
           cardOne.classList.remove("flip-card");
           cardTwo.classList.remove("flip-card");
        }
        cardOne = null;
        cardTwo = null;
    }, 500)
    }
}

const cards = document.querySelectorAll(".card");
if (started === false) {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", flipCard)
    }
} else if (started === true && paused === true) {
    for (let i = 0; i < cards.length; i++) {
       cards[i].removeEventListener("click", flipCard)
    }
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
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", flipCard)
    }
}

function pauseTimer() {
    clearInterval(cron);
    for (let i = 0; i < cards.length; i++) {
        cards[i].removeEventListener("click", flipCard)
     }
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