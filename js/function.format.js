var formatBtn = document.getElementById('format-btn');
var colorContainer = document.getElementById('color-picker-container');
var colorPicker = document.getElementById('color-picker');

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
  

function fittext(){
    textFit(document.getElementById('question'));
    textFit(document.getElementById('number'));
}

