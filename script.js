var timerEl = document.querySelector(".timer");
var scoreEl = document.querySelector(".scoreKeeper");
//timerEl.style.color = "chartreuse";
var questionEl = document.getElementById("questionBody");
var startButton = document.getElementById("startButton");
var restartButton = document.getElementById("restartButton");
var headerRestart = document.getElementById("headerRestart");

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


//variables to keep track of quiz progress
var secondsLeft = 70;
var questionNum = 0;
var quizScore = 0;
var quizEnd = false;

startButton.addEventListener("click",function buttonPress() {
    questionNum++;
    printQuestion(questionNum);
})

restartButton.addEventListener("click", function buttonPress() {
    resetQuiz();
})


headerRestart.addEventListener("click",function buttonPress(){
    resetQuiz();
});


//function keeps track of time left in the quiz.
function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        
        timeCheck();
        
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
        }

    
    //the second number here is the delay length between calling this code again
    }, 1000)

    this.stop = function () {
        if (timerInterval) {
            timerInterval = null;
        }

        return this;
    }

    this.start = function () {
        if (!timerInterval) {
            this.stop();
            timerInterval=setInterval(function() {
                secondsLeft--;
                
                timeCheck();
                
                if (secondsLeft <= 0) {
                    clearInterval(timerInterval);
                }
        
            
            //the second number here is the delay length between calling this code again
            }, 1000)
        }
        return this;
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
            setTime();
            printScoreAndTime();
            questionEl.textContent = "Question 1";
            question1.style.display = "block"; 
            startButton.textContent = "Next question";

            restartButton.style.display = "block";
            break;

        case 2:
         
        checkQuestion1();

        console.log ("Currect score is " + quizScore);

            questionEl.textContent = "Question 2";
            question1.style.display = "none";
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

            var scoreTime = secondsLeft;
            quizEnd = true;
            questionEl.textContent = "Your final score is " + (quizScore+scoreTime);
            question3.style.display = "none";
            startButton.style.display="none";
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
        
        var scoreTime = secondsLeft;qaszx
        questionEl.textContent = "Your final score is " + (quizScore+scoreTime);
        question1.style.display = "none";
        question1.style.display = "none";
        question3.style.display = "none";
        startButton.style.display="none";
    }

}


function resetQuiz () {
    quizScore=0;
    questionNum=0;
    
    //timer resart function
    questionEl.textContent = "";
    question1.style.display = "none";
    question2.style.display = "none";
    question3.style.display = "none";
    welcomeCard.style.display = "block";
    welcomeCard.style.textAlign = "center";

    timerEl.style.display="none";
    scoreEl.style.display="none";
    startButton.style.display = "block";

    restartButton.style.display = "none";

    startButton.textContent = "Begin Quiz";
}