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
var correctDisplayEl = document.querySelector("#correct-answer-display");

// S1-b. Global Variables
var timeLeft = 75;
var tempScore = 0;
var scores = [];
var scoreObj = {
    initials: "",
    score: 0
};
var correctAnswer = "";
var i = 0; // iterator for main quiz logic
var timerInterval;

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

// S2. Functions
// S2-a. Utility
var clearScreen = function() {
    mainTextEl.textContent = "";
    mainContentEl.textContent = "";
    timeNumberEl.textContent = "0";
    i = 0;
    correctAnswer = "";
    clearInterval(timerInterval);
    timeLeft = 75;
}

var saveScores = function() {
    localStorage.setItem("highScores", JSON.stringify(scores));
}

var getScores = function() {
    scores = localStorage.getItem("highScores");
    scores = JSON.parse(scores);
}

var sortScores = function() {

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
    mainTextEl.textContent = "High Scores";
    var scoresList = document.createElement("ol");
    scoresList.setAttribute("id", "high-scores");
    mainContentEl.appendChild(scoresList);

    getScores();
    for (var i = 0; i < scores.length; i++) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent = scores[i].initials + ": " + scores[i].score;
        scoresList.appendChild(scoreItem);
    }
    
    
}

var endScreen = function() {
    tempScore = timeLeft;
    clearScreen();
    mainTextEl.textContent = "All done!";
    mainContentEl.innerHTML = "<form class='end-form' id='end-form'><p>Your final score is " + tempScore + ".</p>Enter initials: " +  
        "<input type='text' name='initials' class='initials' placeholder='ABC' />" + 
        "<button class='score-button' id='submit-score' type='submit'>Submit</button></form>";
    var submitFormEl = document.querySelector("#end-form");
    submitFormEl.addEventListener("submit", saveScore);
}

var saveScore = function(event) {
    event.preventDefault();
    scoreObj.initials = document.querySelector("input[name='initials']").value;
    if (!scoreObj.initials) {
        alert("Please enter initials.");
    } else if (scoreObj.initials.length > 7) {
        alert("Keep it shorter!");
    } else {
        scoreObj.score = tempScore;

        getScores();
        if (!scores) {
            scores = [];
        }
        scores.push(scoreObj);
        saveScores();

        console.log(scoreObj);
        console.log(scores);
        startScreen();
    }
}

// S2-c. Quiz Functions
var runQuiz = function() {
    clearScreen();
    tempScore = 0;
    timer(); 
    quizLoop();
}

var quizLoop = function() {
    // End the game if no more time or questions left
    if (timeLeft <= 0) {
        endScreen();
        return;
    } 
    if (i === questions.length) {
        endScreen();
        return;
    }

    // Display the question's text
    mainTextEl.textContent = questions[i].text;
    mainContentEl.innerHTML = "<ul class='answers' id='answers'></ul>";

    // Add answer buttons
    for (var j = 0; j < questions[i].answers.length; j++) {
        var answerButton = document.createElement("button");
        answerButton.textContent = questions[i].answers[j];
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
    timerInterval = setInterval(countdown, 1000);
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
    displayCorrect();
    quizLoop();
}

var displayCorrect = function() {
    // Briefly display if the previous answer was correct or not
    correctDisplayEl.innerHTML = "<h2 class='correct-display'>" + correctAnswer + "</h2>";
    var clearDisplay = function() {
        correctDisplayEl.textContent = "";
    }
    setTimeout(clearDisplay, 1000);
}

// S3. Event Listeners
highScoresEl.addEventListener("click", showHighScores);

// S4. Main Logic
startScreen();