//todo Обработчики событий
// document.addEventListener('DOMContentLoaded', () => {
//     let audio = document.querySelector('audio');
    
//     audio.volume = 0.3;
//   }, false);
function fullScreen(){
    document.body.requestFullscreen()
}
// TODO: классы, сюда их создаём
class loc{
    constructor(config) {
        this.text=config.text||"";
        this.name=config.name||"new location";
        this.fon=config.fon||"files/wall1.jpg";

    }
    render() {
        document.getElementById("menu").innerHTML=this.text;
        document.getElementById("LocName").innerHTML=this.name;
        document.getElementById("Game").style.backgroundImage='url("'+this.fon+'")'
        let audio = document.querySelectorAll('audio');
    
        audio[0].volume = 0.2;
        try{
        audio[1].volume = 0.2;
        }catch{}
    }
    change(path){
        this.fon = path
        document.getElementById("Game").style.backgroundImage='url("'+this.fon+'")'
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
        this.img = src
    }
    rename(name){
        this.name = name
    }
}
class item{
    constructor(config){
        this.text=config.text||"???"
        this.name=config.name||"неизвестный предмет"
        this.id=config.id||0;
    }
}

//todo Функции

function modalload(){
    modal = document.querySelector(".modal");
    trigger = document.querySelector(".example");
    closeButton = document.querySelector(".close-button");
    yesButton = document.querySelector(".yes-button");
    noButton = document.querySelector(".no-button");
    modalhead = document.querySelector(".modal-head");
}

function switchModal(){
    modal.classList.toggle("show-modal")
}
modalAsk=true
isModalstart=false

function checkModal(da,net){
    if (isModalstart){
        setTimeout(()=>{checkModal(()=>{da()},()=>{net()})},800)  
    }else{
        switchModal()
        if (!modalAsk){
            da()
        }else{
            net()
        };
    }
}
function ask(question, isTrue, isFalse,da,net){
    modalload()//на всякий чтобы записать переменные
    //* Окошко с вопросом
    switchModal()
    modalhead.innerHTML=question;
    yesButton.innerHTML=isTrue;
    noButton.innerHTML=isFalse;
    isModalstart=true
    checkModal(()=>{da()},()=>{net()})
  
    
}
function Mno(){
    modalAsk=true
    isModalstart=false
}
function Mok(){
    modalAsk=false
    isModalstart=false
}

//функции
// function zip(){
//     if(!zipped){
//         document.getElementById("text").style.left="25%";
//         document.getElementById("texthead").style.left="83%";
//         p0.render()
//         document.getElementById("text").style.background= 'linear-gradient(45deg, rgba(255, 180, 110, 1) 0%, rgba(100, 100, 170, 0.9) 70%)'
//         document.getElementById("texthead").style.background= 'linear-gradient(45deg, rgba(255, 180, 110, 1) 0%, rgba(100, 100, 170, 0.9) 70%)'
//         zipped=true;
//     }else{
//         document.getElementById("text").style.left="20%";
//         document.getElementById("texthead").style.left="20%";
//         document.getElementById("text").style.background= 'linear-gradient(45deg, rgba(255, 180, 110, 1) 0%, rgba(180, 100, 100, 0.9) 70%)'
//         document.getElementById("texthead").style.background= 'linear-gradient(45deg, rgba(255, 180, 110, 1) 0%, rgba(180, 100, 100, 0.9) 70%)'
//         zipped=false;
//     }
// }
full=0
document.getElementById("fullButton").addEventListener("click",()=>{
    full+=1;
    if (full==1){
        // deffaultBGSize = document.body.style.backgroundSize;
        document.getElementById("Game").style.backgroundSize="100%";
        
    }else if(full==2){
        document.getElementById("Game").style.backgroundSize="70%";

    }else if(full==3){
        document.getElementById("Game").style.backgroundSize="900px";
    }else{
        document.getElementById("Game").style.backgroundSize="720px";
        full = 0;
    }
    
    
},)
function print(txt){
    if(i>txt.length){
        i=0;
        return
    }
    text.innerHTM=''
    text.innerHTML = txt.slice(0, i)
    i++
    setTimeout(print,4,txt)
    
}
// Быстрое создание новелл
queue=[]
queue_iterator=0
function add(code){
    queue[queue_iterator]=code
    queue_iterator+=1
}
function play_scene(id){
    queue[id]()
}
function flash(){
    document.getElementById("flash").style.backgroundColor="#fff"
    document.getElementById("flash").style.transition="0s"

    setTimeout(()=>{
        // slow(255,255,255,255,255,255,255,0,50)
        document.getElementById("flash").style.transition="10s"
        document.getElementById("flash").style.backgroundColor="#fff0"

    },5000)
    document.getElementById("flash").innerHTML="<audio src='files/Contusion.mp3' autoplay='autoplay'>"
}
function slow(r,g,b,t,r2,g2,b2,t2,to){
    document.getElementById("flash").style.backgroundColor="#"+r.toString(16)+g.toString(16)+b.toString(16)+t.toString(16)
    if (r!=r2)
    r-=Math.round((r-r2)/10)+1
    if (g!=g2)
    g-=Math.round((g-g2)/10)+1
    if (b!=b2)
    b-=Math.round((b-b2)/10)+1
    if (t!=t2)
    t-=Math.round((t-t2)/10)+1
    if (r!=r2 || t!=t2){
        setTimeout(()=>{slow(r,g,b,t,r2,g2,b2,t2,to)},to)
    }
}
function play_Sound(path){
    audio="<audio src='"+path+"' autoplay='autoplay'></audio>"
    document.getElementById("flash").innerHTML=audio
    audio[0].volume = 0.2;
    try{
    audio[1].volume = 0.2;
    }catch{}
}
// <audio src='files/song1.mp3' autoplay='autoplay'> - добавить музло!
// todo ----- --создание объектов-- -----
l1 = new loc ({
    text:"Башня... но чья?<audio src='files/simple.mp3' autoplay='autoplay' loop>",
    name:"Башня",
    fon:"img/towerv2.png"
})

l2 = new loc ({
    text:"Тюрьма, вы в заключении!<audio src='files/Dark.mp3' autoplay='autoplay' loop>",
    name:"Чертова решётка",
    fon:"img/cage.png"
})

l3 = new loc ({
    text:"Безупречная королева сов!<audio src='files/epic.mp3' autoplay='autoplay' loop>",
    name:"Королева Совик",
    fon:"img/quen.png"
})

l4 = new loc ({
    text:"Такая же темная как и всегда<audio src='files/Sun.mp3' autoplay='autoplay' loop>",
    name:"Тьма",
    fon:"img/dark.png"
})

l5 = new loc ({
    text:"Как же все таки красиво<audio src='files/Void.mp3' autoplay='autoplay' loop>",
    name:"Коридоры",
    fon:"img/coridor2.png"
})

l6 = new loc ({
    text:"Пахнет вкусно!<audio src='files/BL.mp3' autoplay='autoplay' loop>",
    name:"Кухня",
    fon:"img/kitchen.png"
})
l7 = new loc ({
    text:"Милейшая атмосфера душевного покоя и мягкости бытия<audio src='files/Portrait.mp3' autoplay='autoplay' loop>",
    name:"Покои королевы",
    fon:"img/pokoi.png"
})
l8 = new loc ({
    text:"Приятный холодный ветер<audio src='files/Forest.mp3' autoplay='autoplay' loop>",
    name:"Путь",
    fon:"img/Forest.png"
})
l9 = new loc ({
    text:"На пути очень страшный медведь в броне<audio src='files/Dynamic.mp3' autoplay='autoplay' loop>",
    name:"Блять что это!??!!?!?",
    fon:"img/bear.png"
})
// ------------- персонажи ----------
p0= new person({
    name:"Игрок",
    img:"img/Person.png"
})

p1= new person({
    name:"Рассказчик",
    img:"img/Narrator.png"
})

p2= new person({
    name:"Стражник",
    img:"img/Guard.png"
})

p3= new person({
    name:"Королева Совик",
    img:"img/Sovik.png"
})

p4= new person({
    name:"Мэрлин",
    img:"img/Marlin.png"
})

p4= new person({
    name:"Генерал Тулий",
    img:"img/Tulii.png"
})



//переменные
way=0;
i=0
zipped=false;
story=0;
text=document.getElementById("text")
//игра
p1.render()
l4.render()
print("Да начнётся же история...")
// ---------------
function ch1(){
    document.getElementById("vibor").style.display="none"
    way = 1
    story=0
}
function ch2(){
    alert("глава в разработке")
}
function ch3(){
    alert("глава в разработке")
}
// ---------------
text.onclick = function(){
    if (i==0){//это надо чтобы избежать бага с скипом
    
    //старт
    story+=1;
    //какие есть пути? Тут все просто
    switch (way){
        case 0:
        print("ты поймал баг, кайфы...")
        case 1://Глава 1
        //Как сделать сценарий лучше? Идея: Что если какой то бомж полюбит королеву? Арка персонажа, сначала ГГ неудачник но исполнительный а затем он крутой и никому не подчиняиется ибо он устал от командования. Но он всегда думает о королеве, она ему симпатична. Делим на 3 акта: 1: Однажды, Каждый День, Пока в один день... 2: Из за этого... Из за этого... Из за этого... Точка невозврата... 3: Пока в конце концов... И с тех пор...

        // Сюжет - герой каким то образом оказывается возле замка королевы, Его пакуют сразу в тюряжку, кто такой че здесь забыл??? Ну а герой не пальцем деланый и либо просит королеву либо напрашивается на королеву, та приходит в подземелье и видит его, осматривает его, а он как дурачёк. Ну а она че? Иди квесты делай! Отправила его мыть посуду на кухню, сразу заметила что опасности он не предоставляет, а он справился, и довольно быстро.

        // Ну и отправила она его на другую работу, пусть коридоры чистит, и тут герой начал возмущаться, ну что это такое? В бесплатного раба наняли. Так проходят дни. А королева тем временем думала чем бы ещё героя занять. Ну лол, нафиг он нам нужен пускай идёт монстра в лесу завалит! Так и порешили, королева отправила ГГ убивать медведя в лесу, не соврала, реально медведь, только вот в броне и злой! Так ещё и на двух ногах! Завидев медведя герой уж было бросился бежать как увидел как в медведя влетело копьё, это демоны, они решили зайти так далеко чтобы убить медведя? Из далека ГГ увижел как они убили его и подошёл какой то силуэт и забрал душу медведя.

        // Они ушли, ГГ же быстро подбежал забрать голову медведя и вернулся в замок чтобы предоставить её королеве, за это время она уже стала ему симпатична, королева же была удивлена такому, они никак не ожидала что ГГ справиться. Да и он ей нравиться начал. Она отправила его в казармы, пусть его тренируют лучшие её мастера, ей нужны такие воины. ГГ усердно тренируется и становиться сильнее, знакомство с генералом тулиусом, защитой города, тулиус в целов вводит в курс дела о защите и даже спрашивает какие он может предложить варианты улучшения всего этого дела, это повлияет на некоторые диалоги.

        // Суб сюжет - ГГ застаёт как Сови Бросает письма в огонь и о чем то говорит с Тулием
        // Так же возможно модно сделать вставки как Сови пишет ответы, эта переписка сыграет роль в третей главе

        //ГГ посылают в разведку узнать как вообще обстоят дела у соседних государств, ГГ берёт лошадь и едет до портовой деревни чтобы отплыть на остров к демонам однако уже в порту он видит подступающие корабли Морского народа, местный лесной маг Мэрлин с помощью волшебной островной древесины с острова демонов узнал что Морсккой народ вообще не с хорошими вестями, он сказал что поможет сдержать атаку и спасёт из деревни как можно больше людей а задача ГГ уведомить королеву о приблежающихся захватчиках, Мэрлин кастует телепорт что позволяет ГГ сильно сократить расстояния до башни. ГГ добегает, уведомляет королеву и помогает готовиться к нападению. Когда враги уже подходят Командир говорит что нам не хватит сил, их слишком много, и тут вдруг на горизонте виднеются демоны... Эпичный клифхэнгер!
        if (queue.length>0){
            play_scene(story)
            break
        }
        add(()=>{
            print("...")
            l4.render()
        })
        add(()=>{
            print("Будем знакомы, я рассказчик!")
            document.getElementById("flash").style.transition="5s"
            document.getElementById("flash").style.backgroundColor="#fff0"
            l4.render()
            modalload()//на всякий чтобы записать переменные
        })
        add(()=>{
            print("Твой личный голос в голове на протяжении всех трёх глав. Кстати сразу предупреждаю прогресс не сохраняется!")
        })
        add(()=>{
            print("Здесь довольно пусто не правда ли?)")
        })
        add(()=>{
            print("Тьма... такая большая и необъятная, вездесущее ничего")
        })
        add(()=>{
            print("Через тьму просачивается свет, такой жгучий и неприятный, пробивается сквозь закрытые глаза")
        })
        add(()=>{
            ask("Попытаться открыть глаза?","Да, давай","Лол нет",
            ()=>{
                print("Глаза слиплись но с трудом ты все равно пытаешься...")
            },
            ()=>{
                ask("Ты не стал открывать глаза глаза и ты вспоминаешь...","где я?","кто я?",
                ()=>{
                    print("Ты - кажется последний раз себя помнишь на пьянке в какой то таверне, вспоминая что то из прошлого в голове только туман и редкие искорки скорби")
                },
                ()=>{
                    print("Некогда ты был великим воином но ни ты ни остальные не могут вспомнить о тех временах хоть что то")
                })

            })
        })
        add(()=>{
            flash()
            l1.render()
            print("Ты с большим трудом таки открываешь глаза, cвет солнца ослепил тебя")
            
        })
        add(()=>{
            print("Тело слабое, так как будто ты только встал с кровати после 16 часового сна")
        })
        add(()=>{
            print("Когда ослепление начало проходить ты увидел перед собой башню")
        })
        add(()=>{
            print("Башня выглядит красиво и уж больно знакомо, дует очень приятный ветер, запах цветов и мха очень воодушевляет и расслабляет, не хочется вставать.")
        })
        add(()=>{
            print("Однако не успел ты опомниться, как тебя увидел стражник выбегающий из за одной из кирпичных стен, он заметил тебя не сразу но как только заметил то сразу же побежал так - будто ты совершил тяжкое преступление")
        })
        add(()=>{
            p2.render()
            print("Эй ты кто вообще?! Посторонним здесь быть не положено!")
        })
        add(()=>{
            p1.render()
            print("Он явно выглядит так как будто совсем не ожидал тебя увидеть, и при этом двигается резко и собранно, как по уставу")
        })
        add(()=>{
            p2.render()
            print("Что ты забыл на территории башни? А ну живо в темницу! Каким образом ты сюда попал?")
        })
        add(()=>{
            print("Э, чт.. куда? В темницу? Но за что?")
            p0.render()
        })
        add(()=>{
            print("Тебя довольно бодро приволокли в темницу, на поясе этого стражника ты приметил лезвие похожее на кухонный нож.")
            p1.render()
            l2.render()
        })
        add(()=>{
            print("Тебя закидывают в камеру, и вот ты тут... ")
        })
        add(()=>{
            print("камера выглядит ну прямо сказать так себе, в башне всего две камеры и по сравнению с второй - эта ещё нормальная!")
        })
        add(()=>{
            print("Впрочем наверное не так уж и просто сюда попасть, либо это просто редкость")
        })
        add(()=>{
            p2.render()
            print("Сейчас принесу поесть. Я уверен ты голодный, по тебе видно. Обязательно съешь всё!")
        })
        add(()=>{
            p1.render()
            print("Недалеко было зеркальце. По тебе и правда можно было сказать что ты голоден, выглядишь как какой то нищий")
        })
        add(()=>{
            print("Весь в обносках, тощий, глаза серые.")
        })
        add(()=>{
            print("И трясёшься весь, сам того не замечая, мышинально.")
        })
        add(()=>{
            print("Наконец, принесли поднос с едой")
        })
        add(()=>{
            print("Мясо, овощи, рецепт очень вкусный и хороший, не похоже на тюремную еду.")
        })
        add(()=>{
            print("Однако решётка, мох, пыль, грязь и какой то хлам. У тебя морщится лицо о всего этого.")
        })
        add(()=>{
            print("Подняв взгляд ты снова увидел стражника. Лица за шлемом не видно, но ты пытаешься разглядеть хоть что-то. Беспокоит ли его обстановка так же как и тебя?")
        })
        add(()=>{
            p2.render()
            print("Что ты так смотришь? У меня что то с шлемом?")
        })
        add(()=>{
            p0.render()
            ask("И че ему говорить?","Потребовать визита у короля","Пожаловаться на еду",
            ()=>{
                local = 1
                print("Требую визита к королю!")
            },
            ()=>{
                local = 0
                print("Ты принес не вкусную еду!")
            })
        })
        add(()=>{
            p2.render()
            if (local == 1)
            print("К королеве хочешь сказать? Ты совсем поехавший?")
            else
            print("Но... я же сам её готовил...")
        })
        add(()=>{
            if (local == 1)
            print("Впрочем может быть...")
            else
            print("По своему фирменному рецепту...")
        })
        add(()=>{
            if (local == 1)
            print("Да, королева сейчас действительно не занята, можно и к ней")
            else
            print("ТЫ СЕЙЧАС БУДЕШЬ НА СУДЕ САМОЙ КОРОЛЕВЫ!")
        })
        add(()=>{
            p1.render()
            print("Вы с стражником неторопливо пошли на верх, поднимаясь по светлым лестницам, по белому камню из которого состоит башня")
        })
        add(()=>{
            p1.render()
            l3.render()
            if (local == 1)
            print("И вот вы входите в тронный зал, стражник же сразу ушёл")
            else
            print("Вы пришли к короеве, стражник начал орать что ты оскорбляешь его стряпню, он довольно смешно прыгал от злости, но королева его кажется не слушала, вскоре он обиженно ушёл")
        })
        add(()=>{
            p3.render()
            print("Так ты кто вообще? Я тебя раньше здесь не видела")
        })
        add(()=>{
            p1.render()
            print("Королева очень красива, её окружают её слуги, она строго смотрит на всех, её авторитет не позволяет даже перешептываться за её спиной, не прошло и дня как ты оказался на её аудиенции, как же быстро разворачиваются события!")
        })
        add(()=>{
            ask("А кто ты?","Открыть меню создания персонажа из скайрима","Спросить в ответ",
            ()=>{
                print("Ты че серьёзно? Думаешь я добавлю в эту игру редактор персонажа? Ты так и останешься безликим чуваком, смирись...")
            },
            ()=>{
                p3.render()
                print("Отвечать вопросом на вопрос не вежливо! Я между прочим королева Сови! Как ты можешь меня не знать а? Единственная королева на всей планете!")
            })
        })
        add(()=>{
            p3.render()
            print("Что мне с тобой делать то, а? Однако ты мог бы быть полезен...")
        })
        add(()=>{
            p1.render()
            print("Королева осмотрела тебя с ног до головы и ухмыльнулась, затем переглянулась с поддаными и снова с ухмылкой посмотрела на тебя")
        })
        add(()=>{
            p3.render()
            print("Слушай.... Есть у меня одна идейка на твой счёт...")
        })
        add(()=>{
            p3.render()
            print("Иди в столовую, приготовь еды, помой посуду, нам там щас руки нужны, из поворов один только стражник Боб, но не может же он постоянно совмещать работу правда же?")
        })
        add(()=>{
            p0.render()
            print("Есть у меня возможность отказаться?")
        })
        add(()=>{
            p2.render()
            print("Ну а тебя никто и не спрашивает, нам сейчас руки нужны, да и к тому же... тебя выпустили из темницы, будь благодарнее")
        })
        add(()=>{
            p1.render()
            print("Стражник сопроводил тебя до кухни и тебя сразу же облило различными запахами еды.")
        })
        add(()=>{
            p1.render()
            print("В этот момент ты вспомнил про противные запахи гнили в темнице, и на твоем лице мышинально появилась улыбка. Стоит поблагодарить королеву за столь приятную замену.")
        })
        add(()=>{
            p1.render()
            l6.render()
            print("По приходу на кухню ты видишь того самого стражника который принес тебе еду в камеру, ты узнал его по кухонному ножу на поясе.")
        })
        add(()=>{
            print("Также можно заметить различную кухонную утварь по типу волшебной плиты для жарки")
        })
        add(()=>{
            p2.render()
            print("О, это ж ты.")
        })
        add(()=>{
            if (local == 1)
            print("Ты мне сразу понравился, видимо королеве тоже! Сейчас я расскажу тебе свой фирменный рецепт...")
            else
            print("ТЫ!!!! Еду мою обижать вздумал?!?!?! Знаешь что? Я хочу посмотреть как ты готовишь... Может быть я не прав и ты на самом деле гениальный шеф повар?!")
        })
        add(()=>{
            p1.render()
            if (local == 1)
            print("Вы и этот замечательный стражник сдружились и решили приготовить вместе блюдо, кстати его зовут Боб!")
            else
            print("Ты сумел разговорить стражника на тему еды и он уже вроде не так уж сильно обижается на твоё оскорбление его стряпни, кстати его зовут Боб")
        })
        add(()=>{
            ask("Учавствовать в создании блюда?","Нет","Да",
            ()=>{
                print("Очень зря... Боб расстроился, он хотел себе кулинарного партнёра")

            },()=>{
                ask("Что будем готовить?","Салат","Яишницу",
                ()=>{
                    ask("Какой делаем салат?","Окрошку на минералке","Вкусный",
                    ()=>{
                        print("Это вообще салат? В общем вы конечно поели но ладно... помолчу")

                    },()=>{
                        print("!Получен навык повар! Салат получился крайне вкусный, добавален рецепт салата Цезарь!")
                        povar=true
                    })

                },()=>{
                    print("Ты быстро разбил яйцо и пожарил на волшебной плите, ничего особенного")
                })
            })
        })
        add(()=>{
            print("Вы с Бобом ещё немного посидели, он рассказал тебе о своих любимых блюдах, ты за это время успел хорошо так прибраться на кухне, теперь она как новенькая!")
        })
        add(()=>{
            p2.render()
            print("Так, ну ты сделал все что мог, думаю тебе пора снова к Сови, тебя провести?")
        })
        add(()=>{
            p0.render()
            print("Да, было бы не плохо")
        })
        add(()=>{
            p2.render()
            l5.render()
            print("Как тебе наша королева?")
        })
        add(()=>{
            p0.render()
            print("В плане?")
        })
        add(()=>{
            p2.render()
            print("Ты ей явно понравился раз она отправила тебя на кухню")
        })
        add(()=>{
            p0.render()
            print("Думаешь?")
        })
        add(()=>{
            p2.render()
            print("Безусловно")
        })
        add(()=>{
            p1.render()
            print("Вы проходите коридоры один за другим, белый камень смотрится так красиво как никогда")
        })
        add(()=>{
            p2.render()
            print("И все таки как ты попал сюда?")
        })
        add(()=>{
            p0.render()
            print("Слушай, я и сам не знаю")
        })
        add(()=>{
            p2.render()
            print("как такое возможно?")
        })
        add(()=>{
            p1.render()
            print("Боб был явно в недоумении, вероятно до тебя на территорию башни так просто не врывались")
        })
        add(()=>{
            p2.render()
            print("Сам то ты откуда?")
        })
        add(()=>{
            ask("Боб смотрит в твою сторону в ожидании ответа","Я из другого мира","Я не помню",()=>{
                print("Не мели чепуху, как ты можешь быть из другого мира? Совсем крыша поехала?")
            },()=>{
                print("Серьёзно? Прям совсем ничего?")
            })
        })
        add(()=>{
            print("Ты помнишь что то про себя?")
        })
        add(()=>{
            ask("Может свое прошлое?","Я великий воин","Нет",()=>{
                print("Не помню тебя, значит не такой уж и великий, я много читал в библиотеке в свое время, самый великий у нас Тулий.")
            },()=>{
                print("Что прям совсем ничего?")
            })
        })
        add(()=>{
            print("Наверное стоило бы тебя просвятить в курс событий")
        })
        add(()=>{
            print("Мы находимся в эре 'ренесанса'.")
        })
        add(()=>{
            print("Королева как то даже назвала наш век - 'Русский ренесанс' чтобы это не значило")
        })
        add(()=>{
            print("На данный момент наше королевство пытается навести порядок и устаканить мир на континенте")
        })
        add(()=>{
            print("Демоны уже продвигаются на север, это нам вообще не нравится")
        })
        add(()=>{
            print("Собственно мы уже почти подошли к покоям, это покои королевы, можешь заходить, а я пойду")
        })
        add(()=>{
            print("Было приятно узнать тебя лучше!")
        })
        add(()=>{
            l7.render()
            p1.render()
            print("Покои очень просторны, на тумбочках и столах стоят цветы.")
        })
        add(()=>{
            print("Вырезанные из дерева фигурки Сов разбросаны тут и там, картины на стенах нарисованы не профессионалом но в рамочках, на каждой одна и та же подпись")
        })
        add(()=>{
            print("В покоях очень прибрано, из окна открывается красивый вид на территорию королевства")
        })
        add(()=>{
            print("Ты видишь как Королева сови с очень счастливым лицом сжигает в камине какою ту бумагу похожую на письмо")
        })
        add(()=>{
            print("Рядом с окном стоит стол с письменными пренадлежностями, там стопка бумаги, перо, чернила и корзина с кучей скомканых листочков")
        })
        add(()=>{
            print("Сови привязывает к почтовой сове свиток с печатью и отправляет её в окно")
        })
        add(()=>{
            print("Затем она оборачивается на тебя")
        })
        add(()=>{
            p3.render()
            print("О, ты уже закончил, не ожидала тебя так скоро увидеть")
        })
        add(()=>{
            p1.render()
            print("Сови улыбалась тебе не меньше чем огню, её милая улыбка была просто очаровательна")
        })
        add(()=>{
            p3.render()
            print("как дела на кухне?")
        })
        add(()=>{
            p0.render()
            print("Да в целом не плохо, куда лучше чем в тюремной камере, спасибо за это большое")
        })
        add(()=>{
            p3.render()
            print("Ну вот и молодец")
        })
        add(()=>{
            print("Я думаю ты отработал свое наказание")
        })
        add(()=>{
            p1.render()
            print("Однако её улыбка сменилась озадаченностью")
        })
        add(()=>{
            p3.render()
            print("А за что тебя посадили в камеру то собственно?")
        })
        add(()=>{
            p0.render()
            print("Я сам до конца не уверен, я каким то образом оказался на территории башни.")
        })
        add(()=>{
            print("Ну Боб меня и забрал в камеру, сюда же незнакомцам нельзя")
        })
        add(()=>{
            p3.render()
            print("Это правда, нельзя. Я хотела...")
        })
        add(()=>{
            p1.render()
            print("Не успела Сови договорить фразу как пришёл незнакомец в синих доспехах, он высокий и крепкий, одним словом 'Серьёзный мужик'")
        })
        add(()=>{
            p4.rename("Серьёзный мужик")
            p4.render()
            print("Королева, требуется ваш взгляд")
        })
        add(()=>{
            p3.render()
            print("Тулий, что случилось?")
        })
        add(()=>{
            p4.rename("Генерал Тулий")
            p4.render()
            print("Да так, планируем пригласить старика Мэрлина")
        })
        add(()=>{
            p3.render()
            print("Но он же уже отказывал нам, говорит что у него и в Приморской деревне дел по горло")
        })
        add(()=>{
            p4.render()
            print("Но он нам нужен как никогда, как ни как он самый сильный маг которого мы знаем")
        })
        add(()=>{
            p3.render()
            print("Ну не придёт же он нам помогать просто так в конце концов")
        })
        add(()=>{
            p4.render()
            print("А кто это тут у тебя?")
        })
        add(()=>{
            p3.render()
            print("Да так, милашка который случайно попал на территорию башни")
        })
        add(()=>{
            print("Хотя погоди")
        })
        add(()=>{
            print("А Мэрлину случайно не нужен был ученик?")
        })
        add(()=>{
            p4.render()
            print("Было дело! Может мы его задобрим этим парнишкой?")
        })
        add(()=>{
            p3.render()
            print("Ну тогда, Тулий, собирай лошадей")
        })
        add(()=>{
            print("А ты, забудь все что я сказала, поедешь к Мэрлину")
        })
        add(()=>{
            p1.render()
            print("Ты и опомниться не успел как тебя снова прибрали к делу")
        })
        add(()=>{
            print("Тебе не сказать что сильно это нравится но что ты с этим сделаешь?")
        })
        add(()=>{
            print("Леса, луга, поля")
            document.getElementById("flash").innerHTML="<audio src='files/Kopita.mp3' autoplay='autoplay'>"
            l8.render()
        })
        add(()=>{
            print("Ваше путешествие займёт наверное пару дней")
        })
        add(()=>{
            print("Отправили тебя, и пару рыцарей")
        })
        add(()=>{
            print("Тулий осталься с королевой")
        })
        add(()=>{
            print("Зачем такой как ты нужен Мэрлину?")
        })
        add(()=>{
            print("Может в тебе скрыта какая то волшебная сила?")
        })
        add(()=>{
            print("Может ты и правда послан из другой вселенной чтобы стать здесь героем?")
        })
        add(()=>{
            print("Вид дороги уже спустя несколько часов пути начал утомлять")
        })
        add(()=>{
            print("Хотя казалось бы, любуйся себе пейзажами в удовольствие")
        })
        add(()=>{
            print("Но мысли о будующем поглощают с головой")
        })
        add(()=>{
            print("События кажется развились слишком быстро")
        })
        add(()=>{
            print("Лошади остановились, сразу видно - все устали после дня пути")
        })
        add(()=>{
            l8.change('img/forest.png')
            print("Остальные развели костёр а ты решил провести небольшую разведку на предмет опасности рядом")
        })
        add(()=>{
            print("Светлячки и куузнечики уже во всю цокали, трава была такой мягкой что хотелось заснуть")
        })
        add(()=>{
            print("Однако ты заметил сломаную ветку")
        })
        add(()=>{
            print("И ещё ветку...")
        })
        add(()=>{
            print("Ты решил посмотреть что там дальше в лесу")
        })
        add(()=>{
            print("Какая же здесь все таки красивая местность, завораживающая трава, и следы")
        })
        add(()=>{
            print("Стоп... Следы? Достаточно большие, кажется медвежие, ведут в глубь леса")
        })
        add(()=>{
            print("Ты че стоишь?")
        })
        add(()=>{
            print("Пошли по следу!")
        })
        add(()=>{
            print("Вот так ты и пошёл во следу")
        })
        add(()=>{
            print("Всё глубже...")
        })
        add(()=>{
            print("И глубже в лес...")
        })
        add(()=>{
            print("О, кажется ты видишь...")
        })
        add(()=>{
            l9.render()
            print("Мишаня!")
        })
        add(()=>{
            print("Такого большого медведя ты в жизни не видел")
        })
        add(()=>{
            print("Да и вообще медведя ты видел последний раз на картине в башне королевы Сови")
        })
        add(()=>{
            print("К счастью мишутка тебя пока что не заметил")
        })
        add(()=>{
            print("Но почему он в доспехах? Все медведи ходят в доспехах?")
        })
        add(()=>{
            print("Дам подсказку - нет")
        })
        add(()=>{
            print("А ещё он в крови, ты же не хочешь чтобы эта кровь смешалась с твоей?")
        })
        add(()=>{
            print("Весь здравый смысл говорит тебе уходить")
        })
        add(()=>{
            ask("Уйти?","Да, пожалуй","Я хочу ещё посмотреть на мишутку!",()=>{
                print("Здравый смысл восторжествовал!")
            },()=>{
                print("А я посмотрю ты грабрец")
                demon = true
            })
        })
        add(()=>{
            if (demon)
            print("Ты смотришь на медведя находясь на безопасном расстоянии")
            else
            print("Ты стараешься как можно тише убраться отсюда")
        })
        add(()=>{
            if (demon){
                print("Медведь внезапно зарычал, и очень громко")
                play_Sound("files/roar.mp3")
            }
            else
            print("Вернуться поскорее к костру, к счастью ты достаточно далеко от медведя, он не должен тебя заметить")
        })
        add(()=>{
            if (demon)
            print("Однако не успел ты испугаться как в него уже полетели копья, с красными наконечниками и из очень темной древесины")
            else{
                print("Но ты кажется наступил на веточку... БЛЯТЬ... сердце начинает бешено стучать, если медведь тебя заметил то это все, это пиздец, нужно бежать!")
                play_Sound("files/roar.mp3")
            }
            
        })
        add(()=>{
            if (demon)
            print("К уже полуживому медведю подошёл темный рогатый силуэт и из медведя к нему пошла какая то энергия, пожоже он забирает его душу")
            else
            print("Блять, оглядываться нельзя")
        })
        add(()=>{
            print("Пора сваливать")
            l9.change("img/forest.png")
        })
        add(()=>{
            print("Ты бегом, с колотящимся сердцем добегаешь до костра")
        })
        add(()=>{
            print("рыцари что тебя сопровождают смотрят в недоумении")
        })
        add(()=>{
            if (demon)
            print("Ты рассказываешь им что всретил медведя в доспехах и кажется демонов, они завалили медведя, нужно сваливать")
            else
            print("Ты рассказываешь что кажется потревожил медведя в доспехах в лесу, он вероятно направляется к вам")
        })
        add(()=>{
            p2.render()
            print("Ебать не встать")
        })
        add(()=>{
            print("Так собираемся скорее")
            play_Sound("files/Kopita.mp3")
        })
        add(()=>{
            print("Вы потушили костёр и быстро собрались")
        })
        add(()=>{
            p1.render()
            print("Скорей запрыгнули на лошадей, однако они явно ещё не успели отдохнуть, их действия были довольно медленными")
        })
        add(()=>{
            
            if (demon)
            print("Тем не менее вы поехали, хотя скорее быстро пошли")
            else
            print("Тем не менее вы поехали, хотя скорее быстро пошли, интересно, почему медведь так и не догнал вас? Что его остановило?")
        })
        add(()=>{
            p0.render()
            print("Это пока что альфа первой главы")
        })
        add(()=>{
            print("Прошу указать все моменты которые тебе понравились/не понравились")
        })
        add(()=>{
            print("...")
        })
        add(()=>{
            print("..")
        })
        add(()=>{
            print(".")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        add(()=>{
            print("")
        })
        play_scene(story)
        break;
        case 2:
            add(()=>{
                p1.render()
                print("Глава 2")
            })
            play_scene(story)
        break;
        case 3:
            add(()=>{
                p1.render()
                print("Глава 3")
            })
            play_scene(story)
        break;
        } 
    }
}
