var timerEl = document.querySelector(".timer");
var scoreEl = document.querySelector(".scoreKeeper");
//timerEl.style.color = "chartreuse";
var questionEl = document.getElementById("questionBody");
var startButton = document.getElementById("startButton");
var restartButton = document.getElementById("restartButton");
var alertEl = document.getElementById("notification");



var headerRestart = document.getElementById("headerRestart");
var headerViewHighScores = document.getElementById("headerViewHighScores");
var headerResetHighScores = document.getElementById("headerResetHighScores");

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
        timer.stop;
    }
}, 1000);
timer.stop();


class highScoreObject {
    constructor (name, score) {
        this.name = name;
        this.score = score;
    }
}

//Array for keeping track of high scores
var leaderboard = [];

//exampleLeaderboard = new highScoreObject("default", 0);
//leaderboard.push(exampleLeaderboard);


startButton.addEventListener("click",function buttonPress() {
    questionNum++;
    printQuestion(questionNum);
    
})

restartButton.addEventListener("click", function buttonPress() {
    resetQuiz();
    timer.stop();
});

submitScoreButton.addEventListener("click", function buttonPress(){
    finalScore = createFinalScore();
    saveHighScore(finalScore);
    clearAllCards();
    leaderboardCard.style.display = "block";
    itemizedLeaderboard.innerHTML = printScorestoLeaderboard();
});


headerRestart.addEventListener("click",function buttonPress(){
    resetQuiz();
});

headerViewHighScores.addEventListener("click", function buttonPress() {
    viewHighScores();
})

headerResetHighScores.addEventListener("click", function buttonPress() {
    clearHighScores();
})


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
    if (document.getElementById("Object-Oriented").checked) {
        quizScore += 10;
        alertEl.innerHTML = "Correct!";
        showAlert();
    }
    
    else {
        secondsLeft-=10;
        alertEl.innerHTML = "Incorrect.";
        showAlert();
    }
}

function checkQuestion2 () {
    if (document.getElementById("BothAandBQ2").checked) {
        quizScore += 10;
        alertEl.innerHTML = "Correct!";
        showAlert();
    }
        
    
    else {
        secondsLeft-=10;
        alertEl.innerHTML = "Incorrect.";
        showAlert();
        }
}

function checkQuestion3 () {
    if (document.getElementById("BothAandBQ3").checked) {
        alertEl.innerHTML = "Correct!";
        showAlert();
        quizScore += 10;
    }
    
    else {
        secondsLeft-=10;
        alertEl.innerHTML = "Incorrect.";
        showAlert();
        }
}

function timeCheck () {
    //console.log("Time is checked)");
    //console.log(secondsLeft);

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
    timer.stop();

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
    name = name.toUpperCase();
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
        printArr();
    }

    else {
        leaderboard.pop();
        leaderboard.push(currentScore);
        //sort array from highest to lowest function
        console.log("Since score is higher than lowerst high score, it will be added");
        leaderboard.sort((a, b) => b.score - a.score);
        printArr();
    }

}

function checkHighScore (currentScore) {

    i = leaderboard.length;

    //console.log ("checkHighScore received score " + currentScore);
    //console.log ("The current lowest high score is" + leaderboard[i-1].score);

    if (leaderboard.length == 0) {
        return true;
    }

    else if (currentScore>=leaderboard[i-1].score) { //if the current score is greater than the last element of the array
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
    welcomeCard.style.display = "none";
    
    questionEl.textContent = "";
    question1.style.display = "none";
    question2.style.display = "none";
    question3.style.display = "none";
    
    congratulationsCard.style.display="none";
    leaderboardCard.style.display = "none";
}

function printScorestoLeaderboard () {
    var scoreString;
    console.log ("Entered print leaderboard function");
    var j;
    //this needs to be fixed;
    for (j=0; j<leaderboard.length; j++) {
        
        if(j==0) {
            scoreString = (j+1) + ". " + leaderboard[j].name + ".......... " + leaderboard[j].score + " points" + "<br>"; 
            //console.log (scoreString);
        }
        
        else {
        //console.log ("loop is on round" + j);
        scoreString = scoreString+ (j+1) + ". " + leaderboard[j].name + ".......... " + leaderboard[j].score + " points"+ "<br>";
        
        }
        console.log (scoreString);
    }

    return scoreString;

}

function viewHighScores () {
    clearAllCards();

    
    startButton.style.display = "none";
    scoreEl.style.display = "none";
    timerEl.style.display = "none";

    timer.stop();



    leaderboardCard.style.display="block";
    if (leaderboard.length==0) {
        itemizedLeaderboard.innerHTML = "No scores have been saved yet. Return here after attempting the quiz to view top 5 scores!"
    }

    else {
        itemizedLeaderboard.innerHTML = printScorestoLeaderboard();
    }

}

function clearHighScores () {
    leaderboard.length = 0;
    viewHighScores();
    alertEl.innerHTML = "High Scores have been cleared."
    showAlert();
}

function showAlert() {
    setTimeout(function(){
        alertEl.innerHTML = " ";
    },2000)
}