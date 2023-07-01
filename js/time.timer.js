var x, mins = 0, secs = 0; 
let intervalId;

function startTimer(seconds){
    minutes = Math.floor(seconds/60);
    seconds = seconds % 60;
    var countDownDate = addMinSec(minutes, seconds + 2);
    intervalId = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        if(minutes < 10){ minutes = "0" + minutes; }
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if(seconds < 10){ seconds = "0" + seconds; }
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;
        if (distance < 0) {
            stopTimer();
            document.getElementById("timer").innerHTML = "00:00";
            stopGame();
        }
    }, 1000);
}

function addMinSec(minutes, seconds) {
    return new Date(new Date().getTime() + minutes*60000 + seconds*1000);
}

function startStopwatch(){
    var minutes = 0, seconds = 0;
    intervalId = setInterval(function(){
        secs++; 
        if(secs <= 9){
            seconds = "0" + secs;
        }
        if (secs > 9){
            seconds = secs;
        } 
        if (secs >= 60) {
            mins++;
            secs = 0;
            if (mins <= 9){
                minutes = "0" + mins;
            }
            if (mins > 9){
                minutes = mins;
            }
        }
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;
    }, 1000);
};

function stopTimer(){
    clearInterval(intervalId);
}