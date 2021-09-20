"use strict";
let started = false;
let paused = false;
let victory = false;
let matchingPair = false;

const startGame = document.querySelector(".start");
startGame.addEventListener("click", (event) => {
    if (document.getElementById('timer').innerText == '00:00:00:000') {
        startTimer();
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


let flipCard = document.querySelectorAll(".card");
if (started === false) {
    for (let i = 0; i < flipCard.length; i++) {
        flipCard[i].addEventListener("click", (event) => {
            event.currentTarget.classList.toggle("flip-card");
        })
        console.log(`flipCard1`)
    }
}
if (started === true && paused === false) {
    for (let i = 0; i < flipCard.length; i++) {
        flipCard[i].addEventListener("click", (event) => {
            event.currentTarget.classList.toggle("flip-card");
        })
        console.log(`flipCard2`)
    }
} else if (started === true && paused === true) {
    for (let i = 0; i < flipCard.length; i++) {
        flipCard[i].removeEventListener("click", (event) => {
            event.currentTarget.classList.toggle("flip-card");
        })
        console.log(`flipCard3`)
    }
}

// ^^Must not be able to flip while game is paused, after game has begun^^
// ^^May set maximum of simultaeneous flipped cards to 2^^



// ---------- TO DO AREA---------------------------------------------------------//
// 1.  MATCHINGPAIR ASSESSMENT fxn ----------------------------------------------//
// If the last 2 cards clicked match, remove them after short time
//      No longer flippable if matched
// If the last 2 cards clicked do not match, flip them facing down after a short time



// 2. RESET/RANDOMIZE FXN ------------------------------------------------------//
// Must set all cards facedown
// Must shuffle food images
// Must set timer to 0
// Must set started=false, paused=false

const reset = document.querySelector(".reset");
reset.addEventListener('click', (event) => {
    started = false;
    paused = false;
    victory = false;
    resetTimer();
    console.log(`STARTED=${started}, PAUSED=${paused}, VICTORY=${victory}, reset1`)
})

// function shuffle(array) {
//     let currentIndex = array.length,
//         randomIndex;

//     // While there remain elements to shuffle...
//     while (currentIndex != 0) {

//         // Pick a remaining element...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;

//         // And swap it with the current element.
//         [array[currentIndex], array[randomIndex]] = [
//             array[randomIndex], array[currentIndex]
//         ];
//     }

//     return array;
// }


// for (let card of cards) {
//     let newdiv = document.createElement('div')
//     newdiv.classList.add('')
//     newdiv.src = cardImageArray
// }





// 3.  WIN CONDITION FXN ------------------------------------------------------//
// If all cards matched, show victory prompt w/ time score
// If # of matchingPair = 6 then show prompt


// ---------- TO DO AREA END---------------------------------------------------//



const cardImageArray = [{
        image: "assets/Hamburger.jpg",
    },
    {
        image: "assets/Hamburger.jpg",
    },
    {
        image: "assets/Pizza.jpg",
    },
    {
        image: "assets/Pizza.jpg",
    },
    {
        image: "assets/Spaghetti.jpg",
    },
    {
        image: "assets/Spaghetti.jpg",
    },
    {
        image: "assets/Steak.jpg",
    },
    {
        image: "assets/Steak.jpg",
    },
    {
        image: "assets/Sushi.jpg",
    },
    {
        image: "assets/Sushi.jpg",
    },
    {
        image: "assets/Tacos.jpg",
    },
    {
        image: "assets/Tacos.jpg",
    },
]

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