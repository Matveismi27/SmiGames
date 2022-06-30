//установки
canvas = document.getElementById("cnv");
ctx=canvas.getContext("2d");

//Фон
ctx.fillStyle = 'rgb(20,20,30)'
ctx.fillRect(0,0,canvas.width,canvas.height);
//классы
class bul{
    constructor(x,y,dx,dy,height,width){
        this.x=x||10;
        this.y=y||10;
        this.dx=dx||5;
        this.dy=dy||5;
        this.height=height||20;
        this.width=width||20;
        this.hp=1;
        this.color="rgba(60,60,60)"
        this.kill=false;
    }
}
class block{
    constructor(x,y,height,width,hp,dx,dy,img){
        this.x=x||10;
        this.y=y||10;
        this.dx=dx||0;
        this.dy=dy||0;
        this.hp=hp||10;
        this.width=width||200;
        this.height=height||200;
        this.color="rgba(60,60,"+this.hp*10+",0.5)"
        this.kill=false;
        this.img=new Image();
        this.img.src=img||"SA.png"
    }
}
//данные
bullets=[];
obj=[];
autofiresleep=0;
xp=0;
timermobs=1990;
needXP=1;
i=0;
mouse = {
    x:10,//изначально
    y:10
    }
gun = {
    x:10,
    y:600,
    db:2, //скорость пули
    dmg:1,
    size:2,
    Count:0
}
mob ={
    hp:2,
    sdx:-0.3,
    sdy:1,
    height:300,
    width:200
}
Ftext ={
    fire:0,
    Text:"Новый уровень",
    x:100,
    y:100
}
//рисование блоками
function draw(x , y, hp, dx, dy, height,width){
    obj[obj.length]=new block (x*100,y*100,height,width, hp, dx,dy)
}
//гравитация
function bgravity(bullet){
    if (!bullet.kill)
    {
        bullet.x+=bullet.dx;
        bullet.y+=bullet.dy;
        bullet.dx*=0.999;
        bullet.dy+=0.01;
        ctx.fillStyle = 'rgb(130,130,130)'
        ctx.fillRect(bullet.x,bullet.y,bullet.width,bullet.height);
    }
}
/////////рисуем объекты
function objgrav(object){
    if (!object.kill){
        object.dy+=0.01;
    object.x+=object.dx;
    object.y+=object.dy;
    ctx.fillStyle = object.color
    ctx.fillRect(object.x,object.y,object.width,object.height);
    ctx.drawImage(object.img,object.x,object.y,object.width,object.height);
    if (object.y+object.height>canvas.height&&object.dy>0){
        object.dy*=-1;
    }
        if(object.x<0){
            location = location
            alert("Ты проиграл")
            
        }
    }
}
//цикл игры
function time(){
    //автострельба
    for(j=0;j<gun.Count;j++){
        autofiresleep+=1;
        if (autofiresleep>=100){
            autofiresleep=0;
            fire()
        }
        
    }
    //фон
    canvas.width = window.innerWidth-15;
    canvas.height = window.innerHeight-15;
    
    ctx.fillStyle = 'rgb(30,30,30)'
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //рисуем пули
    for (j=0;j<bullets.length;j+=1){
        if (bullets[j].y>1000){
            bullets[j].kill=true
        }
        bgravity(bullets[j]);
    }
    //касания и объекты
    for(j=0;j<obj.length;j++){
        if (!obj[j].kill){
        objgrav(obj[j])
        for(k=0;k<bullets.length;k+=1){
            if (!bullets[k].kill){
            touch(bullets[k],obj[j])
            }
        }
        }
    }
    //спавн мобов -------------------------------------------------
    if (timermobs>=2300){
        timermobs=0
        //спавн
        draw(16,5,mob.hp,mob.sdx,mob.sdy,mob.height,mob.width)
        mob.hp+=1;
        mob.sdx-=0.01;
    }else{
        timermobs+=mob.hp/10+1
    }
    //Огненный текст
    if (Ftext.Fire>0){
        Ftext.Fire-=1;
        ctx.fillStyle="rgba(200,200,200,"+Ftext.Fire/100+")"
        ctx.font="80px Impact"
        ctx.fillText(Ftext.Text, Ftext.x, Ftext.y);
        Ftext.x+=0.5;
        Ftext.y+=0.5;
        if (Ftext.Fire==0){
            Ftext.x=10;
            Ftext.y=10;
        }
    }
}
function fdmg(object,dmg){
    // obj[obj.length]=new block(object.x,object.y,10,10,1);
    object.hp-=dmg;
    object.color="rgba(60,60,"+object.hp*10+",0.5)"
    if (object.hp<=0){
        object.kill=true;
        XP(1);
    }
}
function XP(points){
    //опыт
    xp+=points;
    //лвл ап
    if (xp>=needXP){
        Ftext.Text="Новый уровень!"
        Ftext.Fire=200
        gun.db+=0.2;
        gun.dmg+=needXP/10;
        
        needXP+=1
        xp=0
        gun.size+=1;
    }
    //super buffs
    if (needXP==10){
        Ftext.Text="Супер бафф"
        gun.Count+=1;
    }
}

function touch(obj1,obj2){
    if ((obj1.x+obj1.width/*ширина пульки*/>obj2.x)&&(obj1.x-obj2.width<obj2.x))//по x (obj1.x>obj2.x)
    {
        if ((obj1.y+obj1.height/*высота пульки*/>obj2.y)&&(obj1.y-obj2.height<obj2.y))//по y +obj2.height
        {
            obj1.kill=true;
            fdmg(obj2,gun.dmg)
            
        }
    }
}

//функция огня по клику
canvas.onclick = function Fire(){
    
    let DX= mouse.x-gun.x;
        DY= mouse.y-gun.y;
        HYP = Math.sqrt(DX*DX+DY*DY)
        direction = Math.asin(DY/HYP)
    bullets[i]=new bul(gun.x,gun.y,Math.cos(direction)*gun.db,Math.sin(direction)*gun.db,gun.size*2,gun.size*2)
    i+=1;//добавляем пулю
}
//просто для позиции мыши
canvas.addEventListener(`mousemove`, setPos);
function setPos({layerX, layerY}) {
    [mouse.x, mouse.y] = [layerX, layerY];
  }
//запускаем игру
setInterval(time,1);