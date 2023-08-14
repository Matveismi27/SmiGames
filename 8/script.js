const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
//нарисуем сетку
let width = canvas.width-10
let height = canvas.height-10
// alert(width+" : "+height)
let pole = [[0,0,0],
            [0,0,0],    
            [0,0,0]]
let bold = 5
tictac = "x"
ctx.fillRect(0        ,0          ,bold,height)
ctx.fillRect(0        ,0          ,width,bold)
ctx.fillRect(width/3  ,0          ,bold,height)
ctx.fillRect(width/3*2,0          ,bold,height)
ctx.fillRect(width    ,0          ,bold,height)
ctx.fillRect(0        ,height/3   ,width,bold)
ctx.fillRect(0        ,height/3*2 ,width,bold)
ctx.fillRect(0        ,height     ,width+bold,bold)

function click(x,y){// функция производит необходимые действие при клике(касанию)
    // alert(x+":"+y)
    // alert(pole[x][y])
    if (y>2||x>2||pole[y][x]!=0){
        return
    }
    if (tictac == "x"){
        pole[y][x] = 1; tictac = "o"
    }
    else{
        pole[y][x] = 2; tictac = "x"
    }
    draw()
}
canvas.onclick = function(e) { // обрабатываем клики мышью
    var x = (e.pageX - canvas.offsetLeft) / (width/3) | 0;//находит КЛЕТКУ!
    var y = (e.pageY - canvas.offsetTop)  / (height/3) | 0;
    click(x, y); // выхов функции действия
};

function draw(){
    i=0
    j=0
    while (j<3){
        while (i<3){
            if (pole[i][j]==0){
                ctx.fillStyle = "#ddd"
            }else if (pole[i][j]==1){
                ctx.fillStyle = "#900"
            }else if (pole[i][j]==2){
                ctx.fillStyle = "#009"
            }
            ctx.fillRect(j*(width/3)+bold,i*(width/3)+bold,width/3-bold,height/3-bold)
            i+=1
        }
        i=0
        j+=1
    }
}
draw()