var timerEl = document.querySelector(".timer");
//timerEl.style.color = "chartreuse";
var questionEl = document.getElementById("questionBody");
var startButton = document.getElementById("startButton");

var secondsLeft = 30;
var questionNum = 0;

startButton.addEventListener("click",function buttonPress() {
    questionNum++;
    printQuestion(questionNum);
})

//function keeps track of time left in the quiz.
function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft + " seconds left!";
        
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
            questionEl.textContent = "Question 1";
            startButton.textContent = "Next question";
            break;

        case 2:
            questionEl.textContent = "Question 2";
            break;

        case 3: 
            questionEl.textContent = "Question 3";
            break;
        
        default:
            console.log (i);
            questionEl.textContent = "Something went wrong, please try again."
            break;

    }
}


// function question1 {

// }

// function question 2 {

// }