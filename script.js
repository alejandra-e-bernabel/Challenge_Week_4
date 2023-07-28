var timerEl = document.querySelector(".timer");
var scoreEl = document.querySelector(".scoreKeeper");
//timerEl.style.color = "chartreuse";
var questionEl = document.getElementById("questionBody");
var startButton = document.getElementById("startButton");
var restartButton = document.getElementById("restartButton");
var headerRestart = document.getElementById("headerRestart");
var submitScoreButton = document.getElementById("submitScoreButton");
var itemizedLeaderboard = document.getElementById("itemizedLeaderboard");

//headerRestart.style.color = "white";

//makes the timer invisible before starting the quiz
timerEl.style.display = "none";
scoreEl.style.display = "none";

restartButton.style.display = "none";

//questions being passed in from the HTML
var welcomeCard = document.getElementById("instructionsAndWelcomeCard") 
welcomeCard.style.display = "none"

var question1 = document.getElementById("question1");
question1.style.display = "none";

var question2 = document.getElementById("question2");
question2.style.display = "none";

var question3 = document.getElementById("question3");
question3.style.display = "none";

var congratulationsCard = document.getElementById("highScoreCard");
congratulationsCard.style.display = "none";

var leaderboardCard = document.getElementById("leaderboardCard");
leaderboardCard.style.display = "none";


//variables to keep track of quiz progress
var secondsLeft = 70;
var questionNum = 0;
var quizScore = 0;
var totalScore = 0;
var quizEnd = false;
var timer = new setTime(function() {
    secondsLeft--;
    timeCheck();
    if (secondsLeft <= 0) {
        clearInterval(timerInterval);
    }
}, 1000);

class highScoreObject {
    constructor (name, score) {
        this.name = name;
        this.score = score;
    }
}

//Array for keeping track of high scores
var leaderboard = [];
exampleLeaderboard = new highScoreObject("default", 0);

leaderboard.push(exampleLeaderboard);


startButton.addEventListener("click",function buttonPress() {
    questionNum++;
    printQuestion(questionNum);
})

restartButton.addEventListener("click", function buttonPress() {
    resetQuiz();
});

submitScoreButton.addEventListener("click", function buttonPress(){
    finalScore = createFinalScore();
    saveHighScore(finalScore);
    clearAllCards();
    leaderboardCard.style.display = "block";
    itemizedLeaderboard.value = printScorestoLeaderboard();
});


headerRestart.addEventListener("click",function buttonPress(){
    resetQuiz();
});


//function keeps track of time left in the quiz.
function setTime(fn, t) {
    var timerInterval = setInterval(fn,t);

    this.stop = function () {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        return this;
    }

    this.start = function () {
        if (!timerInterval) {
            this.stop();
            timerInterval=setInterval(fn,t)
        }
        return this;
    }

    this.reset = function(newT = t) {
        t = newT;
        secondsLeft = 70;
        return this.stop().start();
    }

}

function printScoreAndTime () {
    setInterval(function(){
        timerEl.textContent = "Time: " + secondsLeft;
        scoreEl.textContent = "Current Score: " + quizScore;
    }, 100)
}

function printQuestion (i) {
    
    switch (i) {
        case 1:
            welcomeCard.style.display = "none";
            timerEl.style.display = "block";
            scoreEl.style.display = "block";
            
            quizEnd = false;
            

            timer.reset();
            printScoreAndTime();
            questionEl.textContent = "Question 1";
            question1.style.display = "block"; 
            startButton.textContent = "Next question";

            restartButton.style.display = "block";
            break;

        case 2:
         
        checkQuestion1();

        console.log ("Currect score is " + quizScore);

            clearAllCards();
            questionEl.textContent = "Question 2";
            question2.style.display = "block";
            break;

        case 3: 

        checkQuestion2();
        console.log ("Currect score is " + quizScore);

            questionEl.textContent = "Question 3";
            question2.style.display = "none";
            question3.style.display = "block";
            break;
        
        default:

        checkQuestion3();
        console.log ("Currect score is " + quizScore);

            console.log (i);
            timerEl.style.display="none";
            scoreEl.style.display="none";

            quizEnd = true;

            var scoreTime = secondsLeft;
            totalScore = quizScore+scoreTime;
            questionEl.textContent = "Your final score is " + (totalScore);            question3.style.display = "none";
            startButton.style.display="none";
            timer.stop();

            if (checkHighScore(totalScore)) {
                console.log ("Since checkHighScore returned true, we are going to show congratulations card");
                showCongratulationsCard();
                // finalScore = createFinalScore();
                // saveHighScore(finalScore);
            }


            break;

    }
}



function checkQuestion1 () {
    if (document.getElementById("Object-Oriented").checked)
        quizScore += 10;
    
    else {
        secondsLeft-=10;
        
    }
}

function checkQuestion2 () {
    if (document.getElementById("BothAandBQ2").checked)
        quizScore += 10;
    
    else {
        secondsLeft-=10;
        
        }
}

function checkQuestion3 () {
    if (document.getElementById("BothAandBQ3").checked)
        quizScore += 10;
    
    else {
        secondsLeft-=10;
        
        }
}

function timeCheck () {
    //console.log("Time is checked)");
    if (secondsLeft <= 0 && !quizEnd) {
        timerEl.style.display="none";
        scoreEl.style.display="none";
        
        quizEnd = true;
        var scoreTime = secondsLeft;
        totalScore = quizScore+scoreTime;
        questionEl.textContent = "Your final score is " + (totalScore);
        question1.style.display = "none";
        question1.style.display = "none";
        question3.style.display = "none";
        startButton.style.display="none";

        if (checkHighScore(totalScore)) {
            console.log ("Since checkHighScore returned true, show congratulations card");
            showCongratulationsCard();
            // finalScore = createFinalScore();
            // saveHighScore(finalScore);
        }
        
    }

}


function resetQuiz () {
    quizScore=0;
    questionNum=0;
    totalScore = 0;
    
    //timer resart function
    timer.reset();

    clearAllCards();
    welcomeCard.style.display = "block";
    welcomeCard.style.textAlign = "center";

    timerEl.style.display="none";
    scoreEl.style.display="none";
    startButton.style.display = "block";

    restartButton.style.display = "none";

    startButton.textContent = "Begin Quiz";
}


function createFinalScore() {
    
    var name = document.querySelector("#highScoreName").value;
    //console.log ("Entered createFinalScore with "+ name + "and" + totalScore);

    var highScore = new highScoreObject(name, totalScore);

    console.log ("createFinalScore created name and score: " + highScore.name + " " +highScore.score );

    return highScore;
}

function saveHighScore (currentScore) {
    if (leaderboard.length<5) {

        var nameAndScore = createFinalScore();
        leaderboard.push(nameAndScore);
        //sort array from highest to lowest function
        console.log("Array will be sorted");
        leaderboard.sort((a, b) => b.score - a.score);
    }

    else if (currentScore.score>leaderboard[4]) {
        leaderboard.pop();
        leaderboard.push(currentScore);
        //sort array from highest to lowest function
        console.log("Array will be sorted");
        scoreObjects.sort((a, b) => b.score - a.score);
    }

    else 
        console.log("Your score is too low and will not be saved to the leaderboard.");

}

function checkHighScore (currentScore) {

    i = leaderboard.length;

    console.log ("checkHighScore received score " + currentScore);
    console.log ("The current lowest high score is" + leaderboard[i-1].score);

    if (currentScore>leaderboard[i-1].score) { //if the current score is greater than the last element of the array
        console.log ("checkHighScore returned true");
        return true;
        
    }

    else {
        console.log ("The score was not high enough to record. Score=" + currentScore);
        console.log ("checkHighScore returned true");
        return false;
    }

}

function showCongratulationsCard () {
    clearAllCards();

    congratulationsCard.style.display="block";

}

function printArr () {
    leaderboard.forEach(function(entry){
        console.log(entry);
    })
}

function clearAllCards () {
    questionEl.textContent = "";
    question1.style.display = "none";
    question2.style.display = "none";
    question3.style.display = "none";
    //startButton.style.display="none";
    congratulationsCard.style.display="none";
    leaderboardCard.style.display = "none";
}

function printScorestoLeaderboard () {
    var scoreString;

    //this needs to be fixed;
    for (var j=0; j<leaderboard.length; j++) {
        
        scoreString = scoreString.concat(j+1 + ". " + leaderboard[j].name + ".......... " + leaderboard[j].score + "points\n\n");
        console.log (scoreString);
    }

    return scoreString;

}