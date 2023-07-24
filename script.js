

var timerEl = document.querySelector(".timer");

var secondsLeft = 30;


//function keeps track of time left in the quiz.
function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft + " seconds left!";
        
        if (secondsLeft == 0) {
            clearInterval(timerInterval);
        }
    
    //the second number here is the delay legnth between calling this code again
    }, 1000)

}