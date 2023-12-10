class TetrisGame{
    constructor(){
        const gameboard = document.querySelector('.game-board')
        let squares = Array.from(document.querySelectorAll('.game-board div'))
        const width = 10
        const displayScore = document.getElementById('score')
        const startPauseBtn = document.querySelector('#start-pause-button')
        let randomNextTetromino = 0
        let heldTetromino = 0
        let isPaused = false; // Track the game's paused state
        let isGameOver = false
        let userScore = 0
        let speedIncrease = 1000
        let myMusic = document.querySelector('#music')
        let gameOverSound = document.querySelector('#game-over')
        let tetrominoGroundSound = document.querySelector('#ground-hit')
        let tetrisLine = document.querySelector('#tetris-line')
        const colors = [
            'orange',
            'green',
            'blue',
            'yellow',
            'purple',
        ]
        const freezeBtn = document.getElementById('freeze')
        const slowMoBtn = document.getElementById('slow-mo')
        const zeroGravityBtn = document.getElementById('zero-gravity')
        const twistsButtons = [freezeBtn, slowMoBtn, zeroGravityBtn]
        clickedBtn = null
        clickedTime = 0;
        timer = 0;
        let slowMoActive = false
        const slowMoDuration = 30; 
    }
}