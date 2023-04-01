const app = new PIXI.Application({ backgroundAlpha: 0 });
document.body.appendChild(app.view);

// Create play button that can be used to trigger the video
const button = new PIXI.Graphics()
    .beginFill(0x0, 0.5)
    .drawRoundedRect(0, 0, 100, 100, 10)
    .endFill()
    .beginFill(0xffffff)
    .moveTo(36, 30)
    .lineTo(36, 70)
    .lineTo(70, 50);

// Position the button
button.x = (app.screen.width - button.width) / 2;
button.y = (app.screen.height - button.height) / 2;
// Enable interactivity on the button
button.interactive = true;
button.cursor = 'pointer';

// Add to the stage
app.stage.addChild(button);

// Listen for a click/tap event to start playing the video
// this is useful for some mobile platforms. For example:
// ios9 and under cannot render videos in PIXI without a
// polyfill - https://github.com/bfred-it/iphone-inline-video
// ios10 and above require a click/tap event to render videos
// that contain audio in PIXI. Videos with no audio track do
// not have this requirement
button.on('pointertap', onPlayVideo);


//? ------ ChatGPT Create note ------

// Создаем переменную для хранения счетчика очков
let score = 0;

// Создаем обработчик событий для нажатия клавиш
window.addEventListener("keydown", function(event) {
    // Проверяем, нажата ли клавиша со стрелкой влево
    if (event.keyCode === 37) {
      checkNoteCollision("left");
    }
    // Проверяем, нажата ли клавиша со стрелкой вниз
    else if (event.keyCode === 40) {
      checkNoteCollision("down");
    }
    // Проверяем, нажата ли клавиша со стрелкой вправо
    else if (event.keyCode === 39) {
      checkNoteCollision("right");
    }
  });



  function checkNoteCollision(key) {
    for (let i = 0; i < notesContainer.children.length; i++) {
      const note = notesContainer.children[i];
      if (note.y > app.renderer.height - 150 && note.y < app.renderer.height + 50) {
        if (key === "left" && note.x < app.renderer.width / 3) {
          notesContainer.removeChild(note);
          score += 10;
        } else if (key === "down" && note.x >= app.renderer.width / 3 && note.x < (2 * app.renderer.width) / 3) {
          notesContainer.removeChild(note);
          score += 10;
        } else if (key === "right" && note.x >= (2 * app.renderer.width) / 3) {
          notesContainer.removeChild(note);
          score += 10;
        }else{
          score -= 10;
        }
        updateScoreUI();
      }
    }
  }
//очевидно обновляем текст
  function updateScoreUI() {
    scoreText.text = "Score: " + score;
  }


// Создаем новый контейнер для нот
const notesContainer = new PIXI.Container();

let scoreText = new PIXI.Text("Score: 0", {
    fontSize: 36,
    fill: "white",
    fontWeight: "bold",
    stroke: "black",
    strokeThickness: 5,
  });
scoreText.x = 10;
scoreText.y = 10;




// Создаем функцию для создания новых нот
function createNote(position) {
  
  // Создаем новый спрайт с изображением ноты
  const note = new PIXI.Sprite(PIXI.Texture.from("note1.png"));
  // Устанавливаем начальные координаты для ноты
  note.x = 120 + position * app.renderer.width / 3;
  note.y = -50;
  // Устанавливаем скорость падения ноты
  note.speed = 5;
  // Добавляем ноту в контейнер
  notesContainer.addChild(note);
}
//? random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);

}


// Обновляем координаты нот на каждом кадре
function updateNotes() {
  for (let i = 0; i < notesContainer.children.length; i++) {
    const note = notesContainer.children[i];
    // Увеличиваем координаты ноты по вертикали в соответствии со скоростью
    note.y += note.speed;
    // Если нота выходит за пределы экрана, удаляем ее из контейнера
    if (note.y > app.renderer.height + 50) {
      notesContainer.removeChild(note);
    }
  }
}
function scheduleNotes(notesData) {
  notesData.forEach((data) => {
    setTimeout(() => createNote(data.position), Math.round(data.time/10)*10);
  });
}

function createArrowSprites() {
  const scale = 0.1; // Обновите эти значения для значений размеров вашей стрелки
  const verticalPosition = app.renderer.height - 100;
  
  const leftArrowTexture = PIXI.Texture.from("img/left_arrow.png");
  const leftArrowSprite = new PIXI.Sprite(leftArrowTexture);
  
  leftArrowSprite.anchor.set(0.5, 0);
  leftArrowSprite.position.set(app.renderer.width / 6, verticalPosition);
  
  const downArrowTexture = PIXI.Texture.from("img/down_arrow.png");
  const downArrowSprite = new PIXI.Sprite(downArrowTexture);
  
  downArrowSprite.anchor.set(0.5, 0);
  downArrowSprite.position.set(app.renderer.width / 2, verticalPosition);

  const rightArrowTexture = PIXI.Texture.from("img/right_arrow.png");
  const rightArrowSprite = new PIXI.Sprite(rightArrowTexture);
  
  rightArrowSprite.anchor.set(0.5, 0);
  rightArrowSprite.position.set((5 * app.renderer.width) / 6, verticalPosition);

  // Добавляем стрелочки на сцену
  app.stage.addChild(leftArrowSprite, downArrowSprite, rightArrowSprite);
  leftArrowSprite.scale.set(scale)
  downArrowSprite.scale.set(scale)
  rightArrowSprite.scale.set(scale)
}

function onPlayVideo() {
  
  // Don't need the button anymore
  button.destroy();

  // create a video texture from a path
  const texture = PIXI.Texture.from('videos/Joker.mp4');

  // create a new Sprite using the video texture (yes it's that easy)
  const videoSprite = new PIXI.Sprite(texture);

  // Stetch the fullscreen
  videoSprite.width = app.screen.width;
  videoSprite.height = app.screen.height;


  app.stage.addChild(videoSprite);

  //А теперь музон
  const audioPlayer = new Audio("Dzhoker.mp3");
  setTimeout(()=>{audioPlayer.play();},4190)

  // Создаем прямоугольники для клика на ноту
  let leftClickArea = new PIXI.Graphics();
  leftClickArea.beginFill(0x0000ff, 0.2);
  leftClickArea.drawRect(0, app.renderer.height - 80, app.renderer.width / 3, 50);
  app.stage.addChild(leftClickArea);

  let downClickArea = new PIXI.Graphics();
  downClickArea.beginFill(0x00ff00, 0.2);
  downClickArea.drawRect(app.renderer.width / 3, app.renderer.height - 80, app.renderer.width / 3, 50);
  app.stage.addChild(downClickArea);

  let rightClickArea = new PIXI.Graphics();
  rightClickArea.beginFill(0xff0000, 0.2);
  rightClickArea.drawRect((2 * app.renderer.width) / 3, app.renderer.height - 80, app.renderer.width / 3, 50);
  
  app.stage.addChild(rightClickArea);
  //стрелочки
  createArrowSprites()
  //Счёт очков
  app.stage.addChild(scoreText);
  //контейнер для нот
  app.stage.addChild(notesContainer); 
  // Подгружаем Ноты (ChatGPT)
  fetch("notes.json")
  .then((response) => response.json())
  .then((jsonData) => scheduleNotes(jsonData));
  // ? Создаем таймер для создания новых нот
  //// setInterval(createNote, 1000);
  // Добавляем функцию обновления в цикл игры
  app.ticker.add(updateNotes);
}
