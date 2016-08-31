

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
	else if (population.current <40000)
	FoodPrzyrost = population.current / 5;
	else
	FoodPrzyrost = population.current /2;
	 freeLand = Math.max(land - totalBuildings, 0);
	 TargetFreeLand=100*Przyrost;
}
function domki(){
	if(freeLand > TargetFreeLand && population.current>population.cap-Przyrost && population.unemployed <= Przyrost*20 )
	{
		if(upgrades.masonry == 0 && wood.total >= 200*Przyrost && skins.total>=1*Przyrost)
		createBuilding(whut,Przyrost);
		else if(upgrades.construction==0 && wood.total>=10*Przyrost && stone.total>=30*Przyrost)
		createBuilding(cottage,Przyrost);
		else if(upgrades.architecture == 0 && wood.total >=30*Przyrost && stone.total>=70*Przyrost)
		createBuilding(house,Przyrost);
		else if(upgrades.architecture == 1 && wood.total>=200*Przyrost && stone.total>=200*Przyrost && leather.total>=20*Przyrost)
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
		if(freeLand > TargetFreeLand && population.tanners>tannery.total-Przyrost && wood.total>=30*Przyrost && stone.total>=70*Przyrost && skins.total >=2*Przyrost)
			createBuilding(tannery,Przyrost);
		hire('tanners',Przyrost);
	}
	else if(upgrades.masonry == 1 && population.unemployed>0 && (population.blacksmiths<population.miners/25 ||population.blacksmiths<population.labourers*2)){
		if(freeLand > TargetFreeLand && population.blacksmiths>smithy.total-Przyrost && wood.total>=30*Przyrost && stone.total>=70*Przyrost && ore.total >=2*Przyrost)
			createBuilding(smithy,Przyrost);
		hire('blacksmiths',Przyrost);
	}
	else if(upgrades.masonry == 1 && population.unemployed>0 && (population.apothecaries<population.miners/100 || population.apothecaries<population.labourers)){
		if(freeLand > TargetFreeLand && population.apothecaries>apothecary.total-Przyrost && wood.total>=30*Przyrost && stone.total>=70*Przyrost && herbs.total >=2*Przyrost)
		 	createBuilding(apothecary,Przyrost);
		hire('apothecaries',Przyrost);
	}
	else if(upgrades.masonry == 1 && population.clerics < 1000000 && population.unemployed>0 && (population.clerics<population.miners*2 || population.clerics<population.labourers*10)){
		if(freeLand > TargetFreeLand && population.clerics>temple.total-Przyrost && wood.total>=30*Przyrost && stone.total>=120*Przyrost && herbs.total >=10*Przyrost)
			createBuilding(temple,Przyrost);
		hire('clerics',Przyrost);
	}
	else if(population.unemployed>0 && population.woodcutters<=population.miners && (population.woodcutters<=population.farmers/3 || population.woodcutters<population.labourers*50)){
		hire('woodcutters',Przyrost);
	}
	else if(population.unemployed>0 && (population.miners<=population.woodcutters || population.miners<population.labourers*50)){
		hire('miners',Przyrost);
	}
	else if(population.unemployed>Przyrost && population.soldiers<population.current/3)
	hire('soldiers',Przyrost);
	else if(population.unemployed>Przyrost*20)
		hire('farmers',Przyrost);
		
}

function Magazyny(){
	maxFoodA = Math.round(barn.total*400);
	maxWoodA = Math.round(woodstock.total*200);
	maxStoneA =Math.round(stonestock.total*200);
	if(wood.total>100*Przyrost && freeLand > TargetFreeLand){
		if(food.total >= maxFoodA)
		createBuilding(barn,Przyrost);
		if(wood.total >= maxWoodA)
		createBuilding(woodstock,Przyrost);
		if(stone.total >= maxStoneA)
		createBuilding(stonestock,Przyrost);
	}
	
}
function Walcz(){
	if(document.getElementById('raidGroup').style.display == 'block' && population.soldiersParty>300000)
		invade('largeNation');
	if(document.getElementById('victoryGroup').style.display == 'block')
		plunder();
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
   	if(document.getElementById('underworldUpgrades').style.display == "inline" && deity.devotion >=20) Zombie();
    Walcz();    
     
        
}
