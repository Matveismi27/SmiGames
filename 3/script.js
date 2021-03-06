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
    constructor(x,y,height,width,hp,dx,dy,img,type,type2){
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
        this.type=type||"mob"
        this.type2=type2||""
    }
}
//данные
bullets=[];
obj=[];
autofiresleep=0;
timermobs=1990;
i=0;
boss={
    hp:100,
    sdx:-0.05,
    sx:13
}
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
    width:200,
    lvl:1
}
Ftext ={
    fire:0,
    Text:"Новый уровень",
    x:100,
    y:100
}
Ftext2 ={
    fire:0,
    Text:"Бафф за босса",
    x:110,
    y:310
}
LvlUp = {
    points:0,
    lvl:1,
    needXP:1,
    incneedXP:1,
    xp:0
}
//рисование блоками
function draw(x , y, hp, dx, dy, height,width,src,type,type2){
    obj[obj.length]=new block (x*100,y*100,height,width, hp, dx,dy,src,type,type2)
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
        if (object.type2=="SA"){
            object.hp+=0.1;
        }
        if (object.type=="boss"){
            
        }else{
            object.dy+=0.01;
        }
        object.x+=object.dx;
        object.y+=object.dy;
        object.color = "rgba("+object.hp/10+","+object.hp+","+object.hp*10+","+0.002*object.hp+")"
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
function getArtifact(){
    random = getRandomInt(10)//0-9
    switch (random){
        case 0:
            //легендарный меч
            SFire2("Легендарный бафф! Урон по боссам х2",400)
            boss.hp/=2
        break
        case 1:
            //легендарный щит
            SFire2("Легендарный бафф! Урон по мобам х2",400)
            mob.hp/=2
        break
        case 2:
        case 3:
            SFire2("Эпический бафф! Размер х2",400)
            gun.size*=2;
        break
        case 4:
            SFire2("Легендарный бафф! Авто огонь!",400)
            gun.Count+=1
        break
        default:
            //+к урону
            SFire2("За босса вы получили бонус к урону!",400)
            gun.dmg+=mob.lvl;
        break
    }
}
function fdmg(object,dmg){
    // obj[obj.length]=new block(object.x,object.y,10,10,1);
    object.hp-=dmg;
    object.color="rgba("+object.hp/10+","+object.hp+","+object.hp*10+","+0.002*object.hp+")"
    if (object.hp<=0){
        object.kill=true;
        if (object.type=="boss"){ 
            
            boss.sx+=3
            boss.hp*=2
            boss.sdx+=-0.01
            mob.lvl+=1;
            SpawnBoss()
            getArtifact()
            XP(1);
        }
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
function SFire2(text,fire){
    Ftext2.Text=text
    Ftext2.Fire=fire
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
        if (LvlUp.needXP==10){
            Ftext2.Text="Авто огонь!"
            gun.Count+=1;
        }
    }
    //super buffs
    
}

function touch(obj1,obj2){
    if ((obj1.x+obj1.width/*ширина пульки*/>obj2.x)&&(obj1.x-obj2.width<obj2.x))//по x (obj1.x>obj2.x)
    {
        if ((obj1.y+obj1.height/*высота пульки*/>obj2.y)&&(obj1.y-obj2.height<obj2.y))//по y +obj2.height
        {
            obj1.kill=true;
            fdmg(obj2,gun.dmg+gun.power*2)
            
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
//спавним следующего босса
function SpawnBoss(){
    
    switch (getRandomInt(5)){
        case 0:
            draw(boss.sx,2,boss.hp,boss.sdx,0,810,720,"ktulhu.png","boss")
        break
        case 1:
            draw(boss.sx,2,boss.hp,boss.sdx,0,615,800,"hel.png","boss")
            draw(boss.sx-1,2,boss.hp/2,boss.sdx,2,200,250,"sun.png")
        break
        case 2:
            draw(boss.sx,2,boss.hp,boss.sdx,0,715,740,"SA.png","boss","SA")
        break
        case 3:
            draw(boss.sx,3,boss.hp/2,boss.sdx*4,0,715,740,"sam.png","boss")
        break
        case 4:
            draw(boss.sx,2,boss.hp*2,boss.sdx,0,715,740,"sun.png","boss")
            draw(boss.sx-1,2,boss.hp/2,boss.sdx,2,200,250,"hel.png")
            draw(boss.sx-1,3,boss.hp/2,boss.sdx,2,200,250,"hel.png")
        break
        
    }
    
    
}
function DoubleFire(){
    let DX= mouse.x-gun.x;
        DY= mouse.y-gun.y;
        HYP = Math.sqrt(DX*DX+DY*DY)
        direction = Math.asin(DY/HYP)
    bullets[i]=new bul(gun.x,gun.y,Math.cos(direction)*gun.db/2,Math.sin(direction)*gun.db,gun.size,gun.size)
    i+=1;//добавляем пулю
}
  //цикл игры
function time(){
    if (gun.Count>0){
        if (autofiresleep%(200 - gun.Count*10)==1){
            DoubleFire()
            autofiresleep+=1
            gun.power*=0.65;
        }else{
            autofiresleep+=1
        }
    }
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
        random = getRandomInt(mob.lvl)//0,1,2,3,4
        mob.hp+=1;
        mob.sdx-=0.01;
        if (random==0){
            //N
            draw(16,5,mob.hp/2,mob.sdx,mob.sdy+0.1,mob.height-90,mob.width-50)
        }else if(random==1){
            //sun
            draw(16,5,mob.hp*2,mob.sdx,mob.sdy,mob.height-30,mob.width+100,"sun.png")
            
        }else if(random==2){
            //sam
            draw(16,4,mob.hp/2,mob.sdx-2,mob.sdy,mob.height-40,mob.width-40,"sam.png")
            
        }else if (random==3){
            //стандартный моб
            draw(16,3,mob.hp*2,mob.sdx-1,mob.sdy,mob.height,mob.width,"SA.png",false,"SA")
        }
        else if (random==4){
            draw(16,3,mob.hp*3,mob.sdx,mob.sdy,mob.height+50,mob.width+50,"dog.png")
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
    //Огненный текст2 обработка
    if (Ftext2.Fire>0){
        Ftext2.Fire-=1;
        ctx.fillStyle="rgba(20,260,260,"+Ftext2.Fire/100+")"
        ctx.font="60px Impact"
        ctx.fillText(Ftext2.Text, Ftext2.x, Ftext2.y);
        Ftext2.x+=0;
        Ftext2.y+=0.1;
        if (Ftext2.Fire==0){
            Ftext2.x=110;
            Ftext2.y=210;
        }
    }
}
//запускаем игру
function init(){
    SpawnBoss()
    setInterval(time,1);
}
init()