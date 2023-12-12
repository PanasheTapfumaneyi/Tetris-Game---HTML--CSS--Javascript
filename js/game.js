import { getUser, updateUserInformation } from './helpers/users.js';

document.addEventListener('DOMContentLoaded', () => {

  const gameboard = document.querySelector('.game-board');
  let squares = Array.from(document.querySelectorAll('.game-board div'));
  const width = 10;
  const displayScore = document.getElementById('score');
  const displayMode = document.getElementById('game-mode');
  const startPauseBtn = document.querySelector('#start-pause-button');
  let randomNextTetromino = 0;
  let heldTetromino = 0;
  let isPaused = false; // Track the game's paused state
  let isGameOver = false;
  let speedRunActive = false;
  let regularModeActive = true;
  let puzzleModeActive = false;
  let userScore = 0;
  let speedIncrease = 1000;
  let myMusic = document.querySelector('#music');
  let gameOverSound = document.querySelector('#game-over');
  let tetrominoGroundSound = document.querySelector('#ground-hit');
  let tetrisLine = document.querySelector('#tetris-line');
  let setSpeed = 1000;
  const colors = ['orange', 'green', 'blue', 'yellow', 'purple'];
  const themeButton = document.getElementById('theme-button');
  let originalTheme = true;
  let circleTheme = false;
  let starTheme = false;
  const freezeBtn = document.getElementById('freeze');
  const slowMoBtn = document.getElementById('slow-mo');
  const zeroGravityBtn = document.getElementById('zero-gravity');
  const twistsButtons = [freezeBtn, slowMoBtn, zeroGravityBtn];
  const regularModeBtn = document.getElementById('regular-button');
  const speedRunBtn = document.getElementById('speed-run-button');
  const puzzleBtn = document.getElementById('puzzle-button');
  const updateScore = document.getElementById('update-score');
  let clickedBtn = null;
  let clickedTime = 0;
  let timer = 0;
  let slowMoActive = false;
  const slowMoDuration = 30;

  //Building the tetromino shapes

  const lTetromino = [
    [0, width, width * 2, 1],
    [0, 1, 2, width + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [0, width, width + 1, width + 2],
  ];

  const zTetromino = [
    [width, width + 1, 1, 2],
    [1, width + 1, width + 2, width * 2 + 2],
    [1, 2, width, width + 1],
    [1, width + 1, width + 2, width * 2 + 2],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width * 2 + 1, width + 2],
    [0, 1, 2, width + 1],
    [1, width + 1, width * 2 + 1, width],
  ];

  const oTetromino = [
    [0, width, 1, width + 1],
    [0, width, 1, width + 1],
    [0, width, 1, width + 1],
    [0, width, 1, width + 1],
  ];

  const tetrominoObjects = [lTetromino, oTetromino, iTetromino, tTetromino, zTetromino];

  let currentPosition = 4;
  let currentRotation = 0;

  //Select random tetromino
  let randomTetromino = Math.floor(Math.random() * tetrominoObjects.length);
  let current = tetrominoObjects[randomTetromino][currentRotation];

  //Drawing the tetrominos
  function createTetromino() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetrominos');
      squares[currentPosition + index].style.backgroundColor = colors[randomTetromino];
    });
  }

  createTetromino();

  //Remove tetrominos
  function removeTetromino() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove('tetrominos');
      squares[currentPosition + index].style.backgroundColor = '';
    });
  }

  document.addEventListener('keydown', (e) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'h'].includes(e.key)) {
      e.preventDefault(); // Prevent default action for arrow keys
    }

    if (isPaused) {
      if (e.key === 'ArrowLeft') {
        moveTetrominoLeft();
      } else if (e.key === 'ArrowRight') {
        moveTetrominoRight();
      } else if (e.key === 'ArrowDown') {
        moveDown();
      } else if (e.key === 'ArrowUp') {
        rotateTetromino();
      } else if (e.key === 'h' || e.key === 'H') {
        holdTetromino();
      }
    } else if (e.key === 'ArrowUp') {
      rotateTetromino();
    }
  });

  //Function to make tetrominos move down

  function moveDown() {
    removeTetromino();
    currentPosition += width;
    createTetromino();
    freeze();
  }

  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains('taken')
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add(
          'taken',
          'tetromino-shine-animation'
        )
      );
      tetrominoGroundSound.play();
      //Spawn new tetromino
      randomTetromino = randomNextTetromino;
      randomNextTetromino = Math.floor(Math.random() * tetrominoObjects.length);
      current = tetrominoObjects[randomTetromino][currentRotation];
      currentPosition = 4;
      createTetromino();
      showTetromino();
      showScore();
      gameOver();
    }
  }
  //-----------------------------------------------------------------------------------------------------------------------------------------
  //Make this into one function

  //Move tetromino left until it hits the wall
  function moveTetrominoLeft() {
    removeTetromino();
    const leftWall = current.some((index) => (currentPosition + index) % width === 0);
    if (!leftWall) currentPosition -= 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition += 1;
    }
    createTetromino();
  }

  // Move tetromino right until it hits wall

  function moveTetrominoRight() {
    removeTetromino();
    const rightWall = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );
    if (!rightWall) currentPosition += 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition -= 1;
    }
    createTetromino();
  }
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------
  //Rotate tetromino

  function rotateTetromino() {
    removeTetromino();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = tetrominoObjects[randomTetromino][currentRotation];
    createTetromino();
  }

  //Show next tetromino in next box

  const displaySquares = document.querySelectorAll('.next-grid div');
  const displayWidth = 4;
  let displayIndex = 0;

  //Displaying tetrominos

  const nextTetromino = [
    [7, 12, 17, 8], //lTetromino
    [6, 7, 8, 11, 12, 13, 16, 17, 18], //oTetromino
    [10, 11, 12, 13], //iTetromino
    [7, 11, 12, 13], //tTetromino
    [6, 7, 12, 13], //zTetromino
  ];

  // Function to display the next tetromino
  function showTetromino() {
    displaySquares.forEach((square) => {
      square.classList.remove('tetrominos');
      square.style.backgroundColor = '';
    });
    nextTetromino[randomNextTetromino].forEach((index) => {
      displaySquares[displayIndex + index].classList.add('tetrominos');
      displaySquares[displayIndex + index].style.backgroundColor =
        colors[randomNextTetromino];
    });
  }

  // function showHoldTetromino(){
  //     displaySquares.forEach(square => {
  //         square.classList.remove('tetrominos');
  //         square.style.backgroundColor = ""});
  //         nextTetromino[heldTetromino].forEach(index => {
  //             displaySquares[displayIndex + index].classList.add('tetrominos');
  //             displaySquares[displayIndex + index].style.backgroundColor = colors[randomNextTetromino]
  //         });
  // }

  function showHoldTetromino() {
    const holdGrid = document.getElementById('holdGrid');
    holdGrid.innerHTML = ''; // Clear the hold grid

    if (heldTetromino !== null) {
      // Display the held tetromino squares
      tetrominoObjects[randomTetromino].forEach((index) => {
        const square = document.createElement('div');
        square.classList.add('tetrominos');
        square.style.backgroundColor = colors[heldTetromino];
        holdGrid.appendChild(square);
      });
    }
  }

  // Function to hold the tetromino
  function holdTetromino() {
    // Remove the current tetromino from the game board
    removeTetromino();

    if (heldTetromino === null) {
      heldTetromino = randomTetromino;
      randomTetromino = randomNextTetromino;
      randomNextTetromino = Math.floor(Math.random() * tetrominoObjects.length);
      current = tetrominoObjects[randomTetromino][currentRotation];
      currentPosition = 4;
      showTetromino();
      showHoldTetromino(); // Display the held tetromino
    } else {
      const temp = randomTetromino;
      randomTetromino = heldTetromino;
      heldTetromino = temp;
      current = tetrominoObjects[randomTetromino][currentRotation];
      currentPosition = 4;
      showTetromino();
      showHoldTetromino(); // Display the held tetromino
    }
  }

  startPauseBtn.addEventListener('click', () => {
    if (isGameOver === true) {
      restartGame();
    } else {
      if (isPaused) {
        myMusic.pause();
        startPauseBtn.textContent = 'Resume';
        clearInterval(isPaused);
        isPaused = null;
      } else if (!isPaused) {
        myMusic.play();
        startPauseBtn.textContent = 'Pause';
        createTetromino();
        isPaused = setInterval(moveDown, 1000);
        randomNextTetromino = Math.floor(Math.random() * tetrominoObjects.length);
        showTetromino();
      } else if (!isPaused && isGameOver === true) {
        startPauseBtn.textContent = 'Pause';
      }
    }

    startPauseBtn.classList.toggle('move-button');
  });

  function handleGameModes(mode) {
    if (mode === 'regular') {
    } else if (mode === 'speed-run') {
    } else if (mode === 'puzzle') {
    }
  }

  function handleRegularMode() {
    regularModeActive = true;
    displayMode.innerHTML = 'Game (Regular Mode)';
  }
  regularModeBtn.addEventListener('click', () => {
    handleGameModes('regular');
    if (!regularModeActive) {
      regularModeActive = true;
      handleRegularMode();
      regularModeBtn.disabled = true;
      speedRunBtn.disabled = false;
      speedRunActive = false;
    }
  });

  speedRunBtn.addEventListener('click', () => {
    handleGameModes('speed-run');
    if (!speedRunActive) {
      speedRunActive = true;
      handleSpeedRunMode();
      speedRunBtn.disabled = true;
      regularModeBtn.disabled = false;
    }
  });
  function handleSpeedRunMode() {
    regularModeActive = false;
    speedRunActive = true;
    displayMode.innerHTML = 'Game (SPEED RUN!)';
  }

  function twistsTimer(twistsButton) {
   let currentTime = new Date().getTime();
    if (currentTime - clickedTime > 3000 || clickedBtn !== twistsButton) {
      twistsButton.disabled = false;

      clickedBtn = twistsButton;
      clickedTime = currentTime;

      setTimeout(() => {
        twistsButton.disabled = true;
      }, 3000);
    } else {
      alert('Wait 30 seconds');
    }
  }

  twistsButtons.forEach((twistsButton) => {
    twistsButton.addEventListener('click', () => twistsTimer(twistsButton));
  });

  freezeBtn.addEventListener('click', () => {
    handleTwists('freeze');
    //When freeze function is in play
    if (isPaused) {
      clearInterval(isPaused);
      isPaused = null;
    } else {
      freezeBtn.textContent = 'FREEZE';
      createTetromino();
      isPaused = setInterval(moveDown, 1000);
      randomNextTetromino = Math.floor(Math.random() * tetrominoObjects.length);
      showTetromino();
    }
    setTimeout(() => {
      isPaused = false;
      isPaused = setInterval(moveDown, 1000);
    }, 10000);
  });

  zeroGravityBtn.addEventListener('click', () => {
    handleTwists('zero-gravity');
    if (isPaused) {
      clearInterval(isPaused);
      isPaused = true;
    } else {
      freezeBtn.textContent = 'FREEZE';
      createTetromino();
      isPaused = setInterval(moveDown, 1000);
      randomNextTetromino = Math.floor(Math.random() * tetrominoObjects.length);
      showTetromino();
    }
    setTimeout(() => {
      isPaused = false;
      isPaused = setInterval(moveDown, 1000);
    }, 10000);
  });

  slowMoBtn.addEventListener('click', () => {
    handleTwists('slowmo');
    if (!slowMoActive) {
      slowMoActive = true;
      handleSlowMo(slowMoDuration);
      slowMoBtn.disabled = true;
    }
  });

  function handleSlowMo(durationInSeconds) {
    let originalInterval;
    let slowMoInterval;

    if (slowMoActive) {
      originalInterval = 1000;
      slowMoInterval = 2000;
      clearInterval(isPaused);
      isPaused = setInterval(moveDown, slowMoInterval);
    }
    setTimeout(() => {
      clearInterval(isPaused);
      isPaused = setInterval(moveDown, originalInterval);
      slowMoActive = false;
    }, 10000);
  }

  function handleTwists(twist) {
    if (twist === 'freeze') {
    } else if (twist === 'slow-mo') {
    } else if (twist === 'zero-gravity') {
    }
  }

  function restartGame() {
    location.reload();
  }

  function showScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

      if (row.every((index) => squares[index].classList.contains('taken'))) {
        if (speedRunActive) {
          speedIncrease -= 100;
          userScore += 20;
        } else if (regularModeActive) {
          speedIncrease = 1000;
          userScore += 10;
        } else if (puzzleModeActive) {
          speedIncrease = 100;
        }
        if (speedIncrease < 100) {
          speedIncrease = 100;
        }
        clearInterval(isPaused);
        isPaused = setInterval(moveDown, speedIncrease);
        displayScore.innerHTML = 'Score: ' + userScore;
        confetti({ particleCount: 100, spread: 40, origin: { y: 1 } });
        scoreBoard();
        tetrisLine.play();
        row.forEach((index) => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetrominos');
          squares[index].style.backgroundColor = '';
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => gameboard.appendChild(cell));
      }
    }
  }

  function gameOver() {
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      gameOverSound.play();
      myMusic.pause();
      isGameOver = true;
      displayScore.innerHTML = 'Game Over!';
      startPauseBtn.textContent = 'Restart';
      clearInterval(isPaused);
      isPaused = false;
    }
  }

  themeButton.addEventListener('click', () => {
    const gameBoardCells = document.querySelectorAll('.game-board div');

    if (originalTheme === true) {
      gameBoardCells.forEach((square) =>
        square.classList.remove('square-theme', 'batman-theme')
      );
      gameBoardCells.forEach((square) => square.classList.add('circle-theme'));
      originalTheme = false;
      starTheme = false;
      circleTheme = true;
    } else if (circleTheme === true) {
      gameBoardCells.forEach((square) =>
        square.classList.remove('circle-theme', 'square-theme')
      );
      gameBoardCells.forEach((square) => square.classList.add('batman-theme'));
      originalTheme = false;
      starTheme = true;
      circleTheme = false;
    } else if (starTheme === true) {
      gameBoardCells.forEach((square) =>
        square.classList.remove('circle-theme', 'batman-theme')
      );
      gameBoardCells.forEach((square) => square.classList.add('square-theme'));
      originalTheme = true;
      starTheme = false;
      circleTheme = false;
    }
  });

  function scoreBoard() {
    let currentScore = userScore.toString();
    const username = sessionStorage.loggedInUsr;

    if (username !== undefined) {
      let user = getUser(username);
      if (user.highScore < currentScore)
        updateUserInformation(username, "highScore", currentScore);
    }
  }
});
