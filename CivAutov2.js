

var runInterval = 100;      //How often to loop through logic
var startupDelay = 2000;


setTimeout(delayStart, startupDelay);
function delayStart() {
    setTimeout(delayStartAgain, startupDelay);
}
function delayStartAgain(){
    setInterval(mainLoop, runInterval);
    
}

function mainLoop() {
        if (food.total<100) {
        increment(food);}
        if(wood.total<20) {
            increment(wood);
        }
        freeLand = Math.max(land - totalBuildings, 0)
        if(wood.total>=20 && freeLand > 980){
        createbuilding(whut,1);    
        }
        
}
