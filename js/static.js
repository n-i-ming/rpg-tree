const idToName=[
    "<text style='color:grey'>新手剑</text>","<text style='color:grey'>新手布鞋</text>","穿刺","粘液球","粘液头盔","粘液护手","粘液护甲","粘液护腿",
    "<text style='color:lime'>粘液块护甲</text>","<text style='color:lime'>粘液鞋子</text>",
    "<text style='color:grey'>小刀</text>","<text style='color:grey'>长矛</text>","哥布林<text style='color:grey'>眼睛</text>","哥布林<text style='color:red'>心脏</text>",
    "<text style='color:maroon'>哥布林雕像</text>","凝聚长矛","冲刺",
    "狼牙","狼皮","<text style='color:cyan'>疾风魔核</text>","野狼头盔","野狼护手","野狼护甲","野狼护腿","幻影刺",
    "<text style='color:lightblue'>鱼人鳞片</text>","<text style='color:lightblue'>三叉戟</text>","<text style='color:lightblue'>水球术</text>",
    "<text style='color:red'>小血瓶</text>","<text style='color:blue'>小魔瓶</text>"
]
const nameToId={
    "新手剑":0,"新手布鞋":1,"穿刺":2,"粘液球":3,"粘液头盔":4,"粘液护手":5,"粘液护甲":6,"粘液护腿":7,"粘液块护甲":8,"粘液鞋子":9,
    "小刀":10,"长矛":11,"哥布林眼睛":12,"哥布林心脏":13,"哥布林雕像":14,"凝聚长矛":15,"冲刺":16,
    "狼牙":17,"狼皮":18,"疾风魔核":19,"野狼头盔":20,"野狼护手":21,"野狼护甲":22,"野狼护腿":23,"幻影刺":24,
    "鱼人鳞片":25,"三叉戟":26,"水球术":27,"小血瓶":28,"小魔瓶":29,
}
const skillId=[
    2,15,16,24,27
]
var bagDisplay=[]
function GetDisplay(){
    let partMul=[0,0,0,0,0]
    for(let i=0;i<5;i++){
        partMul[i]=1+0.05*player.equipmentUpLevel[i]
    }//武器 头盔 护甲 护手 护腿
    bagDisplay=[]
    bagDisplay.push("基础攻击力:"+format(2*partMul[0],1)+"<br><br>最基础的武器")
    bagDisplay.push("基础移动速度:30px/s<br><br>最基础的代步工具")
    bagDisplay.push("力量系技能<br>伤害系数:"+format(100+10*player.skillLevel[2].lv,1)+"%<br>伤害路径:前摇0.1s 向前20px 0.4s 向后20px 0.4s 后摇0.1s<br>冷却:1s")
    bagDisplay.push("击杀<text style='color:green'>史莱姆</text>爆出的材料,可以用于附魔或者合成")
    bagDisplay.push("生命值+"+format(20*partMul[1],1)+"<br><br>由粘液球制成的头盔")
    bagDisplay.push("攻击+"+format(1*partMul[3],1)+"<br>生命值+"+format(10*partMul[3],1)+"<br><br>由粘液球制成的护手")
    bagDisplay.push("防御+"+format(1*partMul[2],1)+"<br>生命值+"+format(10*partMul[2],1)+"<br><br>由粘液球制成的护甲")
    bagDisplay.push("攻击+"+format(1*partMul[4],1)+"<br>生命值+"+format(10*partMul[4],1)+"<br><br>由粘液球制成的护腿")
    bagDisplay.push("防御+"+format(9*partMul[2],1)+"<br>生命值+"+format(90*partMul[2],1)+"<br><br>由<text style='color:lime'>粘液块</text>制成的护甲")
    bagDisplay.push("基础移动速度:35px/s<br>特性-潜行:当你不在任何怪物的仇恨范围内时,你的移动速度额外提升50%<br><br>由大量粘液制成的鞋子")
    bagDisplay.push("基础攻击力:"+format(8*partMul[0],1)+"<br>特性-短小精悍I:攻击距离-5px,伤害提升20%<br><br>从<text style='color:grey'>小刀</text><text style='color:lime'>哥布林</text>身上掉落的武器")
    bagDisplay.push("基础攻击力:"+format(5*partMul[0],1)+"<br>特性-远攻I:攻击距离+10px<br><br>从<text style='color:grey'>长矛</text><text style='color:lime'>哥布林</text>身上掉落的武器")
    bagDisplay.push("击杀<text style='color:lime'>哥布林</text>爆出的材料,可以用于附魔")
    bagDisplay.push("击杀<text style='color:lime'>哥布林</text>爆出的材料,可以用于附魔")
    bagDisplay.push("击杀<text style='color:lime'>哥布林</text>爆出的物品,似乎是哥布林部落祭拜的对象,用途未知")
    bagDisplay.push("魔法系技能<br>消耗魔力:"+format(4+4*player.skillLevel[15].lv,1)+"<br>攻击范围:"+format(100+10*player.skillLevel[15].lv,1)+"px<br>伤害系数:"+format(200+20*player.skillLevel[15].lv,1)+"%<br>伤害路径:前摇0.5s 锁定最近的敌人并射出 1s 1s后消失<br>冷却:3s")
    bagDisplay.push("通用系技能<br>向面朝方向冲刺"+format(0.2+0.05*Math.max(0,player.skillLevel[16].lv-4),1)+"s 速度为"+format(3+0.5*Math.min(player.skillLevel[16].lv,4),1)+"倍当前移动速度<br>冷却:3s")
    bagDisplay.push("击杀野狼爆出的材料,可以用于附魔")
    bagDisplay.push("击杀野狼爆出的材料,可以用于附魔或合成")
    bagDisplay.push("击杀野狼爆出的稀有材料,可以用于附魔")
    bagDisplay.push("生命值+"+format(100*partMul[1],1)+"<br><br>由狼皮制成的头盔")
    bagDisplay.push("攻击+"+format(5*partMul[3],1)+"<br>生命值+"+format(50*partMul[3],1)+"<br><br>由狼皮制成的护手")
    bagDisplay.push("防御+"+format(5*partMul[2],1)+"<br>生命值+"+format(50*partMul[2],1)+"<br><br>由狼皮制成的护甲")
    bagDisplay.push("攻击+"+format(5*partMul[4],1)+"<br>生命值+"+format(50*partMul[4],1)+"<br><br>由狼皮制成的护腿")
    bagDisplay.push("状态系技能<br>消耗魔力:"+format(5+1*player.skillLevel[24].lv,1)+"/s<br>穿刺改为三把幻影刺<br>伤害系数:3*"+format(50+10*player.skillLevel[24].lv,1)+"%")
    bagDisplay.push("击杀鱼人守卫爆出的材料,可以用于附魔")
    bagDisplay.push("基础攻击力:"+format(20*partMul[0],1)+"<br>魔法伤害x1.5<br><br>附加技能-水龙波 Lv."+player.skillLevel[26].lv+" ("+format(player.skillLevel[26].mastery,1)+"/"+format(player.skillLevel[26].base*Math.pow(2,player.skillLevel[26].lv),1)+")"
        +"<br>消耗魔力:"+format(50+20*player.skillLevel[26].lv,1)+"<br>累计持续时间:10s<br>伤害系数:"+format(120+30*player.skillLevel[26].lv,1)+"%<br>伤害范围:"
        +format(10+2*player.skillLevel[26].lv,1)+"px*"+format(75+5*player.skillLevel[26].lv,1)+"px<br>冷却时间:30s"
    )
    bagDisplay.push("魔法系技能<br>消耗魔力:"+format(10+2*player.skillLevel[27].lv,1)+"<br>攻击范围:"+format(100+10*player.skillLevel[27].lv,1)+"px 持续追踪<br>移动速度:"+format(30+10*player.skillLevel[27].lv,1)+"px/s<br>持续时间:"+format(5+0.5*player.skillLevel[27].lv,1)+"s<br>伤害系数:0%<br>附加效果:被触碰到的敌人速度x0.5<br>冷却:10s")
    bagDisplay.push("使用后的"+format(30,1)+"s内 , 每秒持续恢复"+format(10,1)+"生命值")
    bagDisplay.push("使用后的"+format(30,1)+"s内 , 每秒持续恢复"+format(5 ,1)+"魔力值")
}
const bagPictureSrc=[
    "Sword","Shoes","SkillStab","SlimeBall","SlimeHelmet","SlimeArm","SlimeArmor","SlimeLeg","SolidSlimeArmor","SlimeShoes",
    "Knife","Spear","GoblinEye","GoblinHeart","GoblinStatue","SkillSummonSpear","SkillDash",
    "WolfTooth","WolfLeather","StormCore","WolfHelmet","WolfArm","WolfArmor","WolfLeg","SkillPhantomStab",
    "FishScale","Trident","SkillWaterBall","LittleHpBottle","LittleMpBottle"
]
const canEquip=[
    0,1,4,5,6,7,8,9,10,11,20,21,22,23,26
]
const equipPart=[
    "weaponId","shoesId","","","helmetId","armId","armorId","legId","armorId","shoesId","weaponId","weaponId","","","","","",
    "","","","helmetId","armId","armorId","legId","","","weaponId","","",""
]
const merchantList=[
    [[[[5]],[[1,3]]],
     [[[10,3]],[[1,4]]],
     [[[10,3]],[[1,5]]],
     [[[10,3]],[[1,6]]],
     [[[10,3]],[[1,7]]],
     [[[30,3],[1,4],[1,5],[1,6],[1,7]],[[1,9]]],
     [[[10]],[[1,12]]],
     [[[10]],[[1,13]]],
     [[[20]],[[1,14]]],
     [[[1,3]],[[2]]],
     [[[1,4]],[[5,3]]],
     [[[1,5]],[[5,3]]],
     [[[1,6]],[[5,3]]],
     [[[1,7]],[[5,3]]],
     [[[1,12]],[[5]]],
     [[[1,13]],[[5]]],
     [[[1,14]],[[10]]],
     [[[1,15]],[[100]]],
    ],
    [[[[10,14]],[[1,16]]]
    ],
    [[[[500]],[["洗点"]]],
     [[[200]],[[1,28]]],
     [[[200]],[[1,29]]],
     [[[50]],[[1,17]]],
     [[[20]],[[1,18]]],
     [[[30,18]],[[1,20]]],
     [[[30,18]],[[1,21]]],
     [[[30,18]],[[1,22]]],
     [[[30,18]],[[1,23]]],
     [[[100]],[[1,25]]],
     [[[1,17]],[[25]]],
     [[[1,18]],[[10]]],
     [[[1,19]],[[200]]],
     [[[1,20]],[[15,18]]],
     [[[1,21]],[[15,18]]],
     [[[1,22]],[[15,18]]],
     [[[1,23]],[[15,18]]],
     [[[1,25]],[[50]]],
    ],
]
const enchantingDisplay=[
    `<text style='color:lime'>粘液球</text><text style='color:purple'>附魔</text><br>攻击时有40%/s对敌人施加三秒
    <text style='color:brown'>[迟缓I]</text><br><br>
    <text style='color:brown'>[迟缓I]:所有行动速度下降30%</text>`,
    `哥布林<text style='color:grey'>眼睛</text><text style='color:purple'>附魔</text><br>攻击距离+5px`,
    `哥布林<text style='color:red'>心脏</text><text style='color:purple'>附魔</text><br>最大生命值+50<br>最大魔力值+20`,
    `狼牙<text style='color:purple'>附魔</text><br>攻击时有50%/s对敌人施加两秒
    <text style='color:red'>[流血I]</text><br><br>
    <text style='color:red'>[流血I]:每秒收到10点伤害 , 且受到的物理伤害x1.2</text>`,
    `狼皮<text style='color:purple'>附魔</text><br>防御+2`,
    `<text style='color:cyan'>疾风魔核</text><text style='color:purple'>附魔</text><br>基础移动速度+5px`,
    `<text style='color:lightblue'>鱼人鳞片</text><text style='color:purple'>附魔</text><br>最大魔力值+20<br>魔力恢复速度+1/s<br>魔法伤害x1.1`,
]
const enchantingSrc=[
    "SlimeBall","GoblinEye","GoblinHeart","WolfTooth","WolfLeather","StormCore","FishScale"
]
const buffSrc=[
    "SlowI","BleedingI"
]
const mapName=["史莱姆森林","新手村","哥布林营地","篝火","疾风城","试炼场","疾风山谷","鱼人沼泽"]
const monsterBasic=[
    {hp:10 ,hpmax:10 ,atk:1 ,def:0 ,speed:10,hatredRadius:50 ,attackRadius:20,stopMoveRadius:15,attackSpeed:2   },
    {hp:50 ,hpmax:50 ,atk:12,def:2 ,speed:15,hatredRadius:60 ,attackRadius:15,stopMoveRadius:10,attackSpeed:1.75},
    {hp:35 ,hpmax:35 ,atk:15,def:2 ,speed:15,hatredRadius:100,attackRadius:80,stopMoveRadius:40,attackSpeed:4   },
    {hp:100,hpmax:100,atk:30,def:8 ,speed:30,hatredRadius:70 ,attackRadius:40,stopMoveRadius:10,attackSpeed:1.5 },
    {hp:150,hpmax:150,atk:45,def:12,speed:40,hatredRadius:100,attackRadius:60,stopMoveRadius:15,attackSpeed:1   },
    {hp:200,hpmax:200,atk:50,def:20,speed:25,hatredRadius:100,attackRadius:80,stopMoveRadius:40,attackSpeed:3   },
]
const monsterDrop=[
    [1,0.5,[[0.3,"粘液球"],[0.02,"粘液头盔"],[0.02,"粘液护手"],[0.02,"粘液护甲"],[0.02,"粘液护腿"],[0.001,"粘液块护甲"]]],
    [3,2,[[0.2,"哥布林眼睛"],[0.2,"哥布林心脏"],[0.1,"哥布林雕像"],[0.02,"小刀"]]],
    [3,2,[[0.2,"哥布林眼睛"],[0.2,"哥布林心脏"],[0.1,"哥布林雕像"],[0.02,"长矛"],[0.01,"凝聚长矛"]]],
    [8,5,[[0.2,"狼牙"],[0.5,"狼皮"],[0.01,"疾风魔核"],[0.01,"野狼头盔"],[0.01,"野狼护手"],[0.01,"野狼护甲"],[0.01,"野狼护腿"],[0.004,"幻影刺"]]],
    [20,10,[[0.5,"狼牙"],[1,"狼皮"],[0.1,"疾风魔核"],[0.1,"野狼头盔"],[0.1,"野狼护手"],[0.1,"野狼护甲"],[0.1,"野狼护腿"],[0.04,"幻影刺"]]],
    [30,20,[[0.2,"鱼人鳞片"],[0.002,"三叉戟"],[0.002,"水球术"]]],
]
const monsterDisplayName={0:"<text style='color:green'>史莱姆</text>",
1:"<text style='color:grey'>小刀</text><text style='color:lime'>哥布林</text>",
2:"<text style='color:grey'>长矛</text><text style='color:lime'>哥布林</text>",
3:"野狼",
4:"<text style='color:red'>狂暴野狼</text>",
5:"<text style='color:lightblue'>鱼人守卫</text>",
"boss0":"<text style='color:yellow'>稻草人</text>"}
const monsterName=["Slime","KnifeGoblin","SpearGoblin","Wolf","FuryWolf","FishGuard"]
const monsterSize=[[9,6],[15,15],[15,15],[25,12.5],[25,12.5],[20,20]]

const weaponSize={0:[3,20],10:[6,15],11:[3,25],26:[5,25]}
const weaponDamage={0:2,10:8,11:5,26:20}
const weaponName={0:"Sword",10:"Knife",11:"Spear",26:"Trident"}
const weaponDisplayName={0:"<text style='color:grey'>新手剑</text>",10:"<text style='color:grey'>小刀</text>",
    11:"<text style='color:grey'>长矛</text>",26:"<text style='color:lightblue'>三叉戟</text>"}

const playerSize=[10,10]

const equipmentUpPossibility=[1,0.9,0.8,0.7,0.6,0.5,0.45,0.4,0.35,0.3,0.28,0.26,0.24,0.22,0.20,0.18,0.16,0.14,0.12,0.10,
    0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05
    ,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05
    ,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05
    ,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05
    ,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05
    ,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05
    ,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05
    ,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05
]

function addedPlayerData() { return {
    tmtmtm:Date.now()/1e3,logs:[],minus:0,mapId:0,
    seed1:Math.floor(Math.random()*4294967296),seed2:Math.floor(Math.random()*4294967296),
    seed3:Math.floor(Math.random()*4294967296),seed4:Math.floor(Math.random()*4294967296),
    strength:0,wisdom:0,agile:0,vitality:0,freePoint:0,
    lv:0,exp:0,money:0,
    hp:10,hpmax:10,atk:0,def:0,mp:0,mpmax:0,mpDamageMul:1,
    mapStr:"",openId:-1,reviveMapId:1,
    hpBottle:[-1,-1],mpBottle:[-1,-1],
    x:200,y:200,dir:0,rDir:0,movespeed:30.0,moveList:[],canMoveWhileAttacking:false,canTurnWhileAttacking:false,inBubble:false,
    isAttacking:false,nowAttackTime:0,attackPosition:[],nowAttackId:0,
    skillId:[2,-1,-1,-1,-1,-1,-1],skillKey:["space","j","k","l","u","i","o"],skillCoolDown:[0,0,0,0,0,0,0],chooseSkillId:-100,
    skillLevel:{
        2 :{mastery:0,base:100,lv:0,},
        15:{mastery:0,base:100,lv:0,},
        16:{mastery:0,base:200,lv:0,},
        24:{mastery:0,base:100,lv:0,},
        26:{mastery:0,base:100,lv:0,},
        27:{mastery:0,base:100,lv:0,},
    },
    skill24Switch:false,weapon26Switch:-1,weapon26CoolDown:0,weapon26LogId:0,
    unlockBook:false,chooseBookId:-1,

    monsterList:[],summonList:[],
    killNumBoss0:0,boss0DamageList:[0,0,0,0],//hand,body,wave,grass
    killNum:[],
    haveMonsterHatred:false,

    //bag
    bagPage:1,chooseBag:-1,bag:[],bagUnlock:[true,true,true],
    equipmentUpLevel:[0,0,0,0,0],
    weaponId:0,weaponEnchantingId:-1,
    armId:-1,armEnchantingId:-1,
    shoesId:1,shoesEnchantingId:-1,
    legId:-1,legEnchantingId:-1,
    helmetId:-1,helmetEnchantingId:-1,
    armorId:-1,armorEnchantingId:-1,
}}