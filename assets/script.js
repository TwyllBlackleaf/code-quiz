// Table of Contents
// S1. Page Elements and Variables
//  S1-a. Page Elements
//  S1-b. Quiz Questions Array
// S2. Functions
// S3. Event Listeners
// S4. Main Logic

// S1. Page Elements and Variables
// S1-a. Page Elements
var mainTextEl = document.querySelector("#main-text");
var mainContentEl = document.querySelector("#main-content");
var timeNumberEl = document.querySelector("#timer-number");
var highScoresEl = document.querySelector("#high-scores");

// S1-b. Quiz Questions Array
var questions = [
    {
        text: "Foo",
        answers: ["wrong", "wrong", "right", "wrong"],
        correct: 2
    },
    {
        text: "Bar",
        answers: ["right", "wrong", "wrong", "wrong"],
        correct: 0
    },
    {
        text: "Baz",
        answers: ["wrong", "wrong", "wrong", "right"],
        correct: 3
    }
];

// S2. Functions
var clearScreen = function() {
    mainTextEl.textContent = "";
    mainContentEl.textContent = "";
    timeNumberEl.textContent = "0";
}

var startScreen = function() {
    mainTextEl.textContent = "Coding Quiz Challenge";
    mainContentEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    timeNumberEl.textContent = "0";

    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start Quiz";
    mainContentEl.appendChild(startButtonEl);
    startButtonEl.addEventListener("click", runQuiz);
}

var showHighScores = function() {
    console.log("High Scores link clicked");
    clearScreen();
}

var runQuiz = function() {
    console.log("Quiz start");
    clearScreen();

    // Timer
    var timeLeft = 75;
    timeNumberEl.textContent = timeLeft;
    var countdown = function() {
        if (timeLeft > 0) {
            timeNumberEl.textContent = timeLeft;
            timeLeft--;
        } else {
            timeNumberEl.textContent = 0;
            clearInterval(timer);
        }
    }
    var timer = setInterval(countdown, 1000);

    var questionsLeft = questions.length;
}




// S3. Event Listeners
highScoresEl.addEventListener("click", showHighScores);

// S4. Main Logic
startScreen();