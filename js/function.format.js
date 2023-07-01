var formatBtn = document.querySelector('#format-btn'),
    colorContainer = document.querySelector('#color-picker-container'),
    colorPicker = document.querySelector('#color-picker'),
    timedOpts = document.querySelectorAll('input[name="timed"]'),
    timerOptContainer = document.querySelector('#timer-option-container'),
    scoreOptContainer = document.querySelector('#count-option-container');

formatBtn.addEventListener('click', function(e){
    if(e.target.id !== 'color-picker'){
            if(colorContainer.classList.contains('show')){
                colorContainer.classList.remove('show');
            }else{
                colorContainer.classList.add('show');
            }
    }
});

colorPicker.addEventListener('change', function(){
    document.body.style.background = colorPicker.value;
    colorContainer.classList.remove('show');
});

window.addEventListener("load", function() {
    fittext();
});
  
window.addEventListener('resize', function() {
    fittext();
});
  
timedOpts.forEach(timedOpt => {
    timedOpt.addEventListener('click', function(){
        switch(this.value){
            case 'yes':
                timerOptContainer.classList.remove('hide');
                scoreOptContainer.classList.add('hide');
                break;
            case 'no':
                timerOptContainer.classList.add('hide');
                scoreOptContainer.classList.remove('hide');
                break;
            default:
                break;
        }
    })
});

function fittext(){
    textFit(document.getElementById('question'));
    textFit(document.getElementById('number'));
}

