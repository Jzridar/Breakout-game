# Breakout-game

Git Link: https://github.com/Jzridar/Breakout-game

About:
This is a nostalagic game.There will be a set of bricks given on the top of the screen in rows.
Player's goal is to hit the brick with the ball given.
Every time when the ball returns,the player must move the paddle to make sure that the ball land on the paddle to continue playing.
If the player missed to catch the ball on the paddle then one life will be deducted out of three.When the player misses three times,Game over!
It's a two player timed game.One player plays after the other.The winner will be determined by the final score of both the players.

Rules:
Three lives given,scores will be calculated for each broken brick.
The goal of the player is to move the ball with the help of UP key to start the game to break the bricks
When the ball drops it should get caught by the paddle below.
If its caught on the paddle,the ball will go up again and hit more bricks
until you miss to catch the ball on the paddle.
For each ball miss there will be a life reduced
For each bricks destroyed the player gets 1 point
If first player miss to catch the ball,after three lives lost the Game gets Over!!
The next player will start his/her turn following the same set of rules,winner will be determined by the highest score.

Techhologies used:
HTML,CSS,JavaScript

How I built this game:
This is a Vanilla Javascript code.

1.First I created some variables to get the elements from HTML and did some basic DOM to begin the basics
2.I created an object  called players and had two objects for player 1 and 2 and set the gameover: as true to prevent any default gamestart.

3.To find which player is selected I used "queryselcter all" to get both the players and added an click event listener to swap the selected player in the swapPlayer() function.

4.Inside the "swapPlayer()" function I selected the value of clicked input,if player 1 is selected then i set the player value as player1 else as player2.Then I set the  the startgame element display from "none" to "block"

5.In the "startgame()" function I set an if condition to check if the player is selected else I set up a pop up box saying "Please select the player". Here i'm setting the selected player and making the gameover to "false" and hiding the gameover display.Also set a default value for "score as 0" and "lives as 3".Setting the ball visible,setting the ball position on the paddle.set the vertical and the horizontal movement of the ball speedspeed in an array,given a default number of bricks as 36 in the function called "setupBrickPosition()" which can be changed as needed.Called a "scoreupdater()" function here. also using the "requestAnimationFrame" and calling the "update" function to get the update continuously to run the game.

6.In this "setupBrickPosition()"  function,the brticks set up inside the container depending on the no.of bricks required.It has two objects called X,Y.The X is used to find the remaining space in the left and rightside of the container by usiong the "modulo" operator,setting the width as 100px.For Y we set the value as 50(height).Setting the skip as false for now to stop skipping the row.Using the forloop for number of bricks given in the argument.and checking a condition to see the remaining space in the container by subtracting the container width -100(brick width) to accomodate the bricks.If its true then the y value increase by 50 and moves to the new row again we are setting the same value for x position to start from the same x value for the new row.if the skip is false then it calls the "makeBricks()" function.Atlast the x value is set to increment by 100 as we set the default value of the brick to 100.(It will set the next brick 100px to the right if current brick.

7.In this "makeBricks()"  function I simply create brick and set left and top value and added it to the container

8.isCollide() function takes two arguments: a and b. The function returns a boolean value indicating whether the two elements are colliding or not.First, the function uses the getBoundingClientRect() method to get the bounding rectangles of the two elements. This method returns an object with properties left, right, top, and bottom.Next, it checks for horizontal and vertical overlap between the two rectangles. If the right edge of the paddle is to the left of the left edge of the ball, or if the left edge of the paddle is to the right of the right edge of the ball, then there is no horizontal overlap. Similarly, if the bottom edge of the paddle is above the top edge of the ball, or if the top edge of the paddle is below the bottom edge of the ball, then there is no vertical overlap.If either the horizontal or vertical check fails, then the function returns false, indicating that the two elements are not colliding. If both checks pass, then the function returns true, indicating that the two elements are colliding.

9.In this scoreUpdater() function I set two condition for player 1 and 2 to update the current score and lives of the player that is playing.

10.In the update() function  It first checks if the game is not over by checking the "gameover" property of the player object. If the game is not over, it gets the current position of the paddle and checks if the left or right arrow key is pressed. If the left arrow key is pressed and the paddle is not at the left edge of the container, the function moves the paddle 10 pixels to the left  else if the right arrow key is pressed and the paddle is not at the right edge of the screen, the function moves the paddle 10 pixels to the right.After that the function checks if the ball is in play by checking the "inPlay" property of the curent player object. If the ball is not in play, the function calls the "waitingOnPaddle" function to set the ball position on the paddle. If the ball is in play, the function calls the "moveBall" function to update the position of the ball. atlast the function requests that the browser call this function again on the next frame using the window.requestAnimationFrame() method, ensuring that the game state is continuously updated. The animation frame ID is stored in the "ani" property of the player object for later use.

11.The "moveBall()" function to check the ball movement, checking for collisions with the walls, paddle, and bricks, and to update the player's score and game status as necessary.I first created an object called ballPosition, which stores the current x and y positions of the ball. The first two if statements check if the ball has hit the top or bottom of the container element. If it has hit the bottom, the function 'fallOff' is called. If it has hit the top, the direction of the ball is flippedby muliplying by negative 1.Next, it checks if the ball has hit the left or right wall. If it has, it changes the x direction of the ball by flipping it from a positive direction to a negative direction Checks another condition to see the bricks length =0 and the currentplayer game is not over then it calls the "stopper()" functionAfter that, it loops through all the bricks on the screen and checks if the ball has collided with any of them. If it has, it changes the y direction of the ball by flipping it from a positive direction to a negative direction, removes the brick from the screen, increments the player's score, and updates the displayed score,it updates the position of the ball based on its current direction and sets the left and top style properties accordingly.

12.In the "stopper " function set the play status to false and reset the ball direction to its default position,calling the waitingOnpaddle() which will bring the ball on the paddle.Atlast it terminates the animation by using the window.cancelAnimationFrame() method

13.In the "falloff()" function it calls the "endGame" function if the currentplayer lives is <=o and sets its value to 0.Then it calls the "scoreUpdater()" function and the "stopper()" function.

14.The "endGame()" function created to display the end of game message by checking every brick in the container,removing them if they got hit by the ball.Also it checkes the highest score of the two players and display the winner else display match draw.The animation function is cancelled ny using the method cancelAnimationFrame()


Special Thanks to :Google,MDN,W3Schools,StackOverflow,YouTube tutorials,Udemy.
