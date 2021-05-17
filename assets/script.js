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
var timeDisplayEl = document.querySelector("#timer-display");
var timeNumberEl = document.querySelector("#timer-number");
var highScoresEl = document.querySelector("#high-scores");
var highScoresTextEl = document.querySelector("#high-scores-text");
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
        text: "If a variable is declared within a function, what kind of variable is it?",
        answers: ["A global variable", "A local variable", "A constant variable", "A magic number"],
        correct: 1
    },
    {
        text: "Which of these methods cancels an interval?",
        answers: ["stopInterval()", "breakInterval()", "clearInterval()", "endInterval()"],
        correct: 2
    },
    {
        text: "Which of these values is not falsy?",
        answers: ["\"\"", "0", "null", "\"false\""],
        correct: 3
    },
    {
        text: "Which of these expressions correctly initiates a for loop, assuming 'foo' is a valid integer?",
        answers: ["for (var i === 0; i < foo; i++)", "for (var i = 0; i < foo; i++)", "for (var i = 0; i < foo; i++);", "for (var i = 0, i < foo, i++)", "for (var i = 0 | i < foo | i++)"],
        correct: 1
    },
    {
        text: "Which of these is NOT a default HTML attribute?",
        answers: ["background-color", "width", "style", "rel"],
        correct: 0
    }
];

// S2. Functions
// S2-a. Utility
var clearScreen = function() {
    highScoresTextEl.style.display = "block";
    mainTextEl.textContent = "";
    mainContentEl.textContent = "";
    timeDisplayEl.style.display = "block";
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
    function compare(a, b) {
        var scoreA = a.score;
        var scoreB = b.score;
        var comparison = 0;
        if (scoreA > scoreB) {
            comparison = -1;
        } else if (scoreB > scoreA) {
            comparison = 1;
        }
        return comparison;
    }
    scores.sort(compare);

}

var clearScores = function() {
    localStorage.clear();
    if (!scores) {
        scores = [];
    }
    showHighScores();
}

// S2-b. Non-Quiz Sections
var startScreen = function() {
    clearScreen();

    mainTextEl.setAttribute("class", "start-screen-main-text");
    mainContentEl.setAttribute("class", "start-screen-main-content");

    mainTextEl.textContent = "Coding Quiz Challenge";
    mainContentEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    timeNumberEl.textContent = "0";

    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start Quiz";
    mainContentEl.appendChild(startButtonEl);
    startButtonEl.addEventListener("click", runQuiz);
}

var showHighScores = function() {
    clearScreen();

    mainTextEl.setAttribute("class", "high-scores-main-text");
    mainContentEl.setAttribute("class", "high-scores-main-content");

    timeDisplayEl.style.display = "none";
    highScoresTextEl.style.display = "none";

    mainTextEl.textContent = "High Scores";
    var scoresList = document.createElement("ol");
    scoresList.setAttribute("id", "high-scores-list");
    mainContentEl.appendChild(scoresList);

    getScores();
    if (scores) {
        sortScores();

        for (var j = 0; j < scores.length; j++) {
            var scoreItem = document.createElement("li");
            scoreItem.textContent = scores[j].initials + ": " + scores[j].score;
            scoresList.appendChild(scoreItem);
        }  
    }
    
    var highScoresButtons = document.createElement("div");
    highScoresButtons.setAttribute("id", "high-scores-buttons");
    mainContentEl.appendChild(highScoresButtons);

    var backButtonEl = document.createElement("button");
    backButtonEl.textContent = "Go back";
    highScoresButtons.appendChild(backButtonEl);
    backButtonEl.addEventListener("click", startScreen);

    var clearButtonEl = document.createElement("button");
    clearButtonEl.textContent = "Clear high scores";
    highScoresButtons.appendChild(clearButtonEl);
    clearButtonEl.addEventListener("click", clearScores);

}

var endScreen = function() {
    tempScore = timeLeft;
    clearScreen();

    mainTextEl.setAttribute("class", "end-screen-main-text");
    mainContentEl.setAttribute("class", "end-screen-main-content");
    mainTextEl.textContent = "All done!";
    mainContentEl.innerHTML = "<p>Your final score is " + tempScore + ".</p><form class='end-form' id='end-form'><p>Enter initials: </p>" +  
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
        sortScores();
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

    // Set the classes of the content divs for styling
    mainTextEl.setAttribute("class", "quiz-loop-main-text");
    mainContentEl.setAttribute("class", "quiz-loop-main-content");

    // Display the question's text
    mainTextEl.textContent = questions[i].text;
    mainContentEl.innerHTML = "<ul class='answers-list' id='answers-list'></ul>";

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
        var answersList = document.querySelector("#answers-list");
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