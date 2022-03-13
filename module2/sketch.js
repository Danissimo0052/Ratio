let grid;
let grid_new;
let score = 0;

function setup() {
  createCanvas(400, 400);
  
  noLoop();
  grid = blankGrid();
  grid_new = blankGrid();
  addNumber();
  addNumber();
  updateCanvas();
}



// Вешаем на прикосновение функцию handleTouchStart
document.addEventListener('touchstart', handleTouchStart, false);  
// А на движение пальцем по экрану - handleTouchMove      
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    let flipped = false;
    let rotated = false;
    let played = true;
    
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            //свайп влево 
            grid = transposeGrid(grid);
            grid = flipGrid(grid);
            rotated = true;
            flipped = true;
        } else {
          grid = transposeGrid(grid);
          rotated = true;
          //свайп вправо
        }                       
    } else { 
        if ( yDiff > 0 ) {
          //свайп вверх
          grid = flipGrid(grid);
          flipped = true;
        } else { 
          //свайп вниз
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;   
    
    if (played) {
      let past = copyGrid(grid);
      for (let i = 0; i < 4; i++) {
        grid[i] = operate(grid[i]);
      }
      let changed = compare(past, grid);
      if (flipped) {
        grid = flipGrid(grid);
      }
      if (rotated) {
        grid = transposeGrid(grid);
      }
      if (changed) {
        addNumber();
      }
      updateCanvas();
  
      let gameover = isGameOver();
      if (gameover) {
        alert('GAME OVER');
      }
  
      let gamewon = isGameWon();
      if (gamewon) {
        alert('GAME WON');
      }
    }
};



// One "move"
function keyPressed() {
  let flipped = false;
  let rotated = false;
  let played = true;
  switch (keyCode) {
    case DOWN_ARROW:
      // do nothing
      
      break;    
    case UP_ARROW:
      grid = flipGrid(grid);
      flipped = true;
      break;
    case RIGHT_ARROW:
      grid = transposeGrid(grid);
      rotated = true;
      break;
    case LEFT_ARROW:
      grid = transposeGrid(grid);
      grid = flipGrid(grid);
      rotated = true;
      flipped = true;
      break;
    default:
      played = false;
  }

  if (played) {
    let past = copyGrid(grid);
    for (let i = 0; i < 4; i++) {
      grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);
    if (flipped) {
      grid = flipGrid(grid);
    }
    if (rotated) {
      grid = transposeGrid(grid);
    }
    if (changed) {
      addNumber();
    }
    updateCanvas();

    let gameover = isGameOver();
    if (gameover) {
      alert('GAME OVER');
    }

    let gamewon = isGameWon();
    if (gamewon) {
      alert('GAME WON');
    }
  }
}

function updateCanvas() {
  background(205,193,180);
  drawGrid();
  select('#score').html(score);
}

function drawGrid() {
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noFill();
      strokeWeight(2);
      let val = grid[i][j];
      let s = val.toString();
      if (grid_new[i][j] === 1) {
        stroke(255, 204, 0);
        strokeWeight(10);
        grid_new[i][j] = 0;
      } else {
        strokeWeight(8);
        stroke(187,173,160);
      }

      if (val != 0) {
        fill(colorsSizes[s].color);
      } else {
        noFill();
      }
      rect(i * w, j * w, w, w, 12);
      if (val !== 0) {
        textAlign(CENTER, CENTER);
        noStroke();
        fill(40);
        textSize(colorsSizes[s].size);
        text(val, i * w + w / 2, j * w + w / 2);
        
      }
    }
  }
}


