let modInfo = {
	name: "Unnamed",
	id: "存档di(必须要写一个独一无二的di以防止存档冲突)",
	author: "匿_名",
	pointsName: "点数名称",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.04",
	name: "",
}

let changelog = `<h1>更新记录:</h1><br>
	<h3>2024.7.26 v0.04</h3><br>
		- 凝聚长矛冷却缩减至3秒<br>
		- 介绍系统<br>
		- 技能熟练度系统<br>
		- 强化系统<br>
		- 5个新的物品<br>
		- 1张新的地图<br>
		- 1种新的怪物<br>
		- 1种新的技能<br><br>
	<h3>2024.7.20 v0.03</h3><br>
		- 复活点绑定<br>
		- 图鉴系统<br>
		- 8个新的物品<br>
		- 2张新的地图<br>
		- 1种新的怪物<br>
		- 1种新的技能<br><br>
	<h3>2024.7.18 v0.02</h3><br>
		- 安全区内回血<br>
		- 技能系统<br>
		- 8个新的物品<br>
		- 1张新地图<br>
		- 2种新的怪物<br>
		- 2种新的技能<br><br>
	<h3>2024.7.17 v0.01</h3><br>
		- 背包系统<br>
		- 装备系统<br>
		- 9个新的物品<br>
		- 地图指引<br>
		- 1张新的地图<br>
		- 新的NPC-铁匠,商人<br><br>
	<h3>2024.7.16 v0.00</h3><br>
		- 战斗系统<br>
		- 日志系统<br>
		- 属性系统<br>
		- 掉落系统<br>
		- 1张新的地图<br>
		- 1种新的怪物<br><br>
		`

let winText = `恭喜通关!您已经完成了这个游戏.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new ExpantaNum(0)
	let gain = new ExpantaNum(1)
	return gain
}


// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}