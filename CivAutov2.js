

var runInterval = 100;      //How often to loop through logic
var startupDelay = 2000;
var netFood2;
var netWood2;
var netStone2;
var maxFoodA;
var maxWoodA;
var maxStoneA;

function obliczenia(){
    	//Calculate and update net production values for primary resources
	if (population.current > 0 || population.zombies > 0){ //don't want to divide by zero
		netFood2 = (population.farmers * (1 + (efficiency.farmers * efficiency.happiness)) * (1 + efficiency.pestBonus)) * (1 + (wonder.food/10)) * (1 + walkTotal/120) * (1 + (mill.total/200) * (population.current/(population.current + population.zombies))) - population.current;
	} else {
		netFood2 = (population.farmers * (1 + (efficiency.farmers * efficiency.happiness)) * (1 + efficiency.pestBonus)) * (1 + (wonder.food/10)) * (1 + walkTotal/120) * (1 + (mill.total/200)) - population.current;
	}
	netWood2 = population.woodcutters * (efficiency.woodcutters * efficiency.happiness) * (1 + (wonder.wood/10));
	netStone2 = population.miners * (efficiency.miners * efficiency.happiness) * (1 + (wonder.stone/10));
}
function TworzPracownikow() {
	if(netFood2>=2)
		spawn(1);
	
}
function ZatrudniajFarmerow(){
	if(netFood2<2)
	hire('farmers',1);
	if(netFood2>2){
		if(population.unemployed>0){
			if(population.woodcutters<=population.miners)
				hire('woodcutters',1);
			else
				hire('miners',1);
		}
	}
}

function Magazyny(){
	maxFoodA = 200 + barn.total*200;
	maxWoodA = 200 + woodstock.total*200;
	maxStoneA = 200 + stonestock.total*200;
	if(wood.total>100){
		if(food.total == maxFoodA)
		createBuilding(barn,1);
		if(wood.total == maxWoodA)
		createBuilding(woodstock,1);
		if(stone.total == maxStoneA)
		createBuilding(stonestock,1);
	}
}
setTimeout(delayStart, startupDelay);
function delayStart() {
    setTimeout(delayStartAgain, startupDelay);
}
function delayStartAgain(){
    setInterval(mainLoop, runInterval);
    
}

function mainLoop() {
	obliczenia();
	TworzPracownikow();
	ZatrudniajFarmerow();
	Magazyny();
    freeLand = Math.max(land - totalBuildings, 0)
        if (food.total<100 || skins.total<2) {
        increment(food);}
        if(wood.total<20) {
            increment(wood);
        }
        
        if(wood.total>=20 && freeLand > 950){
        createBuilding(whut,1);    
        }
        
}
