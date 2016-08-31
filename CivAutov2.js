

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
var TargetFreeLand=500;
function obliczenia(){
    	//Calculate and update net production values for primary resources
	if (population.current > 0 || population.zombies > 0){ //don't want to divide by zero
		netFood2 = (population.farmers * (1 + (efficiency.farmers * efficiency.happiness)) * (1 + efficiency.pestBonus)) * (1 + (wonder.food/10)) * (1 + walkTotal/120) * (1 + (mill.total/200) * (population.current/(population.current + population.zombies))) - population.current;
	} else {
		netFood2 = (population.farmers * (1 + (efficiency.farmers * efficiency.happiness)) * (1 + efficiency.pestBonus)) * (1 + (wonder.food/10)) * (1 + walkTotal/120) * (1 + (mill.total/200)) - population.current;
	}
	netWood2 = population.woodcutters * (efficiency.woodcutters * efficiency.happiness) * (1 + (wonder.wood/10));
	netStone2 = population.miners * (efficiency.miners * efficiency.happiness) * (1 + (wonder.stone/10));
	if(population.current < 200)
	FoodPrzyrost = 10;
	else if(population.current < 1000)
	FoodPrzyrost = 20;
	else if(population.current < 5000)
	FoodPrzyrost = population.current / 20;
	else if (population.current < 10000)
	FoodPrzyrost = population.current / 10;
	else if (population.current <100000)
	FoodPrzyrost = population.current / 5;
	else if (population.current <1000000)
	FoodPrzyrost = population.current / 3;
	else
	FoodPrzyrost = population.current /2;
	 freeLand = Math.max(land - totalBuildings, 0);
}
function domki(){
	if(freeLand > TargetFreeLand && population.current>population.cap-Przyrost && population.unemployed < Przyrost )
	{
		if(upgrades.masonry == 0 && wood.total >= 200 && skins.total>=1)
		createBuilding(whut,Przyrost);
		else if(upgrades.construction==0 && wood.total>=10 && stone.total>=30)
		createBuilding(cottage,Przyrost);
		else if(upgrades.architecture == 0 && wood.total >=30 && stone.total>=70)
		createBuilding(house,Przyrost);
		else if(upgrades.architecture == 1 && wood.total>=200 && stone.total>=200 & leather.total>=20)
		createBuilding(mansion,Przyrost);
	}
		
}
function Zombie(){
	if(piety.total>Przyrost*100 && population.corpses>Przyrost)
	raiseDead(Przyrost);
}
function TworzPracownikow() {
	if(netFood2>FoodPrzyrost-Przyrost*10)
		spawn(Przyrost);
	
}
function ZatrudniajFarmerow(){
	if(netFood2<=FoodPrzyrost || (population.unemployed>0 && population.farmers<population.labourers*150)){
		if(population.unemployed<Przyrost)
			spawn(Przyrost);
		hire('farmers',Przyrost);
	}
	else if(upgrades.masonry==1 && population.unemployed>0 && (population.tanners<population.miners/25 || population.tanners<population.labourers*2)) {
		if(freeLand > TargetFreeLand && population.tanners>tannery.total-Przyrost && wood.total>=30 && stone.total>=70 && skins.total >=2)
			createBuilding(tannery,Przyrost);
		hire('tanners',Przyrost);
	}
	else if(upgrades.masonry == 1 && population.unemployed>0 && (population.blacksmiths<population.miners/25 ||population.blacksmiths<population.labourers*2)){
		if(freeLand > TargetFreeLand && population.blacksmiths>smithy.total-Przyrost && wood.total>=30 && stone.total>=70 && ore.total >=2)
			createBuilding(smithy,Przyrost);
		hire('blacksmiths',Przyrost);
	}
	else if(upgrades.masonry == 1 && population.unemployed>0 && (population.apothecaries<population.miners/100 || population.apothecaries<population.labourers)){
		if(freeLand > TargetFreeLand && population.apothecaries>apothecary.total-Przyrost && wood.total>=30 && stone.total>=70 && herbs.total >=2)
		 	createBuilding(apothecary,Przyrost);
		hire('apothecaries',Przyrost);
	}
	else if(upgrades.masonry == 1 && population.clerics < 500000 && population.unemployed>0 && (population.clerics<population.miners/2 || population.clerics<population.labourers*10)){
		if(freeLand > TargetFreeLand && population.clerics>temple.total-Przyrost && wood.total>=30 && stone.total>=120 && herbs.total >=10)
			createBuilding(temple,Przyrost);
		hire('clerics',Przyrost);
	}
	else if(population.unemployed>0 && population.woodcutters<=population.miners && (population.woodcutters<=population.farmers/5 || population.woodcutters<population.labourers*50)){
		hire('woodcutters',Przyrost);
	}
	else if(population.unemployed>0 && (population.miners<=population.woodcutters || population.miners<population.labourers*50)){
		hire('miners',Przyrost);
	}
		
}

function Magazyny(){
	maxFoodA = Math.round(barn.total*200);
	maxWoodA = Math.round(woodstock.total*200);
	maxStoneA =Math.round(stonestock.total*200);
	if(wood.total>100 && freeLand > TargetFreeLand){
		if(food.total >= maxFoodA)
		createBuilding(barn,Przyrost);
		if(wood.total >= maxWoodA)
		createBuilding(woodstock,Przyrost);
		if(stone.total >= maxStoneA)
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
	domki();
	TworzPracownikow();
	ZatrudniajFarmerow();
	Magazyny();
   	Zombie();
     	
        
     
        
}
