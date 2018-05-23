

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
var ludnosc;
var restart=0;
var ClericCap;
var klerRatio;
function menu(){
	Row = document.createElement('tr');                                   // stworzenie wiersza                                                                                                                                                 // creates the button row inside the table
Row.innerHTML = '<td class="number">Przyrost:</td>' + '<td class="number" id="PrzyrostView">'+Przyrost+'</td>';
Row2 = document.createElement('tr');						
Row2.innerHTML = '<td class="number">Clerics Cap:</td>' + '<td><input id="ClericsEdit" type="number" min="1" step="1" value="18000000"></td>' ;
		el = document.getElementById('populationNumbers'); //miejsce wklejenia
		el.appendChild(Row);  
		el.appendChild(Row2);  
restart=1;
}
function obliczenia(){
	/*
	Przyrost = document.getElementById('PrzyrostEdit').value;
	Przyrost = Przyrost - 0; // zmiana typu na liczbe
	Przyrost = Math.floor(Przyrost); //sprowadzenie do liczby całkowitej*/
	if( netFood2>2*calcCost(Przyrost) || (ludnosc>400000 && netFood2>calcCost(Przyrost)) ){
	Przyrost=2*Przyrost;
	Row.innerHTML = '<td class="number">Przyrost:</td>' + '<td class="number" id="PrzyrostView">'+Przyrost+'</td>';}
	if(netFood2 == 0){
	Przyrost=1;
	Row.innerHTML = '<td class="number">Przyrost:</td>' + '<td class="number" id="PrzyrostView">'+Przyrost+'</td>';}
	ClericCap = document.getElementById('ClericsEdit').value;
	ClericCap = ClericCap - 0;
	ClericCap = Math.floor(ClericCap);

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
	else if (population.zombies > 100000)
		 FoodPrzyrost = 100;
	else
	FoodPrzyrost = population.current / 2;
	 freeLand = Math.max(land - totalBuildings, 0);
	 TargetFreeLand=10*Przyrost;
	 ludnosc = population.current + population.zombies;
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
	if(freeLand>TargetFreeLand && upgrades.masonry==1){
		if(population.tanners>tannery.total-Przyrost && wood.total>=30*Przyrost && stone.total>=70*Przyrost && skins.total>=2*Przyrost)
			createBuilding(tannery,Przyrost);
		if(population.blacksmiths>smithy.total-Przyrost && wood.total>=30*Przyrost && stone.total>=70*Przyrost && ore.total>=2*Przyrost)
			createBuilding(smithy,Przyrost);
		if(population.apothecaries>apothecary.total-Przyrost && wood.total>=30*Przyrost && stone.total>=70*Przyrost && herbs.total >=2*Przyrost)
		 	createBuilding(apothecary,Przyrost);
		if((population.soldiers + population.soldiersIll + population.soldiersParty)>barracks.total-Przyrost && food.total>=20*Przyrost && wood.total>=60*Przyrost && stone.total>=120*Przyrost && metal.total>=10*Przyrost)
			createBuilding(barracks,Przyrost);
		if(population.clerics>temple.total-Przyrost && wood.total>=30*Przyrost && stone.total>=120*Przyrost && herbs.total >=10*Przyrost && population.current<population.cap-Przyrost)
			createBuilding(temple,Przyrost);
	}
		
}
function Zombie(){
	if(document.getElementById('underworldUpgrades').style.display == "inline"){
		if((deity.devotion<30 || upgrades.secrets == 0 || upgrades.feast == 0 || upgrades.book == 0)  && population.corpses>=1+(1*deity.devotion) && stone.total>=200 && piety.total>=200)
			createBuilding(underworldAltar,1)
		if(upgrades.book == 0 && piety.total>1000 && diety.devotion >=10)
			upgrade('book');
		if(upgrades.feast == 0 && piety.total>1000 && diety.devotion >=30)
			upgrade('feast');
		if(upgrades.secrets == 0 && piety.total>5000 && diety.devotion >=50)
			upgrade('secrets');
		if(upgrades.secrets == 1 && piety.total>Przyrost*100 && population.corpses>Przyrost && deity.devotion >=20)
			//raiseDead(Przyrost);
			raiseDead('max');
	}
}
function TworzPracownikow() {
	if(netFood2>FoodPrzyrost-Przyrost*10 || population.unemployed<Przyrost)
		spawn(Przyrost);
	
}
function ZatrudniajFarmerow(){
	
	if (document.getElementById('raiseDead').disabled == false)
	klerRatio=0.5;
	else
	klerRatio=25;

	if(netFood2<=FoodPrzyrost || population.farmers < population.labourers*80)
		hire('farmers',Przyrost);
	if(population.apothecaries<=apothecary.total-Przyrost && (population.apothecaries<population.miners/100 || population.apothecaries<population.labourers))
		hire('apothecaries',Przyrost);
	if(population.clerics<=temple.total-Przyrost && (population.clerics < 10000 || (graveyard.total>=1000 && population.clerics < ClericCap)) && (population.clerics<population.miners/klerRatio || population.clerics<population.labourers*1))
		hire('clerics',Przyrost);
	if((population.soldiers + population.soldiersIll + population.soldiersParty)<=barracks.total-Przyrost || barracks.total-Przyrost<0  && (population.soldiers<population.current/40 && (upgrades.standard == 1 || population.soldiers<population.current/100)))
		hire('soldiers',Przyrost);
    if((population.tanners<population.miners/50 || population.tanners<population.labourers*2) && population.tanners<=tannery.total-Przyrost)
		hire('tanners',Przyrost);
	 if(population.blacksmiths<=smithy.total-Przyrost && (population.blacksmiths<population.miners/25 ||population.blacksmiths<population.labourers*2))
		hire('blacksmiths',Przyrost);
	 if(population.woodcutters<=population.miners && (population.woodcutters<=population.farmers/3 || population.woodcutters<population.labourers*100))
		hire('woodcutters',Przyrost);
	 if(population.miners<=(population.current + population.zombies)/6 || population.miners<population.labourers*60)
		hire('miners',Przyrost);
	 
	 
	 if((population.labourers > 0 || population.current + population.zombies > 3000000) && population.labourers < ludnosc/450)
		hire('labourers',100);
	 if(population.unemployed>Przyrost*20)
		hire('miners',Przyrost);
		
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
	if(upgrades.wheel == 1 && mill.require.wood<wood.total/10 && mill.require.stone < stone.total/10)
	createBuilding(mill,1);
	if(freeLand > TargetFreeLand && population.corpses > population.graves && wood.total>100*Przyrost && stone.total>200*Przyrost && herbs.total > 50 *Przyrost && document.getElementById('underworldUpgrades').style.display != "inline") 
   	createBuilding(graveyard,Przyrost);
   	if(freeLand > TargetFreeLand && population.clerics>=10000 && graveyard.total < 1000 && wood.total>100*1000 && stone.total>200*1000 && herbs.total > 50 *1000 && document.getElementById('underworldUpgrades').style.display == "inline") 
   	createBuilding(graveyard,1000); // buduj groby by przyspieszyc produkcje piety
	
}
function Walcz(){
if(upgrades.standard == 1 && (freeLand<=TargetFreeLand || (document.getElementById('underworldUpgrades').style.display == "inline" && population.corpses <= Przyrost))){	
	if(document.getElementById('raidGroup').style.display == 'block') 
		if(population.soldiersParty>600000)
			invade('empire');
		else if(population.soldiersParty>300000)
			invade('largeNation');
		else if(population.soldiersParty>150000)
			invade('nation');
		else if(population.soldiersParty>80000)
			invade('smallNation');
		else if(population.soldiersParty>20000)
			invade('metropolis');
		else if(population.soldiersParty>12000)
			invade('largeCity');
		else if(population.soldiersParty>6000)
			invade('smallCity');
		else if(population.soldiersParty>2000)
			invade('largeTown');
		else if(population.soldiersParty>500)
			invade('smallTown');
		else if(population.soldiersParty>200)
			invade('village');
		else if (population.soldiersParty>50)
			invade('hamlet')
		else if (population.soldiersParty>=20) 
			invade('thorp');
}			
		
	if(document.getElementById('victoryGroup').style.display == 'block')
		plunder();
	if(population.soldiers>=population.current/40 && (population.soldiersParty<ludnosc/60 || population.soldiersParty<population.zombies/15) && population.soldiersParty<900000)
		party('soldiers',Przyrost);
	if(freeLand<=TargetFreeLand && population.soldiersParty<20 && population.soldiers > 20)
		party('soldiers',20); 
	if(upgrades.mathematics==1 && population.siege < population.soldiersParty/4 && metal.total >= 50*Przyrost && leather.total >= 50*Przyrost && wood.total >=200*Przyrost)
		party('siege',Przyrost);
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
	if(upgrades.masonry ==1){
		if(upgrades.domestication == 0 && leather.total >=20)
			upgrade('domestication');
		if(upgrades.ploughshares == 0 && metal.total >= 20)
			upgrade('ploughshares');
		if(upgrades.irrigation == 0 && stone.total >= 200 && wood.total >= 500)
			upgrade('irrigation');
		if(upgrades.construction == 0 && wood.total >= 1000 && stone.total >= 1000)
			upgrade('construction');
		if(upgrades.granaries == 0 && wood.total >=1000 && stone.total >= 1000)
			upgrade('granaries');
		if(upgrades.wheel == 0 && wood.total >= 500 && stone.total >= 500)
			upgrade('wheel');
		if(upgrades.standard == 0 && metal.total >=1000 && leather.total >= 1000)
			upgrade('standard');
		if(upgrades.writing == 0 && population.clerics > 0 && skins.total >= 500)
			upgrade('writing');
	}
	if(upgrades.standard == 1){
		if(upgrades.weaponry == 0 && wood.total >= 500 && metal.total >= 500)
			upgrade('weaponry');
		if(upgrades.shields == 0 && wood.total >= 500 && leather.total >= 500)
			upgrade('shields');
		if(upgrades.horseback == 0 && food.total >= 500 && wood.total >= 500)
			upgrade('horseback');
	}
	if(upgrades.construction == 1){	
		if(upgrades.butchering == 0 && leather.total >= 40)
			upgrade('butchering');
		if(upgrades.gardening == 0 && herbs.total >= 40)
			upgrade('gardening');
		if(upgrades.extraction == 0 && metal.total >=40)
			upgrade('extraction');
		if(upgrades.architecture == 0 && wood.total >= 10000 && stone.total >= 10000)
			upgrade('architecture');
		if(upgrades.tenements == 0 && food.total >=200 && wood.total >= 500 && stone.total >= 500)
			upgrade('tenements');
		if(upgrades.palisade == 0 && wood.total >= 2000 && stone.total >= 1000)
			upgrade('palisade');
	}
	if(upgrades.architecture == 1){
		if(document.getElementById('maceratingLine').style.display == "inline" && !document.getElementById('macerating').disabled)
			upgrade('macerating');
		if(document.getElementById('flensingLine').style.display == "inline" && !document.getElementById('flensing').disabled)
			upgrade('flensing');
		if(upgrades.croprotation == 0 && herbs.total>=5000 && piety.total >= 1000)
			upgrade('croprotation');
		if(upgrades.fertilisers == 0 && ore.total>=5000 && piety.total >= 1000)
			upgrade('fertilisers');
		if(upgrades.slums == 0 && food.total>=500 && wood.total >= 1000 && stone.total >= 1000)
			upgrade('slums');
	}
	if(upgrades.writing == 1){
		if(document.getElementById('administrationLine').style.display == "inline" && !document.getElementById('administration').disabled)
			upgrade('administration');
		if(document.getElementById('codeoflawsLine').style.display == "inline" && !document.getElementById('codeoflaws').disabled)
			upgrade('codeoflaws');	
		if(document.getElementById('mathematicsLine').style.display == "inline" && !document.getElementById('mathematics').disabled)
			upgrade('mathematics');
		if(document.getElementById('aestheticsLine').style.display == "inline" && !document.getElementById('aesthetics').disabled)
			upgrade('aesthetics');
		if(upgrades.selectivebreeding == 0 && skins.total>=5000 && piety.total >= 1000)
			upgrade('selectivebreeding');
	}
			
	if(document.getElementById('tradeLine').style.display == "inline" && gold.total>=1)
	upgrade('trade');
	if(document.getElementById('currencyLine').style.display == "inline" && gold.total>=10 && ore.total>=1000)
	upgrade('currency');
	if(document.getElementById('commerceLine').style.display == "inline" && gold.total>=100 && piety.total>=10000)
	upgrade('commerce');
}
function klikanie(){
	if((netFood2 < 20 && food.total<20) || (skins.total<10)) 
        increment(food);
    if((netWood2 < 5 && wood.total<20) || (herbs.total<10))
    	increment(wood);
    if((netStone2<5 && stone.total<30) || (ore.total < 10))
    	increment(stone);
    if(document.getElementById('catsUpgrades').style.display == "inline" && deity.devotion >=20 && pestTimer==0)
    	pestControl(10);
     
}
function wyznanie(){
	if(upgrades.deity == 0 && piety.total >= 1000){
		upgrade('deity')
	}
	if(upgrades.deity == 1 && upgrades.deityType == 0 && piety.total >= 500)
		upgrade('deityUnderworld');
		upgrades.deityType = 1;
	}
setTimeout(delayStart, startupDelay);
function delayStart() {
    setTimeout(delayStartAgain, startupDelay);
}
function delayStartAgain(){
    setInterval(mainLoop, runInterval);
    
}

function mainLoop() {
	if(restart==0) menu();
	obliczenia();
	klikanie()
	domki();
	TworzPracownikow();
	if (population.unemployed >= Przyrost) ZatrudniajFarmerow();
	Magazyny();
	Ulepszenia();
   	Zombie(); 
	Walcz();
	wyznanie();  
	if (document.getElementById('tradeContainer').style.display == 'block' && trader.material != food && trader.material.total >= trader.requested)  trade();
    if (document.getElementById('speedWonderGroup').style.display == 'block' && gold.total > 100) speedWonder();  
    if (!document.getElementById('startWonder').disabled && !wonder.completed && !wonder.building) 
    {
    	wonder.name='Sphinks';
		document.getElementById('startWonder').disabled = true;
		document.getElementById('speedWonderGroup').style.display = 'block';
		wonder.building = true;
		updateWonder();
    	}
         
}
