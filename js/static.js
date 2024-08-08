const idToName=[
    "<text style='color:grey'>新手剑</text>","<text style='color:grey'>新手布鞋</text>","穿刺","粘液球","粘液头盔","粘液护手","粘液护甲","粘液护腿",
    "<text style='color:lime'>粘液块护甲</text>","<text style='color:lime'>粘液鞋子</text>",
    "<text style='color:grey'>小刀</text>","<text style='color:grey'>长矛</text>","哥布林<text style='color:grey'>眼睛</text>","哥布林<text style='color:red'>心脏</text>",
    "<text style='color:maroon'>哥布林雕像</text>","凝聚长矛","冲刺",
    "狼牙","狼皮","<text style='color:cyan'>疾风魔核</text>","野狼头盔","野狼护手","野狼护甲","野狼护腿","幻影刺",
    "<text style='color:lightblue'>鱼人鳞片</text>","<text style='color:lightblue'>三叉戟</text>","<text style='color:lightblue'>水球术</text>",
    "<text style='color:red'>小血瓶</text>","<text style='color:blue'>小魔瓶</text>",
    "匕首","潜行","<text style='color:red'>中血瓶</text>","<text style='color:blue'>中魔瓶</text>","<text style='color:#bfbf3f'>微光术</text>",
    "暗影刺客密信","<text style='color:brown'>兽人皮革</text>","<text style='color:brown'>兽人头盔</text>","<text style='color:brown'>兽人护手</text>",
    "<text style='color:brown'>兽人护甲</text>","<text style='color:brown'>兽人护腿</text>","<text style='color:brown'>兽人皮鞋</text>",
    "<text style='color:brown'>兽人战斧</text>","半月斩","<text style='color:red'>兽人血脉珠</text>"
]
const nameToId={
    "新手剑":0,"新手布鞋":1,"穿刺":2,"粘液球":3,"粘液头盔":4,"粘液护手":5,"粘液护甲":6,"粘液护腿":7,"粘液块护甲":8,"粘液鞋子":9,
    "小刀":10,"长矛":11,"哥布林眼睛":12,"哥布林心脏":13,"哥布林雕像":14,"凝聚长矛":15,"冲刺":16,
    "狼牙":17,"狼皮":18,"疾风魔核":19,"野狼头盔":20,"野狼护手":21,"野狼护甲":22,"野狼护腿":23,"幻影刺":24,
    "鱼人鳞片":25,"三叉戟":26,"水球术":27,"小血瓶":28,"小魔瓶":29,
    "匕首":30,"潜行":31,"中血瓶":32,"中魔瓶":33,"微光术":34,
    "暗影刺客密信":35,"兽人皮革":36,"兽人头盔":37,"兽人护手":38,"兽人护甲":39,"兽人护腿":40,"兽人皮鞋":41,"兽人战斧":42,"半月斩":43,"兽人血脉珠":44,
}
const skillId=[
    2,15,16,24,27,31,34,43
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
    bagDisplay.push("力量系技能<br>伤害系数:"+format(100+10*player.skillLevel[2].lv+(player.weaponId==10?20:0),1)+"%<br>伤害路径:前摇0.1s 向前20px 0.4s 向后20px 0.4s 后摇0.1s<br>冷却:1s")
    bagDisplay.push("击杀<text style='color:green'>史莱姆</text>爆出的材料,可以用于附魔或者合成")
    bagDisplay.push("生命值+"+format(20*partMul[1],1)+"<br><br>由粘液球制成的头盔")
    bagDisplay.push("攻击+"+format(1*partMul[3],1)+"<br>生命值+"+format(10*partMul[3],1)+"<br><br>由粘液球制成的护手")
    bagDisplay.push("防御+"+format(1*partMul[2],1)+"<br>生命值+"+format(10*partMul[2],1)+"<br><br>由粘液球制成的护甲")
    bagDisplay.push("攻击+"+format(1*partMul[4],1)+"<br>生命值+"+format(10*partMul[4],1)+"<br><br>由粘液球制成的护腿")
    bagDisplay.push("防御+"+format(9*partMul[2],1)+"<br>生命值+"+format(90*partMul[2],1)+"<br><br>由<text style='color:lime'>粘液块</text>制成的护甲")
    bagDisplay.push("基础移动速度:32.5px/s<br>特性-急行:当你不在任何怪物的仇恨范围内时,你的移动速度额外提升50%<br><br>由大量粘液制成的鞋子")
    bagDisplay.push("基础攻击力:"+format(8*partMul[0],1)+"<br>特性-短小精悍:攻击距离-5px,穿刺伤害系数+20%<br><br><text style='color:grey'>小刀</text><text style='color:lime'>哥布林</text>的武器")
    bagDisplay.push("基础攻击力:"+format(5*partMul[0],1)+"<br>特性-远攻I:攻击距离+10px<br><br><text style='color:grey'>长矛</text><text style='color:lime'>哥布林</text>的武器")
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
        +format(10+2*player.skillLevel[26].lv,1)+"px*"+format(75+5*player.skillLevel[26].lv,1)+"px<br>冷却时间:30s<br><br>鱼人守卫的武器"
    )
    bagDisplay.push("魔法系技能<br>消耗魔力:"+format(10+2*player.skillLevel[27].lv,1)+"<br>攻击范围:"+format(100+10*player.skillLevel[27].lv,1)+"px 持续追踪<br>移动速度:"+format(30+10*player.skillLevel[27].lv,1)+"px/s<br>持续时间:"+format(5+0.5*player.skillLevel[27].lv,1)+"s<br>伤害系数:0%<br>附加效果:被触碰到的敌人速度x0.5<br>冷却:10s")
    bagDisplay.push("使用后的"+format(30,1)+"s内 , 每秒持续恢复"+format(10,1)+"生命值")
    bagDisplay.push("使用后的"+format(30,1)+"s内 , 每秒持续恢复"+format(5 ,1)+"魔力值")
    bagDisplay.push("基础攻击力:"+format(30*partMul[0],1)+"<br>与技能-潜行配合有更强的效果<br><br>暗影刺客的武器")
    bagDisplay.push("力量系技能<br>消耗魔力:"+format(10+2*player.skillLevel[31].lv,1)+"<br>"+format(2.5+0.5*player.skillLevel[31].lv,1)
    +"s内怪物将无法发现你<br>当你主动攻击时将脱离潜行状态<br><br>装备匕首类武器时 , 下一次使用力量系技能时攻击x"+format(1.5+0.1*player.skillLevel[31].lv,1)+"<br>冷却:10s")
    bagDisplay.push("使用后的"+format(30,1)+"s内 , 每秒持续恢复"+format(20,1)+"生命值")
    bagDisplay.push("使用后的"+format(30,1)+"s内 , 每秒持续恢复"+format(10,1)+"魔力值")
    bagDisplay.push("通用系技能<br>消耗魔力:"+format(10+2*player.skillLevel[34].lv,1)+"<br>照亮周身"
    +format(100+10*player.skillLevel[34].lv,1)+"px的地方<br>持续:10s<br>冷却:15s")
    bagDisplay.push("暗影刺客一族的密信,可以交给狂兽城城主")
    bagDisplay.push("击杀兽人战士爆出的材料,可以用于附魔或合成")
    bagDisplay.push("生命值+"+format(200*partMul[1],1)+"<br><br>由<text style='color:brown'>兽人皮革</text>制成的头盔")
    bagDisplay.push("攻击+"+format(10*partMul[3],1)+"<br>生命值+"+format(100*partMul[3],1)+"<br><br>由<text style='color:brown'>兽人皮革</text>制成的护手")
    bagDisplay.push("防御+"+format(10*partMul[2],1)+"<br>生命值+"+format(100*partMul[2],1)+"<br><br>由<text style='color:brown'>兽人皮革</text>制成的护甲")
    bagDisplay.push("攻击+"+format(10*partMul[4],1)+"<br>生命值+"+format(100*partMul[4],1)+"<br><br>由<text style='color:brown'>兽人皮革</text>制成的护腿")
    bagDisplay.push("基础移动速度:35px/s<br>特性-狂战:当你在任何怪物的仇恨范围内时,你的移动速度额外提升25%<br><br>由大量<text style='color:brown'>兽人皮革</text>制成的鞋子")
    bagDisplay.push("基础攻击力:"+format(45*partMul[0],1)+"<br>技能-半月斩伤害系数+30%<br><br>兽人战士的武器")
    bagDisplay.push("力量系技能<br>消耗魔力:"+format(20+4*player.skillLevel[43].lv,1)+"<br>伤害系数:"+format(120+20*player.skillLevel[43].lv+(player.weaponId==42?30:0),1)+"%<br>"
    +"伤害路径:向面朝方向挥出一个半圆 2s<br>冷却:7s")
    bagDisplay.push("蕴含兽人一族血脉之力的珠子,可以交给狂兽城城主或者用来附魔")
}
const bagPictureSrc=[
    "Sword","Shoes","SkillStab","SlimeBall","SlimeHelmet","SlimeArm","SlimeArmor","SlimeLeg","SolidSlimeArmor","SlimeShoes",
    "Knife","Spear","GoblinEye","GoblinHeart","GoblinStatue","SkillSummonSpear","SkillDash",
    "WolfTooth","WolfLeather","StormCore","WolfHelmet","WolfArm","WolfArmor","WolfLeg","SkillPhantomStab",
    "FishScale","Trident","SkillWaterBall","LittleHpBottle","LittleMpBottle",
    "Dagger","SkillStealth","MediumHpBottle","MediumMpBottle","SkillLight",
    "ShadowLetter","OrcLeather","OrcHelmet","OrcArm","OrcArmor","OrcLeg","OrcShoes","OrcAxe","SkillSickle","OrcBall"
]
const canEquip=[
    0,1,4,5,6,7,8,9,10,11,20,21,22,23,26,30,37,38,39,40,41,42
]
const equipPart=[
    "weaponId","shoesId","","","helmetId","armId","armorId","legId","armorId","shoesId","weaponId","weaponId","","","","","",
    "","","","helmetId","armId","armorId","legId","","","weaponId","","","","weaponId","","","","",
    "","","helmetId","armId","armorId","legId","shoesId","weaponId","",""
]
const merchantList=[
    [
        [[[5]],[[1,3]]],
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
    [
        [[[10,14]],[[1,16]]]
    ],
    [
        [[[500]],[["洗点"]]],
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
    [
        [[[500]],[["洗点"]]],
        [[[200]],[[1,28]]],
        [[[200]],[[1,29]]],
        [[[800]],[[1,32]]],
        [[[800]],[[1,33]]],
        [[[10000]],[[1,34]]],
        [[[100]],[[1,36]]],
        [[[50,36]],[[1,37]]],
        [[[50,36]],[[1,38]]],
        [[[50,36]],[[1,39]]],
        [[[50,36]],[[1,40]]],
        [[[100,36],[1,37],[1,38],[1,39],[1,40]],[[1,41]]],
        [[[1,36]],[[50]]],
        [[[1,37]],[[25,36]]],
        [[[1,38]],[[25,36]]],
        [[[1,39]],[[25,36]]],
        [[[1,40]],[[25,36]]],
        [[[1,42]],[[5000]]],
    ],
]
const enchantingList=[
    [[0,0],[1,1],[2,2]],
    [[0,3],[1,4],[2,4],[3,4],[4,4],[5,5],[1,6],[2,6],[3,6],[4,6]],
    [[1,7],[2,7],[3,7],[4,7],[2,8]]
]
const enchantingName=["10粘液球","10哥布林<text style='color:grey'>眼睛</text>",'10哥布林<text style="color:red">心脏</text>',
    "10狼牙","10狼皮","1<text style='color:cyan'>疾风魔核</text>",'10<text style="color:lightblue">鱼人鳞片</text>',"30<text style='color:brown'>兽人皮革</text>",
    "10<text style='color:red'>兽人血脉珠</text>"
]
const enchantingDisplay=[
    `<text style='color:lime'>粘液球</text><text style='color:purple'>附魔</text><br>攻击时有40%/s对敌人施加三秒
    <text style='color:brown'>[迟缓I]</text><br><br>
    <text style='color:brown'>[迟缓I]:所有行动速度下降30%</text>`,
    `哥布林<text style='color:grey'>眼睛</text><text style='color:purple'>附魔</text><br>穿刺攻击距离+5px`,
    `哥布林<text style='color:red'>心脏</text><text style='color:purple'>附魔</text><br>最大生命值+50<br>最大魔力值+20`,
    `狼牙<text style='color:purple'>附魔</text><br>攻击时有50%/s对敌人施加两秒
    <text style='color:red'>[流血I]</text><br><br>
    <text style='color:red'>[流血I]:每秒收到10点伤害 , 且受到的物理伤害x1.2</text>`,
    `狼皮<text style='color:purple'>附魔</text><br>防御+2`,
    `<text style='color:cyan'>疾风魔核</text><text style='color:purple'>附魔</text><br>基础移动速度+5px`,
    `<text style='color:lightblue'>鱼人鳞片</text><text style='color:purple'>附魔</text><br>最大魔力值+20<br>魔力恢复+1/s<br>魔法伤害x1.1`,
    `<text style='color:brown'>兽人皮革</text><text style='color:purple'>附魔</text><br>防御+5<br>生命恢复+1/s`,
    `<text style='color:red'>兽人血脉珠</text><text style='color:purple'>附魔</text><br>所有生命恢复效果翻倍`,
]
const enchantingSrc=[
    "SlimeBall","GoblinEye","GoblinHeart","WolfTooth","WolfLeather","StormCore","FishScale","OrcLeather","OrcBall"
]
const partDisplay=["武器","头盔","护甲","护手","护腿","鞋子"]
const buffSrc=["SlowI","BleedingI","LowAttackI","LowDefenceI","LowSpeedI","RageI","HealI"]
const buffSize=[[7,7],[7,7],[15,10],[15,10],[15,10],[10,10],[9,9]]
const mapName=["史莱姆森林","新手村","哥布林营地","篝火","疾风城","试炼场","疾风山谷","鱼人沼泽","暗影玄关","狂兽城","兽人部落外围","兽人部落深处"]
const monsterBasic=[
    {hp:10 ,hpmax:10 ,atk:1  ,def:0 ,speed:10,hatredRadius:50 ,attackRadius:20,stopMoveRadius:15,attackSpeed:2   },
    {hp:50 ,hpmax:50 ,atk:12 ,def:2 ,speed:15,hatredRadius:60 ,attackRadius:15,stopMoveRadius:10,attackSpeed:1.75},
    {hp:35 ,hpmax:35 ,atk:15 ,def:2 ,speed:15,hatredRadius:100,attackRadius:80,stopMoveRadius:40,attackSpeed:4   },
    {hp:100,hpmax:100,atk:30 ,def:8 ,speed:30,hatredRadius:70 ,attackRadius:40,stopMoveRadius:10,attackSpeed:1.5 },
    {hp:150,hpmax:150,atk:45 ,def:12,speed:40,hatredRadius:100,attackRadius:60,stopMoveRadius:15,attackSpeed:1   },
    {hp:200,hpmax:200,atk:50 ,def:20,speed:25,hatredRadius:100,attackRadius:80,stopMoveRadius:40,attackSpeed:3   },
    {hp:150,hpmax:150,atk:150,def:10,speed:35,hatredRadius:100,attackRadius:20,stopMoveRadius:10,attackSpeed:1   },
    {hp:300,hpmax:300,atk:120,def:30,speed:30,hatredRadius:80 ,attackRadius:40,stopMoveRadius:25,attackSpeed:1   },
    {hp:450,hpmax:450,atk:200,def:35,speed:35,hatredRadius:100,attackRadius:50,stopMoveRadius:30,attackSpeed:1   },
    {hp:350,hpmax:350,atk:0  ,def:30,speed:25,hatredRadius:80 ,attackRadius:80,stopMoveRadius:60,attackSpeed:2   },
]
const monsterDrop=[
    [1  ,0.5,[[0.3,"粘液球"],[0.02,"粘液头盔"],[0.02,"粘液护手"],[0.02,"粘液护甲"],[0.02,"粘液护腿"],[0.001,"粘液块护甲"]]],
    [3  ,2  ,[[0.2,"哥布林眼睛"],[0.2,"哥布林心脏"],[0.1,"哥布林雕像"],[0.02,"小刀"]]],
    [3  ,2  ,[[0.2,"哥布林眼睛"],[0.2,"哥布林心脏"],[0.1,"哥布林雕像"],[0.02,"长矛"],[0.01,"凝聚长矛"]]],
    [8  ,5  ,[[0.2,"狼牙"],[0.5,"狼皮"],[0.01,"疾风魔核"],[0.01,"野狼头盔"],[0.01,"野狼护手"],[0.01,"野狼护甲"],[0.01,"野狼护腿"],[0.004,"幻影刺"]]],
    [20 ,10 ,[[0.5,"狼牙"],[1,"狼皮"],[0.1,"疾风魔核"],[0.1,"野狼头盔"],[0.1,"野狼护手"],[0.1,"野狼护甲"],[0.1,"野狼护腿"],[0.04,"幻影刺"]]],
    [30 ,20 ,[[0.2,"鱼人鳞片"],[0.002,"三叉戟"],[0.002,"水球术"]]],
    [50 ,30 ,[[0.005,"匕首"],[0.005,"潜行"],[0.01,"暗影刺客密信"]]],
    [75 ,50 ,[[0.5,"兽人皮革"],[0.01,"兽人头盔"],[0.01,"兽人护手"],[0.01,"兽人护甲"],[0.01,"兽人护腿"],[0.005,"兽人战斧"],[0.005,"半月斩"]]],
    [100,70 ,[[0.8,"兽人皮革"],[0.015,"兽人头盔"],[0.015,"兽人护手"],[0.015,"兽人护甲"],[0.015,"兽人护腿"],[0.01,"兽人战斧"],[0.01,"半月斩"]]],
    [120,100 ,[[1,"兽人皮革"],[0.5,"兽人血脉珠"]]],
]
const monsterDisplayName={0:"<text style='color:green'>史莱姆</text>",
1:"<text style='color:grey'>小刀</text><text style='color:#00bf00'>哥布林</text>",
2:"<text style='color:grey'>长矛</text><text style='color:#00bf00'>哥布林</text>",
3:"野狼",
4:"<text style='color:red'>狂暴野狼</text>",
5:"<text style='color:lightblue'>鱼人守卫</text>",
6:"<text style='color:grey'>暗影刺客</text>",
7:"<text style='color:brown'>兽人战士</text>",
8:"<text style='color:brown'>兽人<text style='color:maroon'>精锐</text>战士</text>",
9:"<text style='color:brown'>兽人</text><text style='color:purple'>祭祀</text>",
"boss0":"<text style='color:#cfcf00'>稻草人</text>"}
const monsterName=["Slime","KnifeGoblin","SpearGoblin","Wolf","FuryWolf","FishGuard","ShadowAssassin","OrcWarrior","OrcEliteWarrior","OrcWizard"]
const monsterSize=[[11,8],[15,15],[15,15],[25,12.5],[25,12.5],[20,20],[9,10.5],[30,30],[30,30],[30,30]]

const weaponSize={0:[3,20],10:[6,15],11:[3,25],26:[5,25],30:[4,12],42:[7,20]}
const weaponDamage={0:2,10:8,11:5,26:20,30:30,42:45}
const weaponName={0:"Sword",10:"Knife",11:"Spear",26:"Trident",30:"Dagger",42:"OrcAxe"}
const weaponDisplayName={0:"<text style='color:grey'>新手剑</text>",10:"<text style='color:grey'>小刀</text>",
    11:"<text style='color:grey'>长矛</text>",26:"<text style='color:lightblue'>三叉戟</text>",30:"匕首",42:"<text style='color:brown'>兽人战斧</text>"}

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
    realStrength:0,realWisdom:0,realAgile:0,realVitality:0,
    lv:0,exp:0,money:0,
    hp:10,hpmax:10,atk:0,def:0,mp:0,mpmax:0,mpDamageMul:1,buffList:[],buffSeq:[],
    mapStr:"",openId:-1,reviveMapId:1,
    hpBottle:[-1,-1],mpBottle:[-1,-1],hpRe:0,mpRe:0,
    x:200,y:200,dir:0,rDir:0,movespeed:30.0,moveList:[],canMoveWhileAttacking:false,canTurnWhileAttacking:false,inBubble:false,inShadow:0,inLight:0,
    isAttacking:false,nowAttackTime:0,attackPosition:[],nowAttackId:0,
    skillId:[2,-1,-1,-1,-1,-1,-1],skillKey:["space","j","k","l","u","i","o"],skillCoolDown:[0,0,0,0,0,0,0],chooseSkillId:-100,
    skillLevel:{
        2 :{mastery:0,base:100,lv:0,},
        15:{mastery:0,base:100,lv:0,},
        16:{mastery:0,base:200,lv:0,},
        24:{mastery:0,base:100,lv:0,},
        26:{mastery:0,base:25,lv:0,},
        27:{mastery:0,base:100,lv:0,},
        31:{mastery:0,base:100,lv:0,},
    },
    skill24Switch:false,weapon26Switch:-1,weapon26CoolDown:0,weapon26LogId:0,weapon26Damage:0,
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