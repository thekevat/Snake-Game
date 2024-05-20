//Game Constants
let direction = { x: 0, y: 0 };
const foodSound = new Audio("sounds/foodsound.mp3");
const gameover = new Audio("sounds/gameover.mp3");
const bgm = new Audio("sounds/bgm.mp3");
const moveSound = new Audio("sounds/move.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 8, y: 5 };

//Game fucntions

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(sarr) {
  //if you bump into yourself
  for (let i = 1; i < sarr.length; i++) {
    if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
      return true;
    }
  }
  if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
    return true;
  }
  return false;
}

function gameEngine() {
  //Part 1-> It will update the snake array and food;
  if (isCollide(snakeArr)) {
    gameover.currentTime = 0;

  
      gameover.play();
   
    bgm.pause();

    inputDir = { x: 0, y: 0 };

    alert("Game Over.Press Any key to Play again");
    gameover.pause();
    snakeArr = [{ x: 13, y: 15 }];
    bgm.addEventListener("ended", () => {
      bgm.currentTime = 0;
    });
    bgm.play();
    score = 0;
    document.getElementById("score").innerHTML = "Score : " + score;
  }
  //If you have eaten a food, we will increment the length of snake and regenerate the food;
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    score += 1;
    document.getElementById("score").innerHTML = "Score : " + score;
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  //Moving the Snake

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //Part 2-> it will display the snake array and food;
  //Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start the game
  moveSound.play();
  bgm.play();
  bgm.addEventListener("ended", () => {
    bgm.currentTime = 0;
    bgm.play();
  });

  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
