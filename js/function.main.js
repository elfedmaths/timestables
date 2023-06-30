let active = false,
    timed = false,
    score = 0,      
    targetScore = 0,
    time = 0,
    targetTime = 0,
    timesTables = [],
    answer;

var timer = document.querySelector('#timer'),
    numberBtns = document.querySelectorAll('.number-btn'),
    numberValue = document.querySelector('#number'),
    menuContainer = document.querySelector('#menu'),
    submitOpt = document.querySelector('#submit-option');
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
    var integer = randomInt(1,12);
    answer = multiple * integer;
    if(randomInt(1,2) == 1){
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
        answerInt2 = document.querySelector('#int-2');
    active = false;
    answerInt1.innerHTML = "";
    answerInt2.innerHTML = "";
    numberValue.getElementsByClassName('textFitted')[0].innerHTML = "";
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