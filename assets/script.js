// Table of Contents
// S1. Page Elements and Variables
//  S1-a. Page Elements
//  S1-b. Global Variables
//  S1-c. Quiz Questions Array
// S2. Functions
//  S2-a. Utility
//  S2-b. Non-Quiz Sections
//  S2-c. Quiz Functions
// S3. Event Listeners
// S4. Main Logic

// S1. Page Elements and Variables
// S1-a. Page Elements
var mainTextEl = document.querySelector("#main-text");
var mainContentEl = document.querySelector("#main-content");
var timeNumberEl = document.querySelector("#timer-number");
var highScoresEl = document.querySelector("#high-scores");

// S1-b. Global Variables
var timeLeft = 75;
var tempScore = 0;
var scores = [];
var correctAnswer = "";
var questionNumber = 0;
var i = 0; // iterator for main quiz logic

// S1-c. Quiz Questions Array
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
var questionsLeft = questions.length;

// S2. Functions
// S2-a. Utility
var clearScreen = function() {
    mainTextEl.textContent = "";
    mainContentEl.textContent = "";
    timeNumberEl.textContent = "0";
    questionsLeft = questions.length;
}

// S2-b. Non-Quiz Sections
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

var endScreen = function() {
    tempScore = timeLeft;
    clearScreen();
    mainTextEl.textContent = "Your score: " + tempScore;
}

// S2-c. Quiz Functions
var runQuiz = function() {
    clearScreen();
    timer(); 
    quizLoop();
}

var quizLoop = function() {
    // End the game if no more time or questions left
    if (timeLeft <= 0) {
        mainTextEl.textContent = "Out of time!";
        endScreen();
        return;
    } 
    if (i === questions.length) {
        endScreen();
        return;
    }

    // Display the question's text and answers
    mainTextEl.textContent = questions[i].text;
    mainContentEl.innerHTML = "<ul class='answers' id='answers'><ul>";

    // Add answer buttons
    for (var j = 0; j < questions[i].answers.length; j++) {
        var answerButton = document.createElement("button");
        answerButton.textContent = questions[i].answers[j];
        answerButton.setAttribute("class", "answer-button");
        answerButton.setAttribute("id", j);

        // Set which button is the correct answer
        if (questions[i].correct === j) {
            answerButton.setAttribute("class", "correct-button");
        } else {
            answerButton.setAttribute("class", "wrong-button");
        }

        // Append to the <ul>
        var answersList = document.querySelector("#answers");
        answersList.appendChild(answerButton);

        // Add event listener 
        answerButton.addEventListener("click", answerHandler);
    }
}

var timer = function() {
    timeNumberEl.textContent = timeLeft;
    timeLeft = timeLeft - 1; // kludge to account for the first interval ticking before timeLeft is updated
    var countdown = function() {
        if (timeLeft > 0 && i < questions.length) {
            timeNumberEl.textContent = timeLeft;
            timeLeft--;
        } else {
            timeNumberEl.textContent = 0;
            clearInterval(timerInterval);
        }
    }
    var timerInterval = setInterval(countdown, 1000);
}

var answerHandler = function(event) {
    console.log(event.target);
    if (event.target.matches(".correct-button")) {
        correctAnswer = "Correct!"
    } else {
        correctAnswer = "Wrong!"
        timeLeft -= 10;
    }
    i++;
    quizLoop();
}

// S3. Event Listeners
highScoresEl.addEventListener("click", showHighScores);

// S4. Main Logic
startScreen();