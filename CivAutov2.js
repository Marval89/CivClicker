function mainLoop() {
        if (food.total<100) {
        increment(food);
        }
}

var runInterval = 100;      //How often to loop through logic
var startupDelay = 2000;


setTimeout(delayStart, startupDelay);
function delayStart() {
    setTimeout(delayStartAgain, startupDelay);
}
function delayStartAgain(){
    setInterval(mainLoop, runInterval);
    
}
