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
function zip(){
    if(!zipped){
        document.getElementById("text").style.left="25%";
        document.getElementById("texthead").style.left="83%";
        p0.render()
        document.getElementById("text").style.background= 'linear-gradient(45deg, rgba(255, 180, 110, 0.9) 0%, rgba(100, 100, 170, 0.9) 80%)'
        document.getElementById("texthead").style.background= 'linear-gradient(45deg, rgba(255, 180, 110, 0.9) 0%, rgba(100, 100, 170, 0.9) 80%)'
        zipped=true;
    }else{
        document.getElementById("text").style.left="20%";
        document.getElementById("texthead").style.left="20%";
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
    setTimeout(print,12,txt)
    
}
// <audio src='files/song1.mp3' autoplay='autoplay'> - добавить музло!
//создание объектов
l1 = new loc ({
    text:"Волшебный лес<audio src='files/song4.mp3' autoplay='autoplay'>",
    name:"город",
    fon:"files/wall1.jpg"
})

p0= new person({
    name:"Игрок",
    img:"files/none.png"
})

//переменные
way=0;
i=0
zipped=false;
story=0;
text=document.getElementById("text")
//игра
p1.render()
l1.render()
print("привет дружище!")

text.onclick = function(){
    if (i==0){//это надо чтобы избежать бага с скипом
    
    //старт
    story+=1;
    switch (way){
        case 0:
        
        switch (story){
            case 1:
                print("как дела?")
                modalload()//на всякий чтобы записать переменные
                break
            
            case 2:
                print("хочешь узнать кто я да?")
                break
            
            case 3:
                print("Ха, ха, нет конечно, ты знаешь кто я!")
                break
            
            case 4:
                print("я, дьявол! И сегодня ты отправишься со мной")
                p1.change("files/evil.png")
                p1.render()
                break
            
            case 5:
                print("мне от тебя кое-что нужно")
                break
            
            case 6:
                print("и нет это даже не твоя душа!")
                p1.change("files/dn.png")
                p1.render()
                break
            
            case 7:
                print("Впрочем на месте все поймешь")
                break
            
            case 8:
                print("За мной!")
                p1.change("files/dtalk.png")
                p1.render()
                break
            
            case 9:
                zip()
                print("Ничего не понял, но я согласен, выбора то у меня нет")
                break

            case 10:
                print("Етить колотить где я?")
                l2.render()
                break
            case 11:
                print("Слева какой то лес, справа горы, по центру водопад, и че я здесь забыл???")
                break
            
            case 12:
                print("Хотя если забраться повыше... хм, вроде слева в дали какой-то дым от костра")
                break
            
            case 13:
                print("а там за водопадом очень красивые горы, куда же пойти?")
                break

            case 14:
                print("я ведь ещё и голодный, что-же делать...")
                break

        default:
            print("...")
            ask("Налево к дыму? или вперёд в горы?","К дыму","В горы",
            ()=>{
                way=1;
                story=0;
            },
            ()=>{
                way=2;
                story=0;
            })
            break
        }
        break//конец старта
        case 1://путь в город
            
            switch (story){
                case 1:
                    print("так, в лес значит, ну тут вроде не то чтобы далеко, нормально, вперёд вперёд налево, надо запомнить...")
                break
                case 2:
                    print("Так я кажется забыл, вперёд вперёд направо? или налево? Так хавать хочется")
                break
                case 3:
                    ask("налево пойдёшь?","Да, налево!","Лол нет",
                    ()=>{
                        document.body.innerHTML="<div class='fon'>Поражение, тебя сожрали волки<div>"
                        document.body.style.fontSize='40px';
                        
                    },
                    ()=>{
                    })

                    print("Так, я уже вижу, в далеке город, на вид современный")
                break
                case 4:
                    l3.render()
                    print("Хм, он вроде и современный, но как будто заброшен, однако я точно видел людей")
                break
                case 5:
                    print("ещё какая-то музыка, у них тут праздник?")
                break
                case 6:
                    p2.render()
                    zip()
                    print("О, я тебя не видела раньше, ты кто?")
                break
                case 7:
                    print("Хотя, не важно, у нас так редко бывают гости, давай к нам на праздник!")
                    p2.change("files/mel2.png")
                    p2.render()
                break
                case 8:
                    zip()
                    print("Э, чт.. куда?")
                    p0.render()
                break
                case 9:
                    zip()
                    print("На праздник! Сегодня городу исполняется 500 лет! Это очень важное событие для каждого из нас")
                    p2.render()
                break
                case 10:
                    alert("вы прошли глубже в город")
                    document.getElementById("gif").innerHTML+="<img src='https://i.gifer.com/53uf.gif'>"
                    print("Устраивайся поудобнее, я принесу еды!")
                break
                case 11:
                    alert("окей это точно необычное место, где я?")
                    print("а вот и еда! Я уверена ты голодный, по тебе видно")
                break
                case 12:
                    p5.render()
                    print("Съешь меня скорей!")
                break
                case 13:
                    zip()
                    print("что?")
                break
                case 14:
                    zip()
                    p2.change("files/mel1.png")
                    p2.render()
                    print("что?")
                break
                case 15:
                    zip()
                    print("а так... ничего. да...")
                break
                case 16:
                    alert("еда оказалась совершенно обычной, к чему все эти глюки")
                    print("Слушай а ты случайно не знаешь где я?")
                break
                case 17:
                    zip();
                    p2.render()
                    print("а ты разве не отсюда?")
                break
                case 18:
                    p2.change("files/mel0.png")
                    p2.render()
                    print("неожиданно, я думала ты...")
                break
                case 19:
                    p2.change("files/mel3.png")
                    p2.render()
                    print("Так ты из другого города!")
                break
                case 20:
                    print("всегда хотела побавать в другом городе, ты же отведёшь меня туда правда?")
                break
                case 21:
                    ask("Сказать правду?","Да, отведу","Извини но я из другого мира...",
                    ()=>{
                        print("Да, конечно отведу, но не в ближайшее время...")
                    },
                    ()=>{
                        print("Прошу прощения, но я из другого мира...")
                        way = 4;
                        story = 0;
                    })
                    zip();
                    
                break
                case 22:
                    zip()
                    p2.change("files/mel4.png")
                    p2.render()
                    print("Я ТАК РАДА!")
                break
                case 23:
                    p2.change("files/mel5.png")
                    p2.render()
                    print("Наконец то я увижу дальние земли")
                break
                case 24:
                    p2.change("files/mel2.png")
                    p2.render()
                    print("Ну а пока..... я покажу тебе свою колекцию камней! Они все очень красивые!")
                break
                case 25:
                    l6.render()
                    document.getElementById("gif").innerHTML=""
                    alert("Мэл показала тебе всю свою коллекцию самых лучших камней на свете, вы очень много тусовались посетили все мероприятия на празднике, а потом пошли вглубь города")
                    print("Праздник вышел отличный, не пойму почему ты так мало ел")
                break
                case 26:
                    zip()
                    if (confirm('Сказать что еда живая?')){
                        print("мне показалось что еда живая")
                    }else{
                        print("Я был не голодный")
                    }
                break
                case 27:
                    zip()
                    p2.render()
                    print("Ха-ха, ты такой смешной")
                break
                case 28:
                    alert("так ты и прожил всю оставшуюся жизнь")
                    alert("Вместе с Мэл, ты жил счастливо, и так ни разу не вспомнил про прежнюю жизнь")
                    l7.render()
                    print("Это наш новый дом!")
                break
                case 29:
                    zip()
                    print("Он прекрасен Мэл, как хорошо что мы будем жить в таком просторном доме!")
                break
                case 30:
                    zip()
                    p2.render()
                    print("Я всегда о таком мечтала!")
                break
                case 31:
                    zip()
                    print("я тоже!")
                break
                case 32: 
                alert("а потом у них было много секса но мы его вам не покажем")
                document.body.innerHTML="<div class='fon'>Семейная концовка! Вы с Мэл жили долго и счастливо!<div>"
                document.body.style.fontSize='40px';
                break
            }
            break//конец пути в город
            case 2:
                switch (story){
                    case 1:
                        print("В горы, да определённо я хочу в горы, там ведь... красиво? Думаю да")
                    break;
                    case 2:
                        print("но на эту гору ещё забраться надо... может в этом заключался тест этого демонюги? Да хрен его знает, а ведь ещё надо найти похавать...")
                    break
                    case 3:
                        if (confirm("Ну что, лезем в гору напролом?")){
                            print("Какой же я все-таки долбоеб раз решился на такое...")
                        }else{
                            print("Ну да, умный в гору не пойдет, умный гору обойдет... о, здесь есть дорожка наверх!")
                        }
                    break
                    case 4:
                        print("так... я на вершине горы, хотя это мне не поможет, передомной сейчас ещё одна такая-же и я вдобавок ужастно хочу жрать.")
                    break
                    case 5:
                        if (confirm("Съесть синие ягоды которые растут на кустике перед тобой? Обычно стоит 100 раз подумать перед тем как есть первое попавшееся, но может сегодня тебе повезёт?")){
                            print('Ммм, ягоды, кислые, чтобы наесться ими нужно сожрать целый куст... Стоп, здесь все это время была яблоня?')
                        }else{
                            if(confirm("может тогда стоит съесть красные ягоды?")){
                                document.body.innerHTML="<div class='fon'>Ты умер как только съел одну ягоду, вот уж, где-где, а на горе тебя точно не найдут...<div>"
                                document.body.style.fontSize='40px';
                                break
                            }else{
                                if (confirm("О, ты набрел на яблоню, время похавать?")){
                                    print("Яблоки уж явно лучше всяких ягод!")
                                }else{
                                    document.body.innerHTML="<div class='fon'>Ты умер с голоду, может не стоило так себя мучать?<div>"
                                    document.body.style.fontSize='40px';
                                    break
                                }
                            }
                        }
                    break
                    case 6:
                        alert("ты наелся!")
                        print("ну чтож, продолжим поход!")
                    break
                    case 7:
                        alert("после еды ты шел довольно спокойно но вот вдруг из неоткуда волк!")
                        print("Ничего, я учился сражаться с собаками всего-то нужно...")
                    break
                    case 8:
                        if(confirm("Прыгнуть на собаку и использовать свои навыки борьбы?")){
                            alert("Ты поборол волка!")
                            print("Ну это было не так просто как мне казалось, но собаки реально не умеют в борьбу, задушить его было в целом не сложно, а теперь надо идти пока не пришли другие...")
                        }else{
                            if(confirm("запинать собаку?")){
                                document.body.innerHTML="<div class='fon'>волк схватился за твою ногу и не отпускал, он дождался своих сородичей и они всей стаей загрызли тебя<div>"
                                document.body.style.fontSize='40px';
                            }else{
                                if (confirm("Смотреть на волка как мальяк и медленно и угрожающе наступать")){
                                    alert("вы секунду смотрели друг другу в глаза, в один момент волк испугался и рванул в лес")
                                    print("Всегда работает...")
                                }else{
                                    document.body.innerHTML="<div class='fon'>ты очень испуганно стоял и тебя загрызли... ты вообще никак не сопротивлялся так как не смог решить что же делать<div>"
                                    document.body.style.fontSize='40px';
                                }
                            }
                        }
                    break
                    case 9:
                        print("Уже вечереет, надо скорее найти где переночивать, ночью я идти точно не смогу...")
                    break
                    case 10:
                        l4.render();
                        print("Это что там в дали, костер? Люди? Наконец то!")
                    break
                    case 11:
                        print("подойдя ближе становится заметно что на вид это какой то древний человек... ну чтож... отступать не вежливо")
                    break
                    case 12:
                        zip()
                        p4.render()
                        print("Твоя - кто?")
                    break
                    case 13:
                        zip()
                        print("Моя прийти с миром!")
                    break
                    case 14:
                        zip()
                        p4.render()
                        print("Твоя - тупой, Тупой не слушать моя")
                    break
                    case 15:
                        zip()
                        print("Ой... как же быть")
                    break
                    case 16:
                        if (confirm("Отнестись вежливо?")){
                            print("Извини, я зря быканул, мне не стоило это говорить...")
                        }else{
                            print("Тупой? Сам ты тупой!")
                        }
                    break
                    case 17:
                        zip()
                        p4.change("files/yb2.png")
                        p4.render()
                        print("Ладно, моя понять, моя не будет сориться...")
                    break
                    case 18:
                        print("Мне здесь очень одиноко... Твоя составить мне компанию?")
                    break
                    case 19:
                        p4.change("files/yb6.png")
                        p4.render()
                        alert("ты расказал уга-буге как ты сюда попал")
                        print("О, моя понимет, демоны они такие, моя встречать похожих")
                    break
                    case 20:
                        p4.change("files/yb3.png")
                        p4.render()
                        alert("Вы с Уга-бугой делите жареных крыс")
                        print("Не зря твоя так странно выглядит, твоя хорошо одет, твоя хорошо говорит.")
                    break
                    case 21:
                        p4.change("files/yb6.png")
                        p4.render()
                        alert("вы с уга-бугой около 5 минут обсуждали какие же все таки красивые горы, вы непллохо сдружились пока общались")
                        print("Слушай, а твоя не хочет пойти и убить этого демона? Он же наверняка в том огромном замке за горами!")
                    break
                    case 22:
                        p4.change("files/yb5.png")
                        p4.render()
                        alert("ты видишь что у уга-буги что-то тоже неприятное связанно с демоном но в одиночку он его не завалит")
                        print("Этот демон, понимаешь, он так-же как и твоя, моя сюда отправил, у меня было много временеи подумать об этом, нам стоит объединить наши усилия")
                    break
                    case 23:
                        zip()
                        print("Звучит как хороший план, я полностью согласен с твоими мыслями и поддержу тебя в твоем деле.")
                    break
                    case 24:
                        zip()
                        p4.change("files/yb2.png")
                        p4.render()
                        print("Твоя говорить очень хорошо, если твоя расскажет как так говорить моя будет очень рад")
                    break
                    case 25:
                        zip()
                        print("Да все просто... тебе всего лишь для начала нужно заменить 'твоя' и 'моя' на 'ты' и 'я', понял?")
                    break
                    case 26:
                        zip()
                        p4.change("files/yb4.png")
                        p4.render()
                        print("Моя по... то есть 'Я' понял... вроде понял, 'я' твоя понял! 'ты' слышал моя речь! 'я' говорить красиво!")
                    break
                    case 27:
                        zip()
                        print("Действительно, неплохо, ещё немного практики и будешь говорить как я. А теперь показывай где нам искать демона.")
                        way=3;
                        story=0;
                }
            break//конец гор
            case 3:
                switch(story){
                    case 1:
                        zip()
                        l5.render()
                        p4.change("files/yb1.png")
                        p4.render()
                        alert("Вы подошли к замку")
                        print("Замок очень большой, нужно зайти с правильной стороны, к счастью моя зна... я знаю где заходить!")
                    break
                    case 2:
                        alert("Уга-буга ведёт тебя через коридоры полные ловушек")
                        print("Так, вот здесь, сюда, поврот... вперёд...")
                    break
                    case 3:
                        p4.change("files/yb2.png")
                        p4.render()
                        print("Так а вот этого тут небыло...")
                    break
                    case 4:
                        alert("Не сразу но вы замечаете этого розового монстра")
                        p3.render()
                        print("Х-хх-ххХХх-ХХХХХх-...")
                    break
                    case 5:
                        if (confirm("Грозно посмотреть на чудище?")){
                            alert("вы грозно посмотрели на монстра")
                            print("*грозно смотрит в ответ*")
                        }else{
                            alert("вы с ужасом посмотрели на монстра")
                            print("*с ужасом смотрит в ответ*")
                        }
                    break
                    case 6:
                        p4.change("files/yb5.png")
                        p4.render()
                        print("Я совершенно без понятия как с этим драться, оставлю это на тебе")
                    break
                    case 7:
                        alert("Тем временем монстр куда-то убежал")
                        alert("В дали ты слышишь звуки, почему-то знакомые")
                        p2.change("files/mel5.png")
                        p2.render()
                        print("Помогите... кто нибудь")
                    break
                    case 8:
                        p2.change("files/mel4.png")
                        p2.render()
                        print("Спаситель? Подойди поближе! Скорей!")
                    break
                    case 9:
                        p4.change("files/yb5.png")
                        p4.render()
                        print("Весьма крипово...")
                    break
                    case 10:
                        if(confirm("Подойти?")){
                            alert("Как только ты подошел чудище явило свой настоящий облик и....")
                            document.body.innerHTML="<div class='fon'>Ты умер от рук монстра, в данном случае не лучшая смерть, интересно кто эта девушка?<div>"
                            document.body.style.fontSize='40px';
                        }else{
                            zip()
                            print("Конечно же я не буду подходить...")
                        }
                    break
                    case 11:
                        zip()
                        p3.change("files/melp.png")
                        p3.render()
                        print("ХАХАХахХАхАХаХахХаХААХахАХахАХАхаХАХахАХах")
                    break
                    case 12:
                        p3.change("files/melp2.png")
                        p3.render()
                        print("ты умрешь... может не от моих рук, но от рук демона, ничто его не осановит, я верю в это!")
                    break
                    case 13:
                        alert("в следующую секунду ты видишь копьё которое летит в паразита")
                        p3.change("files/pakill.png")
                        p3.render()
                        print("..............")
                    break
                    case 14:
                        p4.change("files/yb2.png")
                        p4.render()
                        print("кто-то должен был это сделать!")
                    break
                    case 15:
                        alert("Вы шли дальше, минуя все ловушки о которых знал Уга-буга, пока вы не остановились у двери рядом с которой была панель с кнопками")
                        print("Оппа, опять что-то новенькое, кажется это головоломка? Я не понимаю что там написано")
                    break
                    case 16:
                        alert("чтобы пройти через дверь правильно ответьте на вопрос")
                        if (prompt("сколько на данный момент сезонов в jojo")==6){
                            alert("Дверь открыта")
                            print("Вот так да...")
                        }else{
                            document.body.innerHTML="<div class='fon'>ты очень долго перебирал все-возможные комбинации чисел, у тебя ушло на это 1000 лет но ты так и не нашел нужное число<div>"
                            document.body.style.fontSize='40px';
                        }
                    break
                    case 17:
                        print("Дружище, да ты гений, не знаю что-бы я без тебя делал")
                    break
                    case 18:
                        p4.change("files/yb1.png")
                        p4.render()
                        alert("открылась дверь которая вела в зал с короной")
                        print("йоу, что бы не случилось не трогай корону!")
                    break
                    case 19:
                        ask("Потрогать корону?","не не не не не не потрогать", "другое",
                        ()=>{
                            alert("ты потрогал корону...")

                        },
                        ()=>{
                            alert("ты не потрогал корону!")
                            //todo Ещё одна концовка
                            way=5;
                            story=0;
                        })

                        alert("ты не удержался и потрогал корону")
                        print("ты чего ноделал...")
                    break
                    case 20:
                        p4.change("files/yb7.png")
                        p4.render()
                        alert("Замок начинает рушиться, Вас с уга-бугой разделила огромная трещина в полу, куча камней полетела в уга бугу, кажется что его уже не спасти")
                        print("Дружище, помоги! Не бросай меня!")
                    break
                    case 21:
                        p4.change("files/yb8.png")
                        p4.render()
                        alert("ты попытался его спасти его но... всё заваливает слишком быстро...")
                        print("Прости бро")
                    break
                    case 22:
                        p4.change("files/yb9.png")
                        p4.render()
                        alert("нет...")
                        print("...")
                    break
                    case 23:
                        document.body.innerHTML="<div class='fon'>плохая концовка, уга-буга погиб, и ты вместе с ним...<div>"
                        document.body.innerHTML+="<img src='files/pressf.gif'>"
                        document.body.style.fontSize='40px';
                }
            break//темный замок
            case 4://рассказал правду Мэл
                switch (story){
                    case 1:
                        zip()
                        p2.change("files/mel0.png")
                        p2.render()
                        print("...")
                    break
                    case 2:
                        print("Кто же ты?")
                    break
                    case 3:
                        zip()
                        p0.render()
                        print("Я... не знаю как сказать, но я не отсюда. Я как бы... попал сюда случайно")
                    break
                    case 4:
                        zip()
                        p2.change("files/mel1.png")
                        p2.render()
                        print("Как это случилось? Ты можешь рассказать мне подробнее?")
                    break
                    case 5:
                        zip()
                        p0.render()
                        print("Я совершенно без понятия! Я оказался на природе, потом пошёл по дыму костра и вот я здесь")
                    break
                    case 6:
                        
                        p0.render()
                        print("Мне кажется, что меня сюда отправил демон. Я не могу вернуться, пока не выполню его задание")
                    break
                    case 7:
                        zip()
                        p2.render()
                        print("Демон, говоришь? Ты совсем сошел с ума?")
                    break
                    case 8:
                        zip()
                        p0.render()
                        print("Я знаю, это звучит странно, однако я уверен в своих словах. И к сожалению я не знаю, как найти этого демона, чтобы узнать, что он хочет от меня")
                    break
                    case 9:
                        zip()
                        p2.render()
                        print("*Мэл задумалась и сказала* - Я знаю, где мы можем найти демона. В лесу есть место, где по легенде он обитает. Мы можем пойти туда и попытаться разобраться в этой ситуации")
                    break
                    case 10:
                        zip()
                        p0.render()
                        print("Давай пойдем туда! Может быть, мы найдем ответы на мои вопросы")
                    break
                    case 11:
                        zip()
                        p2.change("files/mel0.png")
                        p2.render()
                        print("*Мэл кивнула*")
                    break
                    case 12:
                        zip()
                        p0.render()
                        l8.render()
                        alert("Спустя долгое время пути по лесу вы наталкиваетесь на Замок...")
                        print("О, выглядит интересно")
                    break
                    case 13:
                        zip()
                        p2.render()
                        print("Чувствую там может быть что-то опасное")
                    break
                    case 14:
                        zip()
                        p0.render()
                        alert("Они продолжили свой путь к замку, волнуясь о том, что их ждет внутри.")
                        print("Вероятно придется постараться чтобы вернуться домой...")
                    break
                    case 15:
                        p0.render()
                        alert("Они вошли в замок и оказались в большом зале, где находился длинный стол и несколько стульев. В зале не было ни души.")
                        print("Здесь довольно пусто")
                    break
                    case 16:
                        p2.render()
                        zip()
                        print("Действительно, где же демон?")
                    break
                    case 17:
                        p1.render()
                        alert("Внезапно, из-за одного из стульев, начало подниматься существо, одетое в черную одежду. Это был демон.")
                        print("Добро пожаловать в мой замок. Рад, что вы смогли прийти.")
                    break
                    case 18:
                        p1.render()
                        print("Я знаю, что ты хочешь вернуться домой. И я могу помочь тебе. Но для этого, тебе нужно стать одним из моих стражей.")
                    break
                    case 19:
                        p0.render()
                        zip()
                        print("Но я просто хочу вернуться домой!")
                    break
                    case 20:
                        p1.render()
                        zip()
                        print("Чтож... я предлагаю тебе выбор...")
                    break
                    case 21:
                        p0.render()
                        zip()
                        print("?")
                    break
                    case 22:
                        p1.render()
                        zip()
                        print("Либо ты становишься стражем замка и сможешь попасть домой, либо продолжишь скитаться по миру.")
                    break
                    case 23:
                        p1.render()
                        print("Скитаться в поисках пути домой с очень малым шансом на успех")
                    break
                    case 24:
                        p2.render()
                        print("Нет! Ты должен остаться со мной! Мы обязательно найдём дорогу домой!")
                    break
                    case 25:
                        p0.render()
                        zip()
                        alert("Герой был в замешательстве и не знал, как поступить. С одной стороны, он хотел вернуться в свой мир, но с другой - он не хотел служить демону. ")
                        print("Божечки... какой выбор")
                    break
                    case 26:
                        ask("И что мы выберем? Стать стражем замка или продолжить путь в поисках пути домой?","стать стражем","продолжить путешествие",
                        ()=>{
                            print("я стану стражем...")
                        },
                        ()=>{
                            print("я Продолжу путь")
                            way = 6
                            story = 0
                            //todo Развилка на другую концовку
                        })
                    break
                    case 27:
                        p2.render()
                        zip()
                        print("Что... ")
                    break
                    case 28:
                        p0.render()
                        zip()
                        print("Я согласен стать стражем этого замка, но я не хочу причинять вред другим существам.")
                    break
                    case 29:
                        p1.render()
                        zip()
                        print("В твоих руках будет власть над судьбами других существ. Но я уверен, что ты будешь использовать ее мудро и справедливо.")
                    break
                    case 30:
                        p1.render()
                        print("И помни, твоя сила не должна тебя контролировать, ты должен ее контролировать.")
                    break
                    case 31:
                        p0.render()
                        zip()
                        print("Я понимаю. Я буду использовать свою силу только в тех случаях, когда это необходимо для защиты замка и его обитателей.")
                    break
                    case 32:
                        p1.render()
                        zip()
                        print("Отлично. И теперь, дай мне твою руку, чтобы я мог наделить тебя силой.")
                    break
                    case 33:
                        p0.render()
                        zip()
                        alert("(Демон берет руку героя и произносит некоторые заклинания. Герой начинает чувствовать, как в его теле происходят изменения.)")
                        print("Я чувствую, что моя сила увеличилась в несколько раз.")
                    break
                    case 34:
                        p1.render()
                        zip()
                        print("Это лишь начало твоей силы. Ты будешь удивлен тем, что сможешь сделать со временем.")
                    break
                    case 35:
                        p0.render()
                        zip()
                        ask("Однако Мэл... что же с ней?","Пусть живет в замке","Она должна быть свободна",()=>{
                            alert("Мэл осталась жить в замке, вы виделись каждый день")
                            print("Чтож, за то мы всегда можем пообщаться")
                        },
                        ()=>{
                            alert("Мэл покинула замок и вы больше никогда не виделись")
                            print("За то она свободна")
                        })
                        
                    break
                    case 36:
                        p1.render()
                        zip()
                        print("Пока я нахожусь в замке он не нуждается в защите, на это время ты можешь идти куда хочешь, в том числе в свой мир.")
                    break
                    case 37:
                        document.body.innerHTML="<div class='fon'>Концовка стража, теперь ты до конца жизни вынужден сторожить замок до конца своих дней. Однако живёшь ты вот уже 100, 200 лет, после 500 ты перестал считать, тело стареет очень медленно, ты переодически бываешь в своём мире, наблюдаешь развитие технологий, а сила твоя только растёт... Конец времён... ты пережил ядерную войну, пережил взрыв солнца... остался для тебя только тот мир, Мэл погибла миллионы лет назад, демон довольно весёлый чувак, но и тот мир уже давно загибается... <div>"
                        document.body.innerHTML+="<img src='files/wall1.jpg'>"
                        document.body.style.fontSize='25px';
                }
            break
            case 5://? Не взял корону
                switch (story){
                    case 0:
                        p0.render()
                        print("...")//не уверен показывает ли нулевой
                    break
                    case 1:
                        print("Я слышу его")
                    break
                    case 2:
                        p4.render()
                        alert("Перед тобой появляется демон, ты слышишь как угабуга убегает")
                        print("Братан, это твоя битва, я прикрою спину")
                    break
                    case 3:
                        p1.render()
                        print("Охохо, привет дружище")
                    break
                    case 4:
                        p1.change("what.png")
                        p1.render()
                        print("Ты что здесь забыл?! Одолеть меня вздумал?")
                    break
                    case 5:
                        // hp=3
                        // alert("внимание!!! Битва с боссом, пройти его можно только случайно так что не расстраивайся если не получится")
                        p1.change("meat.png")
                        p1.render()
                        print("Ты что здесь забыл?! Одолеть меня вздумал?")
                    break
                    case 6:
                    break
                    case 7:
                    break
                    case 8:
                    break
                    case 9:
                    break
                    case 10:
                    break
                    case 11:
                    break
                    case 12:
                    break
                    case 13:
                    break
                    case 14:
                    break
                    case 15:
                    break

            }
            break
            case 6://? Продолжил путь и не стал стражем
                switch (story){
                    case 0:
                        p0.render()
                        print("...")//не уверен показывает ли нулевой
                    break
                    case 1:
                        print("Я не знаю что придумать")
                    break
                    case 2:
                        p4.render()
                        alert("Перед тобой появляется демон, ты слышишь как угабуга убегает")
                        print("...")
                    break
                    case 3:
                        p1.render()
                        print("...")
                    break
                    case 4:
                        p1.change("what.png")
                        p1.render()
                        print("...")
                    break
                    case 5:
                        // hp=3
                        // alert("внимание!!! Битва с боссом, пройти его можно только случайно так что не расстраивайся если не получится")
                        p1.change("meat.png")
                        p1.render()
                        print("...")
                    break
                    case 6:
                    break
                    case 7:
                    break
                    case 8:
                    break
                    case 9:
                    break
                    case 10:
                    break
                    case 11:
                    break
                    case 12:
                    break
                    case 13:
                    break
                    case 14:
                    break
                    case 15:
                    break

            }
            break
    }
}
}