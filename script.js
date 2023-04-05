
const container = document.querySelector('.container')
let contDimension = container.getBoundingClientRect() //This method is used to find the container's parameter,can be used to calculate and place the bricks inside the container
console.log(contDimension)
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
playerslections = document.querySelectorAll('input[name="Player"]')// Get the radio button input elements
for (let i = 0; i < playerslections.length; i++) {
    playerslections[i].addEventListener('click', swapPlayer)
}

//key press check(left/right/up/down) to move the paddle
document.addEventListener('keydown', function (e) {
    console.log(e.keyCode)
    if (e.keyCode === 37) paddle.left = true
    if (e.keyCode === 39) paddle.right = true
    if (e.keyCode === 38 && !currentPlayer.inPlay) {
        currentPlayer.inPlay = true;
    }

})


//To stop the paddle from stop going left,right we set this function so it can stop when we stop pressing the key
document.addEventListener('keyup', function (e) {
    //console.log(e.keycode)
    if (e.keyCode === 37) paddle.left = false
    if (e.keyCode === 39) paddle.right = false

})

function swapPlayer(e) {  //This function is to assign the selected player as current player to start the game
    let selectedPlayer = document.querySelector('input[name="Player"]:checked').value
    console.log('selected player :' + selectedPlayer)
    // check which player was clicked and assign player variable
    if (selectedPlayer === 'Player1') {
        currentPlayer = players.player1
    } else {
        currentPlayer = players.player2
    }

    gameover.innerHTML = 'Start Game'
    gameover.style.display = "block"

}

//creating a funtion to Start game when the gameover el is clicked
function startgame() { //This function will be invoked when user clicks the Start banner
    console.log('start')
    if (currentPlayer === null) {
        alert('Please select player')
        return
    }
    if (currentPlayer.gameover) {
        console.log(currentPlayer)
        currentPlayer.gameover = false
        gameover.style.display = "none"
        currentPlayer.score = 0
        currentPlayer.lives = 3
        currentPlayer.inPlay = false;//This value will set to false by default,when user click up arrow it change to true
        ball.style.display = "block";
        ball.style.left = paddle.offsetLeft + 50 + "px"; //setting default top and left position for the ball on the paddle
        ball.style.top = paddle.offsetTop - 30 + "px";
        currentPlayer.ballDir = [2, -5];// in this array the vertical and the horizontal movement of the ball speed given
        setupBricksPosition(36)
        scoreUpdater()
        currentPlayer.ani = window.requestAnimationFrame(update) // in replacement of setInterval and setTimer.requestAnimationFrame() method tells the browser to run a callback function right before the next repaint happens.
    }
}


function scoreUpdater() { //This block is to update the score of the current player

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
    if (!currentPlayer.gameover) {  //if current player is still playing
        let pCurrent = paddle.offsetLeft;
        if (paddle.left && pCurrent > 0) {   //if paddle moving toward left and offset left if >0 
            pCurrent -= 10; //then 10 px reduced continuously to move toward the left side
        }
        if (paddle.right && (pCurrent < (contDimension.width - paddle.offsetWidth))) { //if paddle is in the right direction and the left of 
            pCurrent += 10; //then 10 px increased to move towards the rightside
        }

        paddle.style.left = pCurrent + 'px';// We are Setting the paddle movement
        if (!currentPlayer.inPlay) {
            waitingOnPaddle();
        }
        else {
            moveBall();
        }
        // method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint.
        currentPlayer.ani = window.requestAnimationFrame(update);
    }
}

function waitingOnPaddle() {  //ball's default position before when not in play
    ball.style.top = (paddle.offsetTop - 22) + 'px';
    ball.style.left = (paddle.offsetLeft + 40) + 'px';
}

function stopper() {
    currentPlayer.inPlay = false; //if the player is not playing
    currentPlayer.ballDir[0, -5]; //Then ball direction set to a default value to go back to the paddle
    waitingOnPaddle();
    window.cancelAnimationFrame(currentPlayer.ani); //method cancels an animation frame request previously scheduled through a call to window.requestAnimationFrame().
}

function fallOff() { //if the ball fall off then the currentplayer's live reduced by 1
    currentPlayer.lives--;
    if (currentPlayer.lives <= 0) { //if the current player's life <=0 then it calls the endgame function
        endGame();
        currentPlayer.lives = 0;
    }
    scoreUpdater(); //updates the score
    stopper(); //stops the game
}

function isCollide(a, b) { //To check if the ball touches the brick or the paddle
    let paddleOrBrick = a.getBoundingClientRect(); // getting the dimension of the paddle
    let ballRect = b.getBoundingClientRect();  //getting the dimension of the ball
    console.log()
    let horizontalCheck = (paddleOrBrick.right < ballRect.left) || (paddleOrBrick.left > ballRect.right)// checks horizontal collision
    let verticalCheck = (paddleOrBrick.bottom < ballRect.top) || (paddleOrBrick.top > ballRect.bottom) //chacks for vertical collision
    return !(horizontalCheck || verticalCheck);//If both vertical and horizontal check is false then it is consider as collide
}


function endGame() {
    gameover.style.display = "block";
    gameover.innerHTML = "Game Over<br>Your score is " + currentPlayer.score;

    ball.style.display = "none";
    let tempBricks = document.querySelectorAll('.brick');
    for (let tBrick of tempBricks) {
        tBrick.parentNode.removeChild(tBrick);
    }
    window.cancelAnimationFrame(currentPlayer.ani); //method cancels an animation frame request previously scheduled through a call to window.requestAnimationFrame().

    console.log(players)

    if ((!players.player1.gameover && !players.player2.gameover)) {  //comparing both the players scores to finalise the winner
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
    if (ballPosition.y > (contDimension.height - 20) || ballPosition.y < 0) { //checking the ball's y position if it past beyons the container's height or
        if (ballPosition.y > (contDimension.height - 20)) { //if it go beyond the container's height then call falloff function
            fallOff();
        }
        else {
            currentPlayer.ballDir[1] *= -1 //else change the direction by multiplying by -1 we are flipping the ball direction from -ve direction to +ve
        }

    }
    if (ballPosition.x > (contDimension.width - 20) || ballPosition.x < 0) {  //Same thing checked here for the x position
        currentPlayer.ballDir[0] *= -1
    }
    if (isCollide(paddle, ball)) { // Check paddle and ball collide
        let temp = ((ballPosition.x - paddle.offsetLeft) - (paddle.offsetWidth / 2)) / 10;//To get the approx x position adter collide
        console.log('hit');
        currentPlayer.ballDir[0] = temp;
        currentPlayer.ballDir[1] *= -1;
    };
    let bricks = document.querySelectorAll('.brick');
    if (bricks.length == 0 && !currentPlayer.gameover) { //checking if no bricks left and game is not over,calling gthe stopper
        stopper();
        //setupBricksPosition(player.num);
    }

    for (let i = 0; i < bricks.length; i++) { //This block is to check the brick and ball collision and two remove a brick
        brick = bricks[i]
        if (isCollide(brick, ball)) { // Check brick and ball collide
            currentPlayer.ballDir[1] *= -1;   //and to change the direction of the ball after it hit the brick
            brick.parentNode.removeChild(brick);
            currentPlayer.score++;
            scoreUpdater(); //here also score updater called to updated the score as the ball breaks the bricks
        }
    }

    ballPosition.x += currentPlayer.ballDir[0] //Here ball's current left and top position updated dynamically
    ballPosition.y += currentPlayer.ballDir[1]

    ball.style.left = ballPosition.x + 'px'
    ball.style.top = ballPosition.y + 'px'
}

function setupBricksPosition(num) {
    let row = {
        x: ((contDimension.width % 100) / 2), //this is used to find the remaining space on the left and right side of the container,here each brick width is 100
        y: 50
    }
    let skip = false
    for (let x = 0; x < num; x++) {
        console.log('Start row')
        console.log(row)
        console.log('End row')
        if (row.x > (contDimension.width - 100)) { // we are subtracting the container length by 100 to accomodate the bricks
            row.y += 50  //if the previous row is filled then we are incrementing the y by 50 so they can start a new row
            if (row.y > (contDimension.height / 2)) { //Giving the flexibility to accomodate bricks only for half the height of the container
                skip = true                           //So there will be remaining half the height for the ball to move
            }
            row.x = ((contDimension.width % 100) / 2) //for x we are setting the same position as before 
        }
     
        if (!skip) { //If the height is not half of the container then make bricks.
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