// Table of Contents
// S1. Page Elements
// S2. Functions
// S3. Event Listeners
// S4. Main Logic

// S1. Page Elements
var mainTextEl = document.querySelector("#main-text");
var mainContentEl = document.querySelector("#main-content");
var timeNumberEl = document.querySelector("#timer-number");
var highScoresEl = document.querySelector("#high-scores");

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
    startButtonEl.addEventListener("click", quizHandler);
}

var highScoresHandler = function() {
    console.log("High Scores link clicked");
    clearScreen();
}

var quizHandler = function() {
    console.log("Quiz start");
    clearScreen();
}

var timerHandler = function() {
    
}

// S3. Event Listeners
highScoresEl.addEventListener("click", highScoresHandler);

// S4. Main Logic
startScreen();