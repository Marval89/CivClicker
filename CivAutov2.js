

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
	FoodPrzyrost = 40;
	else if(population.current < 5000)
	FoodPrzyrost = population.current / 20;
	else if (population.current < 10000)
	FoodPrzyrost = population.current / 10;
	else if (population.current <40000)
	FoodPrzyrost = population.current / 3;
	else if (population.current <100000)
	FoodPrzyrost = population.current / 2;
	else
	FoodPrzyrost = population.current / 2;
	 freeLand = Math.max(land - totalBuildings, 0);
	 TargetFreeLand=10*Przyrost;
}
function domki(){
	if(freeLand > TargetFreeLand && population.current>population.cap-Przyrost && population.unemployed <= Przyrost*20 )
	{
		if(upgrades.masonry == 0 && wood.total >= 20*Przyrost && skins.total>=1*Przyrost)
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
	else if(upgrades.masonry==1 && population.unemployed>0 && (population.tanners<population.miners/25 || population.tanners<population.labourers*2) && skins.total >=2*Przyrost) {
		if(freeLand > TargetFreeLand && population.tanners>tannery.total-Przyrost && wood.total>=30*Przyrost && stone.total>=70*Przyrost )
			createBuilding(tannery,Przyrost);
		hire('tanners',Przyrost);
	}
	else if(upgrades.masonry == 1 && population.unemployed>0 && (population.blacksmiths<population.miners/25 ||population.blacksmiths<population.labourers*2) && ore.total >=2*Przyrost){
		if(freeLand > TargetFreeLand && population.blacksmiths>smithy.total-Przyrost && wood.total>=30*Przyrost && stone.total>=70*Przyrost)
			createBuilding(smithy,Przyrost);
		hire('blacksmiths',Przyrost);
	}
	else if(upgrades.masonry == 1 && population.unemployed>0 && (population.apothecaries<population.miners/100 || population.apothecaries<population.labourers)){
		if(freeLand > TargetFreeLand && population.apothecaries>apothecary.total-Przyrost && wood.total>=30*Przyrost && stone.total>=70*Przyrost && herbs.total >=2*Przyrost)
		 	createBuilding(apothecary,Przyrost);
		hire('apothecaries',Przyrost);
	}
	else if(upgrades.masonry == 1 && population.clerics < 1000000 && population.unemployed>0 && (population.clerics<population.miners/25 || population.clerics<population.labourers*1) && herbs.total >=10*Przyrost){
		if(freeLand > TargetFreeLand && population.clerics>temple.total-Przyrost && wood.total>=30*Przyrost && stone.total>=120*Przyrost)
			createBuilding(temple,Przyrost);
		hire('clerics',Przyrost);
	}
	else if(population.unemployed>0 && population.woodcutters<=population.miners && (population.woodcutters<=population.farmers/3 || population.woodcutters<population.labourers*60)){
		hire('woodcutters',Przyrost);
	}
	else if(population.unemployed>0 && (population.miners<=population.woodcutters || population.miners<population.labourers*60)){
		hire('miners',Przyrost);
	}
	else if(upgrades.masonry == 1 && population.unemployed>Przyrost && population.soldiers<population.current/10){
		if(freeLand > TargetFreeLand && barracks.total <= (population.soldiers + population.soldiersIll + population.soldiersParty) && food.total>=20*Przyrost && wood.total>=60*Przyrost && stone.total>=120*Przyrost && metal.total>=10*Przyrost)
			createBuilding(barracks,Przyrost);
		hire('soldiers',Przyrost);
	}
	else if(population.unemployed>Przyrost*20)
		hire('farmers',Przyrost);
		
}

function Magazyny(){
	if(upgrades.granaries==1)
	maxFoodA = Math.round(barn.total*400);
	else
	maxFoodA = Math.round(barn.total*200);
	maxWoodA = Math.round(woodstock.total*200);
	maxStoneA =Math.round(stonestock.total*200);
	if(wood.total>100*Przyrost && freeLand > TargetFreeLand){
		if(food.total >= maxFoodA-netFood2)
		createBuilding(barn,Przyrost);
		if(wood.total >= maxWoodA-netWood2)
		createBuilding(woodstock,Przyrost);
		if(stone.total >= maxStoneA-netStone2)
		createBuilding(stonestock,Przyrost);
	}
	if(mill.require.wood<wood.total/10 && mill.require.stone < stone.total/10)
	createBuilding(mill,1);
	
}
function Walcz(){
	if(document.getElementById('raidGroup').style.display == 'block') 
		if(population.soldiersParty>300000)
			invade('largeNation');
		else if(population.soldiersParty>150000)
			invade('Nation');
		else if(population.soldiersParty>80000)
			invade('smallNation');
		else if(population.soldiersParty>20000)
			invade('metropolis');
		else if(population.soldiersParty>3000)
			invade('largeTown');
		else if(population.soldiersParty>700)
			invade('smallTown');
		else if(population.soldiersParty>200)
			invade('village');
		
	if(document.getElementById('victoryGroup').style.display == 'block')
		plunder();
}

function Ulepszenia(){
	if(upgrades.skinning == 0 && skins.total >= 10)
	upgrade('skinning');
	if(upgrades.harvesting == 0 && herbs.total >= 10)
	upgrade('harvesting');
	if(upgrades.prospecting == 0 && ore.total >= 10)
	upgrade('prospecting');
	if(upgrades.masonry == 0 && wood.total >= 100 && stone.total >=100)
	upgrade('masonry');
}
function klikanie(){
	if((netFood2 < 5 && food.total<20) || (upgrades.skinning == 0 && skins.total<10)) 
        increment(food);
    if((netWood2 < 5 && wood.total<20) || (upgrades.harvesting == 0 && herbs.total<10))
    	increment(wood);
    if((netStone2<5 && stone.total<20) || (upgrades.prospecting == 0 && ore.total < 10))
    	increment(stone);
     
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
	klikanie()
	domki();
	TworzPracownikow();
	ZatrudniajFarmerow();
	Magazyny();
	Ulepszenia();
   	if(document.getElementById('underworldUpgrades').style.display == "inline" && deity.devotion >=20) 
   	Zombie(); 
   	else
   	if(freeLand > TargetFreeLand && population.corpses > population.graves && wood.total>100*Przyrost && stone.total>200*Przyrost && herbs.total > 50 *Przyrost) 
   	createBuilding(graveyard,Przyrost);
	if(freeLand<=TargetFreeLand || (document.getElementById('underworldUpgrades').style.display == "inline" && deity.devotion >=20 && population.corpses == 0)) Walcz();  
	if (document.getElementById('tradeContainer').style.display == 'block' && trader.material != food && trader.material.total >= trader.requested)  trade();
    if (document.getElementById('speedWonderGroup').style.display == 'block' && gold.total > 100) speedWonder();  
    
        
}
