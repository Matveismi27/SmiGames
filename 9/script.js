const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
//нарисуем сетку
let width = canvas.width-10
let height = canvas.height-10
// alert(width+" : "+height)
let grid_rows = 20
let grid_columns = 20
let pole = [[]]
let row = [[]]
let bold = 4
tictac = "x"
function drawGrid(){
    for (i=0;i<=grid_columns;i+=1){
        ctx.fillRect(width/grid_columns*i,0              ,bold,height)
        row[i]=0
    }
    for (i=0;i<=grid_rows;i+=1){
        ctx.fillRect(0                   ,height/grid_rows*i,width+bold,bold)
        pole[i]=[]
        for (j in row){
            pole[i][j]=row[j]
        }
    }
}
drawGrid()
function click(x,y){// функция производит необходимые действие при клике(касанию)
    console.log(pole)
    if (y>grid_rows||x>grid_columns||pole[y][x]!=0){
        return
    }
    console.log("клик на "+x+":"+y)
    if (tictac == "x"){
        pole[y][x] = 1; tictac = "o"
    }
    else{
        pole[y][x] = 2; tictac = "x"
    }
    draw()
}
canvas.onclick = function(e) { // обрабатываем клики мышью
    var x = (e.pageX - canvas.offsetLeft) / (width/grid_columns) | 0;//находит КЛЕТКУ!
    var y = (e.pageY - canvas.offsetTop)  / (height/grid_rows) | 0;
    click(x, y); // выхов функции действия
};

function draw(){
    i=0
    j=0
    while (j<grid_rows){
        while (i<grid_columns){
            if (pole[j][i]==0){
                ctx.fillStyle = "#ddd"
            }else if (pole[j][i]==1){
                ctx.fillStyle = "#900"
            }else if (pole[j][i]==2){
                ctx.fillStyle = "#009"
            }
            ctx.fillRect(i*(width/grid_columns)+bold,j*(height/grid_rows)+bold,width/grid_columns-bold,height/grid_rows-bold)
            i+=1
        }
        i=0
        j+=1
    }
}
draw()