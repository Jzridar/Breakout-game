
const container = document.querySelector('.container')
let contDimension = container.getBoundingClientRect()
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
    setupBricks(30)
}

function setupBricks(num){
    let row = {
        x:((contDimension.width % 200)/2),
      
        y:50
    }
    console.log(row)
}