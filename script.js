
const container = document.querySelector('.container')
let contDimension = container.getBoundingClientRect() //This method is used to find the container's dimension-can be used to calculate and place the bridge
console.log(contDimension)
const gameover = document.querySelector('.gameover')
const ball = document.querySelector('.ball')
const paddle = document.querySelector('.paddle')
container.appendChild(gameover)
gameover.addEventListener('click', startgame)
container.appendChild(ball)
container.appendChild(paddle)

//key press check(left/right/up/down)

document.addEventListener('keydown', function (e) {
    console.log(e.keyCode)
    if (e.keyCode === 37) paddle.left = true
    if (e.keyCode === 39) paddle.right = true

})

document.addEventListener('keyup', function (e) {
    console.log(e.keyCode)
    if (e.keyCode === 37) paddle.left = false
    if (e.keyCode === 39) paddle.right = false

})
const player = {
    gameover: true
}



//creating a funtion to Start game when the gameover el is clicked
function startgame() {
    console.log('start')
    if (player.gameover) {
        player.gameover = false
        gameover.style.display = "none"
        setupBricksPosition(36)
        player.score = 0
        player.lives = 3
        ball.style.display = "block"
        scoreupdater()
        window.requestAnimationFrame(update) // in replacement of setInterval and setTimer.requestAnimationFrame() method tells the browser to run a callback function right before the next repaint happens.
    }
}

function scoreupdater() {
    document.querySelector('.score').textContent=player.score
    document.querySelector('.lives').textContent=player.lives
}

function update() {
    let paddleCPosition = paddle.offsetleft //offsetLeft property returns the left position (in pixels)
    console.log(paddleCPosition)
    if (paddle.left) {
        paddleCPosition -= 5
    }
    if (paddle.right) {
        paddleCPosition += 5
    }
    paddle.style.left = paddleCPosition + 'px'
    window.requestAnimationFrame(update)
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