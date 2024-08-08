var keys={
    a:false,b:false,c:false,d:false,e:false,f:false,g:false,
    h:false,i:false,j:false,k:false,l:false,m:false,n:false,
    o:false,p:false,q:false,r:false,s:false,t:false,
    u:false,v:false,w:false,x:false,y:false,z:false,
    space: false,shift:false,
}
const strstrstr="abcdefghijklmnopqrstuvwxyz"
function keydown(event) {
    if(event.keyCode==16){
        keys["shift"]=true;
    }
    else if(event.keyCode==32){
        keys["space"]=true;
        if(player.chooseSkillId>=10000){
            player.skillKey[player.chooseSkillId-10000]="space"
            player.chooseSkillId=-1
        }
    }
    else if (event.keyCode == 65) {
        keys["a"] = true;
        player.dir=0;
    }
    else if (event.keyCode == 68) {
        keys["d"] = true;
        player.dir=1;
    }
    else if (event.keyCode == 83) {
        keys["s"] = true
        player.dir=3;
    }
    else if (event.keyCode == 87) {
        keys["w"] = true;
        player.dir=2;
    }
    else if(event.keyCode>=65 && event.keyCode<=90){
        keys[strstrstr[event.keyCode-65]]=true
        if(player.chooseSkillId>=10000){
            player.skillKey[player.chooseSkillId-10000]=strstrstr[event.keyCode-65]
            player.chooseSkillId=-1
        }
    }
}
function keyup(event){
    if(event.keyCode==16){
        keys["shift"]=false;
    }
    else if(event.keyCode==32){
        keys["space"]=false;
    }
    else if(event.keyCode>=65 && event.keyCode<=90){
        keys[strstrstr[event.keyCode-65]]=false
    }
}
function random() {
    player.seed1 >>>= 0; player.seed2 >>>= 0; player.seed3 >>>= 0; player.seed4 >>>= 0;
    let cast32 = (player.seed1 + player.seed2) | 0;
    player.seed1 = player.seed2 ^ player.seed2 >>> 9;
    player.seed2 = player.seed3 + (player.seed3 << 3) | 0;
    player.seed3 = (player.seed3 << 21 | player.seed3 >>> 11);
    player.seed4 = player.seed4 + 1 | 0;
    cast32 = cast32 + player.seed4 | 0;
    player.seed3 = player.seed3 + cast32 | 0;
    return (cast32 >>> 0) / 4294967296;
}
addLayer("tree-tab",{
    update(diff){
        //update fix
        document.getElementById("outer")["style"]["background-color"]="rgba(0,0,0,"+player.themeId*0.1+")"
        if(player.mapId!=5)player.boss0DamageList=[0,0,0,0]
        while(player.killNum.length<monsterName.length){
            player.killNum.push(0)
        }
        while(player.bag.length<idToName.length){
            player.bag.push(0)
        }
        while(player.bagUnlock.length<idToName.length){
            player.bagUnlock.push(false)
        }
        player.skillLevel[26].base=25
        if(player.skillLevel[31]===undefined){
            player.skillLevel[31]={mastery:0,base:100,lv:0,}
        }
        if(player.skillLevel[34]===undefined){
            player.skillLevel[34]={mastery:0,base:50,lv:0,}
        }
        if(player.skillLevel[43]===undefined){
            player.skillLevel[43]={mastery:0,base:100,lv:0,}
        }
        //

        let count=[]
        if(keys["a"]==true && keys["d"]==false)count.push("a")
        if(keys["d"]==true && keys["a"]==false)count.push("d")
        if(keys["w"]==true && keys["s"]==false)count.push("w")
        if(keys["s"]==true && keys["w"]==false)count.push("s")
        if(count.length==1){
            if(count[0]=="a")player.rDir=270
            if(count[0]=="d")player.rDir=90
            if(count[0]=="w")player.rDir=0
            if(count[0]=="s")player.rDir=180
        }
        else if(count.length==2){
            if(count[0]=="a"){
                if(count[1]=="w")
                    player.rDir=315
                if(count[1]=="s")
                    player.rDir=225
            }
            if(count[0]=="d"){
                if(count[1]=="w")
                    player.rDir=45
                if(count[1]=="s")
                    player.rDir=135
            }
        }
        player.devSpeed=1
        let dif=(Date.now()/1e3-player.tmtmtm)
        player.tmtmtm=Date.now()/1e3
        // dif=0.01
        // dif*=3
        let myCanv = document.getElementById("my_canvas")
        if(myCanv!==undefined && myCanv!==null){
        
        let my_canvas=myCanv
        let ctx=my_canvas.getContext("2d")
        player.inShadow=Math.max(0,player.inShadow-dif)
        player.inLight=Math.max(0,player.inLight-dif)
        
        DealBottle(dif)
        CalcFourAttribute()
        CalcAttribute(dif)
        MoveCharacter(dif)
        player.attackPosition=[]
        DrawMap(ctx)
        SummonMonster()
        MoveMonster(dif)
        AttackMonster(dif)
        DrawMonster(ctx,dif)
        DrawCharacter(ctx,dif)
        DealSkill(dif)
        DealWeaponSkill(ctx,dif)
        CalcMonsterDamage(dif)
        CalcSummonDamage(dif,ctx)
        if(player.mapId==4 && player.unlockBook==false){
            player.unlockBook=true
            player.logs.push({type:999,str:"你解锁了图鉴系统"})
            player.logs.push({type:999,str:"你来到了疾风城 , 眼界变得更加开阔了"})
        }
        let x=player.x,y=player.y
        if(keys["space"]==true && player.mapId==1){
            if(CalcDis(x,y,150,40)<=20){
                player.openId=0
            }
            else if(CalcDis(x,y,250,40)<=20){
                player.openId=1
            }
            else if(CalcDis(x,y,200,370)<=20){
                if(player.reviveMapId!=1)
                player.logs.push({type:999,str:"成功绑定复活点 "+mapName[1]})
                player.reviveMapId=1
            }
        }
        if(keys["space"]==true && player.mapId==3){
            if(CalcDis(x,y,200,200)<=20){
                player.openId=2
            }
        }
        if(keys["space"]==true && player.mapId==4){
            if (CalcDis(x,y,200,370)<=20){
                if(player.reviveMapId!=4)
                player.logs.push({type:999,str:"成功绑定复活点 "+mapName[4]})
                player.reviveMapId=4
            }
            else if (CalcDis(x,y,150,40)<=20){
                player.openId=3
            }
            else if (CalcDis(x,y,250,40)<=20){
                player.openId=4
            }
            else if (CalcDis(x,y,370,200)<=20){
                player.mapId=5
                player.monsterList=[{id:"boss0",
                                     x:200,
                                     y:200,
                                     stage:0,
                                     szx:50,
                                     szy:50,
                                     armSzx:4,
                                     armSzy:25,
                                     basic:{hp:2000,hpmax:2000,atk:50,def:10},
                                     dir:0,
                                     attackTime:0,
                                     nextAttackId:1,
                                     needNewAttack:false,
                                     moveList:[],
                                     src:"BossScareCrow",
                                     buffSeq:[],
                                     buffList:[],
                                     inBubble:false,}]
                player.summonList=[]
                player.x=200
                player.y=300
            }
        }
        if(keys["space"]==true && player.mapId==9){
            if (CalcDis(x,y,200,370)<=20){
                if(player.reviveMapId!=9)
                player.logs.push({type:999,str:"成功绑定复活点 "+mapName[9]})
                player.reviveMapId=9
            }
            else if (CalcDis(x,y,40,150)<=20){
                player.openId=5
            }
            else if (CalcDis(x,y,40,250)<=20){
                player.openId=6
            }
        }
        for(let i=0;i<player.skillId.length;i++){
            if(player.skillId[i]==24 && player.skill24Switch==true && NotInSafeZone()){
                player.skillLevel[24].mastery+=dif
            }
        }
        }
        GetDisplay()
    },
    tabFormat: {
        "主页":{
            buttonStyle(){return {"color":"black"}},
            content:[
                ["row",[
                ["display-text",function(){
                    let s='<div style="height:430px;width:300px;border:2px solid black;padding-top:15px;padding-left:15px;text-align:left;overflow:auto;margin-bottom:10px;">'
                    s+='<div style="text-align:left;margin-left:2px">'
                    s+='等级: '+player.lv+"<br>"
                    s+='金币: '+format(player.money,1)+"<br>"
                    s+='经验值: '+format(player.exp,1)+"/"+format(ExpMaxCalc(),1)+"<br>"
                    s+='生命值: '+format(player.hp,1)+"/"+format(player.hpmax,1)+"<br>生命恢复 +"+format(player.hpRe,1)+"/s<br>"
                    s+='魔力值: '+format(player.mp,1)+"/"+format(player.mpmax,1)+"<br>魔力恢复 +"+format(player.mpRe,1)+"/s<br>"
                    s+='魔法伤害倍数 x'+format(player.mpDamageMul,1)+"<br>"
                    s+='攻击力: '+(player.buffSeq.includes(2)?"<text style='color:purple'>":"")+format(player.atk,1)
                    +(player.buffSeq.includes(2)?"</text>":"")+"<br>"
                    s+='防御力: '+(player.buffSeq.includes(3)?"<text style='color:purple'>":"")+format(player.def,1)
                    +(player.buffSeq.includes(3)?"</text>":"")+"<br>"
                    s+='移动速度: '+(player.buffSeq.includes(4)?"<text style='color:purple'>":player.inBubble==true?"<text style='color:lightblue'>":"")
                    +format(player.movespeed,1)+"px/s<br>"+(player.inBubble==true || player.buffSeq.includes(4)?"</text>":"")
                    s+='</div>'
                    s+='<table><tr>'
                    s+='<td style="width:200px;text-align:left">力量<br>'+format((keys["shift"]==true?player.strength:player.realStrength))+"</td>"
                    +"<td><button onclick='Plus(0,1)' style='margin-left:10px;align-items: center;height:12px;width:15px;padding-bottom:14px;padding-top:0px;padding-left:2px;'>+</button>"
                    +"<button onclick='Plus(0,10)' style='align-items: center;height:12px;width:21px;padding-bottom:14px;padding-top:0px;padding-left:2px;'>++</button></td>"
                    s+='<td style="width:200px;text-align:left">体质<br>'+format((keys["shift"]==true?player.vitality:player.realVitality))+"</td>"
                    +"<td><button onclick='Plus(1,1)' style='margin-left:10px;align-items: center;height:12px;width:15px;padding-bottom:14px;padding-top:0px;padding-left:2px;'>+</button>"
                    +"<button onclick='Plus(1,10)' style='align-items: center;height:12px;width:21px;padding-bottom:14px;padding-top:0px;padding-left:2px;'>++</button></td>"
                    s+="</tr><tr>"
                    s+='<td style="width:200px;text-align:left">敏捷<br>'+format((keys["shift"]==true?player.agile:player.realAgile))+"</td>"
                    +"<td><button onclick='Plus(2,1)' style='margin-left:10px;align-items: center;height:12px;width:15px;padding-bottom:14px;padding-top:0px;padding-left:2px;'>+</button>"
                    +"<button onclick='Plus(2,10)' style='align-items: center;height:12px;width:21px;padding-bottom:14px;padding-top:0px;padding-left:2px;'>++</button></td>"
                    s+='<td style="width:200px;text-align:left">智力<br>'+format((keys["shift"]==true?player.wisdom:player.realWisdom))+"</td>"
                    +"<td><button onclick='Plus(3,1)' style='margin-left:10px;align-items: center;height:12px;width:15px;padding-bottom:14px;padding-top:0px;padding-left:2px;'>+</button>"
                    +"<button onclick='Plus(3,10)' style='align-items: center;height:12px;width:21px;padding-bottom:14px;padding-top:0px;padding-left:2px;'>++</button></td>"
                    s+="</tr></table>"
                    s+="自由属性点: "+player.freePoint+"<br><br>"
                    if(player.killNumBoss0>0){
                        s+="穿刺时可以移动 <button onclick='player.canMoveWhileAttacking=!player.canMoveWhileAttacking'>"+(player.canMoveWhileAttacking==true?"开":"关")+"</button><br>"
                    }
                    if(player.killNumBoss0>0){
                        s+="穿刺时可以转向 <button onclick='player.canTurnWhileAttacking=!player.canTurnWhileAttacking'>"+(player.canTurnWhileAttacking==true?"开":"关")+"</button><br>"
                    }
                    s+='</div>'
                    s+='WASD移动<br>'
                    s+='Shift查看原始四维属性'
                    return `
                    ${s}
                    `
                }],"blank",
                ["display-text",function(){
                    return `
                    <div>${mapName[player.mapId]}</div><br>
                    <canvas id="my_canvas" width="400px" height="400px" style="border:2px solid black"></canvas>
                    `
                }],"blank",
                ["display-text",function(){
                    let s='日志:<br><div style="font-size:14px;height:410px;width:400px;border:2px solid black;padding-top:5px;padding-left:5px;text-align:left;overflow-y:auto;margin-bottom:10px;">'
                    player.minus+=Math.max(0,player.logs.length-1000)
                    player.logs=player.logs.slice(Math.max(0,player.logs.length-1000))
                    if(player.mapId==5){
                        if(player.boss0DamageList[0]>0){
                            s+="你被 "+monsterDisplayName["boss0"]+" 的手臂砸到了 , 受到了 <text style='color:red'>"+format(player.boss0DamageList[0],1)+"</text> 点伤害<br>"
                        }
                        if(player.boss0DamageList[1]>0){
                            s+="你碰到了 "+monsterDisplayName["boss0"]+" 的身体 , 受到了 <text style='color:red'>"+format(player.boss0DamageList[1],1)+"</text> 点伤害<br>"
                        }
                        if(player.boss0DamageList[2]>0){
                            s+="你被 "+monsterDisplayName["boss0"]+" 的震地波锤到了 , 受到了 <text style='color:red'>"+format(player.boss0DamageList[2],1)+"</text> 点伤害<br>"
                        }
                        if(player.boss0DamageList[3]>0){
                            s+="你被 "+monsterDisplayName["boss0"]+" 的稻草扎到了 , 受到了 <text style='color:red'>"+format(player.boss0DamageList[3],1)+"</text> 点伤害<br>"
                        }
                    }
                    for(let i=player.logs.length-1;i>=Math.max(0,player.logs.length-100);i--){
                        if(player.logs[i].type==0){
                            if(player.logs[i].damageList.length==0){
                                continue
                            }
                            let ss=""
                            ss+="你使用 "+player.logs[i].str+" 对 "
                            for(let j=0;j<player.logs[i].damageList.length;j++){
                                if(j>0){
                                    ss+=" , 对 "
                                }
                                ss+=monsterDisplayName[player.logs[i].damageList[j][0]]+" 造成了 <text style='color:red'>"+format(player.logs[i].damageList[j][1],1)+"</text> 伤害"
                            }
                            s+=ss+"<br>"
                        }
                        else if(player.logs[i].type==1){
                            if(player.logs[i].damage>0){
                                s+='你被 '+monsterDisplayName[player.logs[i].id]+' 碰到了 , 受到了 <text style="color:red">'+format(player.logs[i].damage,1)+"</text> 伤害"+"<br>"
                            }
                        }
                        else if(player.logs[i].type==2){
                            if(player.logs[i].damage>0){
                                s+=monsterDisplayName[player.logs[i].id]+' 使用 冲刺 , 对你造成了 <text style="color:red">'+format(player.logs[i].damage,1)+"</text> 伤害"+"<br>"
                            }
                        }
                        else if(player.logs[i].type==3){
                            if(player.logs[i].damage>0){
                                if(player.logs[i].subType=='weapon'){
                                s+=monsterDisplayName[player.logs[i].id]+' 投掷 '+weaponDisplayName[player.logs[i].weaponId]+' , 对你造成了 <text style="color:red">'+format(player.logs[i].damage,1)+"</text> 伤害"+"<br>"
                                }
                                else if(player.logs[i].subType=='sickle'){
                                s+=monsterDisplayName[player.logs[i].id]+' 使用 半月斩 , 对你造成了 <text style="color:red">'+format(player.logs[i].damage,1)+"</text> 伤害"+"<br>"
                                }
                            }
                        }
                        else if(player.logs[i].type==999){
                            s+=player.logs[i].str+"<br>"
                        }
                    }
                    s+='<div>'
                    return `
                    ${s}
                    `
                }],]
                ],
                ["display-text",function(){
                    return `
                    ${player.mapStr}
                    `
                }],"blank",
                ["display-text",function(){
                    let str=""
                    let x=player.x,y=player.y
                    if(player.mapId==1){
                        if(CalcDis(x,y,150,40)<=20 && player.openId==0){
                            str+='<div style="position:relative;height:300px;width:1000px;border:2px solid black;text-align:left;padding-top:10px;padding-left:10px">'
                            let mn=1000000,id=0
                            for(let i=0;i<5;i++){
                                if(player.equipmentUpLevel[i]<mn){
                                    mn=player.equipmentUpLevel[i]
                                    id=i
                                }
                            }
                            str+='<div>消耗 '+format(Math.pow(player.equipmentUpLevel[id]+1,2)*10)
                            +"枚金币 , 对"+partDisplay[id]+"栏进行一次强化 , 成功率"
                            +format(equipmentUpPossibility[player.equipmentUpLevel[id]]*100)+"%"
                            str+="<button onclick='Upgrade("+id+")' style='margin-left:30px;align-items: center;height:12px;width:30px;padding-bottom:19px;padding-top:0px;padding-left:6px;'>"
                            +(player.money>=Math.pow(player.equipmentUpLevel[id]+1,2)*10?'<text style="color:green">✔</text>':'<text style="color:red">✘</text>')+"</button></div>"

                            str+="<div>——————————————————————————————————————————————————————————————————</div>"

                            for(let i=0;i<enchantingList[0].length;i++){
                                let a=enchantingList[0][i][0],b=enchantingList[0][i][1]
                                str+='<div>消耗 '+enchantingName[b]+' , 对'+partDisplay[a]+'栏进行一次附魔 , 成功率10%'
                                str+="<button onclick='TryEnchanting("+a+","+b+")' style='margin-left:30px;align-items: center;height:12px;width:30px;padding-bottom:19px;padding-top:0px;padding-left:6px;'>"
                                         +(CanEnchanting(b)?'<text style="color:green">✔</text>':'<text style="color:red">✘</text>')+"</button></div>"
                            }
                            str+='</div>'
                        }
                        else if(CalcDis(x,y,250,40)<=20 && player.openId==1){
                            str+='<div style="overflow:auto;position:relative;height:300px;width:1000px;border:2px solid black;text-align:left;padding-top:10px;padding-left:10px">'
                            for(let i=0;i<merchantList[0].length;i++){
                                let T=merchantList[0][i]
                                // str+='<div>'
                                for(let k=0;k<T[0].length;k++){
                                    if(k>0){
                                        str+='+'
                                    }
                                    if(T[0][k].length==1){
                                        str+=T[0][k][0]+'枚金币'
                                    }
                                    else{
                                        str+=T[0][k][0]+idToName[T[0][k][1]]
                                    }
                                }
                                str+=' → '
                                for(let k=0;k<T[1].length;k++){
                                    if(k>0){
                                        str+='+'
                                    }
                                    if(T[1][k].length==1){
                                        str+=T[1][k][0]
                                        if(T[1][k][0]!="洗点")str+='枚金币'
                                    }
                                    else{
                                        str+=T[1][k][0]+idToName[T[1][k][1]]
                                    }
                                }
                                str+="<button onclick='TryBuy("+0+','+i+")' style='margin-left:30px;align-items: center;height:12px;width:30px;padding-bottom:19px;padding-top:0px;padding-left:6px;'>"
                                     +(CanBuy(0,i)?'<text style="color:green">✔</text>':'<text style="color:red">✘</text>')+"</button>"
                                str+="<br>"
                            }
                            str+='</div>'
                        }
                    }
                    else if(player.mapId==3){
                        if(CalcDis(x,y,200,200)<=20 && player.openId==2){
                            str+='<div style="overflow:auto;position:relative;height:300px;width:1000px;border:2px solid black;text-align:left;padding-top:10px;padding-left:10px">'
                            for(let i=0;i<merchantList[1].length;i++){
                                let T=merchantList[1][i]
                                // str+='<div>'
                                for(let k=0;k<T[0].length;k++){
                                    if(k>0){
                                        str+='+'
                                    }
                                    if(T[0][k].length==1){
                                        str+=T[0][k][0]+'枚金币'
                                    }
                                    else{
                                        str+=T[0][k][0]+idToName[T[0][k][1]]
                                    }
                                }
                                str+=' → '
                                for(let k=0;k<T[1].length;k++){
                                    if(k>0){
                                        str+='+'
                                    }
                                    if(T[1][k].length==1){
                                        str+=T[1][k][0]
                                        if(T[1][k][0]!="洗点")str+='枚金币'
                                    }
                                    else{
                                        str+=T[1][k][0]+idToName[T[1][k][1]]
                                    }
                                }
                                str+="<button onclick='TryBuy("+1+','+i+")' style='margin-left:30px;align-items: center;height:12px;width:30px;padding-bottom:19px;padding-top:0px;padding-left:6px;'>"
                                     +(CanBuy(1,i)?'<text style="color:green">✔</text>':'<text style="color:red">✘</text>')+"</button>"
                                str+="<br>"
                            }
                            str+='</div>'
                        }
                    }
                    else if(player.mapId==4){
                        if(CalcDis(x,y,150,40)<=20 && player.openId==3){
                            str+='<div style="position:relative;height:300px;width:1000px;border:2px solid black;text-align:left;padding-top:10px;padding-left:10px">'
                            let mn=1000000,id=0
                            for(let i=0;i<5;i++){
                                if(player.equipmentUpLevel[i]<mn){
                                    mn=player.equipmentUpLevel[i]
                                    id=i
                                }
                            }
                            str+='<div>消耗 '+format(Math.pow(player.equipmentUpLevel[id]+1,2)*10)
                            +"枚金币 , 对"+partDisplay[id]+"栏进行一次强化 , 成功率"
                            +format(equipmentUpPossibility[player.equipmentUpLevel[id]]*100)+"%"
                            str+="<button onclick='Upgrade("+id+")' style='margin-left:30px;align-items: center;height:12px;width:30px;padding-bottom:19px;padding-top:0px;padding-left:6px;'>"
                            +(player.money>=Math.pow(player.equipmentUpLevel[id]+1,2)*10?'<text style="color:green">✔</text>':'<text style="color:red">✘</text>')+"</button></div>"

                            str+="<div>——————————————————————————————————————————————————————————————————</div>"

                            for(let i=0;i<enchantingList[1].length;i++){
                                let a=enchantingList[1][i][0],b=enchantingList[1][i][1]
                                str+='<div>消耗 '+enchantingName[b]+' , 对'+partDisplay[a]+'栏进行一次附魔 , 成功率10%'
                                str+="<button onclick='TryEnchanting("+a+","+b+")' style='margin-left:30px;align-items: center;height:12px;width:30px;padding-bottom:19px;padding-top:0px;padding-left:6px;'>"
                                         +(CanEnchanting(b)?'<text style="color:green">✔</text>':'<text style="color:red">✘</text>')+"</button></div>"
                            }
                            str+='</div>'
                        }
                        if(CalcDis(x,y,250,40)<=20 && player.openId==4){
                            str+='<div style="overflow:auto;position:relative;height:300px;width:1000px;border:2px solid black;text-align:left;padding-top:10px;padding-left:10px">'
                            for(let i=0;i<merchantList[2].length;i++){
                                let T=merchantList[2][i]
                                // str+='<div>'
                                for(let k=0;k<T[0].length;k++){
                                    if(k>0){
                                        str+='+'
                                    }
                                    if(T[0][k].length==1){
                                        str+=T[0][k][0]+'枚金币'
                                    }
                                    else{
                                        str+=T[0][k][0]+idToName[T[0][k][1]]
                                    }
                                }
                                str+=' → '
                                for(let k=0;k<T[1].length;k++){
                                    if(k>0){
                                        str+='+'
                                    }
                                    if(T[1][k].length==1){
                                        str+=T[1][k][0]
                                        if(T[1][k][0]!="洗点")str+='枚金币'
                                    }
                                    else{
                                        str+=T[1][k][0]+idToName[T[1][k][1]]
                                    }
                                }
                                str+="<button onclick='TryBuy("+2+','+i+")' style='margin-left:30px;align-items: center;height:12px;width:30px;padding-bottom:19px;padding-top:0px;padding-left:6px;'>"
                                     +(CanBuy(2,i)?'<text style="color:green">✔</text>':'<text style="color:red">✘</text>')+"</button>"
                                str+="<br>"
                            }
                            str+='</div>'
                        }
                    }
                    else if(player.mapId==9){
                        if(CalcDis(x,y,40,150)<=20 && player.openId==5){
                            str+='<div style="position:relative;height:300px;width:1000px;border:2px solid black;text-align:left;padding-top:10px;padding-left:10px">'
                            let mn=1000000,id=0
                            for(let i=0;i<5;i++){
                                if(player.equipmentUpLevel[i]<mn){
                                    mn=player.equipmentUpLevel[i]
                                    id=i
                                }
                            }
                            str+='<div>消耗 '+format(Math.pow(player.equipmentUpLevel[id]+1,2)*10)
                            +"枚金币 , 对"+partDisplay[id]+"栏进行一次强化 , 成功率"
                            +format(equipmentUpPossibility[player.equipmentUpLevel[id]]*100)+"%"
                            str+="<button onclick='Upgrade("+id+")' style='margin-left:30px;align-items: center;height:12px;width:30px;padding-bottom:19px;padding-top:0px;padding-left:6px;'>"
                            +(player.money>=Math.pow(player.equipmentUpLevel[id]+1,2)*10?'<text style="color:green">✔</text>':'<text style="color:red">✘</text>')+"</button></div>"

                            str+="<div>——————————————————————————————————————————————————————————————————</div>"

                            for(let i=0;i<enchantingList[2].length;i++){
                                let a=enchantingList[2][i][0],b=enchantingList[2][i][1]
                                str+='<div>消耗 '+enchantingName[b]+' , 对'+partDisplay[a]+'栏进行一次附魔 , 成功率10%'
                                str+="<button onclick='TryEnchanting("+a+","+b+")' style='margin-left:30px;align-items: center;height:12px;width:30px;padding-bottom:19px;padding-top:0px;padding-left:6px;'>"
                                         +(CanEnchanting(b)?'<text style="color:green">✔</text>':'<text style="color:red">✘</text>')+"</button></div>"
                            }
                            str+='</div>'
                        }
                        if(CalcDis(x,y,40,250)<=20 && player.openId==6){
                            str+='<div style="overflow:auto;position:relative;height:300px;width:1000px;border:2px solid black;text-align:left;padding-top:10px;padding-left:10px">'
                            for(let i=0;i<merchantList[3].length;i++){
                                let T=merchantList[3][i]
                                // str+='<div>'
                                for(let k=0;k<T[0].length;k++){
                                    if(k>0){
                                        str+='+'
                                    }
                                    if(T[0][k].length==1){
                                        str+=T[0][k][0]+'枚金币'
                                    }
                                    else{
                                        str+=T[0][k][0]+idToName[T[0][k][1]]
                                    }
                                }
                                str+=' → '
                                for(let k=0;k<T[1].length;k++){
                                    if(k>0){
                                        str+='+'
                                    }
                                    if(T[1][k].length==1){
                                        str+=T[1][k][0]
                                        if(T[1][k][0]!="洗点")str+='枚金币'
                                    }
                                    else{
                                        str+=T[1][k][0]+idToName[T[1][k][1]]
                                    }
                                }
                                str+="<button onclick='TryBuy("+3+','+i+")' style='margin-left:30px;align-items: center;height:12px;width:30px;padding-bottom:19px;padding-top:0px;padding-left:6px;'>"
                                     +(CanBuy(3,i)?'<text style="color:green">✔</text>':'<text style="color:red">✘</text>')+"</button>"
                                str+="<br>"
                            }
                            str+='</div>'
                        }
                    }
                    if(player.openId==-1){
                        str="<table><tr>"
                        let hpId=-1,mpId=-1
                        if(player.bag[28]>0)hpId=28
                        if(player.bag[32]>0)hpId=32
                        if(player.bag[29]>0)mpId=29
                        if(player.bag[33]>0)mpId=33
                        str+="<td>"+(player.hpBottle[0]==-1?(hpId==-1?"无":idToName[hpId]):idToName[player.hpBottle[0]])+"<div style='border:2px solid black;height:50px;width:50px;background-image:url(js/img/Bag/Picture"
                        +(player.hpBottle[0]==-1?(hpId==-1?"Lock":bagPictureSrc[hpId]):bagPictureSrc[player.hpBottle[0]])+".png)'></div>"
                        +"<div>[q]<br>"+(player.hpBottle[0]==-1?0:format(player.hpBottle[1],1))+"s<br>- "+(player.hpBottle[0]==-1?hpId==-1?0:format(player.bag[hpId],1):format(player.bag[player.hpBottle[0]],1))+" -<br></div></td><td style='width:23px'></td>"
                        for(let i=0;i<5;i++){
                            if(player.lv>=i*15){
                                str+="<td>"+"Lv."+(player.skillId[i]==-1?0:player.skillLevel[player.skillId[i]].lv)+"<div style='margin-left:2px;border:2px solid black;height:50px;width:50px;background-image:url(js/img/Bag/Picture"
                                +(player.skillId[i]==-1?"Lock":bagPictureSrc[player.skillId[i]])+".png)'></div><div>["+player.skillKey[i]+"]</div><div>"
                                +format(player.skillCoolDown[i],1)+"s<br>"
                                +(player.skillId[i]==24?(player.skill24Switch==true?"开":"关"):
                                  player.skillId[i]==31 && player.inShadow>0?format(player.inShadow,1)+"s":
                                  player.skillId[i]==34 && player.inLight>0?format(player.inLight,1)+"s":"<text style='color:#efefef'>占位</text>")
                                +"</div></td>"
                            }
                        }
                        str+="<td style='width:25px'></td>"
                        str+="<td>"+(player.mpBottle[0]==-1?(mpId==-1?"无":idToName[mpId]):idToName[player.mpBottle[0]])+"<div style='border:2px solid black;height:50px;width:50px;background-image:url(js/img/Bag/Picture"
                        +(player.mpBottle[0]==-1?(mpId==-1?"Lock":bagPictureSrc[mpId]):bagPictureSrc[player.mpBottle[0]])+".png)'></div>"
                        +"<div>[e]<br>"+(player.mpBottle[0]==-1?0:format(player.mpBottle[1],1))+"s<br>- "+(player.mpBottle[0]==-1?mpId==-1?0:format(player.bag[mpId],1):format(player.bag[player.mpBottle[0]],1))+" -<br></div></td>"
                        str+="</tr>"
                        str+="</table>"
                        str+="<table><tr>"
                        if(player.weaponId==26){
                            str+="<td>Lv."+player.skillLevel[26].lv
                            str+="<div style='border:2px solid black;height:50px;width:50px;background-image:url(js/img/Bag/Picture"
                            +(player.weapon26Switch!=-1?"SkillWaterStab":"SkillWaterDragonWave")+".png)'></div>"
                            str+="[n]<br>"
                            str+=(player.weapon26Switch==-1?format(player.weapon26CoolDown,1):format(player.weapon26Switch,1))+"s<br>"
                            str+="</td>"
                        }
                        str+="</tr>"
                        str+="</table><br>"
                    }
                    return `
                    ${str}
                    `
                }]
            ] 
        },
        "背包":{
            buttonStyle(){return {"color":"black"}},
            content:[
                ["row",[
                    ["display-text",function(){
                        let str=""
                        str+="<div style='position:relative;border:2px solid black;height:414px;width:400px'>"
                        str+="<div onclick='player.chooseBag="+player.helmetId+"' style='position:absolute;top:50px ;left:175px;height:50px;width:50px;background-image:url(js/img/Bag/Picture"+(player.helmetId==-1?"Lock":bagPictureSrc[player.helmetId])+".png)'></div>"
                        str+="<div onclick='player.chooseBag="+player.weaponId+"' style='position:absolute;top:150px;left:75px ;height:50px;width:50px;background-image:url(js/img/Bag/Picture"+(player.weaponId==-1?"Lock":bagPictureSrc[player.weaponId])+".png)'></div>"
                        str+="<div onclick='player.chooseBag="+player.armId   +"' style='position:absolute;top:150px;left:275px;height:50px;width:50px;background-image:url(js/img/Bag/Picture"+(player.armId   ==-1?"Lock":bagPictureSrc[player.armId   ])+".png)'></div>"
                        str+="<div onclick='player.chooseBag="+player.armorId +"' style='position:absolute;top:175px;left:175px;height:50px;width:50px;background-image:url(js/img/Bag/Picture"+(player.armorId ==-1?"Lock":bagPictureSrc[player.armorId ])+".png)'></div>"
                        str+="<div onclick='player.chooseBag="+player.legId   +"' style='position:absolute;top:300px;left:100px;height:50px;width:50px;background-image:url(js/img/Bag/Picture"+(player.legId   ==-1?"Lock":bagPictureSrc[player.legId   ])+".png)'></div>"
                        str+="<div onclick='player.chooseBag="+player.shoesId +"' style='position:absolute;top:300px;left:250px;height:50px;width:50px;background-image:url(js/img/Bag/Picture"+(player.shoesId ==-1?"Lock":bagPictureSrc[player.shoesId ])+".png)'></div>"
                        if(player.weaponEnchantingId!=-1){
                            str+="<div onclick='player.chooseBag="+(10000+player.weaponEnchantingId)+"' style='position:absolute;top:121px;left:85.5px;border:2px solid purple;height:25px;width:25px;background-image:url(js/img/Bag/Picture"+enchantingSrc[player.weaponEnchantingId]+".png);background-size:100% 100%'></div>"
                        }
                        if(player.helmetEnchantingId!=-1){
                            str+="<div onclick='player.chooseBag="+(10000+player.helmetEnchantingId)+"' style='position:absolute;top:21px;left:185.5px;border:2px solid purple;height:25px;width:25px;background-image:url(js/img/Bag/Picture"+enchantingSrc[player.helmetEnchantingId]+".png);background-size:100% 100%'></div>"
                        }
                        if(player.armorEnchantingId!=-1){
                            str+="<div onclick='player.chooseBag="+(10000+player.armorEnchantingId)+"' style='position:absolute;top:146px;left:185.5px;border:2px solid purple;height:25px;width:25px;background-image:url(js/img/Bag/Picture"+enchantingSrc[player.armorEnchantingId]+".png);background-size:100% 100%'></div>"
                        }
                        if(player.armEnchantingId!=-1){
                            str+="<div onclick='player.chooseBag="+(10000+player.armEnchantingId)+"' style='position:absolute;top:121px;left:285.5px;border:2px solid purple;height:25px;width:25px;background-image:url(js/img/Bag/Picture"+enchantingSrc[player.armEnchantingId]+".png);background-size:100% 100%'></div>"
                        }
                        if(player.legEnchantingId!=-1){
                            str+="<div onclick='player.chooseBag="+(10000+player.legEnchantingId)+"' style='position:absolute;top:271px;left:110.5px;border:2px solid purple;height:25px;width:25px;background-image:url(js/img/Bag/Picture"+enchantingSrc[player.legEnchantingId]+".png);background-size:100% 100%'></div>"
                        }
                        if(player.shoesEnchantingId!=-1){
                            str+="<div onclick='player.chooseBag="+(10000+player.shoesEnchantingId)+"' style='position:absolute;top:271px;left:260.5px;border:2px solid purple;height:25px;width:25px;background-image:url(js/img/Bag/Picture"+enchantingSrc[player.shoesEnchantingId]+".png);background-size:100% 100%'></div>"
                        }
                        let pos=[[200,75],[100,175],[225,175],[200,275],[350,100]]
                        for(let i=0;i<5;i++){
                            if(player.equipmentUpLevel[i]>0){
                                str+="<div style='position:absolute;top:"+pos[i][0]+"px;left:"+pos[i][1]+"px;width:50px;text-align:center;c'>"
                                str+="<text style='color:gold'>+"+player.equipmentUpLevel[i]+"</text>"
                                str+="</div>"
                            }
                        }
                        str+="</div>"
                        return `
                        ${str}
                        `
                    }],"blank",
                    ["display-text",function(){
                        let str=""
                        str+="<table>"
                        for(let i=0;i<8;i++){
                            str+="<tr>"
                            for(let j=0;j<10;j++){
                                let id=(player.bagPage-1)*80+i*10+j
                                str+="<td><div onClick='player.chooseBag="+(id)+"' id='Bag"+(i*5+j)+"' style='height:50px;width:50px;"
                                str+="background-image:url(js/img/Bag/Picture"+(id<idToName.length?player.bagUnlock[id]?bagPictureSrc[id]:"Lock":"Lock")+".png)"
                                str+="'>"
                                str+="</div></td>"
                            }
                            str+="</tr>"
                        }
                        str+="</table>"
                        return `
                        ${str}
                        `
                    }]
                ]],
                "blank",
                ["display-text",function(){
                    let mn=1000000
                    for(let i=0;i<5;i++){
                        if(player.equipmentUpLevel[i]<mn){
                            mn=player.equipmentUpLevel[i]
                        }
                    }
                    let str="<div style='position:relative;height:400px;width:800px;border:2px solid black;text-align:left;padding-top:10px;padding-left:10px'>"
                    if(player.chooseBag!=-1 && player.chooseBag<=1000 && player.bagUnlock[player.chooseBag]){
                        str+=idToName[player.chooseBag]
                        if(equipPart[player.chooseBag].length>0){
                            if(player[equipPart[player.chooseBag]]==player.chooseBag){
                                str+=" (装备中)"
                            }
                        }
                        if(skillId.includes(player.chooseBag)){
                            str+=" Lv."+player.skillLevel[player.chooseBag].lv
                            +(player.skillLevel[player.chooseBag].lv<5?
                            " ("+format(player.skillLevel[player.chooseBag].mastery,1)+"/"
                            +format(player.skillLevel[player.chooseBag].base*Math.pow(2,player.skillLevel[player.chooseBag].lv),1)+")":"MAX")
                        }
                        str+="<br>"
                        str+="持有数量: "+player.bag[player.chooseBag]+"<br>"+"<br>"
                        str+=bagDisplay[player.chooseBag]
                        if(player.chooseBag>=20 && player.chooseBag<=23){
                            let wolfPart=0
                            if(player.helmetId==20){wolfPart+=1}
                            if(player.armId==21){wolfPart+=1}
                            if(player.armorId==22){wolfPart+=1}
                            if(player.legId==23){wolfPart+=1}
                            if(wolfPart<2){
                                str+="<br><br>野狼套装 "+wolfPart+"/2 : 防御x1.2"
                                str+="<br>野狼套装 "+wolfPart+"/4 : 生命x1.2"
                            }
                            else if(wolfPart<4){
                                str+="<br><br><text style='color:lime'>野狼套装 2/2 : 防御x1.2</text>"
                                str+="<br>野狼套装 "+wolfPart+"/4 : 生命x1.2"
                            }
                            else if(wolfPart==4){
                                str+="<br><br><text style='color:lime'>野狼套装 2/2 : 防御x1.2</text>"
                                str+="<br><text style='color:lime'>野狼套装 4/4 : 生命x1.2</text>"
                            }
                        }
                        if(player.chooseBag>=37 && player.chooseBag<=40){
                            let orcPart=0
                            if(player.helmetId==37){orcPart+=1}
                            if(player.armId==38){orcPart+=1}
                            if(player.armorId==39){orcPart+=1}
                            if(player.legId==40){orcPart+=1}
                            if(orcPart<2){
                                str+="<br><br>兽人套装 "+orcPart+"/2 : 防御x1.3"
                                str+="<br>兽人套装 "+orcPart+"/4 : 生命x1.3"
                            }
                            else if(orcPart<4){
                                str+="<br><br><text style='color:lime'>兽人套装 2/2 : 防御x1.3</text>"
                                str+="<br>兽人套装 "+orcPart+"/4 : 生命x1.3"
                            }
                            else if(orcPart==4){
                                str+="<br><br><text style='color:lime'>兽人套装 2/2 : 防御x1.3</text>"
                                str+="<br><text style='color:lime'>兽人套装 4/4 : 生命x1.3</text>"
                            }
                        }
                        if(canEquip.includes(player.chooseBag)){
                            if(equipPart[player.chooseBag]!="shoesId"){
                                str+="<br>"
                                if(mn<10){
                                    str+="<br><text style='color:grey'>全套强化 +"+format(mn)+"/10 附加效果: 全属性+5</text>"
                                }
                                else{
                                    str+="<br><text style='color:gold'>全套强化 +"+format(Math.floor(mn/10)*10)+"/"
                                    +format(Math.floor(mn/10)*10)+" 附加效果: 全属性+"+format((Math.floor(mn/10)*(Math.floor(mn/10)+1)/2)*5)+"</text>"
                                    str+="<br><text style='color:grey'>全套强化 +"+format(mn)+"/"
                                    +format((Math.floor(mn/10)+1)*10)+" 附加效果: 全属性+"+format(((Math.floor(mn/10)+1)*(Math.floor(mn/10)+2)/2)*5)+"</text>"
                                }
                            }
                            str+=`<button onclick="TryEquip(${player.chooseBag})" style='position:absolute;height:40px;width:60px;top:250px;left:730px;border:2px solid black;font-size:14px'>装备</button>`
                        }
                    }
                    else if(player.chooseBag>=10000){
                        str+=enchantingDisplay[player.chooseBag-10000]
                    }
                    str+="</div>"
                    return `
                    ${str}
                    `
                }]
            ]
        },
        "技能":{
            buttonStyle(){return {"color":"black"}},
            content:[
                ["display-text",function(){
                    let str="<table><tr>"
                    for(let i=0;i<6;i++){
                        if(player.lv>=i*15){
                        str+="<td><div onclick='TrySkillEquip("+i+")' style='border:2px solid "+(player.chooseSkillId==player.skillId[i]?"orange":"black")+";height:50px;width:50px;background-image:url(js/img/Bag/Picture"
                        +(player.skillId[i]==-1?"Lock":bagPictureSrc[player.skillId[i]])+".png)'></div><div onclick='player.chooseSkillId="+(10000+i)+"' style='color:"+(player.chooseSkillId==(10000+i)?"orange":"black")+"'>["+player.skillKey[i]+"]</div></td>"
                        }
                    } 
                    str+="</tr></table><br>"
                    str+="<table><tr>"
                    for(let i=0;i<skillId.length;i++){
                        str+="<td><div onclick='player.chooseSkillId="+skillId[i]+"' style='border:2px solid "+(player.chooseSkillId==skillId[i]?"orange":"black")
                        +";height:50px;width:50px;background-image:url(js/img/Bag/Picture"
                        +(player.bagUnlock[skillId[i]]==false?"Lock":bagPictureSrc[skillId[i]])+".png)'></td>"
                    }
                    str+="</tr></table>"
                    return `
                    ${str}
                    <br><br><br>
                    <div>-技能只能在安全区内更换-</div>
                    <div>-薄膜键盘上有的键不能同时按(作者亲测)-</div>
                    `
                }]
            ]
        },
        "图鉴":{
            buttonStyle(){return {"color":"black"}},
            unlocked(){
                return player.unlockBook
            },
            content:[
                ["display-text",function(){
                    let str=""
                    str+="<table><tr>"
                    for(let i=0;i<monsterName.length;i++){
                        str+="<td><div "+(player.killNum[i]>0?"onclick=player.chooseBookId="+i+" ":"")
                        +"style='border:2px solid "+(player.chooseBookId==i?"orange":"black")+";height:50px;width:50px;background-image:url(js/img/"+
                        (player.killNum[i]>0?"Monster/Monster"+monsterName[i]:"Bag/PictureLock")
                        +".png);background-position:center;background-repeat: no-repeat;'>"
                        str+="</div></td>"
                    }
                    str+="</tr></table><br><table><tr>"
                    str+="<td><div "+(player.killNumBoss0>0?"onclick=player.chooseBookId='boss0' ":"")
                    +"style='border:2px solid "+(player.chooseBookId=="boss0"?"orange":"black")+";height:75px;width:75px;background-image:url(js/img/"+
                    (player.killNumBoss0>0?"Monster/BossScareCrow":"Bag/PictureLock")
                    +".png);background-position:center;background-repeat: no-repeat;'>"
                    str+="</div></td>"
                    str+="</tr></table>"
                    return str
                }],"blank",
                ["display-text",function(){
                    let str="<div style='height:400px;width:600px;border:2px solid black;text-align:left;padding-top:10px;padding-left:10px'>"
                    if(player.chooseBookId=="boss0"){
                        str+="<text style='color:yellow'>稻草人</text><br>"
                        str+="击杀数量 "+player.killNumBoss0+"<br>"
                        str+="生命值 2000<br>"
                        str+="攻击力 50<br>"
                        str+="防御力 10<br><br>"
                        str+="攻击模式<br>距离小于70px时,释放一圈半径为100px的震地<br>否则释放一次冲刺,冲刺时间为2秒,旋转2圈<br>震地后必然释放冲刺"
                    }
                    else if(player.chooseBookId>=0){
                        str+=monsterDisplayName[player.chooseBookId]+"<br>"
                        str+="击杀数量 "+player.killNum[player.chooseBookId]+"<br>"
                        str+="生命值 "+monsterBasic[player.chooseBookId].hpmax+"<br>"
                        str+="攻击力 "+monsterBasic[player.chooseBookId].atk+"<br>"
                        str+="防御力 "+monsterBasic[player.chooseBookId].def+"<br>"
                        str+="攻击速度 "+monsterBasic[player.chooseBookId].attackSpeed+"<br>"
                        str+="仇恨范围 "+monsterBasic[player.chooseBookId].hatredRadius+"<br>"
                        str+="攻击范围 "+monsterBasic[player.chooseBookId].attackRadius+"<br>"
                        str+="攻击停止范围 "+monsterBasic[player.chooseBookId].stopMoveRadius+"<br>"
                        str+="<br>掉落物<br>"
                        str+=monsterDrop[player.chooseBookId][0]+" 点经验<br>"
                        str+=monsterDrop[player.chooseBookId][1]+" 枚金币<br><br>"
                        for(let i=0;i<monsterDrop[player.chooseBookId][2].length;i++){
                            str+=monsterDrop[player.chooseBookId][2][i][0]*100+"% "
                            if(player.bagUnlock[nameToId[monsterDrop[player.chooseBookId][2][i][1]]]){
                                str+=idToName[nameToId[monsterDrop[player.chooseBookId][2][i][1]]]
                            }
                            else{
                                str+="???"
                            }
                            str+="<br>"
                        }
                    }
                    str+="</div>"
                    return str
                }],
            ]
        },
        "介绍":{
            buttonStyle(){return {"color":"black"}},
            content:[
                ["display-text",function(){
                    let str=""
                    str+="Lv.1~20 每级经验需求x1.1<br>"
                    str+="Lv.21~40 每级经验需求x1.15<br>"
                    str+="Lv.41~60 每级经验需求x1.2<br>"
                    str+="Lv.61~80 每级经验需求x1.25<br>"
                    str+="Lv.81~100 每级经验需求x1.3<br>"
                    str+="——————————————————————————————————————————————————————————————————<br>"
                    str+="每升一级获得2点自由属性点<br>"
                    str+="+号每次加1点属性 , ++号每次加10点属性<br>"
                    str+="每一点力量提升1点攻击力<br>"
                    str+="每一点敏捷提升2%移动速度(有衰减)<br>"
                    str+="每一点体质提升10点生命值上限<br>"
                    str+="每一点魔力提升5点魔力值上限和1%的魔法伤害<br>"
                    return `
                    ${str}`
                }]
            ]
        }
    },
    previousTab: "",
    leftTab: true,
})