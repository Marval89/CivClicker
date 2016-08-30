

var runInterval = 100;      //How often to loop through logic
var startupDelay = 2000;
var netFood2;
var netWood2;
var netStone2;
var maxFoodA;
var maxWoodA;
var maxStoneA;
var FoodPrzyrost=200;
var Przyrost=1;
function obliczenia(){
    	//Calculate and update net production values for primary resources
	if (population.current > 0 || population.zombies > 0){ //don't want to divide by zero
		netFood2 = (population.farmers * (1 + (efficiency.farmers * efficiency.happiness)) * (1 + efficiency.pestBonus)) * (1 + (wonder.food/10)) * (1 + walkTotal/120) * (1 + (mill.total/200) * (population.current/(population.current + population.zombies))) - population.current;
	} else {
		netFood2 = (population.farmers * (1 + (efficiency.farmers * efficiency.happiness)) * (1 + efficiency.pestBonus)) * (1 + (wonder.food/10)) * (1 + walkTotal/120) * (1 + (mill.total/200)) - population.current;
	}
	netWood2 = population.woodcutters * (efficiency.woodcutters * efficiency.happiness) * (1 + (wonder.wood/10));
	netStone2 = population.miners * (efficiency.miners * efficiency.happiness) * (1 + (wonder.stone/10));
	FoodPrzyrost = population.current / 10;
	 freeLand = Math.max(land - totalBuildings, 0);
}
function TworzPracownikow() {
	if(netFood2>FoodPrzyrost-1)
		spawn(Przyrost);
	
}
function ZatrudniajFarmerow(){
	if(netFood2<=FoodPrzyrost){
		if(population.unemployed<1)
			spawn(Przyrost);
		hire('farmers',Przyrost);
	}
	else if(population.unemployed>0 && population.tanners<population.miners/25) {
		if(population.tanners==tannery.total)
			createBuilding(tannery,Przyrost);
		hire('tanners',Przyrost);
	}
	else if(population.unemployed>0 && population.blacksmiths<population.miners/25){
		if(population.blacksmiths==smithy.total)
			createBuilding(smithy,Przyrost);
		hire('blacksmiths',Przyrost);
	}
	else if(population.unemployed>0 && population.apothecaries<population.miners/100){
		if(population.apothecaries==apothecary.total)
			createBuilding(apothecary,Przyrost);
		hire('apothecaries',Przyrost);
	}
	else if(population.unemployed>0 && population.clerics<population.miners/25){
		if(population.clerics==temple.total)
			createBuilding(temple,Przyrost);
		hire('clerics',Przyrost);
	}
	else if(population.unemployed>0 && population.woodcutters<=population.farmers/5){
		hire('woodcutters',Przyrost);
	}
	else if(population.unemployed>0 && population.miners<=population.farmers/5){
		hire('miners',Przyrost);
	}
		
}

function Magazyny(){
	maxFoodA = 200 + barn.total*200;
	maxWoodA = 200 + woodstock.total*200;
	maxStoneA = 200 + stonestock.total*200;
	if(wood.total>100){
		if(food.total == maxFoodA)
		createBuilding(barn,Przyrost);
		if(wood.total == maxWoodA)
		createBuilding(woodstock,Przyrost);
		if(stone.total == maxStoneA)
		createBuilding(stonestock,Przyrost);
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
   
     
        
     
        
}
