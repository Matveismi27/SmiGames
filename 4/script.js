canvas = document.getElementById("cnv");
ctx=canvas.getContext("2d");
mouse = {
    x:0,
    y:0
}
//---------------------------------------------
//ивенты -- в основном для пушки
//просто для позиции мыши
canvas.addEventListener(`mousemove`, setPos);
function setPos({layerX, layerY}) {
    [mouse.x, mouse.y] = [layerX, layerY];
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

canvas.onclick = function Fire(){
    if (phxON){
    let DX= mouse.x-gun.x;
        DY= mouse.y-gun.y;
        HYP = Math.sqrt(DX*DX+DY*DY)
        direction = Math.asin(DY/HYP)
    bullets[bullets.length]=new bullet(gun.x,gun.y,Math.cos(direction)*gun.db,Math.sin(direction)*gun.db,gun.size)
    gun.power=0;//обнуляем повер
    }
}
//-------------------------------------------
class loc{
    constructor(config) {
        this.text=config.text||"";
        this.name=config.name||"new location";
        this.fon=config.fon||"files/wall1.jpg";

    }
    render() {
        document.getElementById("menu").innerHTML=this.text;
        document.getElementById("LocName").innerHTML=this.name;
        document.body.style.backgroundImage='url("'+this.fon+'")'

    }
}
class person{
    constructor(config){
        this.img=config.img||"files/none.png"
        this.name=config.name||"неизвесный"
    }
    render(){
        document.getElementById("Persimg").src=this.img;
        document.getElementById("texthead").innerHTML=this.name;
    }
    change(src){
        this.img=src
    }
}
class item{
    constructor(config){
        this.text=config.text||"???"
        this.name=config.name||"неизвестный предмет"
        this.id=config.id||0;
    }
}
class bullet{
    constructor(x,y,dx,dy,size,img){
        this.x=x||10;
        this.y=y||10;
        this.dx=dx||5;
        this.dy=dy||5;
        this.size=size+gun.power/20||2+gun.power/20;
        this.hp=1;
        this.color="rgb("+(gun.power)+",60,60)"
        this.kill=false;
        this.img=new Image();
        this.img.src=img||"img/none.png"
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
//--------------------------------------------

//функции
function lock(){
    if(!locked){
        locked=true;
        phxON=true;
    }else{

        locked=false;
        //очистка поля ---- плохо влияет на производительность?!?!?!
        bullets=[];
        objects=[];
        // alert(bullets.length+" пуль")
        //на всякий заполняем одним тоном
        ctx.fillStyle = 'rgba(30,30,30,1)'
        ctx.fillRect(0,0,canvas.width,canvas.height);
        phxON=false;
    }
}
function fdmg(object,dmg){
    // obj[obj.length]=new block(object.x,object.y,10,10,1);
    object.hp-=dmg;
    object.color="rgba("+object.hp/10+","+object.hp+","+object.hp*10+","+0.002*object.hp+")"
    if (object.hp<=0){
        object.kill=true;
        if (object.type=="key"){
            lock()
        }
    }
}
function bgravity(bullet){
    if (!bullet.kill)
    {
        bullet.x+=bullet.dx;
        bullet.y+=bullet.dy;
        bullet.dx*=0.999;
        bullet.dy+=0.01;
        
        ctx.beginPath();
	    ctx.arc(bullet.x, bullet.y, bullet.size, 0, 2*Math.PI, false);
        ctx.fillStyle = bullet.color
        ctx.fill();
        ctx.drawImage(bullet.img,bullet.x-bullet.size,bullet.y-bullet.size,bullet.size*2,bullet.size*2);
        
    }
}
/////////рисуем объекты
function objgrav(object){
    if (!object.kill){
        if (object.type2=="SA"){
            object.hp+=0.1;
        }
        if (object.type=="boss"){
            
        }else if(object.type=="physics"){
            object.dy+=0.01;
        }
        if (object.type2=="jump"){
            object.dy+=0.01;
            object.x+=-0.1;
        }else if (object.type2=="physics"){
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
            if (object.type2=="jump"){
                object.dx*=-1;
            }
        }
        if(object.x<0){
            location = location
            alert("Ты проиграл")
            
        }
    }
}
function touch(obj1,obj2){
    if ((obj1.x+obj1.size/*ширина пульки*/>obj2.x)&&(obj1.x-obj2.height<obj2.x))//по x (obj1.x>obj2.x)
    {
        if ((obj1.y+obj1.size/*высота пульки*/>obj2.y)&&(obj1.y-obj2.height<obj2.y))//по y +obj2.height
        {
            obj1.kill=true;
            if (obj1.src=="img/a1.png"){
                obj2.x+=1;
            }
            if (obj2.type2=="moon"){
                obj2.x-=1;
            }else if (obj2.type2=="sun"){
                draw(25,10,10,-0.5,0,50,50,"img/df.png","physics","")
            }
            fdmg(obj2,gun.dmg+obj1.size)
            
        }
    }
}
function zip(){
    if(!zipped){
        // document.getElementById("text").style.left="25%";
        // document.getElementById("texthead").style.left="83%";
        p0.render()
        document.getElementById("text").style.background= 'linear-gradient(45deg, rgba(255, 180, 110, 0.9) 0%, rgba(100, 100, 170, 0.9) 80%)'
        document.getElementById("texthead").style.background= 'linear-gradient(45deg, rgba(255, 180, 110, 0.9) 0%, rgba(100, 100, 170, 0.9) 80%)'
        zipped=true;
    }else{
        // document.getElementById("text").style.left="20%";
        // document.getElementById("texthead").style.left="20%";
        document.getElementById("text").style.background= 'linear-gradient(45deg, rgba(255, 180, 110, 0.9) 0%, rgba(131, 224, 131, 0.7) 80%)'
        document.getElementById("texthead").style.background= 'linear-gradient(45deg, rgba(255, 180, 110, 0.9) 0%, rgba(131, 224, 131, 0.7) 80%)'
        zipped=false;
    }
}
function print(txt){
    if(i>txt.length){
        i=0;
        return
    }
    text.innerHTM=''
    text.innerHTML = txt.slice(0, i)
    i++
    setTimeout(print,15,txt)
    
}
function physics(){
    if(phxON){
        ctx.fillStyle="rgba(20,260,20,0.7)"
            ctx.font="20px Impact"
            ctx.fillText(Math.round(gun.power), 10, 20);
        if (gun.power<200){
            gun.power+=gun.Count
        }
        ctx.fillStyle = 'rgba(30,30,30,0.4)'
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        //рисуем пули
        for (j=0;j<bullets.length;j+=1){
            if (bullets[j].y>1000){
                bullets[j].kill=true
            }
            bgravity(bullets[j]);
        }
        for(j=0;j<objects.length;j++){
            if (!objects[j].kill){
            objgrav(objects[j])
                for(k=0;k<bullets.length;k+=1){
                    if (!bullets[k].kill){
                        touch(bullets[k],objects[j])
                    }
                }
            }
        }
        setTimeout(physics,10)
    }
}
function draw(x , y, hp, dx, dy, height,width,src,type,type2){
    objects[objects.length]=new block (x*10,y*10,height,width, hp, dx,dy,src,type,type2)
}
//---------------------------------------------------------
//
//переменные --------------------------------------
way=0;
i=0
zipped=false;
story=0;
text=document.getElementById("text")
bullets=[];//массив для пуле и объектов
objects=[];
locked=false;
// lock()
gun = {//возможности пушки
    x:10,//10
    y:60,//60
    db:2, //скорость пули 2
    dmg:0,//1
    size:1,//2
    Count:0,//0
    power:0,//0
    wolf:false,//призыв волка false
    moon:false//отталкивающие снаряды false
}
canvas.style.top="200px"
canvas.style.left="300px"
canvas.style.width="400px"

phxON=true;
physics()

// <audio src='files/song1.mp3' autoplay='autoplay'> - добавить музло!
//--------------------------------------------------------------
//создание объектов
l1 = new loc ({
    text:"Пробел чтобы продолжить",
    name:"Лаборатория",
    fon:"img/bg1.png"
})
l2 = new loc({
    text:"Все только начинается",
    name:"Пещера",
    fon:"img/bg2.jpg"
})
l3 = new loc({
    text:"Первая настоящая миссия<audio src='files/BG.mp3' autoplay='autoplay'>",
    name:"Заводы Армстронга",
    fon:"img/bg3.jpg"
})
l4 = new loc({
    text:"чет он больно дружелюбный<audio src='files/2.mp3' autoplay='autoplay'>",
    name:"деревушка у города",
    fon:"img/bg4.jpg"
})
l5 = new loc({
    text:"Нет, ещё не город<audio src='files/3.mp3' autoplay='autoplay'>",
    name:"начало города",
    fon:"img/bg5.jpg"
})
l6 = new loc({
    text:"Город?<audio src='files/4.mp3' autoplay='autoplay'>",
    name:"Город!",
    fon:"img/bg6.jpg"
})
l7 = new loc({
    text:"Почему не город?!<audio src='files/5.mp3' autoplay='autoplay'>",
    name:"Где-то около города",
    fon:"img/bg7.jpg"
})
l8 = new loc({
    text:"Финал<audio src='files/7.mp3' autoplay='autoplay'>",
    name:"логово Армстронга",
    fon:"img/bg8.jpg"
})
l9 = new loc({
    text:"Мемы - днк души, я же прав?<audio src='files/extra 1.mp3' autoplay='autoplay'>",
    name:"Опасная местность",
    fon:"img/bg9.jpg"
})
//персонажи ----------------------------------
p1= new person({
    name:"Monsoon",
    img:"img/a1.png"
})
p0= new person({
    name:"Mistral",
    img:"img/a2.png"
})
p2= new person({
    name:"Senator Armstrong",
    img:"img/a3.png"
})
p3= new person({
    name:"Samuel Rodrigues",
    img:"img/a4.png"
})
p4= new person({
    name:'Cyber Wolf',
    img:"img/a5.png"
})
p5 = new person({
    name:"sundowner",
    img:"img/suni.png"
})
p6 = new person({
    name:"samdowner",
    img:"img/sami.png"
})
//игра --------------------------------------------
p1.render()
l1.render()
num=localStorage.getItem('num')||1
player_name=localStorage.getItem('player_name')||prompt("введи свое имя, ты не сможешь его изменить");
localStorage.setItem('num', Number(num)+1)
localStorage.setItem('player_name',player_name)
print("Привет Испытуемый #"+num)

function storytale(){
    if (i==0&&!locked){//это надо чтобы избежать бага с скипом + locked
    
    //старт
    story+=1;
    switch (way){
        case 0:
        
        switch (story){
            case 1:
                print("Могу с уверенностью сказать - долго ты не проживешь")
                break
            
            case 2:
                if (num>2){
                    print("Ты как ни как уже не первый")
                }else{
                    print("А все потому что мы сами хз работает наша система или нет")
                }
                break
            
            case 3:
                print("Твоя задача протестировать нашу новую систему боя!")
                break
            
            case 4:
                print("Начнем с простенького теста чтобы у тебя хотябы были шансы")
                // p1.change("files/evil.png")
                // p1.render()
                
                break
            
            case 5:
                print("Попробуй уничтожить мишень")
                lock()
                draw(10,1,10,0,0,100,100,"img/Swall.png","key","choice")
                break
            
            case 6:
                print("Чтож, неплохо")
                // p1.change("files/dn.png")
                // p1.render()
                break
            
            case 7:
                print("А теперь реальная ситуация, тебе понадобится поле побольше")
                canvas.style.width="700px"
                canvas.width=700
                canvas.height=200

                break
            
            case 8:
                print("Раз уж ты понял как стрелять, разберись с ЭТИМ!")
                phxON=true;
                physics()
                lock()
                draw(25,1,5,-0.4,0,150,150,"img/df.png","none","choice")
                draw(28,3,4,-0.5,0,150,150,"img/df.png","none","choice")
                draw(30,2,4,-0.4,0,150,150,"img/df.png","none","choice")
                draw(35,4,3,-0.3,0,64,64,"img/Swall.png","key","choice")
                // p1.change("files/dtalk.png")
                // p1.render()
                break
            
            case 9:
                print("Хаха, неплохо")
                break

            case 10:
                p3.render()
                print("Обучение закончено, приступим к работе!")
                l2.render()
                break
            case 11:
                if (num>2){
                    print("Что за жалкое подобие поля? Монсун опять за свое, ну сколько можно?")
                }else{
                    print("Что за жалкое подобие поля? Монсун тебя жалеет")
                }
                break
            
            case 12:
                canvas.style.width="800px"
                canvas.width=800
                canvas.height=500
                print("Посмотрим как ты справишся с настоящим противником")
                phxON=true;
                physics()
                lock()
                draw(25,4,60,-0.1,0,256,256,"img/dog.png","key","choice")
                
                break
            
            case 13:
                print("Я знал что ты справишся")
                break

            case 14:
                p1.render()
                print("Хаха, у него лучшее вооружение, конечно он справится")
                break
            case 15:
                p3.render()
                print("И всетаки его можно улучшить")
                break
            case 16:
                p1.render()
                print("Ладно паренёк, твое первое серьёзное задание!")
                break
            case 17:
                print("Раз уж ты такое выдержал было бы некрасиво не посвятить тебя в курс дела")
                break
            case 18:
                l1.render()
                print("Суть вот в чем, Армстронг он...")
                break
            case 19:
                p3.render()
                if (num<=1){
                    print("Стал президентом Америки")
                }else{
                    print("Стал президентом Америки... какого хуя нам приходится это каждый раз повторять???")
                }
                break
            case 20:
                p1.render()
                if(num>10){
                    print("Ладно, я и сам уже устал, хватит этих разъяснений, кому вообще нужен сюжет?")
                    story=26
                }
                else if (num>2){
                    print("К сожелению этот диалог нельзя скипнуть, как бы он не был надоедлив... Вернемся к Армстронгу! Это именно он виновен в войне на украине!")
                }else{
                    print("И что самое страшное это он виновен в войне на Украине!")}
                break
            case 21:
                p3.render()
                print("Нам нужно его остановить")
                break
            case 22:
                p1.render()
                print("Ты возможно спросишь, почему именно он? Почему Украина? Дело вот в чем")
                break
            case 23:
                print("Война выгодна Америке, производство оружия приносит большие деньги")
                break
                
            case 24:
                print("Он нанял разжигателей войн которые стравили Славян")

                break
            case 25:
                print("Россия и Украина были лучшим вариантом т.к. именно они(Россия) главная угроза Америки")
                break
            case 26:
                p3.render()
                print("Да кому нужна твоя теория, вобщем, нужно остановить Армстронга")
                break
            case 27:
                p3.render()
                print("Начнем мы с самого простого, уничтожить его ЗАВОДЫ. Но будь готов, все что они произвели - сразу отправляется на склады Армстронга, однако что-то ещё не успели отвезти на склады, Сейчас ты с этим и сразишся!")
                break
            case 28:
                print("Не беспокойся эти псы без интелекта, убивай тех что перед тобой, вертолет бей в последнюю очередь")
                l3.render()
                canvas.width=800
                phxON=true;
                physics()
                lock()
                draw(30,4,50,-0.1,0,80,80,"img/dog.png","physics","choice")
                draw(40,8,50,-0.1,0,80,80,"img/dog.png","physics","choice")
                draw(45,5,50,-0.1,0,80,80,"img/dog.png","physics","choice")
                draw(55,2,50,-0.1,0,80,80,"img/dog.png","physics","choice")
                draw(60,6,50,-0.1,0,80,80,"img/dog.png","physics","choice")
                draw(70,7,50,-0.1,0,80,80,"img/dog.png","physics","choice")
                draw(83,2,80,-0.1,0,120,180,"img/hel.png","key","choice")
            break
            case 29:
                print("Это ещё не все, я почти уничтожил все оборудование...")
            break
            case 30:
                print("Продолжай отбивать атаки!")
            break
            case 31:
                
                phxON=true;
                physics()
                lock()
                draw(20,4,50,-0.1,0,80,100,"img/hel.png","","choice")
                draw(35,8,50,-0.1,0,80,100,"img/hel.png","","choice")
                draw(50,5,166,-0.1,0,180,200,"img/metalgear.png","key","choice")
                print("Это что METAL GEAR!?!?!?!?!")
            break
            case 32:
                print("Ты хорошо справился")
            break
            case 33:
                l2.render()
                print("Как думаешь что мы снова делаем в пещере?")
            break
            case 34:
                print("Мы делаем улучшения, с уничтоженых заводов удалось стащить несколько деталей")
            break
            case 35:
                print("Щас я прокачаю тебя")
                gun.dmg+=1
                gun.Count+=0.1
                gun.db+=1
                gun.y+=10
                canvas.style.width="800px"
                canvas.width=800
                canvas.height=400
            break
            case 36:
                print("Вот так должно быть лучше, я активировал систему энергии")
            break
            case 37:
                print("Не будем медлить")
            break
            case 38:
                print("Наша следующая цель...")
            break
            case 39:
                p4.render()
                print("я")
            break
            case 40:
                p3.render()
                print("что? но как? Так срочно выходим на улицу, здесь слишком много ценного оборудования")
            break
            case 41:
                p4.render()
                l4.render()
                print("Так уж и быть...")
            break
            case 42:
                canvas.width=800
                p3.render()
                phxON=true;
                physics()
                lock()
                draw(30,4,30,-0.2,0,80,60,"img/solder.png","physics","choice")
                draw(50,8,40,-0.2,0,80,60,"img/solder.png","physics","choice")
                draw(70,4,30,-0.2,0,80,60,"img/solder.png","physics","choice")
                draw(90,8,40,-0.2,0,80,60,"img/solder.png","physics","choice")
                draw(110,4,40,-0.2,0,80,60,"img/solder.png","physics","choice")
                draw(130,8,40,-0.2,0,80,60,"img/solder.png","physics","choice")
                draw(70,5,200,-0.3,0,180,200,"img/dog.png","key","jump")
                print("ну этого я конечно не ожидал но думаю ты справишся")
            break
            case 43:
                print("О черт это не все...")
            break
            case 44:
                p4.render()
                print("Я отомщу за Райдена!")
            break
            case 45:
                p3.render()
                print("Какого ещё Райдена? Это альтернативная вселенная тут его нет")
            break
            case 46:
                p4.render()
                print("А да? Ну тогда просто отомщу!")
            break
            case 47:
                canvas.width=800
                p4.render()
                phxON=true;
                physics()
                lock()
                draw(50,4,30,-0.2,0,80,60,"img/solder.png","physics","choice")
                draw(70,8,30,-0.2,0,80,60,"img/solder.png","physics","choice")
                draw(90,4,30,-0.2,0,80,60,"img/solder.png","physics","choice")
                draw(40,4,150,-0.1,0,120,100,"img/armbot2.png","physics","choice")
                draw(100,8,30,-0.2,0,80,60,"img/solder.png","physics","choice")
                draw(60,6,300,-0.4,0,180,200,"img/dog.png","key","jump")
                print("Тебе не победить!")
            break
            case 48:
                print("Аххх... Ты сильный противник! Но Я СПРАВЛЮСЬ!")
            break
            case 49:
                phxON=true;
                physics()
                lock()
                draw(40,7,360,-0.6,0,180,200,"img/dog.png","key","jump")
                print("IM MY OWN MASTER NOW!")
            break
            case 50:
                print("Ухх, ладно ты победил...")
            break
            case 51:
                p3.render()
                print("Почему ты говоришь?")
            break
            case 52:
                p4.render()
                print("Я модель с продвинутым ИИ")
            break
            case 53:
                p3.render()
                print("Тогда скажи, в чем смысл жизни?")
            break
            case 54:
                p4.render()
                print("Да хрен его знает, я текст забыл")
            break
            case 55:
                p3.render()
                print("Го с нами работать?")
            break
            case 56:
                p4.render()
                print("Погнали")
            break
            case 57:
                p3.render()
                l1.render()
                print("Короче нужно остановить Армстронга, пёсель, ты знаешь где его найти?")
            break
            case 58:
                p4.render()
                print("Нет, но я знаю кто знает")
            break
            case 59:
                p3.render()
                print("И кто же?")
            break
            case 60:
                p4.render()
                print("Мистраль, я покажу дорогу")
            break
            case 61:
                p3.render()
                print("Окей, а пока мы вернемся к улучшениям")
            break
            case 62:
                print("Теперь ты можешь призывать кибер пёселя, просто нажми Q во время боя, он потребует некоторое количество ЭНЕРГИИ")
                gun.wolf=true
            break
            case 63:
                print("Думаю сейчас ты его в деле и опробуешь")
            break
            case 64:
                p4.render()
                print("Мы пришли")
                l5.render()

            break
            case 65:
                p0.render()
                print("Вы кто такие? Я вас не звала, идите на...")
            break
            case 66:
                p4.render()
                print("Слыш, сучка мы пиздится пришли")
            break
            case 67:
                p0.render()
                print("Оу, вульфи, это ты, так ты вернуся чтобы меня вые...")
            break
            case 68:
                p4.render()
                print("ЗАТКНИСЬ!!!")
            break
            case 69:
                print("Убей эту мразь!")
                phxON=true;
                physics()
                lock()
                draw(60,20,400,-0.8,0,90,90,"img/mistral.png","key","jump")
            break
            case 70:
                p0.render()
                print("Хахаха, что это такое? Ты сопротивляешься?")
            break
            case 71:
                p4.render()
                print("Нам нужна информация где находится Армстронг")
            break
            case 72:
                p0.render()
                print("Просто так ты её не получишь мой сладкий пёсик")
            break
            case 73:
                p4.render()
                print("Я увеличил урон твоих пуль, используй меня чаще")
                gun.size+=1
                phxON=true;
                physics()
                lock()
                draw(30,20,200,-0.3,0,120,120,"img/armbot1.png","physics","jump")
                draw(50,18,200,-0.4,0,120,120,"img/armbot1.png","physics","jump")
                draw(70,16,200,-0.5,0,120,120,"img/armbot1.png","physics","jump")
                draw(60,20,400,-1,0,80,80,"img/mistral.png","key","jump")
            break
            case 74:
                p0.render()
                print("Ладно... хватит, я расскажу")
            break
            case 75:
                print("Так как он президент америки, он находится либо в белом доме, либо на белом доме")
            break
            case 76:
                print("это база")
            break
            case 77:
                p3.name="Какой то чувак"
                p3.render()
                print("Как я мог это забыть, у меня что-то с памятью")
            break
            case 78:
                p4.render()
                print("Так ты это знал?")
            break
            case 79:
                p3.render()
                print("...")
            break
            case 80:
                print("У меня проблемы с памятью, я кажется забыл свое имя...")
            break
            case 81:
                p4.render()
                print("Сэм")
            break
            case 82:
                p3.name="Сэм"
                p3.render()
                print("Благодарю")
            break
            case 83:
                p0.render()
                print("Слушайте а вам нужен бонус от меня?")
            break
            case 84:
                p4.render()
                print("НЕТ!!!")
            break
            case 85:
                p3.render()
                print("Почему нет?")
            break
            case 86:
                p0.render()
                print("Наконец то кто-то попросил... БЕСПИЛОТНЫЙ УКРАИНСКИЙ ТАНК")
            break
            case 87:
                p4.render()
                phxON=true;
                physics()
                lock()
                draw(40,0,500,-0.1,0,400,240,"img/Град.png","key","")
                print("Вульфи тут отлично справится")
            break
            case 88:
                print("Нам лучше поскорей направиться в белый дом")
            break
            case 89:
                p1.render()
                print("Но перед этим - тренировка")
                l6.render()
            break
            case 90:
                p3.render()
                print("Что ты задумал?")
            break
            case 91:
                p1.render()
                print("Я хочу отключить твои детекторы кринжа, "+player_name)
            break
            case 92:
                p3.render()
                print("Ты уверен что он справится?")
            break
            case 93:
                p1.render()
                print("Сейчас проверим!")
                document.getElementById("text").style.background= 'linear-gradient(45deg, rgba(255, 180, 110, 0.9) 0%, rgba(131, 224, 131, 0.7) 80%)'
                document.getElementById("texthead").style.background= 'linear-gradient(45deg, rgba(255, 180, 110, 0.9) 0%, rgba(131, 224, 131, 0.7) 80%)'
            break
            case 94:
                p1.render()
                print("Используй все что знаешь")
                phxON=true;
                physics()
                lock()
                draw(20,5,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(22,4,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(23,3,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(23,2,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(24,1,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(22,5,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(25,4,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(25.5,3,5,-0.1,0,100,240,"img/bot.png","physics","")
                draw(25.5,2,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(25.5,1,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(20,15,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(22,14,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(23,13,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(23,12,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(24,11,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(22,15,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(25,14,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(25.15,3,5,-0.1,0,100,240,"img/bot.png","physics","")
                draw(25.15,2,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(25.15,1,5,-0.1,0,100,100,"img/bot.png","physics","")
                draw(35,10,400,-0.1,0,240,240,"img/monsoon.png","key","moon")
            break
            case 95:
                print("Да ты определённо знаешь что делаешь")
            break
            case 96:
                print("Думаю ты заслужил от меня подарок")
            break
            case 97:
                gun.moon=true
                print("Так а теперь, внимание, энерго пули, нажимай W чтобы быстро шмалять отталкивающими снарядами за энергию")
            break
            case 98:
                print("вам стоит выдвигаться дальше")
            break
            case 99:
                p3.name="сексуальный мужик"
                p3.render()
                print("Кто же нас встретит в следующий раз...")
            break
            case 100:
                l9.render()
                print("Кстати...")
            break
            case 101:
                print("I've even forgotten my name...")
            break
            case 102:
                p5.render()
                print("Охохо")
            break
            case 103:
                print("ОХОХОХОХОХОХХО")
            break
            case 104:
                print("Тебя зовут samdowner")
            break
            case 105:
                p6.render()
                print("спасибо")
            break
            case 106:
                p4.render()
                print("А чее так можно было??!?!?")
            break
            case 107:
                p6.render()
                print("ЛАдно пора дратьсЯ!!!1!!!")
                phxON=true;
                physics()
                lock()
                draw(60,10,60,-0.9,0,240,240,"img/Sam downer.png","key","physics")
            break
            case 108:
                print("Как не победил?!?!")
                phxON=true;
                physics()
                lock()
                draw(65,10,80,-0.9,0,240,240,"img/Sam downer.png","key","physics")
            break
            case 109:
                print("Так я начинаю что-то подозревать")
                phxON=true;
                physics()
                lock()
                draw(70,10,100,-0.9,0,240,240,"img/Sam downer.png","key","physics")
            break
            case 110:
                print("А я точно samdowner?")
            break
            case 111:
                p4.render()
                print("Нет, ты Сэм")
            break
            case 112:
                p5.render()
                print("Кто бы мог подумать что это так легко разбить")
            break
            case 113:
                p3.name="Сэм"
                p3.render()
                print("Оу")
            break
            case 114:
                print("Я начинаю вспоминать")
            break
            case 115:
                print("понятно")
            break
            case 116:
                print("впрочем")
            break
            case 117:
                print("я все равно хочу сражаться!")
            break
            case 118:
                p5.render()
                print("Мой человек!")
            break
            case 119:
                print("Драка это весело!")
            break
            case 120:
                print("Хохохо")
                phxON=true;
                physics()
                lock()
                draw(50,8,100,-0.6,0,240,240,"img/sam.png","key","physics")
                draw(40,10,200,-0.15,0,240,240,"img/sun.png","key","physics")
            break
            case 121:
                print("Хихихи")
                phxON=true;
                physics()
                lock()
                draw(50,8,100,-0.7,0,240,240,"img/sam.png","key","physics")
                draw(40,10,200,-0.13,0,240,240,"img/sun.png","key","physics")
            break
            case 122:
                print("Хахаха,все я устал")
                phxON=true;
                physics()
                lock()
                draw(50,8,100,-0.8,0,240,240,"img/sam.png","key","physics")
                draw(40,10,200,-0.1,0,240,240,"img/sun.png","key","physics")
            break
            case 123:
                print("Ладно пора играть по настоящему")
            break
            case 124:
                print("Сэм ты че вообще со мной а не против меня?")
            break
            case 125:
                p3.render()
                print("А я должен быть против?")
            break
            case 126:
                print("А точно, ты же служишь армстронгу")
            break
            case 127:
                l7.render()
                print("В таком случии нам нужно тебя убить")
            break
            case 128:
                print("Он очень жирный но ты справишся")
                draw(20,10,200,-0.1,0,240,240,"img/sun.png","key","sun")
                draw(20,10,100,-0.5,0,120,120,"img/hel.png","","jump")
                draw(20,10,100,-0.5,0,120,120,"img/hel.png","","jump")
            break
            case 129:
                print("Так, где КОНКРЕТНО сейчас Армстронг?")
            break
            case 130:
                p5.render()
                print("Вы его не достанете будь вы хоть в 4 раза быстрее!")
            break
            case 131:
                p3.render()
                print("Нам че опять придется все выпытывать?")
            break
            case 132:
                p5.render()
                print("да")
                draw(20,10,200,-0.1,0,240,240,"img/sun.png","key","moon")
                draw(20,10,100,-0.5,0,120,120,"img/hel.png","","jump")
                draw(20,10,100,-0.5,0,120,120,"img/hel.png","","jump")
            break
            case 133:
                print("Кхем... чет мне уже плохо... Ладно оставьте меня...")
            break
            case 134:
                p3.render()
                print("Окей, считать расстояние я не умею но что то мне подсказывает сенатор в том здании (указывает на самое большое здание в городе)")
            break
            case 135:
                print("Так, мы близко, но тут охрана")
            break
            case 136:
                print("Ты с таким уже сталкивался, это не должно доставить проблемы")
                phxON=true;
                physics()
                lock()
                draw(30,4,50,-0.1,0,80,80,"img/dog.png","physics","choice")
                draw(40,8,50,-0.1,0,80,80,"img/dog.png","physics","choice")
                draw(45,5,50,-0.1,0,80,80,"img/dog.png","physics","choice")
                draw(55,2,50,-0.1,0,80,80,"img/dog.png","physics","choice")
                draw(60,6,50,-0.1,0,80,80,"img/dog.png","physics","choice")
                draw(70,7,50,-0.1,0,80,80,"img/dog.png","physics","choice")
                draw(83,2,80,-0.1,0,120,180,"img/hel.png","key","choice")
            break
            case 137:
                print("Да, это было быстро")
            break
            case 138:
                l8.render()
                p2.render()
                print("О, привет друзья, куда едем?")
            break
            case 139:
                p3.render()
                print("Блять все хуже чем я думал, мемы поглотили его целиком, он неуязвим!")
            break
            case 140:
                p2.render()
                print("MEMES SON")
            break
            case 141:
                print("THEY HARDEN IN RESPONSE TO PHYSICAL TRAUMA!")
            break
            case 142:
                print("YOU CAN'T HURT ME, "+player_name+"!")
            break
            case 143:
                print("Или может быть это не твое имя? Мы никогда не узнаем")
            break
            case 144:
                phxON=true;
                physics()
                lock()
                draw(83,2,500,-0.1,0,250,400,"img/Senator.png","key","SA")
                print("В любом случае")
            break
            case 145:
                print("Как у тебя вышло?")
            break
            case 146:
                print("Ну ладно мне не в первой")
            break
            case 147:
                phxON=true;
                physics()
                lock()
                draw(83,0,500,-0.2,0,250,400,"img/Senator.png","key","SA")
                print("Хахаха НЕ ЧУВСТВУЮ")
            break
            case 148:
                p3.render()
                print("Окей, так просто его не победить, я пойду на риск... я усилю твою ЭНЕРГИЮ")
                gun.Count+=0.1
            break
            case 149:
                print("Должно стать лучше")
            break
            case 150:
                p2.render()
                phxON=true;
                physics()
                lock()
                draw(83,0,1000,-0.2,0,250,400,"img/Senator.png","key","SA")
                print("YOU CAN'T HURT ME, "+player_name+"!")
            break
            case 151:
                p3.render()
                print("Why won't you die")
            break
            case 152:
                p2.render()
                phxON=true;
                physics()
                lock()
                draw(83,0,1000,-0.3,0,250,400,"img/Senator.png","key","SA")
                print("МЕМЕS")
            break
            case 153:
                print("ух блять")
            break
            case 154:
                print("признаю ты победил...")
            break
            case 155:
                print("из за чего мы вообще сражались?")
            break
            case 156:
                p3.render()
                print("Война на Украине?")
            break
            case 157:
                p2.render()
                print("Хаха, всего лишь очередная война, это природа людей")
            break
            case 158:
                print("Война никогда не меняется...")
            break
            case 159:
                print("никогда....")
            break
            case 160:
                print("....")
            break
            case 161:
                if(confirm("ты победил армстронга с "+num+" попытки, обнулить прогресс?")){
                    localStorage.clear()
                }
            break
            case 162:
                p3.render()
                print("Ты победил, молодец, ты осилил эту игру")
            break
            case 163:
                p0.render()
                print("И пускай это было не просто")
            break
            case 164:
                p1.render()
                print("Ты потратил множество попыток")
            break
            case 165:
                p2.render()
                print("Чтобы пройти игру до конца")
            break
            case 166:
                p4.render()
                print("Я могу тебя только поздравить")
            break
            case 167:
                p5.render()
                print("Ты победил")
            break
            case 168:
                p6.render()
                print("Мы все ждем следующую игру правда? Тебе же понравилось? Напиши разработчику в вк, ему будет приятно")
            break
        }
        break//конец
    }
}
}
document.addEventListener('keydown', function(event) {
    
    if (event.code == 'KeyQ') {
        if (gun.wolf){
            if (gun.power>20){
                if (phxON){
                    gun.power-=20
                    let DX= mouse.x-gun.x;
                        DY= mouse.y-canvas.height/2;//снаряд летит с половины поля
                        HYP = Math.sqrt(DX*DX+DY*DY)
                        direction = Math.asin(DY/HYP)
                    bullets[bullets.length]=new bullet(gun.x,canvas.height/2,Math.cos(direction)*gun.db,Math.sin(direction)*gun.db,gun.size*24,"img/a5.png")
                }
            }
        }else{
        alert('умение не прокачано')
        }
    }
    if (event.code == 'KeyW') {
        if (gun.moon){
            if (gun.power>3){
                if (phxON){
                    gun.power-=3
                    let DX= mouse.x-gun.x;
                        DY= mouse.y-canvas.height/2;//снаряд летит с половины поля
                        HYP = Math.sqrt(DX*DX+DY*DY)
                        direction = Math.asin(DY/HYP)
                    bullets[bullets.length]=new bullet(gun.x,canvas.height/2,Math.cos(direction)*gun.db,Math.sin(direction)*gun.db,gun.size*2,"img/a1.png")
                }
            }
        }else{
        alert('умение не прокачано')
        }
    }
    if (event.code == 'Space') {
        storytale()
      }
});