let die1Img = document.getElementById("die1");
let die2Img = document.getElementById("die2");
let cpuDie1Img = document.getElementById("cpuDie1");
let cpuDie2Img = document.getElementById("cpuDie2");

let userScoreDisplay = document.getElementById("userScore");
let cpuScoreDisplay = document.getElementById("cpuScore");
let userRoundScoreDisplay = document.getElementById("userRound");
let cpuRoundScoreDisplay = document.getElementById("cpuRound");
let Result = document.getElementById("Result")
const rollBtn = document.getElementById("roll");
const newGame = document.getElementById("newGame");

let die1;
let die2;
let cpuDie1;
let cpuDie2;

let userScore;
let cpuScore;
let userRoundScore;
let cpuRoundScore;

let round;

class Die {
    constructor() {
        this.number = 0; // default 0
    }
    
    roll_die() {
        this.number = Math.floor(Math.random() * 6 + 1);
    }
}

function new_game() {
    die1Img.style.visibility = "hidden";
    die2Img.style.visibility = "hidden";
    cpuDie1Img.style.visibility = "hidden";
    cpuDie2Img.style.visibility = "hidden";

    // initialize die
    die1 = new Die();
    die2  = new Die();
    cpuDie1  = new Die();
    cpuDie2  = new Die();

    round = 1;

    userScore = 0;
    cpuScore = 0;
    userRoundScore = 0;
    cpuRoundScore = 0;
    display_score();

    rollBtn.disabled = false;

    Result.innerHTML = "";
}

function display_score() {
    userScoreDisplay.innerHTML  = `User Score: ${userScore}`;
    cpuScoreDisplay.innerHTML  = `CPU Score: ${cpuScore}`;
    userRoundScoreDisplay.innerHTML  = `Round Score: ${userRoundScore}`;
    cpuRoundScoreDisplay.innerHTML  = `Round Score: ${cpuRoundScore}`;
}

function roll_dice() {
    die1.roll_die();
    die2.roll_die();
    cpuDie1.roll_die();
    cpuDie2.roll_die();
}

function show_dice() {
    die1Img.style.visibility = "visible";
    die2Img.style.visibility = "visible";
    cpuDie1Img.style.visibility = "visible";
    cpuDie2Img.style.visibility = "visible";
}

function end_game() {
    if (userScore > cpuScore) {
        endGameMessage = "You Win!";
        Result.style.color = "green";
    } else if (userScore === cpuScore) {
        endGameMessage = "Tie Game."
        Result.style.color = "grey";
    } else {
        endGameMessage = "You Lose.";
        Result.style.color = "red";
    }
    rollBtn.disabled = true;
    
    $("#Result").hide()
    Result.innerHTML = endGameMessage;
    $("#Result").fadeIn();   
}

function calc_score(roll1, roll2) {
    if (roll1 === 1 || roll2 === 1) {
        return 0;
    } else if(roll1 === roll2) {
        return (roll1 + roll2) * 2;
    } else {
        return roll1 + roll2;
    }
}


// Button handlers
rollBtn.addEventListener("click", function () {
    roll_dice();
    userRoundScore = calc_score(die1.number, die2.number);
    cpuRoundScore = calc_score(cpuDie1.number, cpuDie2.number);
    userScore += userRoundScore;
    cpuScore += cpuRoundScore;
    die1Img.src = `images/${die1.number}-dice.png`
    die2Img.src = `images/${die2.number}-dice.png`
    cpuDie1Img.src = `images/${cpuDie1.number}-dice.png`
    cpuDie2Img.src = `images/${cpuDie2.number}-dice.png`
    
    show_dice();
    display_score();
    
    round++;
    if (round > 3) {
        end_game();
    }
});

newGame.addEventListener("click", new_game);

//Start
new_game()

