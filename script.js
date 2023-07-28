var timerEl = document.querySelector(".timer");
//timerEl.style.color = "chartreuse";
var questionEl = document.getElementById("questionBody");
var startButton = document.getElementById("startButton");



//questions being passed in from the HTML
var question1 = document.getElementById("question1");
question1.style.display = "none";

var question2 = document.getElementById("question2");
question2.style.display = "none";

var question3 = document.getElementById("question3");
question3.style.display = "none";


//variables to keep track of quiz progress
var secondsLeft = 30;
var questionNum = 0;
var quizScore = 0;

startButton.addEventListener("click",function buttonPress() {
    questionNum++;
    printQuestion(questionNum);
})

//function keeps track of time left in the quiz.
function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        timeCheck();
        
        if (secondsLeft == 0) {
            clearInterval(timerInterval);
        }
    
    //the second number here is the delay length between calling this code again
    }, 1000)

}

function printQuestion (i) {
    questionEl.textContent = "Question 1";

    switch (i) {
        case 1:
            setTime();
            questionEl.textContent = "Question 1";
            question1.style.display = "block"; 
            startButton.textContent = "Next question";

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
            questionEl.textContent = "Your final score is " + (quizScore+secondsLeft);
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
    if (secondsLeft == 0) {
        timerEl.style.display="none";
        
        questionEl.textContent = "Your final score is " + (quizScore+secondsLeft);
        question1.style.display = "none";
        question1.style.display = "none";
        question3.style.display = "none";
        startButton.style.display="none";
    }

}