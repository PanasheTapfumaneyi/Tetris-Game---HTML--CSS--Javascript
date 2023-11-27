document.addEventListener('DOMContentLoaded',() => {
    const gameboard = document.querySelector('.game-board')
    let squares = Array.from(document.querySelectorAll('.game-board div'))
    const width = 10
    const Score = document.getElementById('score')
    const StartPauseBtn = document.getElementById('start-pause-button')
    let randomNextTetromino = 0
    

    //Tetrominos

const  lTetromino = [
    [0, width, width*2, 1],
    [0,1,2,width+2],
    [1, width+1, width*2+1, width*2],
    [0, width, width+1, width+2]
]

const zTetromino = [
    [width, width+1, 1, 2],
    [1, width+1, width+2, width*2+2],
    [1, 2, width, width+1],
    [1, width+1, width+2, width*2+2]
]

const iTetromino = [
    [1,width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1,width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
]

const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width*2+1, width+2],
    [0, 1, 2, width+1],
    [1, width+1, width*2+1, width]
]

const oTetromino = [
    [0, width, 1, width+1],
    [0, width, 1, width+1],
    [0, width, 1, width+1],
    [0, width, 1, width+1]

]

  const tetrominoObjects = [lTetromino, oTetromino, iTetromino, tTetromino, zTetromino]

  let currentPosition = 4
  let currentRotation = 0

//Select random tetromino
let randomTetromino = Math.floor(Math.random()*tetrominoObjects.length)
  let current = tetrominoObjects[randomTetromino] [currentRotation]


//Drawing the tetrominos
function createTetromino() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetrominos')
    })
}

createTetromino()

//Remove tetrominos
function removeTetromino() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetrominos')
    })
}

// Listening for key presses 
// function control(e){
//     if(e.keyCode === 37){
//         e.preventDefault()
//         moveTetrominoLeft()
//     }
//     else if(e.keyCode === 39){
//         e.preventDefault()
//         moveTetrominoRight()
//     }
//     else if(e.keyCode === 40){
//         e.preventDefault()
//         moveDown()
//     }
//     else if(e.keyCode === 38){
//         e.preventDefault()
//         rotateTetromino()
//     }
// }

// document.addEventListener('keyup', control)

document.addEventListener('keydown', (e) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault(); // Prevent default action for arrow keys
    }

    if (e.key === 'ArrowLeft') {
        moveTetrominoLeft();
    } else if (e.key === 'ArrowRight') {
        moveTetrominoRight();
    } else if (e.key === 'ArrowDown') {
        moveDown();
    } else if (e.key === 'ArrowUp') {
        rotateTetromino();
    }
});

//Making the tetrominos move down

timer = setInterval(moveDown, 1000)



//Function to make tetrominos move down

function moveDown() {
    removeTetromino()
    currentPosition += width
    createTetromino()
    freeze()
}

function freeze(){
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //Spawn new tetromino
        randomTetromino = randomNextTetromino
        randomNextTetromino = Math.floor(Math.random() * tetrominoObjects.length)
        current = tetrominoObjects[randomTetromino] [currentRotation]
        currentPosition = 4
        createTetromino()
        showTetromino()
    }
}




//Move tetromino left until it hits wall
function moveTetrominoLeft() {
    removeTetromino()
    const leftWall = current.some(index => (currentPosition + index) % width === 0)
    if(!leftWall) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition +=1
    }
    createTetromino()
}

// Move tetromino right until it hits wall

function moveTetrominoRight() {
    removeTetromino()
    const rightWall = current.some(index => (currentPosition + index) % width === width -1)
    if(!rightWall) currentPosition +=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }
    createTetromino()
  }

 //Rotate tetromino

 function rotateTetromino(){
    removeTetromino()
    currentRotation ++
    if(currentRotation === current.length) {
        currentRotation = 0
    }
    current = tetrominoObjects[randomTetromino][currentRotation]
    createTetromino();
 }

 //Show next tetromino in next box

 const displaySquares = document.querySelectorAll('.next-grid div');
 const displayWidth = 4;
 let displayIndex = 0

 //Displaying tetrominos

 const nextTetromino = [
    [2,3,7,12], //lTetromino
    [6,7,12,13], //zTetromino
    [7,11,12,13], //tTetromino
    [7,8,12,13], //oTetromino
    [10,11,12,13], //iTetromino

 ]

// Function to display the next tetromino
function showTetromino() {
    displaySquares.forEach(square => {
        square.classList.remove('tetrominos'); // Clear previous tetromino shapes
    });
    nextTetromino[randomNextTetromino].forEach(index => {
        displaySquares[displayIndex + index].classList.add('tetrominos'); // Add tetromino shape to corresponding divs
    });
}









} );

