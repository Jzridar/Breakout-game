
const container = document.querySelector('.container')
let conDim = container.getBoundingClientRect() //This method is used to find the container's parameter,can be used to calculate and place the bricks inside the container
console.log(conDim)
const gameover = document.querySelector('.gameover')
const winner = document.querySelector('.winner')
const ball = document.querySelector('.ball')
const paddle = document.querySelector('.paddle')
container.appendChild(gameover)
gameover.addEventListener('click', startgame)
container.appendChild(ball)
container.appendChild(paddle)

const players = {
    player1: {
        gameover: true //to prevent any default game start
    },
    player2: {
        gameover: true //to prevent any default game start
    }
}

let currentPlayer = null
playerslections = document.querySelectorAll('input[name="Player"]')
for (let i = 0; i < playerslections.length; i++) {
    playerslections[i].addEventListener('click', swapPlayer)
}

//key press check(left/right/up/down) on paddle
document.addEventListener('keydown', function (e) {
    console.log(e.keyCode)
    if (e.keyCode === 37) paddle.left = true
    if (e.keyCode === 39) paddle.right = true
    if (e.keyCode === 38 && !currentPlayer.inPlay) {
        currentPlayer.inPlay = true;
    }

})


//To stop the paddle from stop going left we set this function so it can stop when the condition becomes false
document.addEventListener('keyup', function (e) {
    //console.log(e.keycode)
    if (e.keyCode === 37) paddle.left = false
    if (e.keyCode === 39) paddle.right = false

})

function swapPlayer(e) {
    let selected = document.querySelector('input[name="Player"]:checked').value
    // check which player was clicked and assign player variable
    if (selected === 'Player1') {
        currentPlayer = players.player1
    } else {
        currentPlayer = players.player2
    }

    gameover.innerHTML = 'Start Game'
    gameover.style.display = "block"

}

//creating a funtion to Start game when the gameover el is clicked
function startgame() {
    console.log('start')
    if (currentPlayer === null) {
        alert('Please select player')
        return
    }
    if (currentPlayer.gameover) {
        currentPlayer.selected = document.querySelector('input[name="Player"]:checked').value
        console.log(currentPlayer)
        currentPlayer.gameover = false
        gameover.style.display = "none"
        currentPlayer.score = 0
        currentPlayer.lives = 3
        currentPlayer.inPlay = false;
        ball.style.display = "block";
        ball.style.left = paddle.offsetLeft + 50 + "px";
        ball.style.top = paddle.offsetTop - 30 + "px";
        currentPlayer.ballDir = [2, -5];// in this array the vertical and the horizontal movement of the ball speed given
        setupBricksPosition(36)
        scoreUpdater()
        currentPlayer.ani = window.requestAnimationFrame(update) // in replacement of setInterval and setTimer.requestAnimationFrame() method tells the browser to run a callback function right before the next repaint happens.
    }
}


function scoreUpdater() {

    if (currentPlayer.selected === 'Player1') {
        document.querySelector('#p1score').textContent = currentPlayer.score
        document.querySelector('#p1lives').textContent = currentPlayer.lives
    }

    if (currentPlayer.selected === 'Player2') {
        document.querySelector('#p2score').textContent = currentPlayer.score
        document.querySelector('#p2lives').textContent = currentPlayer.lives
    }

}

function update() {
    if (!currentPlayer.gameover) {
        let pCurrent = paddle.offsetLeft;
        if (paddle.left && pCurrent > 0) {
            pCurrent -= 10;
        }
        if (paddle.right && (pCurrent < (conDim.width - paddle.offsetWidth))) {
            pCurrent += 10;
        }

        paddle.style.left = pCurrent + 'px';// Setting the paddle to the current position dynamically
        if (!currentPlayer.inPlay) {
            waitingOnPaddle();
        }
        else {
            moveBall();
        }
        currentPlayer.ani = window.requestAnimationFrame(update);
    }
}

function waitingOnPaddle() {
    ball.style.top = (paddle.offsetTop - 22) + 'px';
    ball.style.left = (paddle.offsetLeft + 40) + 'px';
}

function stopper() {
    currentPlayer.inPlay = false;
    currentPlayer.ballDir[0, -5];
    waitingOnPaddle();
    window.cancelAnimationFrame(currentPlayer.ani);
}

function fallOff() {
    currentPlayer.lives--;
    if (currentPlayer.lives <= 0) {
        endGame();
        currentPlayer.lives = 0;
    }
    scoreUpdater();
    stopper();
}

function isCollide(a, b) {
    let paddleOrBrick = a.getBoundingClientRect();
    let ballRect = b.getBoundingClientRect();
    console.log()
    let horizontalCheck = (paddleOrBrick.right < ballRect.left) || (paddleOrBrick.left > ballRect.right)
    let verticalCheck = (paddleOrBrick.bottom < ballRect.top) || (paddleOrBrick.top > ballRect.bottom)
    return !(horizontalCheck || verticalCheck);
}


function endGame() {
    gameover.style.display = "block";
    gameover.innerHTML = "Game Over<br>Your score is " + currentPlayer.score;

    ball.style.display = "none";
    let tempBricks = document.querySelectorAll('.brick');
    for (let tBrick of tempBricks) {
        tBrick.parentNode.removeChild(tBrick);
    }
    window.cancelAnimationFrame(currentPlayer.ani);

    console.log(players)

    if ((!players.player1.gameover && !players.player2.gameover)) {
        if (players.player1.score > players.player2.score) {
            winner.innerHTML = 'Player 1 is winner'
        } else if (players.player2.score > players.player1.score) {
            winner.innerHTML = 'Player 2 is winner'
        } else {
            winner.innerHTML = 'Match Draw!'
        }
    }
    //player.gameover = true;
}

function moveBall() {
    let ballPosition = {
        x: ball.offsetLeft,
        y: ball.offsetTop
    }
    if (ballPosition.y > (conDim.height - 20) || ballPosition.y < 0) {
        if (ballPosition.y > (conDim.height - 20)) {
            fallOff();
        }
        else {
            currentPlayer.ballDir[1] *= -1 //by multiplying by -1 we are flipping the ball direction from -ve direction to +ve
        }

    }
    if (ballPosition.x > (conDim.width - 20) || ballPosition.x < 0) {
        currentPlayer.ballDir[0] *= -1
    }
    if (isCollide(paddle, ball)) {
        let temp = ((ballPosition.x - paddle.offsetLeft) - (paddle.offsetWidth / 2)) / 10;
        console.log('hit');
        currentPlayer.ballDir[0] = temp;
        currentPlayer.ballDir[1] *= -1;
    };
    let bricks = document.querySelectorAll('.brick');
    if (bricks.length == 0 && !currentPlayer.gameover) {
        stopper();
        //setupBricksPosition(player.num);
    }
   
    for (let i = 0; i < bricks.length; i++) {
        brick = bricks[i]
        if (isCollide(brick, ball)) {
            currentPlayer.ballDir[1] *= -1;
            brick.parentNode.removeChild(brick);
            currentPlayer.score++;
            scoreUpdater();
        }
    }

    ballPosition.x += currentPlayer.ballDir[0]
    ballPosition.y += currentPlayer.ballDir[1]

    ball.style.left = ballPosition.x + 'px'
    ball.style.top = ballPosition.y + 'px'
}

function setupBricksPosition(num) {
    let row = {
        x: ((conDim.width % 100) / 2), //this is used to find the remaining space on the left and right side of the container,here each brick width is 100
        y: 50
    }
    let skip = false
    for (let x = 0; x < num; x++) {
        console.log(row)
        if (row.x > (conDim.width - 100)) { // we are subtracting the container length by 100 to accomodate the bricks
            row.y += 50  //if its greater then we are incrementing the y by 50 so they can start a new row
            if (row.y > (conDim.height / 2)) {
                skip = true
            }
            row.x = ((conDim.width % 100) / 2) //for x we are setting the same position as before 
        }
        row.count = x
        if (!skip) {
            makeBricks(row)
        }
        row.x += 100    //adding 100 as we set the width of each px as 100
    }
}

function makeBricks(pos) {
    const div = document.createElement('div')
    div.setAttribute('class', 'brick')
    //div.style.backgroundColor = 'red'
    div.style.left = pos.x + 'px'
    div.style.top = pos.y + 'px'
    container.appendChild(div)
}