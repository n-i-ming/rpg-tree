function TryEquip(id){
    if(player.bag[id]>0){
        if(player[equipPart[id]]!=-1){
            player.bag[player[equipPart[id]]]+=1
        }
        player[equipPart[id]]=id
        player.bag[id]--
    }
}
function CanBuy(id,i){
    let T=merchantList[id][i]
    for(let j=0;j<T[0].length;j++){
        if(T[0][j].length==1){
            if(player.money<T[0][j][0]){
                return false
            }
        }
        else{
            if(player.bag[T[0][j][1]]<T[0][j][0]){
                return false
            }
        }
    }
    return true
}
function TryBuy(id,i){
    if(!CanBuy(id,i)){
        player.logs.push({type:999,str:"<text style='color:grey'>你无法进行此项交易</text>"})
        return
    }
    if(id==1 && i==0)
    player.logs.push({type:999,str:"[??]流浪者看了看你给的雕像,眼中闪过一丝仇恨的目光,他赠送了你一本[冲刺]"})
    let T=merchantList[id][i]
    for(let j=0;j<T[0].length;j++){
        if(T[0][j].length==1){
            player.money-=T[0][j][0]
        }
        else{
            player.bag[T[0][j][1]]-=T[0][j][0]
        }
    }
    for(let j=0;j<T[1].length;j++){
        if(T[1][j].length==1){
            if(T[1][j][0]!="洗点")
            player.money+=T[1][j][0]
            else{
                player.freePoint+=player.vitality
                player.vitality=0
                player.freePoint+=player.strength
                player.strength=0
                player.freePoint+=player.agile
                player.agile=0
                player.freePoint+=player.wisdom
                player.wisdom=0
            }
        }
        else{
            player.bagUnlock[T[1][j][1]]=true
            player.bag[T[1][j][1]]+=T[1][j][0]
        }
    }
}
function CanEnchanting(id){
    if(id==0){
        if(player.bag[3]<10)return false
        return true
    }
    if(id==1){
        if(player.bag[12]<10)return false
        return true
    }
    if(id==2){
        if(player.bag[13]<10)return false
        return true
    }
    if(id==3){
        if(player.bag[17]<10)return false
        return true
    }
    if(id==4){
        if(player.bag[18]<10)return false
        return true
    }
    if(id==5){
        if(player.bag[19]<1)return false
        return true
    }
    if(id==6){
        if(player.bag[25]<10)return false
        return true
    }
    if(id==7){
        if(player.bag[36]<30)return false
        return true
    }
    if(id==8){
        if(player.bag[44]<10)return false
        return true
    }
}
function TryEnchanting(i,id){
    if(id==0){
        if(player.bag[3]<10)return 
        player.bag[3]-=10
        if(random()<=0.1){
            player[partName[i]]=0
            player.logs.push({type:999,str:"<text style='color:gold'>恭喜你 , 你附魔成功了</text>"})
        }
        else{
            player.logs.push({type:999,str:"<text style='color:grey'>你附魔失败了</text>"})
        }
    }
    if(id==1){
        if(player.bag[12]<10)return 
        player.bag[12]-=10
        if(random()<=0.1){
            player[partName[i]]=1
            player.logs.push({type:999,str:"<text style='color:gold'>恭喜你 , 你附魔成功了</text>"})
        }
        else{
            player.logs.push({type:999,str:"<text style='color:grey'>你附魔失败了</text>"})
        }
    }
    if(id==2){
        if(player.bag[13]<10)return
        player.bag[13]-=10
        if(random()<=0.1){
            player[partName[i]]=2
            player.logs.push({type:999,str:"<text style='color:gold'>恭喜你 , 你附魔成功了</text>"})
        }
        else{
            player.logs.push({type:999,str:"<text style='color:grey'>你附魔失败了</text>"})
        }
    }
    if(id==3){
        if(player.bag[17]<10)return
        player.bag[17]-=10
        if(random()<=0.1){
            player[partName[i]]=3
            player.logs.push({type:999,str:"<text style='color:gold'>恭喜你 , 你附魔成功了</text>"})
        }
        else{
            player.logs.push({type:999,str:"<text style='color:grey'>你附魔失败了</text>"})
        }
    }
    if(id==4){
        if(player.bag[18]<10)return
        player.bag[18]-=10
        if(random()<=0.1){
            player[partName[i]]=4
            player.logs.push({type:999,str:"<text style='color:gold'>恭喜你 , 你附魔成功了</text>"})
        }
        else{
            player.logs.push({type:999,str:"<text style='color:grey'>你附魔失败了</text>"})
        }
    }
    if(id==5){
        if(player.bag[19]<1)return
        player.bag[19]-=1
        if(random()<=0.1){
            player[partName[i]]=5
            player.logs.push({type:999,str:"<text style='color:gold'>恭喜你 , 你附魔成功了</text>"})
        }
        else{
            player.logs.push({type:999,str:"<text style='color:grey'>你附魔失败了</text>"})
        }
    }
    if(id==6){
        if(player.bag[25]<10)return
        player.bag[25]-=10
        if(random()<=0.1){
            player[partName[i]]=6
            player.logs.push({type:999,str:"<text style='color:gold'>恭喜你 , 你附魔成功了</text>"})
        }
        else{
            player.logs.push({type:999,str:"<text style='color:grey'>你附魔失败了</text>"})
        }
    }
    if(id==7){
        if(player.bag[36]<30)return
        player.bag[36]-=30
        if(random()<=0.1){
            player[partName[i]]=7
            player.logs.push({type:999,str:"<text style='color:gold'>恭喜你 , 你附魔成功了</text>"})
        }
        else{
            player.logs.push({type:999,str:"<text style='color:grey'>你附魔失败了</text>"})
        }
    }
    if(id==8){
        if(player.bag[44]<10)return
        player.bag[44]-=10
        if(random()<=0.1){
            player[partName[i]]=8
            player.logs.push({type:999,str:"<text style='color:gold'>恭喜你 , 你附魔成功了</text>"})
        }
        else{
            player.logs.push({type:999,str:"<text style='color:grey'>你附魔失败了</text>"})
        }
    }
}
function TrySkillEquip(id){
    if(NotInSafeZone()){
        player.logs.push({type:999,str:"请在安全区内更换技能"})
        return
    }
    if(player.chooseSkillId==-100){
        if(player.skillId[id]>=0){
            player.chooseSkillId=player.skillId[id]
        }
        return
    }
    if(player.skillId.includes(player.chooseSkillId)){
        let pos=0
        for(let i=0;i<player.skillId.length;i++){
            if(player.skillId[i]==player.chooseSkillId){
                pos=i
                break
            }
        }
        let tmp=player.skillId[pos]
        player.skillId[pos]=player.skillId[id]
        player.skillId[id]=tmp
        tmp=player.skillCoolDown[pos]
        player.skillCoolDown[pos]=player.skillCoolDown[id]
        player.skillCoolDown[id]=tmp
        player.chooseSkillId=-100
        return
    }
    if(player.bag[player.chooseSkillId]==0){
        return
    }
    if(player.skillId[id]==-1){
        player.bag[player.chooseSkillId]-=1
        player.skillId[id]=player.chooseSkillId
    }
    else{
        player.bag[player.skillId[id]]+=1
        player.bag[player.chooseSkillId]-=1
        player.skillId[id]=player.chooseSkillId
    }
}
function Upgrade(id){
    let cost=Math.pow(player.equipmentUpLevel[id]+1,2)*10
    if(player.money<cost){
        return
    }
    player.money-=cost
    if(random()<=equipmentUpPossibility[player.equipmentUpLevel[id]]){
        player.equipmentUpLevel[id]+=1
        player.logs.push({type:999,str:"<text style='color:gold'>恭喜你 , 你强化成功了</text>"})
    }
    else{
        player.logs.push({type:999,str:"<text style='color:grey'>你强化失败了</text>"})
    }
}
function Track(x,y,xx,yy,dir,turnSpeed,diff){
    var now_dir=CalcAngle(x,y,xx,yy),del_dir
    if(Math.abs(now_dir-dir)>Math.abs(360+dir-now_dir)){
        if(now_dir>dir){
            del_dir=Math.min(now_dir-dir,turnSpeed*diff)
        }
        else{
            del_dir=-Math.min(dir-now_dir,turnSpeed*diff)
        }
    }
    else{
        if(now_dir>dir){
            del_dir=-Math.min(now_dir-dir,turnSpeed*diff)
        }
        else{
            del_dir=Math.min(dir-now_dir,turnSpeed*diff)
        }
    }
    dir-=del_dir
    if(dir<0){
        dir+=360
    }
    else if(dir>360){
        dir-=360
    }
    return dir
}
function DealBottle(dif){
    if(player.hpBottle[0]!=-1){
        player.hpBottle[1]-=dif
        if(player.hpBottle[1]<0){
            player.hpBottle=[-1,-1]
        }
    }
    if(player.mpBottle[0]!=-1){
        player.mpBottle[1]-=dif
        if(player.mpBottle[1]<0){
            player.mpBottle=[-1,-1]
        }
    }
    let hpId=-1,mpId=-1
    if(player.bag[28]>0)hpId=28
    if(player.bag[32]>0)hpId=32
    if(player.bag[29]>0)mpId=29
    if(player.bag[33]>0)mpId=33
    if(keys["q"]==true){
        if(hpId!=-1 && player.hpBottle[0]==-1 && player.bag[hpId]>0){
            player.bag[hpId]-=1
            player.hpBottle=[hpId,30]
        }
    }
    if(keys["e"]==true){
        if(mpId!=-1 && player.mpBottle[0]==-1 && player.bag[mpId]>0){
            player.bag[mpId]-=1
            player.mpBottle=[mpId,30]
        }
    }
}
function NotInSafeZone(){
    return player.mapId!=1 && player.mapId!=3 && player.mapId!=4 && player.mapId!=9
}
function DealWeaponSkill(ctx,dif){
    player.weapon26CoolDown=Math.max(0,player.weapon26CoolDown-dif)
    if(player.weaponId==26){
        if(keys["n"]==true && NotInSafeZone()){
            if(player.weapon26Switch==-1 && player.weapon26CoolDown==0 && player.mp>=50+20*player.skillLevel[26].lv){
                player.weapon26Switch=10
                player.skillLevel[26].mastery+=1
                let dmg=(50+20*player.skillLevel[26].lv)*(1.2+0.3*player.skillLevel[26].lv)*player.mpDamageMul
                if(player.inShadow>0){
                    player.inShadow=0
                }
                player.weapon26Damage=dmg
                player.mp-=50+20*player.skillLevel[26].lv
                player.weapon26LogId=player.logs.length+player.minus
                player.logs.push({type:0,str:"<text style='color:blue'>水龙波</text>",damageList:[]})
            }
        }
    }
    if(player.weapon26Switch!=-1 && NotInSafeZone()){
        player.weapon26Switch-=dif
        if(player.weapon26Switch<0){
            player.weapon26Switch=-1
            player.weapon26CoolDown=30
        }
        let count=[],dir=0
        if(keys["a"]==true && keys["d"]==false)count.push("a")
        if(keys["d"]==true && keys["a"]==false)count.push("d")
        if(keys["w"]==true && keys["s"]==false)count.push("w")
        if(keys["s"]==true && keys["w"]==false)count.push("s")
        if(player.killNumBoss0>0){
            if(count.length==1){
                if(count[0]=="a")dir=270
                if(count[0]=="d")dir=90
                if(count[0]=="w")dir=0
                if(count[0]=="s")dir=180
            }
            else if(count.length==2){
                if(count[0]=="a"){
                    if(count[1]=="w")
                    dir=315
                    if(count[1]=="s")
                    dir=225
                }
                if(count[0]=="d"){
                    if(count[1]=="w")
                    dir=45
                    if(count[1]=="s")
                    dir=135
                }
            }
            else{
                dir=[270,90,0,180][player.dir]
            }
        }
        else{
            if(count.length==1){
                if(count[0]=="a")dir=270
                if(count[0]=="d")dir=90
                if(count[0]=="w")dir=0
                if(count[0]=="s")dir=180
            }
            else{
                dir=[270,90,0,180][player.dir]
            }
        }
        let rldis=Math.sqrt(playerSize[0]*playerSize[0]+playerSize[1]*playerSize[1])/2+2+(75+5*player.skillLevel[26].lv)/2
        let rlx=player.x+Math.sin(dir*Math.PI/180)*rldis,rly=player.y-Math.cos(dir*Math.PI/180)*rldis
        DrawImage(dir,rlx,rly,10+2*player.skillLevel[26].lv,75,"js/img/Color/Blue.png",ctx)
        for(let j=0;j<player.monsterList.length;j++){
            let y=player.monsterList[j]
            if(RectangleIntersect({x:rlx,y:rly,ep:[dir],szx:10+2*player.skillLevel[26].lv,szy:75+5*player.skillLevel[26].lv},{x:y.x,y:y.y,ep:[0],szx:y.szx,szy:y.szy},ctx)){
                let dmg=player.weapon26Damage
                let count=Math.max(0,Math.min(dif*(dmg-y.basic.def),y.basic.hp))
                player.monsterList[j].basic.hp-=count
                if(player.weapon26LogId>=player.minus){
                    let hs=false
                    for(let k=0;k<player.logs[player.weapon26LogId-player.minus].damageList.length;k++){
                        if(player.logs[player.weapon26LogId-player.minus].damageList[k][0]==y.id){
                            player.logs[player.weapon26LogId-player.minus].damageList[k][1]+=count
                            hs=true
                            break
                        }
                    }
                    console.log(hs)
                    if(!hs){
                        player.logs[player.weapon26LogId-player.minus].damageList.push([y.id,count])
                    }
                }
                if(player.monsterList[j].basic.hp<=0.00001){
                    Drop(y.id)
                    player.monsterList.splice(j,1)
                    j--;
                }
            }
        }
    }
}
function CalcFourAttribute(){
    let mn=1000000
    for(let i=0;i<5;i++){
        if(player.equipmentUpLevel[i]<mn){
            mn=player.equipmentUpLevel[i]
        }
    }
    let equipmentUpLevelPoint=(Math.floor(mn/10)*(Math.floor(mn/10)+1)/2)*5
    player.realStrength=player.strength+equipmentUpLevelPoint
    player.realWisdom=player.wisdom+equipmentUpLevelPoint
    player.realAgile=player.agile+equipmentUpLevelPoint
    player.realVitality=player.vitality+equipmentUpLevelPoint
}