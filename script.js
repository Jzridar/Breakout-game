
const container = document.querySelector('.container')
let contDimension = container.getBoundingClientRect() //This method is used to find the container's parameter-can be used to calculate and place the bricks
console.log(contDimension)
const gameover = document.querySelector('.gameover')
const ball = document.querySelector('.ball')
const paddle = document.querySelector('.paddle')
container.appendChild(gameover)
gameover.addEventListener('click', startgame)
container.appendChild(ball)
container.appendChild(paddle)



//key press check(left/right/up/down) on paddle

document.addEventListener('keydown', function (e) {
    //console.log(e.keycode)
    if (e.keycode === 37) paddle.left = true
    if (e.keycode === 39) paddle.right = true
    if (e.keycode === 38 && !player.inPlay) player.inPlay = true;

})

document.addEventListener('keyup', function (e) { //To stop the paddle from stop going left we set this function so it can stop when the condition becomes false
    //console.log(e.keycode)
    if (e.keycode === 37) paddle.left = false
    if (e.keycode === 39) paddle.right = false

})
const player = {
    gameover: true //to prevent any default game start
}




//creating a funtion to Start game when the gameover el is clicked
function startgame() {
    console.log('start')
    if (player.gameover) {
        player.gameover = false
        gameover.style.display = "none"
       
        player.score = 0
        player.lives = 3
        player.inPlay = false;
        ball.style.display = "block";
        ball.style.left = paddle.offsetLeft + 50 + "px";
        ball.style.top = paddle.offsetTop - 30 + "px";
        player.ballDir = [2, -5];
        player.num = 60;
        player.ballDirection = [5, 5] // in this array the vertical and the horizontal movement of the ball speed given
        setupBricksPosition(36)
        scoreUpdater()
        player.ani = window.requestAnimationFrame(update) // in replacement of setInterval and setTimer.requestAnimationFrame() method tells the browser to run a callback function right before the next repaint happens.
    }
}

var start = null

function animation(timestamp) {  //below is the animation sequence 
    if (!start)
        start = timestamp
    var progress = timestamp - start;
    container.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)'
    if (progress < 2000) {
        console.log(progress)
        window.requestAnimationFrame(animation)
    }
}
window.requestAnimationFrame(animation)


function scoreUpdater() {
    document.querySelector('.score').textContent = player.score
    document.querySelector('.lives').textContent = player.lives
}

function update() {
    let paddleCPosition = paddle.offsetLeft //offsetLeft property returns the left position (in pixels)
    console.log(paddleCPosition)
    moveBall()
    if (paddle.left) {
        paddleCPosition -= 5
    }
    if (paddle.right) {
        paddleCPosition += 5
    }
    paddle.style.left = paddleCPosition + 'px'
    window.requestAnimationFrame(update)
}

function moveBall() {
    let ballPosition = {
        x: ball.offsetLeft,
        y: ball.offsetTop
    }
    if (ballPosition.x > (contDimension.width - 20) || ballPosition.x < 0) {
        player.ballDirection[0] *= -1 //by multiplying by -1 we are flipping the ball direction from -ve direction to +ve
    }
    if (ballPosition.y > (contDimension.height - 20) || ballPosition.y < 0) {
        player.ballDirection[1] *= -1
    }

    ballPosition.x += player.ballDirection[0]
    ballPosition.y += player.ballDirection[1]

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
        console.log(row)
        if (row.x > (contDimension.width - 100)) { // we are subtracting the container length by 100 to accomodate the bricks
            row.y += 50  //if its greater then we are incrementing the y by 50 so they can start a new row
            if (row.y > (contDimension.height / 2)) {
                skip = true
            }
            row.x = ((contDimension.width % 100) / 2) //for x we are setting the same position as before 
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