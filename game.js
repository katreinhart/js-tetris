const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
const widthInBricks = 12;
const heightInBricks = 20;
const margin = 10;
const brickSize = 25;

const keyNames = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  32: "space"
};

const blocks = ["sq", "ls", "rs", "ll", "rl", "t", "i"];
const orientations = [0, 1, 2, 3];

const Block = function(type) {
  this.type = type;
  this.xPos = 6;
  this.yPos = 0;
  this.orientation = 0;
  this.active = true;

  this.components = new Array(4);
  switch(type) {
    case "sq":
      this.lineColor = "OrangeRed";
      this.fillColor = "Orange"
      break;
    case "ls":
      this.lineColor = "Blue";
      this.fillColor = "DodgerBlue";
      break;
    case "rs":
      this.lineColor = "Green";
      this.fillColor = "LimeGreen";
      break;
    case "ll":
      this.lineColor = "GoldenRod";
      this.fillColor = "Yellow";
      break;
    case "rl":
      this.lineColor = "Purple";
      this.fillColor = "MediumPurple";
      break;
    case "t":
      this.lineColor = "Gray";
      this.fillColor = "LightGray"
      break;
    case "i":
      this.lineColor = "FireBrick";
      this.fillColor = "OrangeRed"
      break;
    default:
      break;
  }
  this.update();

}

Block.prototype.update = function() {

  switch(this.type) {
    case "sq":
      this.components[0] = [this.xPos, this.yPos];
      this.components[1] = [this.xPos + 1, this.yPos];
      this.components[2] = [this.xPos, this.yPos + 1];
      this.components[3] = [this.xPos + 1, this.yPos + 1];
    break;

    case "ls":
      if((this.orientation === 0) || (this.orientation === 2)){
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos+1, this.yPos];
        this.components[2] = [this.xPos+1, this.yPos+1];
        this.components[3] = [this.xPos+2, this.yPos+1];
      } else {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos-1, this.yPos+1];
        this.components[3] = [this.xPos-1, this.yPos+2];
      }
    break;

    case "rs":
      if((this.orientation === 0) || (this.orientation === 2)){
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos+1, this.yPos];
        this.components[2] = [this.xPos, this.yPos+1];
        this.components[3] = [this.xPos-1, this.yPos+1];
      } else {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos+1, this.yPos+1];
        this.components[3] = [this.xPos+1, this.yPos+2];
      }
    break;

    case "ll":
      if(this.orientation === 0) {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+2];
        this.components[3] = [this.xPos+1, this.yPos+2];
      } else if (this.orientation === 1) {
        this.components[0] = [this.xPos-1, this.yPos];
        this.components[1] = [this.xPos, this.yPos];
        this.components[2] = [this.xPos+1, this.yPos];
        this.components[3] = [this.xPos-1, this.yPos+1];
      } else if (this.orientation === 2) {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos+1, this.yPos];
        this.components[2] = [this.xPos+1, this.yPos+1];
        this.components[3] = [this.xPos+1, this.yPos+2];
      } else {
        this.components[0] = [this.xPos+1, this.yPos];
        this.components[1] = [this.xPos+1, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+1];
        this.components[3] = [this.xPos-1, this.yPos+1];
      }
    break;

    case "rl":
      if(this.orientation === 0) {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+2];
        this.components[3] = [this.xPos-1, this.yPos+2];
      } else if (this.orientation === 1) {
        this.components[0] = [this.xPos-1, this.yPos];
        this.components[1] = [this.xPos-1, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+1];
        this.components[3] = [this.xPos+1, this.yPos+1];
      } else if (this.orientation === 2) {
        this.components[0] = [this.xPos+1, this.yPos];
        this.components[1] = [this.xPos, this.yPos];
        this.components[2] = [this.xPos, this.yPos+1];
        this.components[3] = [this.xPos, this.yPos+2];
      } else {
        this.components[0] = [this.xPos-1, this.yPos];
        this.components[1] = [this.xPos, this.yPos];
        this.components[2] = [this.xPos+1, this.yPos];
        this.components[3] = [this.xPos+1, this.yPos+1];
      }
    break;

    case "t":
      if(this.orientation === 0) {
        this.components[0] = [this.xPos-1, this.yPos];
        this.components[1] = [this.xPos, this.yPos];
        this.components[2] = [this.xPos+1, this.yPos];
        this.components[3] = [this.xPos, this.yPos+1];
      } else if (this.orientation === 1) {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+2];
        this.components[3] = [this.xPos+1, this.yPos+1];
      } else if (this.orientation === 2) {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos-1, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+1];
        this.components[3] = [this.xPos+1, this.yPos+1];
      } else if (this.orientation === 3) {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+2];
        this.components[3] = [this.xPos-1, this.yPos+1];
      }
    break;

    case "i":
      if((this.orientation === 0) || (this.orientation === 2)){
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos, this.yPos+1];
        this.components[2] = [this.xPos, this.yPos+2];
        this.components[3] = [this.xPos, this.yPos+3];
      } else {
        this.components[0] = [this.xPos, this.yPos];
        this.components[1] = [this.xPos+1, this.yPos];
        this.components[2] = [this.xPos+2, this.yPos];
        this.components[3] = [this.xPos+3, this.yPos];
      }
    break;
    default: break;
  }
}

const drawBrick = function(lineColor, fillColor, xPos, yPos) {
  ctx.strokeStyle = lineColor;
  ctx.strokeRect(xPos * brickSize + margin, yPos * brickSize + margin, brickSize, brickSize);
  ctx.fillStyle = fillColor;
  ctx.fillRect(xPos * brickSize + margin, yPos * brickSize + margin, brickSize, brickSize);
}

Block.prototype.display = function() {
  for(let i=0; i<4; i++) {
    drawBrick(this.lineColor, this.fillColor, this.components[i][0], this.components[i][1]);
  }
}

Block.prototype.move = function(dir) {
  if(dir === "left"){
    for(let i=0; i<4; i++){
      let x = this.components[i][0];
      let y = this.components[i][1];
      if((x === 0) || (gameBoard.board[y][x-1] !== 0)) {
        return;
      }
    }
    this.xPos --;
    this.update();
  } else if (dir === "right") {
    for(let i=0; i<4; i++) {
      let x = this.components[i][0];
      let y = this.components[i][1];
      if((this.components[i][0] > widthInBricks) ||
         (gameBoard.board[y][x+1] !== 0)) {
        return;
      }
    }
    this.xPos ++;
    this.update();
  } else if(dir === "up") {
    // I haven't figured out how to (easily) prevent rotating into an existing block... bug.
    this.rotate();
    this.update();
  } else if (dir === "down")  {
    this.moveDown();
  } else if (dir === "space") {
    this.drop();
  }
}

Block.prototype.rotate = function() {
  this.orientation++;
  if(this.orientation > 3) this.orientation -= 4;
}

Block.prototype.moveDown = function() {
  // check to see if anything is hindering downward movement...
  // the bottom of the screen or an existing block
  for(let i=0; i<4; i++) {
    let x = this.components[i][0];
    let y = this.components[i][1];
    if((this.components[i][1] === heightInBricks - 1) ||
       (gameBoard.board[y+1][x]) !== 0){
      this.active = false;
      gameBoard.add(this);
      return;
    }
  }
  this.yPos++;
  this.update();
}

Block.prototype.drop = function() {
  while(this.active) {
    this.moveDown();
  }
}

const GameBoard = function() {
  this.board = new Array(heightInBricks);
  for(let i=0; i<heightInBricks; i++) {
    this.board[i] = new Array(widthInBricks);
    for(let j=0; j<widthInBricks; j++) {
      this.board[i][j] = 0;
    }
  }

  this.score = 0;
  this.level = 1;
  this.timer = 300;
}

GameBoard.prototype.add = function(block) {
  for(let i=0; i<4; i++) {
    let x = block.components[i][0];
    let y = block.components[i][1];
    this.board[y][x] = [block.lineColor, block.fillColor];
  }
}

GameBoard.prototype.draw = function() {
  for(let i=0; i<heightInBricks; i++) {
    for (let j=0; j<widthInBricks; j++) {
      if(this.board[i][j] !== 0) {
        drawBrick(this.board[i][j][0], this.board[i][j][1], j, i);
      }
    }
  }
}

GameBoard.prototype.checkLine = function() {
  for(let i=heightInBricks - 1; i>0; i--) {
    let flag = true;
    for(let j=0; j<widthInBricks; j++) {
      if(this.board[i][j] === 0) {
        flag = false;
      }
    }
    if(flag) {
      this.removeRow(i);
      this.updateScore();
    }
  }
}

GameBoard.prototype.updateScore = function() {
  this.score ++;
  if(this.score % 10 === 0) {
    this.level ++;
    this.timer -= 25;
    clearInterval(blockTimer);
    blockTimer = setInterval(() => {
      gameBoard.update();
    }, this.timer);
  }
}

GameBoard.prototype.removeRow = function(row) {
  for(let i=row; i>0; i--) {
    this.board[i] = this.board[i-1];
  }
  this.board[0] = new Array(widthInBricks);
  for(let j=0; j<widthInBricks; j++){
    this.board[0][j] = 0;
  }
}

GameBoard.prototype.update = function() {
  activeBlock.moveDown();
  this.drawScreen();
  this.checkLine();
  activeBlock.update();
  activeBlock.display();
  if(!activeBlock.active) {
    // make a new active block
    rand = Math.floor(Math.random() * 7);
    activeBlock = new Block(blocks[rand]);
    this.draw();
  }

  if(this.board[0][6] !== 0) {
    // the board is full, so the game is over
    this.gameOver();
  }
}

GameBoard.prototype.gameOver = function() {
  clearInterval(blockTimer);
  activeBlock = null;
  ctx.fillStyle="White";
  ctx.fillRect(margin, heightInBricks * brickSize + 2*margin, 300, 100);
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Game Over", 3*margin, heightInBricks * brickSize + 4*margin);
  ctx.fillText("Final score: " + this.score, 3*margin, heightInBricks * brickSize + 8*margin);
}

GameBoard.prototype.displayScore = function() {
  ctx.fillStyle="White";
  ctx.fillRect(margin, heightInBricks * brickSize + 2*margin, 300, 100);
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Lines: " + this.score, 3*margin, heightInBricks * brickSize + 4*margin);
  ctx.fillText("Level: " + this.level, 3*margin, heightInBricks * brickSize + 8*margin)
}

GameBoard.prototype.drawScreen = function() {
  ctx.fillStyle = "White";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "DarkGrey";
  ctx.strokeRect(0, 0, width, height);
  ctx.strokeRect(margin, margin, width-2*margin, heightInBricks * brickSize);

  this.draw();
  this.displayScore();
}

const gameBoard = new GameBoard();

gameBoard.drawScreen();
let rand = Math.floor(Math.random() * 7);
let activeBlock = new Block(blocks[rand]);

activeBlock.display();

// Main Game Timer
let blockTimer = setInterval(() => {
  gameBoard.update();
}, gameBoard.timer);

// listen for key press to rotate or move block
$("body").keydown((e) => {
  if(activeBlock) {
    activeBlock.move(keyNames[e.keyCode]);
    gameBoard.drawScreen();
    activeBlock.display();
  }
});
