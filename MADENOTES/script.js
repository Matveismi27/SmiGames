const startTime = Date.now();
const notes = [];
const audioPlayer = new Audio("Dzhoker.mp3");

class noteindicator{
    constructor(){
        this.indic=0
        this.color="#000"
    }
}

audioPlayer.play().then(() => {
  // Аудио воспроизводится успешно, можно выполнять дополнительные действия
}).catch((error) => {
  // Ошибка при воспроизведении аудио, необходимо обработать ошибку
  alert("разблокируй воспроизведение (обычно слева в адресной строке)")
  console.error("Ошибка воспроизведения аудио:", error);
});


function onKeyDown(e) {
  const currentTime = Date.now() - startTime;
  let position;
  let indicator;

  switch (e.code) {
    case "ArrowLeft":
      position = 0;
      indicator = document.getElementById("indicatorLeft");
      indicator.style.backgroundColor = "#199"
      setTimeout(() => {
        resetIndicator(`indicatorLeft`); // position - это значение позиции стрелочки
      }, 1000); // Время в миллисекундах, через которое индикаторы должны выключиться
      break;
    case "ArrowDown":
      position = 1;
      indicator = document.getElementById("indicatorDown");
      indicator.style.backgroundColor = "#919"
      setTimeout(() => {
        resetIndicator(`indicatorDown`); // position - это значение позиции стрелочки
      }, 1000); // Время в миллисекундах, через которое индикаторы должны выключиться
      break;
    case "ArrowRight":
      position = 2;
      indicator = document.getElementById("indicatorRight");
      indicator.style.backgroundColor = "#991"
      setTimeout(() => {
        resetIndicator(`indicatorRight`); // position - это значение позиции стрелочки
      }, 1000); // Время в миллисекундах, через которое индикаторы должны выключиться
      break;
      
    
    default:
      return; // Don't handle other keys
  }

  notes.push({ time: currentTime, position: position });
  indicator.classList.add("active"); // добавляем класс "active" к индикатору

  // Добавляем setTimeout(), чтобы снять состояние "active" с индикатора через определенное время
  
  
}

// Функция для снятия состояния "active" с индикатора
function resetIndicator(indicatorId) {
  let indicatorr = document.getElementById(indicatorId);
  indicatorr.style.backgroundColor="#000";
}

function exportJSON() {
  const jsonStr = JSON.stringify(notes, null, 2);
  const dataUri = "data:text/json;charset=utf-8," + encodeURIComponent(jsonStr);
  const link = document.createElement("a");
  link.setAttribute("href", dataUri);
  link.setAttribute("download", "notes.json");
  link.click();
}

document.addEventListener("keydown", onKeyDown);
document.getElementById("exportBtn").addEventListener("click", exportJSON);
