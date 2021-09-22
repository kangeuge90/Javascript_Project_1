"use strict";
let started = false;
let paused = false;
let victory = false;
let cardMatched = 0;

const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', flipCard));

shuffleCards(); // auto shuffles when page loads

const startGame = document.querySelector(".start");
startGame.addEventListener("click", (event) => {
    if (document.getElementById('timer').innerText == '00:00:00:000') {
        reappearAllCards(); // cards no longer invisible//
        setCardsFacedown(); // cards set face down//
        resetBoard(); // lockBoard state and card-clicked memory cleared//
        enableAllCards(); // re-add 'click' event listeners to All Cards//
        startTimer();
        cardMatched = 0;
        paused = false;
        started = true;
        console.log(`PAUSED=${paused}, STARTED=${started}, startGame1`);
    };
    if (document.getElementById('timer').innerText > '00:00:00:000' && paused === false) {
        pauseTimer();
        paused = true;
        started = true;
        console.log(`PAUSED=${paused}, STARTED=${started}, startGame2`);
    } else if (document.getElementById('timer').innerText > '00:00:00:000' && paused === true) {
        startTimer();
        paused = false;
        started = true;
        console.log(`PAUSED=${paused}, STARTED=${started}, startGame3`);
    };
});

// // creating array for randomizing
// // board/cards or shuffle option
// const shuffle = () => {
//     let cardOptions = [
//         "Hamburger",
//         "Hamburger",
//         "Pizza",
//         "Pizza",
//         "Spaghetti",
//         "Spaghetti",
//         "Steak",
//         "Steak",
//         "Sushi",
//         "Sushi",
//         "Tacos",
//         "Tacos"
//     ]
//     for (let i = 0; i < 12; i++) {
//         // get random food from array
//         // and remove it to stop repeats
//         let index = Math.floor(Math.random() * cardOptions.length);
//         let cardOption = cardOptions[index];
//         cardOptions.splice(index, 1);
//         // create card div
//         // adding class/dataset
//         let div = document.createElement("div");
//         div.classList.add("card");
//         div.dataset.food = cardOption;
//         // adding image to front div
//         let frontImage = document.createElement("img");
//         frontImage.setAttribute("src", `assets/${cardOption}.jpg`);
//         frontImage.setAttribute("alt", cardOption);
//         frontImage.classList.add("faceup");
//         let frontDiv = document.createElement("div");
//         frontDiv.classList.add("front");
//         frontDiv.appendChild(frontImage);
//         // adding image to back div
//         let backImage = document.createElement("img");
//         backImage.setAttribute("src", "assets/cardBackPan.jpg");
//         backImage.setAttribute("alt", "Card");
//         backImage.classList.add("facedown");
//         let backDiv = document.createElement("div");
//         backDiv.classList.add("back");
//         backDiv.appendChild(backImage);
//         // adding div to foods, etc
//         div.appendChild(frontDiv);
//         div.appendChild(backDiv);
//         document.querySelector(".foods").appendChild(div);
//         // adding image to back div
//     }
// };
// shuffle();

// Must reset timer, then randomize cards(set facedown), and then start timer on every click
// OR it can pause timer, and pause game (not allow flipCard to activate) and unpause upon reactivation

let hasFlipped = false;
let firstCard = null;
let secondCard = null;
let lockedBoard = false;

function flipCard() {
    if (lockedBoard) return; // if lockedBoard=true due to unflipCards function, flipping is restricted
    if (this === firstCard) return; // if target is the same as the firstCard, flipping that same card is restricted
    if (started === false) {
        this.classList.add('flip-card');
        if (!hasFlipped) {
            hasFlipped = true;
            firstCard = this;
        } else {
            hasFlipped = false;
            secondCard = this;
            assessMatch();
            setTimeout(() => { resetBoard() }, 450); // bug fix for - after mismatch, imagetype of firstCard won't work
        }
        console.log('flipCard1');
    }
    if (started === true && paused === false) {
        this.classList.add('flip-card');
        if (!hasFlipped) {
            hasFlipped = true;
            firstCard = this;
        } else {
            hasFlipped = false;
            secondCard = this;
            assessMatch();
            setTimeout(() => { resetBoard() }, 450); // bug fix for - after mismatch, imagetype of firstCard won't work
        }
        console.log('flipCard2');
    }
    if (victory === true && paused == false) {
        console.log('flipCard3');
    } else if (started === true && paused === true) {
        console.log('flipCard4');
    }
}

// ^^May set maximum of simultaeneous flipped cards to 2^^


// ---------- TO DO AREA---------------------------------------------------------//
// 1.  MATCHINGPAIR ASSESSMENT fxn ----------------------------------------------//
// If the last 2 cards clicked match, remove them after short time
//      No longer flippable if matched
// If the last 2 cards clicked do not match, flip them facing down after a short time

function assessMatch() { // Checks if clicked pair are matching, and acts accordingly
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
    } else {
        unflipCards();
    }
}

// })
// let cardOne = null;
// let cardTwo = null;

// // const card = document.getElementById("card")
// // card.addEventListener("click", flipCard);
// function flipCard(e) {
//     e.currentTarget.classList.toggle("flip-card");
//         if (cardOne === null) {
//         cardOne = e.currentTarget;
//         cardOne.removeEventListener("click", flipCard);
//     } else {
//         cardTwo = e.currentTarget;
//         // check to see if it's a match
//         // if it's a match
//         // then remove cardOne and cardTwo
//         // if it's not a match
//         // flip cardOne and cardTwo back over
//         // reset both cards to null no matter what
//         let cardOneFood = cardOne.dataset.food;
//         let cardTwoFood = cardTwo.dataset.food;
//         setTimeout(() => {
//         if (cardOneFood === cardTwoFood) {
//            cardOne.style.visibility="hidden";
//            cardTwo.style.visibility="hidden";
//         } else {
//            cardOne.classList.remove("flip-card");
//            cardTwo.classList.remove("flip-card");
//         }
//         cardOne.addEventListener("click", flipCard);
//         cardOne = null;
//         cardTwo = null;
//     }, 500)
//     }
// }

// const cards = document.querySelectorAll(".card");
// if (started === false) {
//     for (let i = 0; i < cards.length; i++) {
//         cards[i].addEventListener("click", flipCard)
//     }
// } else if (started === true && paused === true) {
//     for (let i = 0; i < cards.length; i++) {
//        cards[i].removeEventListener("click", flipCard)
//     }
// }

function disableCards() { // disables matched pair
    setTimeout(() => {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        disappearCards();
        cardMatched++;
        assessWinCondition();
    }, 450)
}

function disappearCards() { // makes matched pair image disappear
    firstCard.style.visibility = "hidden";
    secondCard.style.visibility = "hidden";
}

function disappearAllCards() { // makes ALL cards disappear (testing purposes)
    cards.forEach(card => card.style.visibility = "visible");
}

function reappearAllCards() { // makes all cards reappear (new game and reset)
    cards.forEach(card => card.style.visibility = "visible");
}

function enableAllCards() { // enables all cards to flip again (used for new game and reset)
    cards.forEach(card => card.addEventListener('click', flipCard))
}

function unflipCards() { // unflips incorrectly matched pair
    lockedBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip-card');
        secondCard.classList.remove('flip-card');
        lockedBoard = false;
    }, 450)
}

function resetBoard() { // resets stored-card clicks and unlocks board
    hasFlipped = false;
    lockedBoard = false;
    [firstCard, secondCard] = [null, null];
}


// 2. RESET/RANDOMIZE FXN ------------------------------------------------------//
// Must refresh board                   *DONE*
// Must shuffle food images             *DONE*
// Must set timer to 0                  *DONE*
// Must set started=false, paused=false *DONE*

const resetButton = document.querySelector(".reset");
resetButton.addEventListener('click', (event) => {
    cardMatched = 0;
    started = false;
    paused = false;
    victory = false;
    reappearAllCards(); // cards no longer invisible//
    setCardsFacedown(); // cards set face down//
    resetBoard(); // lockBoard state and card-clicked memory cleared//
    enableAllCards(); // re-add 'click' event listeners//
    shuffleCards(); // cards shuffled//
    resetTimer(); // set timer to 00's//
    pauseTimer(); // pause timer (at 00's)//
    console.log(`STARTED=${started}, PAUSED=${paused}, VICTORY=${victory}, reset1`)
})

function setCardsFacedown() { // sets all cards facing down (new game and reset)
    cards.forEach(card => card.classList.remove('flip-card'));
}

function shuffleCards() { // shuffles cards
    cards.forEach(card => {
        let randomOrder = Math.floor(Math.random() * 12);
        card.style.order = randomOrder;
    });
}



// 3.  WIN CONDITION FXN ------------------------------------------------------//



function assessWinCondition() { // if win condition met, set victory to true, and show winScreen
    if (cardMatched === 6) {
        winScreen();
    }
}

function autoWin() { // create automatic win state for console testing purposes
    victory = true;
    // cards.forEach(card => card.classList.add('flip-card'));
    winScreen();
    console.log('autoWin');
}

function winScreen() { // win alert
    victory = true;
    let currentTime = document.getElementById('timer').innerText;
    alert(`Congratulations!!!  You've completed the Food Matching Game in: ${currentTime}`)
    pauseTimer();
    console.log('winScreen');
}

// ---------- TO DO AREA END---------------------------------------------------//



// --------- TIMER AREA -----------//
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

// --------- TIMER AREA END-----------//