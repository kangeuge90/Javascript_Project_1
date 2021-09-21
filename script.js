"use strict";
let started = false;
let paused = false;
let victory = false;

const startGame = document.querySelector(".start");
startGame.addEventListener("click", (event) => {
    if (document.getElementById('timer').innerText == '00:00:00:000') {
        startTimer();
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

// ^^May want startGame1 to set all cards facing down^^

const cards = document.querySelectorAll('.card')
cards.forEach(card => card.addEventListener('click', flipCard));

let hasFlipped = false;
let firstCard;
let secondCard;
let lockedBoard = false;

function flipCard() {
    if (lockedBoard) return;
    if (this === firstCard) return;
    // if (started === false) {
    //     console.log('flipCard1');
    // }
    if (started === true && paused === false) {
        this.classList.add('flip-card');
        if (!hasFlipped) {
            hasFlipped = true;
            firstCard = this;
        } else {
            hasFlipped = false;
            secondCard = this;
            assessMatch();
        }
        console.log('flipCard2');
    }
    // if (victory === true && paused == false) {
    //     console.log('flipCard3');
    // } else if (started === true && paused === true) {
    //     console.log('flipCard4');
    // }
}

// ^^Must not be able to flip while game is paused, after game has begun^^  *DONE*
// ^^May set maximum of simultaeneous flipped cards to 2^^


// ---------- TO DO AREA---------------------------------------------------------//
// 1.  MATCHINGPAIR ASSESSMENT fxn ----------------------------------------------//
// If the last 2 cards clicked match, remove them after short time
//      No longer flippable if matched
// If the last 2 cards clicked do not match, flip them facing down after a short time

function assessMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    setTimeout(() => {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        disappearCards();
    }, 500)
}

function enableCards() {
    cards.forEach(card => card.addEventListener('click', flipCard))
}

function unflipCards() {
    lockedBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip-card');
        secondCard.classList.remove('flip-card');
        lockedBoard = false;
    }, 750)
}

function disappearCards() {
    firstCard.style.visibility = "hidden";
    secondCard.style.visibility = "hidden";
}

function reappearCards() {
    cards.forEach(card => card.style.visibility = "visible");
}

function resetBoard() {
    hasFlipped = false;
    lockedBoard = false;
    [firstCard, secondCard] = [null, null];
}


// 2. RESET/RANDOMIZE FXN ------------------------------------------------------//
// Must refresh board                   
// Must shuffle food images             *DONE*
// Must set timer to 0                  *DONE*
// Must set started=false, paused=false *DONE*

const resetButton = document.querySelector(".reset");
resetButton.addEventListener('click', (event) => {
    started = false;
    paused = false;
    victory = false;
    reappearCards();
    shuffleCards();
    setCardsFacedown();
    resetBoard();
    enableCards();
    resetTimer();
    pauseTimer();
    console.log(`STARTED=${started}, PAUSED=${paused}, VICTORY=${victory}, reset1`)
})

function setCardsFacedown() {
    cards.forEach(card => card.classList.remove('flip-card'));
}

function shuffleCards() {
    cards.forEach(card => {
        let randomOrder = Math.floor(Math.random() * 12);
        card.style.order = randomOrder;
    });
}



// 3.  WIN CONDITION FXN ------------------------------------------------------//
// If all cards matched, show victory prompt w/ time score
// If # of matchingPair = 6 then show prompt


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