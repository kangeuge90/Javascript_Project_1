"use strict";
let started = false;
let paused = false;
let matchingPair = false;
let victory = false;

const startGame = document.querySelector(".start");
startGame.addEventListener("click", () => {
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

// creating array for randomizing
// board/cards or shuffle option
const shuffle = () => {
    let cardOptions = [
        "Hamburger",
        "Hamburger",
        "Pizza",
        "Pizza",
        "Spaghetti",
        "Spaghetti",
        "Steak",
        "Steak",
        "Sushi",
        "Sushi",
        "Tacos",
        "Tacos"
    ]
    for (let i = 0; i < 12; i++) {
        // get random food from array
        // and remove it to stop repeats
        let index = Math.floor(Math.random() * cardOptions.length);
        let cardOption = cardOptions[index];
        cardOptions.splice(index, 1);
        // create card div
        // adding class/dataset
        let div = document.createElement("div");
        div.classList.add("card");
        div.dataset.food = cardOption;
        // adding image to front div
        let frontImage = document.createElement("img");
        frontImage.setAttribute("src", `assets/${cardOption}.jpg`);
        frontImage.setAttribute("alt", cardOption);
        frontImage.classList.add("faceup");
        let frontDiv = document.createElement("div");
        frontDiv.classList.add("front");
        frontDiv.appendChild(frontImage);
        // adding image to back div
        let backImage = document.createElement("img");
        backImage.setAttribute("src", "assets/cardBackPan.jpg");
        backImage.setAttribute("alt", "Card");
        backImage.classList.add("facedown");
        let backDiv = document.createElement("div");
        backDiv.classList.add("back");
        backDiv.appendChild(backImage);
        // adding div to foods, etc
        div.appendChild(frontDiv);
        div.appendChild(backDiv);
        document.querySelector(".foods").appendChild(div);
        // adding image to back div
    }
};
shuffle();

let cardOne = null;
let cardTwo = null;
let cardMatched = 0;
// const card = document.getElementById("card")
// card.addEventListener("click", flipCard);
function flipCard(e) {
    e.currentTarget.classList.toggle("flip-card");
    if (cardOne === null) {
        cardOne = e.currentTarget;
        cardOne.removeEventListener("click", flipCard);
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
                cardOne.style.visibility = "hidden";
                cardTwo.style.visibility = "hidden";
                cardMatched++
                if (cardMatched === 6) {
                    let currentTime = document.getElementById('timer').innerText;

                    pauseTimer();
                    alert(`Congratulations! Game completed in ${currentTime}!`);
                }
            } else {
                cardOne.classList.remove("flip-card");
                cardTwo.classList.remove("flip-card");
            }
            cardOne.addEventListener("click", flipCard);
            cardOne = null;
            cardTwo = null;
        }, 500)
    }
}
const cards = document.querySelectorAll(".card");
let addEvent = () => {
    if (started === false) {
        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", flipCard)
        }
    } else if (started === true && paused === true) {
        for (let i = 0; i < cards.length; i++) {
            cards[i].removeEventListener("click", flipCard)
        }
    }
}
const resetGame = document.querySelector(".reset");
resetGame.addEventListener("click", () => {
    location.reload();
});

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