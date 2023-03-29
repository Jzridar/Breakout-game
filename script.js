
const container = document.querySelector('.container')
const gameover = document.querySelector('.gameover')
const ball = document.querySelector('.ball')
const paddle = document.querySelector('.paddle')

container.appendChild(gameover)
gameover.addEventListener('click', startgame)
container.appendChild(ball)
container.appendChild(paddle)




//creating a funtion to atart game when the gameover el is clicked
function startgame() {
    console.log('start')
}