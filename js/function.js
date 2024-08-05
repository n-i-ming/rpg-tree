function DrawImage(dir,x,y,szx,szy,src,ctx){
    ctx.rotate(dir*Math.PI/180);
    let dis=Math.sqrt(x*x+y*y)
    let Dir=Math.asin(y/dis)*180/Math.PI
    if(x<0)Dir=180-Math.asin(y/dis)*180/Math.PI
    x=(Math.cos((Dir-dir)*Math.PI/180))*dis
    y=(Math.sin((Dir-dir)*Math.PI/180))*dis
    let img=new Image()
    img.src=src
    ctx.drawImage(img,Math.round(x-szx/2),Math.round(y-szy/2),szx,szy)
    ctx.rotate(-dir*Math.PI/180);
}
function CalcAngle(x,y,xx,yy){
    y=-y,yy=-yy
    var delx=xx-x,dely=yy-y
    if(delx>=0 && dely>=0){
        var an=90-Math.asin(dely/Math.sqrt(delx*delx+dely*dely))*180/Math.PI
        return an
    }
    if(delx<=0 && dely>=0){
        var an=Math.asin(dely/Math.sqrt(delx*delx+dely*dely))*180/Math.PI+270
        return an
    }
    if(delx<=0 && dely<=0){
        var an=270-Math.asin(-dely/Math.sqrt(delx*delx+dely*dely))*180/Math.PI
        return an
    }
    if(delx>=0 && dely<=0){
        var an=90+Math.asin(-dely/Math.sqrt(delx*delx+dely*dely))*180/Math.PI
        return an
    }
}
function DrawMap(ctx){
    ctx.fillStyle="#efefef"
    ctx.beginPath()
    ctx.fillRect(0,0,400,400)
    if(player.mapId==0){
        DrawImage(0,370,75,20,20,"js/img/Map/BillBoardRight.png",ctx)
    }
    if(player.mapId==1){
        DrawImage(0,30,75,20,20,"js/img/Map/BillBoardLeft.png",ctx)
        DrawImage(0,370,325,20,20,"js/img/Map/BillBoardRight.png",ctx)
        DrawImage(0,150,40,20,20,"js/img/Map/NpcVillageIronWorker.png",ctx)
        DrawImage(0,250,40,20,20,"js/img/Map/NpcVillageMerchant.png",ctx)
        DrawImage(0,200,370,20,20,"js/img/Map/SpawnPoint.png",ctx)
    }
    if(player.mapId==2){
        DrawImage(0,30,325,20,20,"js/img/Map/BillBoardLeft.png",ctx)
        DrawImage(90,200,30,20,20,"js/img/Map/BillBoardLeft.png",ctx)
        DrawImage(0,370,75,20,20,"js/img/Map/BillBoardRight.png",ctx)
    }
    if(player.mapId==3){
        DrawImage(90,200,370,20,20,"js/img/Map/BillBoardRight.png",ctx)
        DrawImage(0,200,200,20,20,"js/img/Map/NpcWanderer.png",ctx)
    }
    if(player.mapId==4){
        DrawImage(0,30,75,20,20,"js/img/Map/BillBoardLeft.png",ctx)
        DrawImage(0,200,370,20,20,"js/img/Map/SpawnPoint.png",ctx)
        DrawImage(0,150,40,20,20,"js/img/Map/NpcCityIronWorker.png",ctx)
        DrawImage(0,250,40,20,20,"js/img/Map/NpcCityMerchant.png",ctx)
        DrawImage(0,370,200,20,20,"js/img/Map/NpcCityFightPlace.png",ctx)
        DrawImage(90,100,370,20,20,"js/img/Map/BillBoardRight.png",ctx)
        DrawImage(90,300,370,20,20,"js/img/Map/BillBoardRight.png",ctx)
    }
    if(player.mapId==6){
        DrawImage(90,100,30,20,20,"js/img/Map/BillBoardLeft.png",ctx)
    }
    if(player.mapId==7){
        DrawImage(90,300,30,20,20,"js/img/Map/BillBoardLeft.png",ctx)
        DrawImage(90,300,370,20,20,"js/img/Map/BillBoardRight.png",ctx)
    }
    if(player.mapId==8){
        DrawImage(90,300,30,20,20,"js/img/Map/BillBoardLeft.png",ctx)
        DrawImage(90,300,370,20,20,"js/img/Map/BillBoardRight.png",ctx)
    }
    if(player.mapId==9){
        DrawImage(90,300,30,20,20,"js/img/Map/BillBoardLeft.png",ctx)
        DrawImage(0,40,150,20,20,"js/img/Map/NpcBigCityIronWorker.png",ctx)
        DrawImage(0,40,250,20,20,"js/img/Map/NpcBigCityMerchant.png",ctx)
        DrawImage(0,200,370,20,20,"js/img/Map/SpawnPoint.png",ctx)
    }
}
function DrawCharacter(ctx,dif){
    for(let i=0;i<player.monsterList.length;i++){
        player.monsterList[i].inLight=false
    }
    if(player.inLight>0){
        let r=(100+10*player.skillLevel[34].lv)*Math.min(10-player.inLight,1)
        ctx.beginPath();
        ctx.lineWidth=5
        ctx.strokeStyle="orange"
        ctx.arc(Math.round(player.x),Math.round(player.y),r,0,2*Math.PI);
        ctx.stroke();
        for(let j=0;j<player.monsterList.length;j++){
            let TT=player.monsterList[j]
            if(CalcDis(player.x,player.y,TT.x,TT.y)<=r+Math.min(TT.szx/2,TT.szy/2)){
                player.monsterList[j].inLight=true
            }
        }
    }
    let img=new Image()
    let str=""
    if(player.rDir==0 || player.rDir==45 || player.rDir==315)str="Up"
    if(player.rDir==180 || player.rDir==135 || player.rDir==225)str="Down"
    if(player.rDir==90)str="Right"
    if(player.rDir==270)str="Left"
    img.src="js/img/Character/Face"+str+".png"
    if(player.inShadow>0)ctx.globalAlpha=0.2
    ctx.drawImage(img,Math.round(player.x-playerSize[0]/2),Math.round(player.y-playerSize[1]/2),playerSize[0],playerSize[1])
    ctx.globalAlpha=1
}
function CalcDis(x,y,a,b){
    return Math.sqrt((x-a)*(x-a)+(y-b)*(y-b))
}
function MoveCharacter(dif){
    if(player.isAttacking==true && !player.canMoveWhileAttacking){
        return
    }
    if(player.moveList.length>0){
        let T=player.moveList[0]
        dif=Math.min(T.time-T.realTime,dif)
        T.realTime+=dif
        if(T.type==0){
            let nx=player.x+Math.sin(T.dir*Math.PI/180)*T.dis*dif/T.time,ny=player.y-Math.cos(T.dir*Math.PI/180)*T.dis*dif/T.time
            if(5<=nx && nx<=395 && 5<=ny && ny<=395){
                player.x=nx
                player.y=ny
            }
            while(T.realTime>=(1+T.times)*0.05 && T.times<=2){
                T.times+=1
                let str=""
                if(T.dir==0 || T.dir==45 || T.dir==315)str="Up"
                if(T.dir==180 || T.dir==135 || T.dir==225)str="Down"
                if(T.dir==90)str="Right"
                if(T.dir==270)str="Left"
                player.summonList.push({type:"dash",
                    x:T.x+Math.sin(T.dir*Math.PI/180)*T.dis*T.times*0.05/T.time,y:T.y-Math.cos(T.dir*Math.PI/180)*T.dis*T.times*0.05/T.time,
                    opacity:T.times*0.25,time:1,realTime:0,src:"js/img/Character/Face"+str+".png"})
            }
        }
        if(T.realTime>=T.time){
            player.moveList.splice(0,1)
            return
        }
        return
    }
    let xx=player.x,yy=player.y
    let mul=1
    let count=[]
    if(keys["a"]==true && keys["d"]==false)count.push("a")
    if(keys["d"]==true && keys["a"]==false)count.push("d")
    if(keys["w"]==true && keys["s"]==false)count.push("w")
    if(keys["s"]==true && keys["w"]==false)count.push("s")
    if(count.length==2){
        mul=Math.sqrt(2)/2
    }
    if(player.canMoveWhileAttacking==true || player.isAttacking==false){
        if(keys["a"]==true){
            player.x-=player.movespeed*dif*mul
        }
        if(keys["d"]==true){
            player.x+=player.movespeed*dif*mul
        }
        if(keys["w"]==true){
            player.y-=player.movespeed*dif*mul
        }
        if(keys["s"]==true){
            player.y+=player.movespeed*dif*mul
        }
    }
    let x=player.x,y=player.y
{
    if(player.mapId==0 && CalcDis(x,y,370,75)<=20){
        player.mapStr="向右走 , 前往新手村"
    }
    else if(player.mapId==1 && CalcDis(x,y,30,75)<=20){
        player.mapStr="向左走 , 前往史莱姆森林"
    }
    else if(player.mapId==1 && CalcDis(x,y,370,325)<=20){
        player.mapStr="向右走 , 前往哥布林营地"
    }
    else if(player.mapId==1 && CalcDis(x,y,150,40)<=20){
        player.mapStr="按下空格键 , 与铁匠交谈"
    }
    else if(player.mapId==1 && CalcDis(x,y,250,40)<=20){
        player.mapStr="按下空格键 , 与商人交谈"
    }
    else if(player.mapId==1 && CalcDis(x,y,200,370)<=20){
        player.mapStr="按下空格键 , 绑定复活点"
    }
    else if(player.mapId==2 && CalcDis(x,y,30,325)<=20){
        player.mapStr="向左走 , 前往新手村"
    }
    else if(player.mapId==2 && CalcDis(x,y,200,30)<=20){
        player.mapStr="向上走 , 前往篝火"
    }
    else if(player.mapId==3 && CalcDis(x,y,200,370)<=20){
        player.mapStr="向下走 , 前往哥布林营地"
    }
    else if(player.mapId==3 && CalcDis(x,y,200,200)<=20){
        player.mapStr="按下空格键 , 与[??]流浪者交谈"
    }
    else if(player.mapId==2 && CalcDis(x,y,370,75)<=20){
        if(player.lv<20){
            player.mapStr="前面的区域 , 等你20级以后再来探索吧"
        }
        else{
            player.mapStr="向右走 , 前往疾风城"
        }
    }
    else if(player.mapId==4 && CalcDis(x,y,30,75)<=20){
        player.mapStr="向左走 , 前往哥布林营地"
    }
    else if(player.mapId==4 && CalcDis(x,y,200,370)<=20){
        player.mapStr="按下空格键 , 绑定复活点"
    }
    else if(player.mapId==4 && CalcDis(x,y,150,40)<=20){
        player.mapStr="按下空格键 , 与铁匠交谈"
    }
    else if(player.mapId==4 && CalcDis(x,y,250,40)<=20){
        player.mapStr="按下空格键 , 与商人交谈"
    }
    else if(player.mapId==4 && CalcDis(x,y,370,200)<=20){
        player.mapStr="按下空格键 , 进入试炼场"
    }
    else if(player.mapId==4 && CalcDis(x,y,100,370)<=20){
        player.mapStr="向下走 , 前往疾风山谷"
    }
    else if(player.mapId==4 && CalcDis(x,y,300,370)<=20){
        player.mapStr="向下走 , 前往鱼人沼泽"
    }
    else if(player.mapId==6 && CalcDis(x,y,100,30)<=20){
        player.mapStr="向上走 , 前往疾风城"
    }
    else if(player.mapId==7 && CalcDis(x,y,300,30)<=20){
        player.mapStr="向上走 , 前往疾风城"
    }
    else if(player.mapId==7 && CalcDis(x,y,300,370)<=20){
        player.mapStr="向下走 , 前往暗影玄关"
    }
    else if(player.mapId==8 && CalcDis(x,y,300,30)<=20){
        player.mapStr="向上走 , 前往鱼人沼泽"
    }
    else if(player.mapId==8 && CalcDis(x,y,300,370)<=20){
        if(player.lv<40){
            player.mapStr="前面的区域 , 等你40级以后再来探索吧"
        }
        else{
            player.mapStr="向下走 , 前往狂兽城"
        }
    }
    else if(player.mapId==9 && CalcDis(x,y,300,30)<=20){
        player.mapStr="向上走 , 前往暗影玄关"
    }
    else if(player.mapId==9 && CalcDis(x,y,200,370)<=20){
        player.mapStr="按下空格键 , 绑定复活点"
    }
    else if(player.mapId==9 && CalcDis(x,y,40,150)<=20){
        player.mapStr="按下空格键 , 与铁匠交谈"
    }
    else if(player.mapId==9 && CalcDis(x,y,40,250)<=20){
        player.mapStr="按下空格键 , 与商人交谈"
    }
    else{
        player.mapStr=""
        player.openId=-1
    }
}
{
    if(player.mapId==0 && 50<=y && y<=100 && x>=385){
        player.mapId=1
        player.monsterList=[]
        player.summonList=[]
        player.x=30
        player.y=75
    }
    else if(player.mapId==1 && 50<=y && y<=100 && x<=15){
        player.mapId=0
        player.monsterList=[]
        player.summonList=[]
        player.x=370
        player.y=75
    }
    else if(player.mapId==1 && 300<=y && y<=350 && x>=385){
        player.mapId=2
        player.monsterList=[]
        player.summonList=[]
        player.x=30
        player.y=325
    }
    else if(player.mapId==2 && 300<=y && y<=350 && x<=15){
        player.mapId=1
        player.monsterList=[]
        player.summonList=[]
        player.x=370
        player.y=325
    }
    else if(player.mapId==2 && 175<=x && x<=225 && y<=15){
        player.mapId=3
        player.monsterList=[]
        player.summonList=[]
        player.x=200
        player.y=370
    }
    else if(player.mapId==3 && 175<=x && x<=225 && y>=385){
        player.mapId=2
        player.monsterList=[]
        player.summonList=[]
        player.x=200
        player.y=30
    }
    else if(player.mapId==2 && player.lv>=20 && 50<=y && y<=100 && x>=385){
        player.mapId=4
        player.monsterList=[]
        player.summonList=[]
        player.x=30
        player.y=75
    }
    else if(player.mapId==4 && 50<=y && y<=100 && x<=15){
        player.mapId=2
        player.monsterList=[]
        player.summonList=[]
        player.x=370
        player.y=75
    }
    else if(player.mapId==4 && 75<=x && x<=125 && y>=385){
        player.mapId=6
        player.monsterList=[]
        player.summonList=[]
        player.x=100
        player.y=30
    }
    else if(player.mapId==4 && 275<=x && x<325 && y>=385){
        player.mapId=7
        player.monsterList=[]
        player.summonList=[]
        player.x=300
        player.y=30
    }
    else if(player.mapId==6 && 75<=x && x<=125 && y<=15){
        player.mapId=4
        player.monsterList=[]
        player.summonList=[]
        player.x=100
        player.y=370
    }
    else if(player.mapId==7 && 275<=x && x<=325 && y<=15){
        player.mapId=4
        player.monsterList=[]
        player.summonList=[]
        player.x=300
        player.y=370
    }
    else if(player.mapId==7 && 275<=x && x<325 && y>=385){
        player.mapId=8
        player.monsterList=[]
        player.summonList=[]
        player.x=300
        player.y=30
    }
    else if(player.mapId==8 && 275<=x && x<=325 && y<=15){
        player.mapId=7
        player.monsterList=[]
        player.summonList=[]
        player.x=300
        player.y=370
    }
    else if(player.mapId==8 && player.lv>=40 && 275<=x && x<325 && y>=385){
        player.mapId=9
        player.monsterList=[]
        player.summonList=[]
        player.x=300
        player.y=30
    }
    else if(player.mapId==9 && 275<=x && x<=325 && y<=15){
        player.mapId=8
        player.monsterList=[]
        player.summonList=[]
        player.x=300
        player.y=370
    }
    else if(player.x<5 || player.x>395 || player.y<5 || player.y>395){
        player.x=xx,player.y=yy
    }
}
}
const namename=["hp","hpmax","atk","def"]
function SummonMonster(){
    let id=-1
    if(player.mapId==0 && player.monsterList.length<5)id=0
    if(player.mapId==2 && player.monsterList.length<7)id=Math.floor(random()*2)+1
    if(player.mapId==6 && player.monsterList.length<8)id=(random()<=0.95?3:4)
    if(player.mapId==7 && player.monsterList.length<8)id=5
    if(player.mapId==8 && player.monsterList.length<9)id=6
    if(id!=-1){
        let x=random()*(400-monsterSize[id][0]/2)+monsterSize[id][0]/2,y=random()*(400-monsterSize[id][1]/2)+monsterSize[id][1]/2
        let xxx={hp:0,hpmax:0,atk:0,def:0}
        for(let i=0;i<4;i++){
            xxx[namename[i]]=monsterBasic[id][namename[i]]
        }
        player.monsterList.push({id:id,
                                 x:x,
                                 y:y,
                                 szx:monsterSize[id][0],
                                 szy:monsterSize[id][1],
                                 basic:xxx,
                                 dir:Math.min(Math.floor(random()*4),3),
                                 attackTime:0,
                                 moveList:[],
                                 buffSeq:[],
                                 buffList:[],
                                 inBubble:false,
                                 inLight:false})
    }
}
function MoveMonster(dif){
    for(let i=0;i<player.monsterList.length;i++){
        for(let j=0;j<player.monsterList[i].buffList.length;j++){
            player.monsterList[i].buffList[j][1]-=dif
            if(player.monsterList[i].buffList[j][1]<=0){
                player.monsterList[i].buffList.splice(j,1)
                player.monsterList[i].buffSeq.splice(j,1)
                j--
            }
        }
    }
    for(let i=0;i<player.monsterList.length;i++){
        let difMul=1
        if(player.monsterList[i].buffSeq.includes(0)){
            difMul*=0.7
        }
        if(player.monsterList[i].inBubble==true){
            difMul*=0.5
        }
        if(player.monsterList[i].id=="boss0"){
            if(player.monsterList[i].moveList.length>0){
                let T=player.monsterList[i]
                let nx=T.x,ny=T.y
                nx+=dif*difMul/T.moveList[0].time*T.moveList[0].delx
                ny+=dif*difMul/T.moveList[0].time*T.moveList[0].dely
                player.monsterList[i].dir+=T.moveList[0].rounds*360*dif
                player.monsterList[i].moveList[0].realTime+=dif
                if(player.monsterList[i].moveList[0].realTime>=player.monsterList[i].moveList[0].time){
                    if(player.monsterList[i].times>1){
                        player.monsterList[i].moveList.push({times:T.moveList[0].times-1,delx:(player.x-T.x)*2,dely:(player.y-T.y)*2,time:1,realTime:0,rounds:2})
                    }
                    player.monsterList[i].moveList.splice(0,1)
                }
                if(nx<25 || nx>375 || ny<25 || ny>375){
                    continue
                }
                player.monsterList[i].x=nx
                player.monsterList[i].y=ny
                continue
            }
            else{
                player.monsterList[i].dir=0
            }
            continue    
        }
        if(player.monsterList[i].moveList.length>0){
            let T=player.monsterList[i]
            let nx=T.x,ny=T.y
            nx+=dif*difMul/T.moveList[0].time*T.moveList[0].delx
            ny+=dif*difMul/T.moveList[0].time*T.moveList[0].dely
            player.monsterList[i].moveList[0].realTime+=dif
            if(player.monsterList[i].moveList[0].realTime>=player.monsterList[i].moveList[0].time){
                if(player.monsterList[i].moveList[0].times>1){
                    player.monsterList[i].moveList.push({times:T.moveList[0].times-1,delx:(player.x-T.x)*1.5,dely:(player.y-T.y)*1.5,time:player.monsterList[i].moveList[0].time,realTime:0})
                }
                player.monsterList[i].moveList.splice(0,1)
            }
            if(nx<T.szx/2 || nx>400-T.szx/2 || ny<T.szy/2 || ny>400-T.szy/2){
                continue
            }
            player.monsterList[i].x=nx
            player.monsterList[i].y=ny
            continue
        }
        if(random()<dif*difMul*0.5){
            player.monsterList[i].dir=Math.min(Math.floor(random()*4),3)
        }
        let T=player.monsterList[i]
        let nx=T.x,ny=T.y
        let dis=Math.sqrt((player.x-player.monsterList[i].x)*(player.x-player.monsterList[i].x)+(player.y-player.monsterList[i].y)*(player.y-player.monsterList[i].y))
        let moveMul=0.2
        if(dis<=monsterBasic[player.monsterList[i].id].hatredRadius && dis>=monsterBasic[player.monsterList[i].id].stopMoveRadius && player.inShadow==0){
            moveMul=1
            let delx=player.x-player.monsterList[i].x,dely=player.y-player.monsterList[i].y
            if(delx<0 && Math.abs(dely)<Math.abs(delx)){
                player.monsterList[i].dir=0
            }
            if(delx>0 && Math.abs(dely)<Math.abs(delx)){
                player.monsterList[i].dir=1
            }
            if(dely<0 && Math.abs(dely)>Math.abs(delx)){
                player.monsterList[i].dir=2
            }
            if(dely>0 && Math.abs(dely)>Math.abs(delx)){
                player.monsterList[i].dir=3
            }
        }
        else if(dis<=monsterBasic[player.monsterList[i].id].stopMoveRadius){
            continue
        }
        if(player.monsterList[i].dir==0)nx-=monsterBasic[player.monsterList[i].id].speed*dif*difMul*moveMul
        if(player.monsterList[i].dir==1)nx+=monsterBasic[player.monsterList[i].id].speed*dif*difMul*moveMul
        if(player.monsterList[i].dir==2)ny-=monsterBasic[player.monsterList[i].id].speed*dif*difMul*moveMul
        if(player.monsterList[i].dir==3)ny+=monsterBasic[player.monsterList[i].id].speed*dif*difMul*moveMul
        if(nx<T.szx/2 || nx>400-T.szx/2 || ny<T.szy/2 || ny>400-T.szy/2){
            continue
        }
        player.monsterList[i].x=nx
        player.monsterList[i].y=ny
    }
}
function AttackMonster(dif){
    for(let i=0;i<player.monsterList.length;i++){
        let T=player.monsterList[i]
        if(T.id=="boss0"){
            let time=5
            if(T.stage==1)time-=1
            if(T.attackTime>=time-2 && T.needNewAttack==true){
                T.needNewAttack=false
                let dis=CalcDis(player.x,player.y,T.x,T.y)
                if(T.nextAttackId==2)T.nextAttackId=1
                else if(dis<=70){
                    T.nextAttackId=2
                }
                else{
                    T.nextAttackId=1
                }
            }
            if(T.attackTime>=time){
                player.monsterList[i].attackTime-=time
                player.monsterList[i].needNewAttack=true
                if(T.nextAttackId==1){
                    if(T.stage==0)
                    player.monsterList[i].moveList.push({times:1,delx:(player.x-T.x)*2,dely:(player.y-T.y)*2,time:2,realTime:0,rounds:2})
                    if(T.stage==1)
                    player.monsterList[i].moveList.push({times:3,delx:(player.x-T.x)*2,dely:(player.y-T.y)*2,time:2,realTime:0,rounds:3})
                }
                if(T.nextAttackId==2){
                    player.summonList.push({type:"wave",
                                            subType:"boss0",
                                            radius:100,
                                            x:T.x,
                                            y:T.y,
                                            damage:T.basic.atk,
                                            realTime:0,
                    })
                }
            }
        }
        else if(T.attackTime>=monsterBasic[T.id].attackSpeed){
            player.monsterList[i].attackTime-=monsterBasic[T.id].attackSpeed
            if(T.id==0 || T.id==1){
                player.monsterList[i].moveList.push({times:1,
                                                     logsId:player.logs.length+player.minus,
                                                     delx:(player.x-T.x)*2,
                                                     dely:(player.y-T.y)*2,
                                                     time:0.75,realTime:0})
                player.logs.push({type:2,id:T.id,damage:0})
            }
            else if(T.id==3){
                player.monsterList[i].moveList.push({times:2,
                                                     logsId:player.logs.length+player.minus,
                                                     delx:(player.x-T.x)*1.5,
                                                     dely:(player.y-T.y)*1.5,
                                                     time:0.75,realTime:0})
                player.logs.push({type:2,id:T.id,damage:0})
            }
            else if(T.id==4){
                player.monsterList[i].moveList.push({times:3,
                                                     logsId:player.logs.length+player.minus,
                                                     delx:(player.x-T.x)*1.5,
                                                     dely:(player.y-T.y)*1.5,
                                                     time:0.75,realTime:0})
                player.logs.push({type:2,id:T.id,damage:0})
            }
            else if(T.id==2){
                player.summonList.push({belong:"enemy",
                                        type:"throw",
                                        subType:11,
                                        damage:monsterBasic[2].atk,
                                        logsId:player.logs.length+player.minus,
                                        x:T.x,
                                        y:T.y,
                                        ex:player.x,
                                        ey:player.y,
                                        src:"js/img/Weapon/WeaponSpear.png",
                                        realTime:0})
                player.logs.push({type:3,
                                  subType:"weapon",
                                  id:T.id,weaponId:11,damage:0})
            }
            else if(T.id==5){
                if(random()<=0.66){
                    player.summonList.push({belong:"enemy",
                                            type:"throw",
                                            subType:26,
                                            damage:monsterBasic[5].atk,
                                            logsId:player.logs.length+player.minus,
                                            x:T.x,
                                            y:T.y,
                                            ex:player.x,
                                            ey:player.y,
                                            src:"js/img/Weapon/WeaponTrident.png",
                                            realTime:0})
                    player.logs.push({type:3,
                                      subType:"weapon",
                                      id:T.id,weaponId:26,damage:0})
                }
                else{
                    player.summonList.push({belong:"enemy",
                                            type:"ball",
                                            subType:"water",
                                            x:T.x,
                                            y:T.y,
                                            r:5,
                                            speed:40,
                                            dir:CalcAngle(T.x,T.y,player.x,player.y),
                                            turnSpeed:360,
                                            time:5,
                                            realTime:0})
                }
            }
            else if(T.id==6){
                player.monsterList[i].moveList.push({times:1,
                                                     logsId:player.logs.length+player.minus,
                                                     delx:(player.x-T.x)*2,
                                                     dely:(player.y-T.y)*2,
                                                     time:1,realTime:0})
                player.logs.push({type:2,id:T.id,damage:0})
            }
        }
    }
}
function IsInBetween(a, b, c) {
	if (Math.abs(a-b) < 0.000001 || Math.abs(b-c) < 0.000001) {
		return false;
	}
	
	return (a < b && b < c) || (c < b && b < a);
}
function LineIntersect(line1, line2)
{
    if(line1[0].x>line1[1].x){
        let tmp={x:0,y:0}
        tmp.x=line1[0].x
        tmp.y=line1[0].y
        line1[0].x=line1[1].x
        line1[0].y=line1[1].y
        line1[1].x=tmp.x
        line1[1].y=tmp.y
    }
    if(line2[0].x>line2[1].x){
        let tmp={x:0,y:0}
        tmp.x=line2[0].x
        tmp.y=line2[0].y
        line2[0].x=line2[1].x
        line2[0].y=line2[1].y
        line2[1].x=tmp.x
        line2[1].y=tmp.y
    }
	// 转换成一般式: Ax+By = C
	var a1 = line1[1].y - line1[0].y;
	var b1 = line1[0].x - line1[1].x;
	var c1 = a1 * line1[0].x + b1 * line1[0].y;
	
	//转换成一般式: Ax+By = C
	var a2 = line2[1].y - line2[0].y;
	var b2 = line2[0].x - line2[1].x;
	var c2 = a2 * line2[0].x + b2 * line2[0].y;
	
	// 计算交点		
	var d = a1*b2 - a2*b1;
	
	// 当d==0时，两线平行
	if (d == 0) {
		return false;
	}else {
		var x = (b2*c1 - b1*c2) / d;
		var y = (a1*c2 - a2*c1) / d;
					
		// 检测交点是否在两条线段上
		if ((IsInBetween(line1[0].x, x, line1[1].x) || IsInBetween(line1[0].y, y, line1[1].y)) &&
			(IsInBetween(line2[0].x, x, line2[1].x) || IsInBetween(line2[0].y, y, line2[1].y))) 
		{
			return true;	
		}
	}
	
	return false;
}
function IsPointInRect(x, y, x1, y1, x2, y2, x3, y3, x4, y4) {
    function crossProduct(ax, ay, bx, by) {
        return ax * by - ay * bx;
    }
 
    const d1 = crossProduct(x - x1, y - y1, x2 - x1, y2 - y1);
    const d2 = crossProduct(x - x2, y - y2, x3 - x2, y3 - y2);
    const d3 = crossProduct(x - x3, y - y3, x4 - x3, y4 - y3);
    const d4 = crossProduct(x - x4, y - y4, x1 - x4, y1 - y4);
 
    if ((d1 >= 0 && d2 >= 0 && d3 >= 0 && d4 >= 0) || (d1 <= 0 && d2 <= 0 && d3 <= 0 && d4 <= 0)) {
        return true;
    } else {
        return false;
    }
}
function RectangleIntersect(rect1,rect2,ctx){
    let dir=0
    let p=[0,0,0,0],P=[0,0,0,0]
    if(rect1.ep.length==2)dir=CalcAngle(rect1.x,rect1.y,rect1.ep[0],rect1.ep[1])
    if(rect1.ep.length==1)dir=rect1.ep[0]
    let x1=rect1.x+Math.sin(dir*Math.PI/180)*rect1.szy/2,y1=rect1.y-Math.cos(dir*Math.PI/180)*rect1.szy/2
    let x2=rect1.x-Math.sin(dir*Math.PI/180)*rect1.szy/2,y2=rect1.y+Math.cos(dir*Math.PI/180)*rect1.szy/2
    p[0]={x:x1-Math.cos(dir*Math.PI/180)*rect1.szx/2,y:y1-Math.sin(dir*Math.PI/180)*rect1.szx/2}
    p[1]={x:x1+Math.cos(dir*Math.PI/180)*rect1.szx/2,y:y1+Math.sin(dir*Math.PI/180)*rect1.szx/2}
    p[3]={x:x2-Math.cos(dir*Math.PI/180)*rect1.szx/2,y:y2-Math.sin(dir*Math.PI/180)*rect1.szx/2}
    p[2]={x:x2+Math.cos(dir*Math.PI/180)*rect1.szx/2,y:y2+Math.sin(dir*Math.PI/180)*rect1.szx/2}
    let Dir=0
    if(rect2.ep.length==2)Dir=CalcAngle(rect2.x,rect2.y,rect2.ep[0],rect2.ep[1])
    if(rect2.ep.length==1)Dir=rect2.ep[0]
    let X1=rect2.x+Math.sin(Dir*Math.PI/180)*rect2.szy/2,Y1=rect2.y-Math.cos(Dir*Math.PI/180)*rect2.szy/2
    let X2=rect2.x-Math.sin(Dir*Math.PI/180)*rect2.szy/2,Y2=rect2.y+Math.cos(Dir*Math.PI/180)*rect2.szy/2
    P[0]={x:X1-Math.cos(Dir*Math.PI/180)*rect2.szx/2,y:Y1-Math.sin(Dir*Math.PI/180)*rect2.szx/2}
    P[1]={x:X1+Math.cos(Dir*Math.PI/180)*rect2.szx/2,y:Y1+Math.sin(Dir*Math.PI/180)*rect2.szx/2}
    P[3]={x:X2-Math.cos(Dir*Math.PI/180)*rect2.szx/2,y:Y2-Math.sin(Dir*Math.PI/180)*rect2.szx/2}
    P[2]={x:X2+Math.cos(Dir*Math.PI/180)*rect2.szx/2,y:Y2+Math.sin(Dir*Math.PI/180)*rect2.szx/2}
    // ctx.lineWidth="2px"
    // ctx.strokeStyle="red"
    // ctx.beginPath()
    // ctx.moveTo(p[0].x,p[0].y)
    // ctx.lineTo(p[1].x,p[1].y)
    // ctx.lineTo(p[2].x,p[2].y)
    // ctx.lineTo(p[3].x,p[3].y)
    // ctx.lineTo(p[0].x,p[0].y)
    // ctx.moveTo(P[0].x,P[0].y)
    // ctx.lineTo(P[1].x,P[1].y)
    // ctx.lineTo(P[2].x,P[2].y)
    // ctx.lineTo(P[3].x,P[3].y)
    // ctx.lineTo(P[0].x,P[0].y)
    // ctx.stroke()
    for(let i=0;i<4;i++){
        if(IsPointInRect(p[i].x,p[i].y,P[0].x,P[0].y,P[1].x,P[1].y,P[2].x,P[2].y,P[3].x,P[3].y)){
            return true
        }
    }
    for(let i=0;i<4;i++){
        if(IsPointInRect(P[i].x,P[i].y,p[0].x,p[0].y,p[1].x,p[1].y,p[2].x,p[2].y,p[3].x,p[3].y)){
            return true
        }
    }
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(LineIntersect([p[i],p[(i+1)%4]],[P[j],P[(j+1)%4]])){
                return true
            }
        }
    }
    return false
}
function CalcSummonDamage(dif,ctx){
    for(let i=0;i<player.summonList.length;i++){
        player.summonList[i].realTime+=dif
    }
    player.inBubble=false
    for(let i=0;i<player.monsterList.length;i++){
        player.monsterList[i].inBubble=false
    }
    for(let i=0;i<player.summonList.length;i++){
        let T=player.summonList[i]
        if(T.type=="throw"){
            if(T.belong=="enemy"){
                if(T.realTime>=2){
                    player.summonList.splice(i,1)
                    i--
                    continue
                }
                let rlx,rly,dir=CalcAngle(T.x,T.y,T.ex,T.ey)
                if(T.realTime<=1){
                    rlx=(T.ex-T.x)*T.realTime+T.x,rly=(T.ey-T.y)*T.realTime+T.y
                    DrawImage(dir,rlx,rly,weaponSize[T.subType][0],weaponSize[T.subType][1],T.src,ctx)
                }
                else{
                    rlx=T.ex,rly=T.ey
                    DrawImage(dir,rlx,rly,weaponSize[T.subType][0],weaponSize[T.subType][1],T.src,ctx)
                }
                if(RectangleIntersect({x:rlx,y:rly,ep:[dir],szx:weaponSize[T.subType][0],szy:weaponSize[T.subType][1]},{x:player.x,y:player.y,ep:[0],szx:playerSize[0],szy:playerSize[1]},ctx)){
                    let count=Math.max(0,Math.min(dif*(T.damage-player.def),player.hp))
                    player.hp-=count
                    if(T.logsId>=player.minus){
                        player.logs[T.logsId-player.minus].damage+=count
                    }
                    if(player.hp<=0.0001){
                        Revive()
                    }
                }
            }
            else{
                if(T.realTime>=3){
                    player.summonList.splice(i,1)
                    i--
                    continue
                }
                let rlx=T.x,rly=T.y,dir=CalcAngle(T.x,T.y,T.ex,T.ey)
                if(0.5<=T.realTime && T.realTime<=1.5){
                    rlx=(T.ex-T.x)*(T.realTime-0.5)+T.x,rly=(T.ey-T.y)*(T.realTime-0.5)+T.y
                    DrawImage(dir,rlx,rly,weaponSize[11][0],weaponSize[11][1],T.src,ctx)
                }
                else if(T.realTime>1.5){
                    rlx=T.ex,rly=T.ey
                    DrawImage(dir,rlx,rly,weaponSize[11][0],weaponSize[11][1],T.src,ctx)
                }
                else{
                    DrawImage(dir,rlx,rly,weaponSize[11][0],weaponSize[11][1],T.src,ctx)
                }
                for(let j=0;j<player.monsterList.length;j++){
                    let y=player.monsterList[j]
                    if(RectangleIntersect({x:rlx,y:rly,ep:[dir],szx:weaponSize[11][0],szy:weaponSize[11][1]},{x:y.x,y:y.y,ep:[0],szx:y.szx,szy:y.szy})){
                        let count=Math.max(0,Math.min(dif*(T.damage-y.basic.def),y.basic.hp))
                        player.monsterList[j].basic.hp-=count
                        if(T.logsId>=player.minus){
                            let hs=false
                            for(let k=0;k<player.logs[T.logsId-player.minus].damageList.length;k++){
                                if(player.logs[T.logsId-player.minus].damageList[k][0]==y.id){
                                    player.logs[T.logsId-player.minus].damageList[k][1]+=count
                                    hs=true
                                    break
                                }
                            }
                            if(!hs){
                                player.logs[T.logsId-player.minus].damageList.push([y.id,count])
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
        if(T.type=="weapon"){
            if(T.realTime>=1){
                player.summonList.splice(i,1)
                i--
                continue
            }
            let rldis=0
            if(T.realTime>=0.1 && T.realTime<=0.5){
                rldis=T.deldis/0.4*(T.realTime-0.1)
            }
            else if(T.realTime>=0.5 && T.realTime<=0.9){
                rldis=T.deldis/0.4*(0.9-T.realTime)
            }
            let dir=T.dir
            let count=[]
            if(keys["a"]==true && keys["d"]==false)count.push("a")
            if(keys["d"]==true && keys["a"]==false)count.push("d")
            if(keys["w"]==true && keys["s"]==false)count.push("w")
            if(keys["s"]==true && keys["w"]==false)count.push("s")
            if(player.killNumBoss0>0 && player.canTurnWhileAttacking==true){
                dir=player.rDir
            }
            rldis+=T.dis
            let rlx=player.x+Math.sin(dir*Math.PI/180)*rldis,rly=player.y-Math.cos(dir*Math.PI/180)*rldis
            if(T.subType=="main" && player.skill24Switch==true){
                rlx+=Math.sin(dir*Math.PI/180)*5
                rly-=Math.cos(dir*Math.PI/180)*5
            }
            if(T.subType=="left"){
                rlx+=Math.sin((90-dir)*Math.PI/180)*(weaponSize[T.weaponId][0]+2)
                rly+=Math.cos((90-dir)*Math.PI/180)*(weaponSize[T.weaponId][0]+2)
            }
            if(T.subType=="right"){
                rlx-=Math.sin((90-dir)*Math.PI/180)*(weaponSize[T.weaponId][0]+2)
                rly-=Math.cos((90-dir)*Math.PI/180)*(weaponSize[T.weaponId][0]+2)
            }
            ctx.globalAlpha=T.opacity
            DrawImage(dir,rlx,rly,weaponSize[T.weaponId][0],weaponSize[T.weaponId][1],"js/img/Weapon/Weapon"+weaponName[T.weaponId]+".png",ctx)
            ctx.globalAlpha=1
            for(let j=0;j<player.monsterList.length;j++){
                let y=player.monsterList[j]
                if(RectangleIntersect({x:rlx,y:rly,ep:[dir],szx:weaponSize[T.weaponId][0],szy:weaponSize[T.weaponId][1]},{x:y.x,y:y.y,ep:[0],szx:y.szx,szy:y.szy},ctx)){
                    let damageMul=1
                    if(player.weaponId==10)damageMul*=1.2
                    if(y.buffSeq.includes(1))damageMul*=1.2
                    let atkMul=T.mul
                    let count=Math.max(0,Math.min(dif*((T.weaponDamage+player.atk)*atkMul-y.basic.def)*damageMul,y.basic.hp))
                    player.monsterList[j].basic.hp-=count
                    if(player.weaponEnchantingId==0){
                        if(random()<=0.4*dif){
                            let fd=-1
                            for(let k=0;k<player.monsterList[j].buffList.length;k++){
                                if(player.monsterList[j].buffList[k][0]==0){
                                    fd=k
                                    player.monsterList[j].buffList[k][1]+=3
                                }
                            }
                            if(fd==-1){
                                player.monsterList[j].buffSeq.push(0)
                                player.monsterList[j].buffList.push([0,3])
                            }
                        }
                    }
                    if(player.weaponEnchantingId==3){
                        if(random()<=0.5*dif){
                            let fd=-1
                            for(let k=0;k<player.monsterList[j].buffList.length;k++){
                                if(player.monsterList[j].buffList[k][0]==1){
                                    fd=k
                                    player.monsterList[j].buffList[k][1]+=2
                                }
                            }
                            if(fd==-1){
                                player.monsterList[j].buffSeq.push(1)
                                player.monsterList[j].buffList.push([1,2])
                            }
                        }
                    }
                    if(T.logsId>=player.minus){
                        let hs=false
                        for(let k=0;k<player.logs[T.logsId-player.minus].damageList.length;k++){
                            if(player.logs[T.logsId-player.minus].damageList[k][0]==y.id){
                                player.logs[T.logsId-player.minus].damageList[k][1]+=count
                                hs=true
                                break
                            }
                        }
                        if(!hs){
                            player.logs[T.logsId-player.minus].damageList.push([y.id,count])
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
        if(T.type=="dash"){
            if(T.realTime>=1){
                player.summonList.splice(i,1)
                i--
                continue
            }
            ctx.globalAlpha=T.opacity*(1-T.realTime)
            DrawImage(0,T.x,T.y,playerSize[0],playerSize[1],T.src,ctx)
            ctx.globalAlpha=1
        }
        if(T.type=="wave"){
            if(T.subType=="boss0"){
                if(T.realTime>=2.5){
                    player.summonList.splice(i,1)
                    i--
                    continue
                }
                let r=T.radius*Math.min(T.realTime/2,1)
                ctx.beginPath();
                ctx.lineWidth=5
                ctx.strokeStyle="yellow"
                ctx.arc(T.x,T.y,r,0,2*Math.PI);
                ctx.stroke();
                if(CalcDis(player.x,player.y,T.x,T.y)<=r+Math.min(playerSize[0]/2,playerSize[1]/2)){
                    let count=Math.max(0,Math.min(dif*(T.damage-player.def),player.hp))
                    player.hp-=count
                    player.boss0DamageList[2]+=count
                    if(player.hp<=0.0001){
                        Revive()
                        return
                    }
                }
            }
        }
        if(T.type=="ball"){
            if(T.belong=="enemy"){
                if(T.realTime>=T.time){
                    player.summonList.splice(i,1)
                    i--
                    continue
                }
                player.summonList[i].dir=Track(T.x,T.y,player.x,player.y,T.dir,T.turnSpeed,dif)
                player.summonList[i].x=player.summonList[i].x+Math.cos((90-player.summonList[i].dir)*Math.PI/180)*dif*T.speed
                player.summonList[i].y=player.summonList[i].y-Math.sin((90-player.summonList[i].dir)*Math.PI/180)*dif*T.speed
                T=player.summonList[i]
                ctx.beginPath();
                ctx.arc(T.x,T.y,T.r,0,2*Math.PI);
                ctx.fillStyle='lightblue';
                ctx.fill();
                if(CalcDis(T.x,T.y,player.x,player.y)<=T.r+Math.min(playerSize[0]/2,playerSize[1]/2)){
                    player.inBubble=true
                }
            }
            else{
                if(T.realTime>=T.time){
                    player.summonList.splice(i,1)
                    i--
                    continue
                }
                let minDis=1000000,id=-1
                for(let j=0;j<player.monsterList.length;j++){
                    let T=player.monsterList[j]
                    let dis=Math.sqrt((player.x-T.x)*(player.x-T.x)+(player.y-T.y)*(player.y-T.y))
                    if(dis<minDis){
                        minDis=dis
                        id=j
                    }
                }
                player.summonList[i].dir=Track(T.x,T.y,player.monsterList[id].x,player.monsterList[id].y,T.dir,T.turnSpeed,dif)
                player.summonList[i].x=player.summonList[i].x+Math.cos((90-player.summonList[i].dir)*Math.PI/180)*dif*T.speed
                player.summonList[i].y=player.summonList[i].y-Math.sin((90-player.summonList[i].dir)*Math.PI/180)*dif*T.speed
                T=player.summonList[i]
                ctx.beginPath();
                ctx.arc(T.x,T.y,T.r,0,2*Math.PI);
                ctx.fillStyle='lightblue';
                ctx.fill();
                for(let j=0;j<player.monsterList.length;j++){
                    let TT=player.monsterList[j]
                    if(CalcDis(T.x,T.y,TT.x,TT.y)<=T.r+Math.min(TT.szx/2,TT.szy/2)){
                        player.monsterList[j].inBubble=true
                    }
                }
            }
        }
    }
}
function DrawMonster(ctx,dif){
    player.haveMonsterHatred=false
    if(player.mapId==5)player.haveMonsterHatred=true
    // player.monsterList[0].dir+=180*dif
    for(let i=0;i<player.monsterList.length;i++){
        let difMul=1
        if(player.monsterList[i].buffSeq.includes(0)){
            difMul*=0.7
        }
        if(player.monsterList[i].inBubble==true){
            difMul*=0.5
        }
        let T=player.monsterList[i]
        let img=new Image()
        let dis=Math.sqrt((player.x-T.x)*(player.x-T.x)
                         +(player.y-T.y)*(player.y-T.y))
        if(T.buffSeq.includes(1)){
            let count=Math.min(dif*10,T.basic.hp)
            player.monsterList[i].basic.hp-=count
            if(player.monsterList[i].basic.hp<=0.00001){
                Drop(T.id)
                player.monsterList.splice(i,1)
                i--
                continue
            }
        }
        if(T.id=="boss0"){
            let time=5
            if(T.stage==1)time-=1
            if(player.monsterList[i].moveList.length==0){
                player.monsterList[i].attackTime=Math.min(player.monsterList[i].attackTime+dif*difMul,time)
            }
            let src="js/img/Monster/BossScareCrow.png",src1="js/img/Monster/BossScareCrowArm.png"
            DrawImage(T.dir,T.x,T.y,T.szx,T.szy,src,ctx)
            if(T.inBubble==true){
                ctx.fillStyle="rgba(0,0,255,0.1)";
                ctx.fillRect(Math.round(T.x-T.szx/2),Math.round(T.y-T.szy/2),T.szx,T.szy);
            }
            let delx=0,dely=0
            if(T.nextAttackId==1){
                if(T.attackTime>=time-2){
                    delx=10*(T.attackTime-(time-2))/2
                }
            }
            if(T.nextAttackId==2){
                if(T.attackTime>=time-2){
                    dely=10*(T.attackTime-(time-2))/2
                }
            }
            let rlx1=T.x+45*Math.cos((180+T.dir)*Math.PI/180)-delx,rly1=T.y+45*Math.sin((180+T.dir)*Math.PI/180)-dely
            DrawImage(270+T.dir,rlx1,rly1,T.armSzx,T.armSzy,src1,ctx)
            let rlx2=T.x+45*Math.cos((T.dir)*Math.PI/180)+delx,rly2=T.y+45*Math.sin((T.dir)*Math.PI/180)-dely
            DrawImage(90+T.dir,rlx2,rly2,T.armSzx,T.armSzy,src1,ctx)
            ctx.lineWidth=10
            ctx.strokeStyle="red"
            ctx.beginPath()
            ctx.moveTo(Math.round(T.x-T.szx/2),Math.round(T.y-T.szy/2-10))
            ctx.lineTo(Math.round(T.x-T.szx/2+50*T.basic.hp/T.basic.hpmax),Math.round(T.y-T.szy/2-10))
            ctx.stroke()
            if(T.buffList.length>0){
                let x=T.x-3.5-4.5*(Math.max(T.buffList.length-1,0)),y=T.y-T.szy/2-24
                for(let j=0;j<T.buffList.length;j++){
                    img=new Image()
                    img.src="js/img/Monster/Buff"+buffSrc[T.buffList[j][0]]+".png"
                    ctx.drawImage(img,Math.round(x),Math.round(y),7,7)
                    x+=9
                }
            }
            continue
        }
        if(dis<=monsterBasic[player.monsterList[i].id].hatredRadius && player.inShadow==0){
            if(dis<=monsterBasic[player.monsterList[i].id].attackRadius && player.monsterList[i].moveList.length==0){
                player.monsterList[i].attackTime=Math.min(player.monsterList[i].attackTime+dif*difMul,monsterBasic[player.monsterList[i].id].attackSpeed)
            }
            player.haveMonsterHatred=true
        }
        else{
            player.monsterList[i].attackTime=0
        }
        let opacity=1
        if(T.id==6){
            opacity=(T.attackTime)
            if(T.moveList.length!=0){
                opacity=1
            }
        }
        if(T.inLight==true){
            opacity=Math.max(opacity,0.5)
        }
        img.src="js/img/Monster/Monster"+monsterName[T.id]+".png"
        ctx.globalAlpha=opacity
        ctx.drawImage(img,T.x-T.szx/2,T.y-T.szy/2,T.szx,T.szy)
        if(T.buffList.length>0){
            let x=T.x-3.5-4.5*(Math.max(T.buffList.length-1,0)),y=T.y-T.szy/2-11
            for(let j=0;j<T.buffList.length;j++){
                img=new Image()
                img.src="js/img/Monster/Buff"+buffSrc[T.buffList[j][0]]+".png"
                ctx.drawImage(img,Math.round(x),Math.round(y),7,7)
                x+=9
            }
        }
        if(T.inBubble==true){
            ctx.fillStyle="rgba(0,0,255,0.1)";
            ctx.fillRect(Math.round(T.x-T.szx/2),Math.round(T.y-T.szy/2),T.szx,T.szy);
        }
        if(dis<=monsterBasic[player.monsterList[i].id].hatredRadius && player.inShadow==0){
            let color='rgba(255,0,0,'+Math.min((player.monsterList[i].attackTime/monsterBasic[player.monsterList[i].id].attackSpeed/2+0.2),0.7)+')';
            ctx.fillStyle=color;
            if(T.id!=6)
            ctx.fillRect(Math.round(T.x-T.szx/2),Math.round(T.y-T.szy/2),T.szx,T.szy);
        }
        ctx.lineWidth=2
        ctx.strokeStyle="red"
        ctx.beginPath()
        ctx.moveTo(Math.round(T.x-T.szx/2),Math.round(T.y-T.szy/2-2))
        ctx.lineTo(Math.round(T.x-T.szx/2+monsterSize[T.id][0]*T.basic.hp/T.basic.hpmax),Math.round(T.y-T.szy/2-2))
        ctx.stroke()
        ctx.globalAlpha=1
    }
}
function ExpMaxCalc(){
    let begin=5
    begin*=Math.pow(1.1,Math.min(player.lv,20))
    begin*=Math.pow(1.15,Math.max(0,Math.min(player.lv-20,20)))
    begin*=Math.pow(1.2,Math.max(0,Math.min(player.lv-40,20)))
    begin*=Math.pow(1.25,Math.max(0,Math.min(player.lv-60,20)))
    begin*=Math.pow(1.3,Math.max(0,Math.min(player.lv-80,20)))
    return begin
}
function Plus(id){
    if(player.freePoint==0){
        player.logs.push({type:999,str:"<text style='color:grey'>你的自由属性点不足</text>"})
        return
    }
    player.freePoint-=1
    if(id==0){
        player.strength+=1
    }
    if(id==1){
        player.vitality+=1
    }
    if(id==2){
        player.agile+=1
    }
    if(id==3){
        player.wisdom+=1
    }
}
function Drop(id){
    if(id=="boss0"){
        if(player.killNumBoss0==0){
            player.logs.push({type:999,str:"现在你可以在使用 穿刺 时移动了"})
        }
        player.logs.push({type:999,str:"恭喜你成功击败 Lv30试炼官-稻草人"})
        player.mapId=4
        player.summonList=[]
        player.monsterList=[]
        player.x=200
        player.y=370
        player.killNumBoss0+=1
        return
    }
    player.killNum[id]+=1
    let str="你击杀了 "+monsterDisplayName[id]+" , 获得了"
    player.exp+=monsterDrop[id][0]
    str+=" "+monsterDrop[id][0]+"点<text style='color:#00bf00'>经验</text>"
    player.money+=monsterDrop[id][1]
    str+=" "+monsterDrop[id][1]+"枚<text style='color:gold'>金币</text>"
    for(let i=0;i<monsterDrop[id][2].length;i++){
        let x=monsterDrop[id][2][i][0],y=monsterDrop[id][2][i][1]
        if(random()<=x){
            str+=" "+y
            player.bag[nameToId[y]]+=1
            player.bagUnlock[nameToId[y]]=true
        }
    }
    let up=0,pointGain=0
    while(player.exp>=ExpMaxCalc()){
        player.exp-=ExpMaxCalc()
        player.lv+=1
        up+=1
        player.freePoint+=2
        pointGain+=2
    }
    player.logs.push({type:999,str:str})
    if(up>0){
        player.logs.push({type:999,str:"恭喜你升了"+up+"级"+" , 获得了"+pointGain+"点自由属性点"})
    }
}
function Revive(){
    player.exp=0
    player.hp=player.hpmax
    player.mp=player.mpmax
    player.x=200
    player.y=200
    player.isAttacking=false
    for(let i=0;i<3;i++){
        player.skillCoolDown[i]=0
    }
    player.monsterList=[]
    player.summonList=[]
    player.mapId=player.reviveMapId
    player.logs.push({type:999,str:"你死了"})
}
function CalcMonsterDamage(dif){
    for(let i=0;i<player.monsterList.length;i++){
        let difMul=1
        if(player.monsterList[i].buffSeq.includes(0)){
            difMul*=0.7
        }
        if(player.monsterList[i].inBubble==true){
            difMul*=0.5
        }
        let T=player.monsterList[i]
        if(T.id=="boss0"){
            let time=5
            if(T.stage==1)time-=1
            if(RectangleIntersect({x:T.x,y:T.y,ep:[T.dir],szx:T.szx,szy:T.szy},{x:player.x,y:player.y,ep:[0],szx:playerSize[0],szy:playerSize[1]})){
                let count=Math.max(0,Math.min(dif*difMul*(T.basic.atk-player.def),player.hp))
                player.hp-=count
                player.boss0DamageList[1]+=count
                if(player.hp<=0.0001){
                    Revive()
                    return
                }
            }
            let delx=0,dely=0
            if(T.nextAttackId==1){
                if(T.attackTime>=time-2){
                    delx=10*(T.attackTime-(time-2))/2
                }
            }
            if(T.nextAttackId==2){
                if(T.attackTime>=time-2){
                    dely=10*(T.attackTime-(time-2))/2
                }
            }
            let rlx1=T.x+45*Math.cos((180+T.dir)*Math.PI/180)-delx,rly1=T.y+45*Math.sin((180+T.dir)*Math.PI/180)-dely
            let rlx2=T.x+45*Math.cos((T.dir)*Math.PI/180)+delx,rly2=T.y+45*Math.sin((T.dir)*Math.PI/180)-dely
            if(RectangleIntersect({x:rlx1,y:rly1,ep:[270+T.dir],szx:T.armSzx,szy:T.armSzy},{x:player.x,y:player.y,ep:[0],szx:playerSize[0],szy:playerSize[1]})){
                let count=Math.max(0,Math.min(dif*difMul*(T.basic.atk-player.def),player.hp))
                player.hp-=count
                player.boss0DamageList[0]+=count
                if(player.hp<=0.0001){
                    Revive()
                    return
                }
            }
            if(RectangleIntersect({x:rlx2,y:rly2,ep:[90+T.dir],szx:T.armSzx,szy:T.armSzy},{x:player.x,y:player.y,ep:[0],szx:playerSize[0],szy:playerSize[1]})){
                let count=Math.max(0,Math.min(dif*difMul*(T.basic.atk-player.def),player.hp))
                player.hp-=count
                player.boss0DamageList[0]+=count
                if(player.hp<=0.0001){
                    Revive()
                    return
                }
            }
        }
        if(Math.max(player.x-playerSize[0]/2,T.x-T.szx/2)<=Math.min(player.x+playerSize[0]/2,T.x+T.szx/2)
        && Math.max(player.y-playerSize[1]/2,T.y-T.szy/2)<=Math.min(player.y+playerSize[1]/2,T.y+T.szy/2)){
            if(T.moveList.length>0){
                let count=Math.max(0,Math.min(dif*difMul*(T.basic.atk-player.def),player.hp))
                player.hp-=count
                if(T.moveList[0].logsId>=player.minus){
                    player.logs[T.moveList[0].logsId-player.minus].damage+=count
                }
            }
            if(player.hp<=0.0001){
                Revive()
                return
            }
        }
    }
}
function CalcAttribute(dif){
    let wolfPart=0
    if(player.helmetId==20){wolfPart+=1}
    if(player.armId==21){wolfPart+=1}
    if(player.armorId==22){wolfPart+=1}
    if(player.legId==23){wolfPart+=1}
    let partMul=[0,0,0,0,0]
    for(let i=0;i<5;i++){
        partMul[i]=1+0.05*player.equipmentUpLevel[i]
    }//武器 头盔 护甲 护手 护腿

    player.hpmax=10+10*player.realVitality
    if(player.helmetId==4){player.hpmax+=20*partMul[1]}
    if(player.helmetId==20){player.hpmax+=100*partMul[1]}
    if(player.armId==5){player.hpmax+=10*partMul[3]}
    if(player.armId==21){player.hpmax+=50*partMul[3]}
    if(player.armorId==6){player.hpmax+=10*partMul[2]}
    if(player.armorId==8){player.hpmax+=90*partMul[2]}
    if(player.armorId==22){player.hpmax+=50*partMul[2]}
    if(player.legId==7){player.hpmax+=10*partMul[4]}
    if(player.legId==23){player.hpmax+=50*partMul[4]}
    if(player.armorEnchantingId==2){player.hpmax+=50}
    if(wolfPart>=2)player.hpmax*=1.2

    let hpRe=0
    if(player.mapId==1){hpRe+=1}
    if(player.mapId==3){hpRe+=3}
    if(player.mapId==4){hpRe+=5}
    if(player.mapId==9){hpRe+=10}
    if(player.hpBottle[0]==28){hpRe+=10}
    if(player.hpBottle[0]==32){hpRe+=20}
    player.hp+=hpRe*dif
    player.hp=Math.max(0,Math.min(player.hp,player.hpmax))

    player.atk=0+1*player.realStrength
    if(player.armId==5){player.atk+=1*partMul[3]}
    if(player.armId==21){player.atk+=5*partMul[3]}
    if(player.legId==7){player.atk+=1*partMul[4]}
    if(player.legId==23){player.atk+=5*partMul[4]}

    player.def=0
    if(player.armorId==6){player.def+=1*partMul[2]}
    if(player.armorId==8){player.def+=9*partMul[2]}
    if(player.armorId==22){player.def+=5*partMul[2]}
    if(player.helmetEnchantingId==4){player.def+=2}
    if(player.armorEnchantingId==4){player.def+=2}
    if(player.armEnchantingId==4){player.def+=2}
    if(player.legEnchantingId==4){player.def+=2}
    if(wolfPart>=2)player.def*=1.2

    player.movespeed=5
    if(player.shoesId==1){player.movespeed=30}
    if(player.shoesId==9){player.movespeed=35}
    if(player.shoesEnchantingId==5){player.movespeed+=5}
    let xxx=(1+0.02*player.realAgile)
    if(xxx>1.2){
        xxx=1.2*Math.pow(xxx/1.2,0.8)
    }
    if(xxx>1.4){
        xxx=1.4*Math.pow(xxx/1.4,0.6)
    }
    if(xxx>1.6){
        xxx=1.6*Math.pow(xxx/1.6,0.5)
    }
    player.movespeed*=xxx
    if(player.shoesId==9){
        if(!player.haveMonsterHatred){
            player.movespeed*=1.5
        }
    }
    if(player.inBubble==true){
        player.movespeed*=0.5
    }

    player.mpmax=0+5*player.realWisdom
    if(player.armorEnchantingId==2){player.mpmax+=20}
    if(player.helmetEnchantingId==6){player.mpmax+=20}
    if(player.armorEnchantingId==6){player.mpmax+=20}
    if(player.armEnchantingId==6){player.mpmax+=20}
    if(player.legEnchantingId==6){player.mpmax+=20}

    let mpRe=0
    player.mpDamageMul=1
    if(player.mapId==1){mpRe+=0.5}
    if(player.mapId==3){mpRe+=1.5}
    if(player.mapId==4){mpRe+=2.5}
    if(player.mapId==9){mpRe+=5}
    if(player.mpBottle[0]==29){mpRe+=5}
    if(player.mpBottle[0]==33){mpRe+=10}
    if(player.helmetEnchantingId==6){mpRe+=1,player.mpDamageMul*=1.1}
    if(player.armorEnchantingId==6){mpRe+=1,player.mpDamageMul*=1.1}
    if(player.armEnchantingId==6){mpRe+=1,player.mpDamageMul*=1.1}
    if(player.legEnchantingId==6){mpRe+=1,player.mpDamageMul*=1.1}
    if(player.weaponId==26){player.mpDamageMul*=1.5}
    player.mpDamageMul*=(1+0.01*player.realWisdom)
    player.mp+=mpRe*dif
    if(player.skill24Switch==true){
        player.mp-=5*dif
        if(player.mp<0){
            player.skill24Switch=false
        }
    }
    player.mp=Math.max(0,Math.min(player.mp,player.mpmax))
}
const partName=["weaponEnchantingId","helmetEnchantingId","armorEnchantingId","armEnchantingId","legEnchantingId","shoesEnchantingId"]
function DealSkill(dif){
    let link=[2,15,16,24,26,27]
    for(let iii=0;iii<link.length;iii++){
        let i=link[iii]
        if(player.skillLevel[i].mastery>=player.skillLevel[i].base*Math.pow(2,player.skillLevel[i].lv)){
            player.skillLevel[i].mastery-=player.skillLevel[i].base*Math.pow(2,player.skillLevel[i].lv)
            player.skillLevel[i].lv+=1
        }
    }
    let num=0
    if(player.lv>=0)num+=1
    if(player.lv>=15)num+=1
    if(player.lv>=30)num+=1
    if(player.lv>=45)num+=1
    if(player.lv>=60)num+=1
    for(let i=0;i<num;i++){
        player.skillCoolDown[i]=Math.max(player.skillCoolDown[i]-dif,0)
    }
    for(let i=0;i<num;i++){
        let key=player.skillKey[i]
        if(keys[key]==true && NotInSafeZone()){
            if(player.skillId[i]==2 && player.skillCoolDown[i]==0){
                player.skillCoolDown[i]=1
                player.skillLevel[2].mastery+=1
                let id=player.weaponId
                let dis=20
                if(player.weaponId==10)dis-=5
                if(player.weaponId==11)dis+=10
                if(player.helmetEnchantingId==1)dis+=5
                let dir=player.rDir
                if(player.skill24Switch==false){
                    let mul=1+0.1*player.skillLevel[2].lv
                    if(player.inShadow>0){
                        player.inShadow=0
                        if(player.weaponId==30){
                            mul*=(1.5+0.1*player.skillLevel[31].lv)
                        }
                        mul*=(1.5+0.1*player.skillLevel[31].lv)
                    }
                    player.summonList.push({belong:"me",
                                            type:"weapon",
                                            subType:"main",
                                            weaponId:id,
                                            skillId:2,
                                            deldis:dis,
                                            dis:7+weaponSize[id][1]/2,
                                            dir:dir,
                                            mul:mul,
                                            opacity:1,
                                            weaponDamage:weaponDamage[id],
                                            logsId:player.logs.length+player.minus,
                                            realTime:0})
                    player.logs.push({type:0,str:idToName[2],damageList:[]})
                }
                else{
                    let mul=0.5+0.1*player.skillLevel[24].lv
                    if(player.inShadow>0){
                        player.inShadow=0
                        if(player.weaponId==30){
                            mul*=(1.5+0.1*player.skillLevel[31].lv)
                        }
                    }
                    player.summonList.push({belong:"me",
                                            type:"weapon",
                                            subType:"main",
                                            weaponId:id,
                                            skillId:2,
                                            deldis:dis,
                                            dis:7+weaponSize[id][1]/2,
                                            dir:dir,
                                            mul:mul,
                                            opacity:0.5+0.1*player.skillLevel[24].lv,
                                            weaponDamage:weaponDamage[id],
                                            logsId:player.logs.length+player.minus,
                                            realTime:0})
                    player.summonList.push({belong:"me",
                                            type:"weapon",
                                            subType:"left",
                                            weaponId:id,
                                            skillId:2,
                                            deldis:dis,
                                            dis:7+weaponSize[id][1]/2,
                                            dir:dir,
                                            mul:mul,
                                            opacity:0.5+0.1*player.skillLevel[24].lv,
                                            weaponDamage:weaponDamage[id],
                                            logsId:player.logs.length+player.minus,
                                            realTime:0})
                    player.summonList.push({belong:"me",
                                            type:"weapon",
                                            subType:"right",
                                            weaponId:id,
                                            skillId:2,
                                            deldis:dis,
                                            dis:7+weaponSize[id][1]/2,
                                            dir:dir,
                                            mul:mul,
                                            opacity:0.5+0.1*player.skillLevel[24].lv,
                                            weaponDamage:weaponDamage[id],
                                            logsId:player.logs.length+player.minus,
                                            realTime:0})
                    player.logs.push({type:0,str:idToName[24],damageList:[]})
                }
            }
            if(player.skillId[i]==15 && player.skillCoolDown[i]==0 && player.mp>=4+4*player.skillLevel[15].lv){
                let minDis=1000000,id=-1
                for(let j=0;j<player.monsterList.length;j++){
                    let T=player.monsterList[j]
                    let dis=Math.sqrt((player.x-T.x)*(player.x-T.x)+(player.y-T.y)*(player.y-T.y))
                    if(dis<minDis){
                        minDis=dis
                        id=j
                    }
                }
                if(minDis>100+10*player.skillLevel[15].lv){
                    continue
                }
                player.skillCoolDown[i]=3
                player.mp-=4+4*player.skillLevel[15].lv
                player.skillLevel[15].mastery+=1
                let dmg=(4+4*player.skillLevel[15].lv)*(2+0.2*player.skillLevel[15].lv)*player.mpDamageMul
                if(player.inShadow>0){
                    player.inShadow=0
                }
                player.summonList.push({belong:"me",
                                        type:"throw",
                                        subType:11,
                                        damage:dmg,
                                        logsId:player.logs.length+player.minus,
                                        x:player.x,
                                        y:player.y,
                                        ex:player.monsterList[id].x,
                                        ey:player.monsterList[id].y,
                                        src:"js/img/Weapon/WeaponSpear.png",
                                        realTime:0})
                player.logs.push({type:0,str:idToName[15],damageList:[]})
            }
            if(player.skillId[i]==27 && player.skillCoolDown[i]==0 && player.mp>=10+2*player.skillLevel[27].lv){
                let minDis=1000000,id=-1
                for(let j=0;j<player.monsterList.length;j++){
                    let T=player.monsterList[j]
                    let dis=Math.sqrt((player.x-T.x)*(player.x-T.x)+(player.y-T.y)*(player.y-T.y))
                    if(dis<minDis){
                        minDis=dis
                        id=j
                    }
                }
                if(minDis>100+10*player.skillLevel[27].lv){
                    continue
                }
                player.skillCoolDown[i]=10
                player.mp-=10+2*player.skillLevel[27].lv
                player.skillLevel[27].mastery+=1
                if(player.inShadow>0){
                    player.inShadow=0
                }
                player.summonList.push({belong:"me",
                                        type:"ball",
                                        subType:"water",
                                        x:player.x,
                                        y:player.y,
                                        r:5,
                                        speed:30+10*player.skillLevel[27].lv,
                                        dir:CalcAngle(player.x,player.y,player.monsterList[id].x,player.monsterList[id].y),
                                        turnSpeed:360,
                                        time:5+0.5*player.skillLevel[27].lv,
                                        realTime:0})
            }
        }
        if(keys[key]==true){
            if(player.skillId[i]==16 && player.skillCoolDown[i]==0){
                let deldis=player.movespeed*(3+0.5*Math.min(player.skillLevel[16].lv,4))*(0.2+0.05*Math.max(0,player.skillLevel[16].lv-4))
                let dir=player.rDir
                player.skillCoolDown[i]=3
                player.skillLevel[16].mastery+=1
                player.moveList.push({type:0,x:player.x,y:player.y,dis:deldis,dir:dir,time:0.2,realTime:0,times:0})
            }
            if(player.skillId[i]==24 && player.skillCoolDown[i]==0 && player.mp>0){
                player.skillCoolDown[i]=1
                player.skill24Switch=!player.skill24Switch
            }
            if(player.skillId[i]==31 && player.skillCoolDown[i]==0 && player.mp>=10+2*player.skillLevel[31].lv){
                player.mp-=10+2*player.skillLevel[31].lv
                player.skillCoolDown[i]=10
                player.skillLevel[31].mastery+=1
                player.inShadow=2.5
            }
            if(player.skillId[i]==34 && player.skillCoolDown[i]==0 && player.mp>=10+2*player.skillLevel[34].lv){
                player.mp-=10+2*player.skillLevel[34].lv
                player.skillCoolDown[i]=15
                player.skillLevel[34].mastery+=1
                // player.summonList.push({type:"wave",
                //                         subType:"light",
                //                         radius:100+10*player.skillLevel[34].lv,
                //                         realTime:0,})
                player.inLight=10
            }
        }
    }
    player.isAttacking=false
    for(let i=0;i<num;i++){
        if(player.skillId[i]==2 && player.skillCoolDown[i]>0){
            player.isAttacking=true
        }
    }
}