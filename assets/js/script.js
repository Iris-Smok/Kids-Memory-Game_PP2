//Credits for helping me with memory-game structure and code: Marina Ferreira - https://github.com/code-sketch/memory-game
// Web Dev - https://www.youtube.com/watch?v=bbb9dZotsOc
// Sandra Israel - https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript

/*jshint esversion: 6 */
let card = document.getElementsByClassName("card");
let cards = [...card];
let randomNum = null;
let moves = 0;
let counter = document.querySelector(".moves"); // MOVES COUNTER
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let matchCounter = 0;

const modalBtn = document.getElementById("modalBtn"); // HOW TO PLAY BTN
const closeBtn = document.getElementById("closeBtn"); // HOW TO PLAY CLOSE WINDOW

let modal = document.getElementById("popup1"); // CONGRATULATIONS WINDOW
let closeicon = document.querySelector(".close"); // CONGRATULATIONS WINDOW 

const animals = [
    'snail',
    'bee',
    'dinosaur',
    'dog',
    'fox',
    'lionnew',
    'sheep',
    'bird',

];


window.onload = startGame();



// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipCard);
}


// DID YOU KNOW SHOW LESS -SHOW MORE

function didYouKnow() {
    const know = document.getElementById('wrapper');
    var x = window.matchMedia("(max-width: 1000px)"); // MEDIA QUERY
    var moreText = document.getElementById("more");

    var btnText = document.getElementById("myBtn");

    if (moreText.style.display === "none") {
        btnText.innerHTML = "Show Less";
        moreText.style.display = "inline-block";
        if (x.matches) { // If media query matches
            know.style.width = "90%";
        }

    } else {
        btnText.innerHTML = "Show More";
        moreText.style.display = "none";
        know.style.width = "fit-content";
    }
}




// HOW TO PLAY BTN
modalBtn.addEventListener('click', showInstructions); // listen for open click of how to play instructions modal
closeBtn.addEventListener('click', closeInstructions); // listen for close instructions button

function showInstructions() {
    instructions.style.display = "block";
}

function closeInstructions() {
    instructions.style.display = "none";
}



// FLIP CARD FUNCTION
function flipCard() {
    if (lockBoard) return;

    if (this === firstCard) return;

    this.classList.remove('color-hidden');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;

    }
    moveCounter();
    matchingCards();
}




//MATCHING CARDS
function matchingCards() {

    if (firstCard.dataset.img === secondCard.dataset.img) {

        matchCounter += 1;
        disableCards();
        if (matchCounter == (cards.length / 2)) {
            clearInterval(interval);
            finalTime = timer.innerHTML;
            //show congratulations modal
            modal.classList.add("show");
            //showing move, rating, time on modal
            document.getElementById("finalMove").innerHTML = moves;
            document.getElementById("totalTime").innerHTML = finalTime;
            //closeicon on modal
            closeModal();
        }

    } else {
        unflipCards();
    }

}


// CONGRATULATIONS

function closeModal() {
    closeicon.addEventListener("click", function() {
        modal.classList.remove("show");
        startGame();
        matchCounter = 0;
    });
}

//for player to play Again 
function playAgain() {
    modal.classList.remove("show");
    startGame();
    matchCounter = 0;
}


// DISABLE CARDS
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// UNFLIP CARDS
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.add('color-hidden');
        secondCard.classList.add('color-hidden');
        resetBoard();
    }, 1500);
}

//RESET BOARD
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];


}

// FUNCTION SHUFFLE
function shuffleAnimals() {

    for (let animal of animals) {
        const cardAIndex = parseInt(Math.random() * randomNum.length);
        const cardA = randomNum[cardAIndex];
        randomNum.splice(cardAIndex, 1);

        if (cardA.getAttribute('data-img')?.length > 0)
            cardA.classList.remove(cardA.getAttribute('data-img'));
        cardA.classList.add(animal);
        cardA.setAttribute('data-img', animal);

        const cardBIndex = parseInt(Math.random() * randomNum.length);
        const cardB = randomNum[cardBIndex];
        randomNum.splice(cardBIndex, 1);

        if (cardB.getAttribute('data-img')?.length > 0)
            cardB.classList.remove(cardB.getAttribute('data-img'));
        cardB.classList.add(animal);

        cardB.setAttribute('data-img', animal);


    }
}



// MOVES COUNT

function moveCounter() {
    moves++;
    counter.innerHTML = moves;

    if (moves === 1) {
        second = 0;
        minute = 0;
        startTimer();

    }
}

// TIMER
var second = 0,
    minute = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            minute = 0;
        }
    }, 1000);
}



// START GAME

function startGame() {


    randomNum = [...document.querySelectorAll('.random')];

    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.add('color-hidden');

        cards[i].removeEventListener('click', flipCard);
        cards[i].addEventListener('click', flipCard);

    }
    firstCard = null;

    // reset moves
    moves = 0;
    counter.innerHTML = moves;

    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);

    shuffleAnimals();
    resetBoard();
}