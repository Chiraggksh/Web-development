let gameseq = [];
let userseq = [];

let started = "false";
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let colors = ["red", "yellow", "green", "purple"];

let highestScore = document.createElement("h3");
document.querySelector("body").appendChild(highestScore);
updateHighScore(); 

document.addEventListener("keypress", function () {
    if (started === "false") {
        console.log("game started");
        started = "true";
        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomidx = Math.floor(Math.random() * 4);
    let randomcolor = colors[randomidx];
    let btn = document.querySelector(`.${randomcolor}`);
    gameseq.push(randomcolor);
    console.log(gameseq);

    gameflash(btn);
}

let allbtns = document.querySelectorAll(".box");

function checkans(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (gameseq.length === userseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score is <b>${level}</b> <br> Press any key to restart :-(`;
        h2.style.color = "red";
        if (level > highScore) {
            highScore = level;
            updateHighScore(); 
        }
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnpress() {
    let btn = this;
    let userid = btn.getAttribute("id");

    userseq.push(userid);
    userflash(btn);

    checkans(userseq.length - 1);
}

for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 300);
}

function reset() {
    level = 0;
    gameseq = [];
    userseq = [];
    started = "false";
}

function updateHighScore() {
    highestScore.innerHTML = `Your highest score is: ${highScore}`;
}
