document.getElementById("start-timer").addEventListener("click", function(){
    const mins = document.getElementsByName("minutes");
    const current = document.getElementById("timer").innerHTML;
    if(current == "00:00"){
        mins.forEach(min => {
            if(min.checked){
                startTimer(min.value);
            }
        });
    }else{
        resumeTimer(parseInt(current.substring(0,2)), parseInt(current.substring(3,5)) + 2);
    }
    document.getElementById("start-timer").classList.add("hide");
    document.getElementById("stop-timer").classList.remove("disabled");
    document.getElementById("pause-timer").classList.remove("hide");
});

document.getElementById("stop-timer").addEventListener("click", function(){
    stopTimer();
    document.getElementById("timer").innerHTML = "00:00";
    document.getElementById("start-timer").classList.remove("hide");
    document.getElementById("stop-timer").classList.add("disabled");
    document.getElementById("pause-timer").classList.add("hide");
});

document.getElementById("pause-timer").addEventListener("click", function(){
    document.getElementById("start-timer").classList.remove("hide");
    document.getElementById("stop-timer").classList.remove("disabled");
    document.getElementById("pause-timer").classList.add("hide");
    clearInterval(x);
});

var x;

function startTimer(min){
    var countDownDate = addMinSec(min, 2);
    x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        if(minutes < 10){ minutes = "0" + minutes; }
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if(seconds < 10){ seconds = "0" + seconds; }
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;
        if (distance < 0) {
            stopTimer();
            document.getElementById("timer").innerHTML = "Time Up";
        }
    }, 1000);
}

function resumeTimer(minutes, seconds){
    var countDownDate = addMinSec(minutes, seconds);
    x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        if(minutes < 10){ minutes = "0" + minutes; }
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if(seconds < 10){ seconds = "0" + seconds; }
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;
        if (distance < 0) {
            stopTimer();
            document.getElementById("timer").innerHTML = "Time Up";
        }
    }, 1000);
}

function addMinSec(minutes, seconds) {
    return new Date(new Date().getTime() + minutes*60000 + seconds*1000);
}

function stopTimer(){
    document.getElementById("stop-timer").classList.add("disabled");
    clearInterval(x);
}