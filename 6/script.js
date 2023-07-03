//todo Обработчики событий
// document.addEventListener('DOMContentLoaded', () => {
//     let audio = document.querySelector('audio');
    
//     audio.volume = 0.3;
//   }, false);

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
        document.body.style.backgroundImage='url("'+this.fon+'")'
        let audio = document.querySelector('audio');
    
        audio.volume = 0.2;
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
        document.body.style.backgroundSize="100%";
        
    }else if(full==2){
        document.body.style.backgroundSize="70%";

    }else if(full==3){
        document.body.style.backgroundSize="900px";
    }else{
        document.body.style.backgroundSize="720px";
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
    setTimeout(print,12,txt)
    
}
// <audio src='files/song1.mp3' autoplay='autoplay'> - добавить музло!
// todo ----- --создание объектов-- -----
l1 = new loc ({
    text:"Башня... но чья?<audio src='files/simple.mp3' autoplay='autoplay'>",
    name:"Башня",
    fon:"img/towerv2.png"
})

l2 = new loc ({
    text:"Тюрьма, вы в заключении!<audio src='files/Dark.mp3' autoplay='autoplay'>",
    name:"Чертова решётка",
    fon:"img/cage.png"
})

l3 = new loc ({
    text:"Безупречная королева сов!<audio src='files/epic.mp3' autoplay='autoplay'>",
    name:"Королева Совик",
    fon:"img/quen.png"
})

l4 = new loc ({
    text:"Такая же темная как и всегда<audio src='files/Dark.mp3' autoplay='autoplay'>",
    name:"Тьма",
    fon:"img/dark.png"
})

l5 = new loc ({
    text:"Как же все таки красиво<audio src='files/Void.mp3' autoplay='autoplay'>",
    name:"Коридоры",
    fon:"img/coridor.png"
})

l6 = new loc ({
    text:"Пахнет вкусно!<audio src='files/BL.mp3' autoplay='autoplay'>",
    name:"Кухня",
    fon:"img/kitchen.png"
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

text.onclick = function(){
    if (i==0){//это надо чтобы избежать бага с скипом
    
    //старт
    story+=1;
    //какие есть пути? Тут все просто
    switch (way){
        case 0:
        
        switch (story){
            //пустая глава
            case 1:
                p1.render()
                print("Ой, извини, что-то сломалось")
                l4.render()
                modalload()//на всякий чтобы записать переменные
                break
            
            case 2:
                print("Сообщи о баге разрабу")
                break
            
            case 3:
                print("Я пожалуй ничего сам делать за него не буду вдруг все сломаю!")
                break
            
            default:
                print("Как починит -  возвращайся")
                story=0
                break
        }
        break//конец старта
        case 1://Глава 1
        //Как сделать сценарий лучше? Идея: Что если какой то бомж полюбит королеву? Арка персонажа, сначала ГГ неудачник но исполнительный а затем он крутой и никому не подчиняиется ибо он устал от командования. Но он всегда думает о королеве, она ему симпатична. Делим на 3 акта: 1: Однажды, Каждый День, Пока в один день... 2: Из за этого... Из за этого... Из за этого... Точка невозврата... 3: Пока в конце концов... И с тех пор...

        // Сюжет - герой каким то образом оказывается возле замка королевы, Его пакуют сразу в тюряжку, кто такой че здесь забыл??? Ну а герой не пальцем деланый и либо просит королеву либо напрашивается на королеву, та приходит в подземелье и видит его, осматривает его, а он как дурачёк. Ну а она че? Иди квесты делай! Отправила его мыть посуду на кухню, сразу заметила что опасности он не предоставляет, а он справился, и довольно быстро.

        // Ну и отправила она его на другую работу, пусть коридоры чистит, и тут герой начал возмущаться, ну что это такое? В бесплатного раба наняли. Так проходят дни. А королева тем временем думала чем бы ещё героя занять. Ну лол, нафиг он нам нужен пускай идёт монстра в лесу завалит! Так и порешили, королева отправила ГГ убивать медведя в лесу, не соврала, реально медведь, только вот в броне и злой! Так ещё и на двух ногах! Завидев медведя герой уж было бросился бежать как увидел как в медведя влетело копьё, это демоны, они решили зайти так далеко чтобы убить медведя? Из далека ГГ увижел как они убили его и подошёл какой то силуэт и забрал душу медведя.

        // Они ушли, ГГ же быстро подбежал забрать голову медведя и вернулся в замок чтобы предоставить её королеве, за это время она уже стала ему симпатична, королева же была удивлена такому, они никак не ожидала что ГГ справиться. Да и он ей нравиться начал. Она отправила его в казармы, пусть его тренируют лучшие её мастера, ей нужны такие воины. ГГ усердно тренируется и становиться сильнее, знакомство с генералом тулиусом, защитой города, тулиус в целов вводит в курс дела о защите и даже спрашивает какие он может предложить варианты улучшения всего этого дела, это повлияет на некоторые диалоги.

// Суб сюжет - ГГ застаёт как Сови Бросает письма в огонь и о чем то говорит с Тулием
// Так же возможно модно сделать вставки как Сови пишет ответы, эта переписка сыграет роль в третей главе

        //ГГ посылают в разведку узнать как вообще обстоят дела у соседних государств, ГГ берёт лошадь и едет до портовой деревни чтобы отплыть на остров к демонам однако уже в порту он видит подступающие корабли Морского народа, местный лесной маг Мэрлин с помощью волшебной островной древесины с острова демонов узнал что Морсккой народ вообще не с хорошими вестями, он сказал что поможет сдержать атаку и спасёт из деревни как можно больше людей а задача ГГ уведомить королеву о приблежающихся захватчиках, Мэрлин кастует телепорт что позволяет ГГ сильно сократить расстояния до башни. ГГ добегает, уведомляет королеву и помогает готовиться к нападению. Когда враги уже подходят Командир говорит что нам не хватит сил, их слишком много, и тут вдруг на горизонте виднеются демоны... Эпичный клифхэнгер!
            
            switch (story){
                case 1:
                    print("Будем знакомы, я рассказчик!")
                    l4.render()
                    modalload()//на всякий чтобы записать переменные
                break
                case 2:
                    print("Твой личный голос в голове на протяжении всех трёх глав. Кстати сразу предупреждаю прогресс не сохраняется!")
                break
                case 3:
                    ask("Попытаться открыть глаза?","Да, давай","Лол нет",
                    ()=>{
                        print("Глаза слиплись но с трудом ты все равно пытаешься...")
                    },
                    ()=>{
                        ask("Ты закрыл глаза и ты вспоминаешь...","где я?","кто я?",
                        ()=>{
                            print("Ты - кажется последний раз себя помнишь на пьянке в какой то таверне, где ты сейчас ты не помнишь.")
                        },
                        ()=>{
                            print("Некогда ты был великим воином но ни ты ни остальные не помнят об этих временах")
                        })

                    })
                break
                case 4:
                    l1.render()
                    print("Ты все таки открываешь глаза")
                break
                case 5:
                    print("Это какая то башня, выглядит красиво и уж больно знакомо, кажется ты вспоминаешь что-то... не успел ты опомниться, как тебя увидел стражник выбегающий из за одной из кирпичных стен")
                break
                case 6:
                
                    p2.render()
                    print("Эй ты кто вообще?! Посторонним здесь быть не положено!")
                break
                case 7:
                    print("Что ты забыл на территории башни? А ну живо в темницу! Каким образом ты сюда попал?")
                break
                case 8:
                    
                    print("Э, чт.. куда? В темницу? Но за что?")
                    p0.render()
                break
                case 9:
                    print("Тебя довольно бодро приволокли в темницу, на поясе этого стражника почему то был кухонный нож, тебя закидывают в камеру и вот ты и тут... камера выглядит ну прямо сказать так себе, в башне всего две камеры и по сравнению с второй - эта ещё нормальная")
                    p1.render()
                    l2.render()
                break
                case 10:
                    
                    p2.render()
                    print("Устраивайся поудобнее, щас принесу еды! Она очень вкусная!")
                break
                case 11:
                    print("а вот и еда. Я уверен ты голодный, по тебе видно. Обязательно съешь всё!")
                break
                case 12:
                    
                    p1.render()
                    print("Тебя неплохо накормили, мясо, овощи, рецепт очень вкусный и хороший, не похоже на тюремную еду, но атмосфера здесь гнетущая... Может стоит выбраться отсюда? Но как?")
                break
                case 13:
                    
                    p2.render()
                    print("Что ты так смотришь? У меня что то с лицом? Но как ты увидел моё лицо?")
                break
                case 14:
                    
                    p0.render()
                    ask("И че ему говорить?","Потребовать визита у королевы","Пожаловаться на еду",
                    ()=>{
                        local = 1
                        print("Требую визита к королеве!")
                    },
                    ()=>{
                        local = 0
                        print("Ты принес не вкусную еду!")
                    })
                break
                case 15:
                    
                    p2.render()
                    if (local == 1)
                    print("К королеве говоришь? Ты совсем поехавший?")
                    else
                    print("Но... я же сам её готовил...")
                break
                case 16:
                    if (local == 1)
                    print("Впрочем может быть...")
                    else
                    print("По своему фирменному рецепту...")
                break
                case 17:
                    if (local == 1)
                    print("Да, королева сейчас не занята, можно и к ней")
                    else
                    print("ТЫ СЕЙЧАС БУДЕШЬ НА СУДЕ САМОЙ КОРОЛЕВЫ!")
                break
                case 18:
                    
                    p1.render()
                    l3.render()
                    if (local == 1)
                    print("Вы пришли к королеве, стражник сразу же ушёл")
                    else
                    print("Вы пришли к короеве, стражник начал орать что ты оскорбляешь его стряпню но королева его кажется не слушала, вскоре он обиженно ушёл")
                break
                case 19:
                    
                    p3.render()
                    print("Так ты кто вообще?")
                break
                case 20:
                    
                    p1.render()
                    print("Королева очень красива, её окружают её слуги, она строго смотрит на всех, её авторитет не позволяет даже перешептываться за её спиной")
                break
                case 21:
                    ask("А кто ты?","Открыть меню создания персонажа из скайрима","Спросить в ответ",
                    ()=>{
                        print("Ты че серьёзно? Думаешь я добавлю в эту игру редактор персонажа? Короче ты ответил: 'Да я сам хз кто я'")
                    },
                    ()=>{
                        
                        p3.render()
                        print("Отвечать вопросом на вопрос не вежливо! Я между прочим королева Сови! Как ты можешь меня не знать а? Единственная королева на всей планете!")
                    })
                break
                case 22:
                    
                    p3.render()
                    print("Стража, идите заставьте его мыть посуду, нам сейчас не хватает рук")
                break
                case 23:
                    p0.render()
                    
                    print("Посуду? Но я же здесь даже не работаю...")
                break
                case 24:
                    p2.render()
                    print("Ну а тебя никто и не спрашивает, нам сейчас руки нужны")
                break
                case 25:
                    
                    p1.render()
                    print("В общем тебя прибрали к делу, отправили на кухню мыть посуду, но всяко лучше чем отсиживать зад в темнице. А вот королева, она явно тебе приглянулась, однако не время думать об этом!")
                break
                case 26:
                    p1.render()
                    l6.render()
                    print("По приходу на кухню ты видишь того самого стражника который принес тебе еду в камеру, ты узнал его по кухонному ножу на поясе.")
                break
                case 27:
                    
                    p2.render()
                    print("О, это ж ты!")
                break
                case 28:
                    if (local == 1)
                    print("Ты мне сразу понравился, видимо королеве тоже! Сейчас я расскажу тебе свой фирменный рецепт...")
                    else
                    print("ТЫ!!!! Еду мою обижать вздумал?!?!?! Знаешь что? Я хочу посмотреть как ты готовишь... Может быть я не прав и ты на самом деле гениальный шеф повар?!")
                break
                case 29:
                    p1.render()
                    if (local == 1)
                    print("Вы и этот замечательный стражник сдружились и решили приготовить вместе блюдо, кстати его зовут Боб!")
                    else
                    print("Ты сумел разговорить стражника на тему еды и он уже вроде не так уж сильно обижается на твоё оскорбление его стряпни, кстати его зовут Боб")
                break
                case 30:
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
                break
                case 31:
                    print("Вы с Бобом ещё немного посидели, он рассказал тебе о своих любимых блюдах, ты за это время успел хорошо так прибраться на кухне, теперь она как новенькая!")
                break
                case 32: 
                    p2.render()
                    print("Так, ну ты сделал все что мог, думаю тебе пора снова к Сови, тебя провести?")
                break
                case 33:
                    p0.render()
                    print("Пока что на этом сценарий все")
                break

                case 34:
                    p0.render()
                    print("Замечания и правки в лс!")
                break
                case 35:
                    p0.render()
                    print("")
                break
                case 36:
                    p0.render()
                    print("")
                break
                case 37:
                    p0.render()
                    print("")
                break
                case 38:
                    p0.render()
                    print("")
                break
                case 39:
                    p0.render()
                    print("")
                break
                case 40:
                    p0.render()
                    print("")
                break
                case 41:
                    p0.render()
                    print("")
                break
                case 42:
                    p0.render()
                    print("")
                break
                case 43:
                    p0.render()
                    print("")
                break
                case 44:
                    p0.render()
                    print("")
                break
                case 45:
                    p0.render()
                    print("")
                break
                case 46:
                    p0.render()
                    print("")
                break
                case 47:
                    p0.render()
                    print("")
                break
                case 48:
                    p0.render()
                    print("")
                break
                case 49:
                    p0.render()
                    print("")
                break
                case 50:
                    p0.render()
                    print("")
                break
                case 51:
                    p0.render()
                    print("")
                break
                case 52:
                    p0.render()
                    print("")
                break
                case 53:
                    p0.render()
                    print("")
                break
                case 54:
                    p0.render()
                    print("")
                break
                case 55:
                    p0.render()
                    print("")
                break
                case 56:
                    p0.render()
                    print("")
                break
                case 57:
                    p0.render()
                    print("")
                break
                case 58:
                    p0.render()
                    print("")
                break
                case 59:
                    p0.render()
                    print("")
                break
                case 60:
                    p0.render()
                    print("")
                break
                case 61:
                    p0.render()
                    print("")
                break
                case 62:
                    p0.render()
                    print("")
                break
                case 63:
                    p0.render()
                    print("")
                break
                case 64:
                    p0.render()
                    print("")
                break

            }
            break
        }
    }
}
