document.addEventListener('DOMContentLoaded',() => {
    const gameboard = document.querySelector('.game-board')
    let squares = Array.from(document.querySelectorAll('.game-board div'))
    const width = 10
    const displayScore = document.getElementById('score')
    const startPauseBtn = document.querySelector('#start-pause-button')
    let randomNextTetromino = 0
    let timerID
    let isPaused = false; // Track the game's paused state
    let userScore = 0
    const colors = [
        'orange',
        'green',
        'blue',
        'yellow',
        'purple',
    ]
    

//Building the tetromino shapes

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
        squares[currentPosition + index].style.backgroundColor = colors[randomTetromino]
    })
}

createTetromino()

//Remove tetrominos
function removeTetromino() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetrominos')
        squares[currentPosition + index].style.backgroundColor = ""
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
        showScore()
        gameOver()
    }
}

//Move tetromino left until it hits the wall
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
    [10,11,12,13], //iTetromino
    [7,11,12,13], //tTetromino
    [7,8,12,13], //oTetromino
 ]

// Function to display the next tetromino
function showTetromino() {
    displaySquares.forEach(square => {
        square.classList.remove('tetrominos');
        square.style.backgroundColor = ""
    });
    nextTetromino[randomNextTetromino].forEach(index => {
        displaySquares[displayIndex + index].classList.add('tetrominos');
        displaySquares[displayIndex + index].style.backgroundColor = colors[randomNextTetromino]
    });
}

//Start/Pause button

    // startPauseBtn.addEventListener('click', () => {
    //     if (gamePaused) {
    //         timerID = setInterval(moveDown, 1000);
    //         startPauseBtn.textContent = 'Pause';
    //         gamePaused = false; 
    //     } else {
    //         clearInterval(timerID);
    //         startPauseBtn.textContent = 'Resume'; 
    //         gamePaused = true; 
    //     }
    // });

startPauseBtn.addEventListener('click', () => {
    console.log('Button clicked');
    if (isPaused){
        startPauseBtn.textContent = "Resume"
        clearInterval(isPaused);
        isPaused = null;
    } else {
        startPauseBtn.textContent = "Pause"
        createTetromino();
        isPaused = setInterval(moveDown, 1000);
        randomNextTetromino = Math.floor(Math.random() * tetrominoObjects.length);
        showTetromino();
    }
});

// function showScore(){
//     for (let i=0; 1<199; i += width){
//         const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

//         if(row.every(index => squares[index].classList.contains("taken"))) {
//             userScore += 10
//             displayScore.innerHTML = userScore
//             row.forEach(index => {squares[index].classList.remove('taken')
//         })
//             const removeSquares = squares.splice(i, width)
//             squares = removeSquares.concat(squares)
//             console.log(squares)
//         }
//     }
// }

function showScore() {
    for (let i = 0; i < 199; i +=width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if(row.every(index => squares[index].classList.contains('taken'))) {
        userScore +=10
        displayScore.innerHTML = userScore
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetrominos')
          squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => gameboard.appendChild(cell))
      }
    }
  }

function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        displayScore.innerHTML = 'end'
        clearInterval(isPaused)
    }
}

} );

