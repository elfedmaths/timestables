var buttons = document.querySelectorAll('.number-btn');
var number = document.getElementById('number');

window.addEventListener('load', function(){
    newQuestion();
});

document.addEventListener('keydown', (event) => {
    var key = event.key;
    if(/([0-9]{1})/.test(key)){
        appendNumber(key);
    }else if(key == 'Backspace'){
        deleteNumber();
    }else if(key == 'Enter'){
        enterNumber();
    }
}, false);

buttons.forEach(button => {
    button.addEventListener('click', function(){
        button.classList.add('clicked');
        setTimeout(function(){
            button.classList.remove('clicked');
        }, 200);
        var value = button.getAttribute('data-value');
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
    });
});

function appendNumber(digit){
    var current = number.getElementsByClassName('textFitted')[0].innerHTML;
    current = current + digit;
    number.innerHTML = current;
    textFit(document.getElementById('number'));
    if(checkAnswer(parseInt(current))){
        newQuestion();
    }
}

function deleteNumber(){
    var current = number.getElementsByClassName('textFitted')[0].innerHTML;
    if(current.length > 0){
        number.innerHTML = current.slice(0, -1);
    }
    textFit(document.getElementById('number'));
}

function enterNumber(){
    var current = number.getElementsByClassName('textFitted')[0].innerHTML;
    if(checkAnswer(parseInt(current))){
        newQuestion();
    }else{
        number.getElementsByClassName('textFitted')[0].innerHTML = "";
    }
}

function newQuestion(){
    var int1 = document.getElementById('int-1');
    var int2 = document.getElementById('int-2');
    var data = createQuestion();
    int1.innerHTML = data[0];
    int2.innerHTML = data[1];
    number.getElementsByClassName('textFitted')[0].innerHTML = "";
}

function createQuestion(multiple){
    if(!multiple){
        var multiple = randomInt(1,12);
    }
    var integer = randomInt(1,12);
    var answer = multiple * integer;
    addAnswer(answer);
    if(randomInt(1,2) == 1){
       return [multiple, integer, answer];
    }else{
        return [integer, multiple, answer];
    }
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

function addAnswer(ans){
    try {
        localStorage["quest-ans"] = JSON.stringify([ans]);
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
    }
}

function checkAnswer(checkAnswer){
    var ans = JSON.parse(localStorage.getItem('quest-ans'));
    if(ans[0] === checkAnswer){
        return true;
    }
    return false;
}
  
function addRow(quest, ans){
    if (localStorage.getItem("quest-data") === null) {
        var data = [];
    }else{
        var data = JSON.parse(localStorage.getItem('quest-data'));
    }
    data.push([quest, ans]);
    try {
        localStorage["quest-data"] = JSON.stringify(data);
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
    }
}

function fetchData(){
    if (localStorage.getItem("quest-data") === null) {
        var data = [];
    }else{
        var data = JSON.parse(localStorage.getItem('quest-data'));
    }
    return data;
}