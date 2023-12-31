//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
let setIntervalId;
let score = 0;

//sound
var sound = document.getElementById("bite");
var diedsound = document.getElementById("die");

const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")

const greenbtn = document.querySelector("#green")
const bluebtn = document.querySelector("#blue")
const purplebtn = document.querySelector("#purple")

// getting the high score
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

//snake head
var snakeX = blockSize * 5; 
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];
 
//food
var foodX;
var foodY;

//game over
var gameOver = false;

//snake color
var snakeColor = "lime";

window.onload = function(){
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols* blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  
  setInterval(update, 1000/10);
}  

function update(){
  if (gameOver){
    return;
  }

  //board color and size
  context.fillStyle ="#322d31";
  context.fillRect(0, 0, board.width, board.height);

  // food color and size
  context.fillStyle="#960018";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY){
    snakeBody.push([foodX, foodY])
    placeFood();
    score++;
    sound.play();

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
  }

  for ( let i = snakeBody.length-1; i > 0; i--){
    snakeBody[i] = snakeBody[i-1];
  }
  if ( snakeBody.length){
    snakeBody[0] = [snakeX, snakeY]
  }

  context.fillStyle=snakeColor;
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++){
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }


  //game over conditions
  if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
    gameOver = true;
    diedsound.play();
  }

  for ( let i = 0; i < snakeBody.length; i++){
    if ( snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
      gameOver = true;
    }
  }

  if ( gameOver === true){
    clearInterval(setIntervalId);
    alert("Game Over... press OK to retry");
    location.reload();
  }

}

function changeDirection(s){
  if(s.code == "ArrowUp" && velocityY != 1){
    velocityX = 0;
    velocityY = -1;
  }
  else if(s.code == "ArrowDown" && velocityY != -1){
    velocityX = 0;
    velocityY = 1;
  }
  else if(s.code == "ArrowLeft" && velocityX != 1){
    velocityX = -1;
    velocityY = 0;
  }
  else if (s.code == "ArrowRight" && velocityX != -1){
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood(){
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

//trying to get the color btns to work
bluebtn.addEventListener("click", bluecol)
purplebtn.addEventListener("click", pinkcol)
greenbtn.addEventListener("click", greencol)

function bluecol(){
  snakeColor= "blue";
  context.fillStyle=snakeColor;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
}

function pinkcol(){
  snakeColor= "#f013f0";
  context.fillStyle=snakeColor;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
}

function greencol(){
  snakeColor= "lime";
  context.fillStyle=snakeColor;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
}