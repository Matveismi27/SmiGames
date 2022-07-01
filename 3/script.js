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
        this.height=height+gun.power||20+gun.power;
        this.width=width+gun.power||20+gun.power;
        this.hp=1;
        this.color="rgb("+(gun.power * 20)+",60,60)"
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
        this.color="rgba("+this.hp+","+this.hp*5+","+this.hp*10+",0.2)"
        this.kill=false;
        this.img=new Image();
        this.img.src=img||"df.png"
    }
}
//данные
bullets=[];
obj=[];
autofiresleep=0;
timermobs=1990;
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
    Count:0,
    power:0
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
LvlUp = {
    points:0,
    lvl:1,
    needXP:1,
    incneedXP:1,
    xp:0
}
//рисование блоками
function draw(x , y, hp, dx, dy, height,width,src){
    obj[obj.length]=new block (x*100,y*100,height,width, hp, dx,dy,src)
}
//гравитация
function bgravity(bullet){
    if (!bullet.kill)
    {
        bullet.x+=bullet.dx;
        bullet.y+=bullet.dy;
        bullet.dx*=0.999;
        bullet.dy+=0.01;
        ctx.fillStyle = 'rgb('+gun.power+',130,130)'
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
    //POWER
    if (gun.power>=gun.size*10){
    }else{
        
        gun.power+=gun.size/100;
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
        //рандомный враг
        random = getRandomInt(5)//0,1,2,3,4
        if (random==0){
            draw(16,3,mob.hp,mob.sdx-1,mob.sdy,mob.height,mob.width,"SA.png")
            mob.hp+=1;
            mob.sdx-=0.01;
        }else if(random==1){
            draw(16,4,mob.hp/2,mob.sdx-2,mob.sdy,mob.height-40,mob.width-40,"sam.png")
            mob.hp+=1;
            mob.sdx-=0.01;
        }else if(random==2){
            draw(16,5,mob.hp*2,mob.sdx,mob.sdy,mob.height-30,mob.width+100,"sun.png")
            mob.hp+=7;
            mob.sdx-=0.01;
        }else{
            //стандартный моб
            draw(16,5,mob.hp/2,mob.sdx,mob.sdy+0.1,mob.height-90,mob.width-50)
        }
    }else{
        timermobs+=2
    }
    //постоянная статистика
    ctx.fillStyle="rgba(20,260,20,0.7)"
    ctx.font="60px Impact"
        ctx.fillText(LvlUp.xp+"/"+LvlUp.needXP+"  |"+LvlUp.points, 300, 130);
        ctx.fillText(Math.round(gun.power)+"/"+gun.size*10, 300, 190);
    //Огненный текст обработка
    if (Ftext.Fire>0){
        Ftext.Fire-=1;
        ctx.fillStyle="rgba(260,260,260,"+Ftext.Fire/100+")"
        ctx.font="60px Impact"
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
    object.color="rgba("+object.hp+","+object.hp*5+","+object.hp*10+","+0.01*object.hp+")"
    if (object.hp<=0){
        object.kill=true;
        XP(1);
    }
}
//случайности насыпем
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  //Sтреляем текстом
function SFire(text,fire){
    Ftext.Text=text
    Ftext.Fire=fire
}
function XP(points){
    //опыт
    LvlUp.xp+=points;
    //лвл ап
    if (LvlUp.xp>=LvlUp.needXP){
        SFire("Новый уровень!",200)
        LvlUp.points+=1
        LvlUp.needXP+=LvlUp.incneedXP
        LvlUp.xp=0
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
            fdmg(obj2,gun.dmg+gun.power)
            
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
    gun.power=0;//обнуляем повер
}
document.getElementById("i1").onclick =()=>{
    if ( LvlUp.points>=1 ){
        LvlUp.points-=1;
        gun.size+=1;
        SFire("Пушка увеличена!",200)
    }
}
document.getElementById("i2").onclick =()=>{
    if ( LvlUp.points>=1 ){
        LvlUp.points-=1;
        gun.db+=1;
        SFire("Шмаляй в даль",200)
    }
}
document.getElementById("i3").onclick =()=>{
    if ( LvlUp.points>=1 ){
        LvlUp.points-=1;
        gun.dmg+=2;
        SFire("Пробей их броню",200)
    }
}
//просто для позиции мыши
canvas.addEventListener(`mousemove`, setPos);
function setPos({layerX, layerY}) {
    [mouse.x, mouse.y] = [layerX, layerY];
  }
//запускаем игру
setInterval(time,1);