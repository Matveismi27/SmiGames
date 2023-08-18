const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
//нарисуем сетку
let width = canvas.width
let height = canvas.height
// alert(width+" : "+height)
let grid_rows = 7
let grid_columns = 13
let pole = [[]]
let row = [[]]
let bold = 2
tictac = "x"
function FirstDrawGrid(){
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
function drawGrid(){
    for (i=0;i<=grid_columns;i+=1){
        ctx.fillRect(width/grid_columns*i,0              ,bold,height)
    }
    for (i=0;i<=grid_rows;i+=1){
        ctx.fillRect(0                   ,height/grid_rows*i,width+bold,bold)
    }
}

function drawGridRect(x1,y1,x2,y2,text){
    for (i=x1;i<x2;i++){
        for(j=y1;j<y2;j++){
            pole[i][j]=text
        }
    }
}
FirstDrawGrid()
drawGridRect(1,1,6,6,1)
pole[1][1]=2
function click(x,y){// функция производит необходимые действие при клике(касанию)
    console.log(pole)
    if (y>grid_rows||x>grid_columns||pole[y][x]==0){
        return
    }
    console.log("клик на "+x+":"+y)
    player=find(2)
    pole[player.row][player.col]=1
    pole[y][x]=2
    draw()
    drawGrid()
}
canvas.onclick = function(e) { // обрабатываем клики мышью
    var x = (e.pageX - canvas.offsetLeft) / (width/grid_columns) | 0;//находит КЛЕТКУ!
    var y = (e.pageY - canvas.offsetTop)  / (height/grid_rows) | 0;
    click(x, y); // выхов функции действия
};

function find(text){
    for (i in pole){
        for (j in pole[i]){
            if (pole[i][j] == text){
                return {row:i,col:j}
            }
        }
    }
}

function draw(){
    i=0
    j=0
    while (j<grid_rows){
        while (i<grid_columns){
            if (pole[j][i]==0){
                ctx.fillStyle = "#000"
            }else if (pole[j][i]==1){
                ctx.fillStyle = "#fff"
            }else if (pole[j][i]==2){
                ctx.fillStyle = "#999"
            }
            ctx.fillRect(i*(width/grid_columns)+bold,j*(height/grid_rows)+bold,width/grid_columns,height/grid_rows)
            i+=1
        }
        i=0
        j+=1
    }
}
draw()
drawGrid()
