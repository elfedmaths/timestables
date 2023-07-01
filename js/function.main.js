let active = false,
    timed = false,
    score = 0,      
    targetScore = 0,
    targetTime = 0,
    lastInt = 0,
    timesTables = [],
    answer;

var timer = document.querySelector('#timer'),
    numberBtns = document.querySelectorAll('.number-btn'),
    numberValue = document.querySelector('#number'),
    menuContainer = document.querySelector('#menu'),
    displayContainer = document.querySelector('#display'),
    submitOpt = document.querySelector('#submit-option');
    resetOpt = document.querySelector('#submit-reset');
    scoreContainer = document.querySelector('#score');

submitOpt.addEventListener('click', function(){
    setTimetable();
    var timedOpt = document.querySelector('input[name="timed"]:checked')
    if(timedOpt.value == 'yes'){
        timedGame();
    }else{
        scoredGame();
    }
    active = true;
    menuContainer.classList.add('hide');
});

resetOpt.addEventListener('click', function(){
    resetGame();
});

document.addEventListener('keydown', (event) => {
    if(active){
        var key = event.key;
        if(/(^[0-9]$)/.test(key)){
            appendNumber(key);
        }else if(key == 'Backspace'){
            deleteNumber();
        }else if(key == 'Enter'){
            enterNumber();
        }
        var buttonClicked = document.querySelector('[data-value="' + key.substring(0,1) + '"]');
        if(buttonClicked){
            buttonClicked.classList.add('clicked');
            setTimeout(function(){
                buttonClicked.classList.remove('clicked');
            }, 200);
        }
    }
}, false);

numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener('click', function(){
        if(active){
            numberBtn.classList.add('clicked');
            setTimeout(function(){
                numberBtn.classList.remove('clicked');
            }, 200);
            var value = numberBtn.getAttribute('data-value');
            switch (value) {
                case 'E':
                    enterNumber();
                    break;
                case 'B':
                    deleteNumber();
                    break;
                default:
                    appendNumber(value);
                    break;
            }
        }
    });
});
            
function appendNumber(digit){
    var current = numberValue.getElementsByClassName('textFitted')[0].innerHTML;
    current = current + digit;
    number.innerHTML = current;
    textFit(numberValue);
    if(checkAnswer(parseInt(current))){
        setTimeout(function(){
            newQuestion();
        }, 300);
    }
}

function timedGame(){
    var timerOpt = document.querySelector('input[name="timer"]:checked')
    targetTime = timerOpt.value;
    startTimer(targetTime);
    newQuestion();
};

function scoredGame(){
    var countOpt = document.querySelector('input[name="count"]:checked')
    targetScore = countOpt.value;
    startStopwatch();
    newQuestion();
};
            
function deleteNumber(){
    var current = numberValue.getElementsByClassName('textFitted')[0].innerHTML;
    if(current.length > 0){
        number.innerHTML = current.slice(0, -1);
    }
    textFit(numberValue);
}

function enterNumber(){
    var current = numberValue.getElementsByClassName('textFitted')[0].innerHTML;
    if(checkAnswer(parseInt(current))){
        newQuestion();
    }else{
        numberValue.getElementsByClassName('textFitted')[0].innerHTML = "";
    }
}

function newQuestion(){
    var answerInt1 = document.querySelector('#int-1'),
        answerInt2 = document.querySelector('#int-2'),
        multiple = chooseMultiple(),
        data = createQuestion(multiple);
    answerInt1.innerHTML = data[0];
    answerInt2.innerHTML = data[1];
    numberValue.getElementsByClassName('textFitted')[0].innerHTML = "";
    textFit(document.getElementById('question'));
}

function setTimetable(){
    var tableOpts = document.querySelectorAll('input[name="times"]:checked');
    tableOpts.forEach(tableOpt => timesTables.push(tableOpt.value))
}

function chooseMultiple(){
    if(timesTables){
        var int = randomInt(0, timesTables.length - 1);
        return timesTables[int];
    }else{
        return false;
    }
}

function createQuestion(multiple){
    if(!multiple){
        var multiple = randomInt(1,12);
    }
    var integer = randomIntExcl(1,12, lastInt);
    lastInt = integer;
    answer = multiple * integer;
    if(Math.random() < 0.5){
       return [multiple, integer];
    }else{
        return [integer, multiple];
    }
}

function checkAnswer(checkAnswer){
    if(answer == checkAnswer){
        score++;
        scoreContainer.innerHTML = score;
        if(timed == false && score == targetScore){
            stopTimer();
            stopGame();
            return false;
        }
        return true;
    }
    return false;
}

function stopGame(){
    var answerInt1 = document.querySelector('#int-1'),
        answerInt2 = document.querySelector('#int-2'),
        resultText = document.querySelector('#quest-text'),
        resultScore = document.querySelector('#quest-count'),
        resultTime = document.querySelector('#quest-time'),
        resultTimes = document.querySelector('#quest-times');
    active = false;
    answerInt1.innerHTML = "";
    answerInt2.innerHTML = "";
    numberValue.getElementsByClassName('textFitted')[0].innerHTML = "";
    resultScore.innerHTML = score;
    resultText.innerHTML = generateStr(score);
    if(targetTime == 0){
        var time = timer.innerHTML;
        var mins = time.substring(0, time.indexOf(":"));
        var secs = time.substring(time.indexOf(":") + 1);
        if(secs == 0){
            resultTime.innerHTML = mins + " minutes.";
        }else if(mins == 0){
            resultTime.innerHTML = secs + " seconds.";
        }else{
            resultTime.innerHTML = mins + " minutes and " + secs + " seconds.";
        }
    }else{
        if(targetTime > 60){
            resultTime.innerHTML = Math.floor(targetTime/60) + " minutes.";
        }else{
            resultTime.innerHTML = targetTime + " seconds.";
        }
    }
    if(timesTables.length > 0){
        resultTimes.innerHTML = `your ${arrToStr(timesTables)} timestables.`;
    }else{
        resultTimes.innerHTML = "a mix of timestables.";
    }
    displayContainer.classList.remove('hide');
}

function resetGame(){
    menuContainer.classList.remove('hide');
    displayContainer.classList.add('hide');
    active = false,
    timed = false,
    score = 0,      
    targetScore = 0,
    targetTime = 0,
    timesTables = [],
    answer;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + Math.ceil(min);
}

function randomIntExcl(min, max, excl) {
    if (!Array.isArray(excl)) {
      excl = [excl];
    }
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    } while (excl.includes(randomNumber));
    return randomNumber;
}

function arrToStr(array) {
    if (array.length === 0) { return ""; }
    if (array.length === 1) { return array[0].toString(); }
    if (array.length === 2) { return array.join(" and "); }
    const lastTwoValues = array.slice(-2);
    const otherValues = array.slice(0, -2);
    const formattedString = otherValues.join(", ") + ", " + lastTwoValues.join(" and ");
    return formattedString;
}

function generateStr(score) {
    if (score == 0) {
        return "This is awkward. Let's try again.";
    } else if (score < 5) {
        return "Good start!";
    } else if (score >= 5 && score < 10) {
        return "Well done!";
    } else if (score >= 10 && score < 25) {
        return "Great job!";
    } else if (score >= 25 && score < 50) {
        return "Impressive!";
    } else if (score >= 50 && score < 75) {
        return "Fantastic!";
    } else if (score >= 75 && score < 100) {
        return "Bravo!";
    } else if (score >= 100 && score < 125) {
        return "Exceptional!";
    } else if (score >= 125 && score < 150) {
        return "Outstanding!";
    } else if (score >= 150 && score < 175) {
        return "Superb!";
    } else {
        return "Amazing!";
    }
  }
  