
    var scoreElement = document.getElementById("score");
    var gameOverScreen = document.getElementById("gameOverScreen");

    
    //board
    var blocksize = 25;
    var rows = 20;
    var cols = 20;
    var board;
    var context;

    //snake head
    var snakeX = blocksize * 5;
    var snakeY = blocksize * 5;
    var velocityX = 0;
    var velocityY = 0;
    var snake = []

    //food
    var foodX;
    var foodY;

    var gameOver = false;


    window.onload = function(){
        board = document.getElementById("board");
        board.height = rows * blocksize;
        board.width = cols * blocksize;
        context = board.getContext("2d");

        snake.push([blocksize * 5, blocksize * 5])

        placeFood();
        document.addEventListener("keydown", changeDirection);
        setInterval(update, 100);
    }

    function update(){
        if(gameOver){
            velocityX = 0;
            velocityY = 0;
            return;
        }
        context.fillStyle = "black";
        context.fillRect(0,0, board.width, board.height);

        context.fillStyle = "red";
        context.fillRect(foodX, foodY, blocksize, blocksize);

        if(snake[0][0] == foodX && snake[0][1] == foodY){
            snake.push([foodX, foodY])
            placeFood();
        }

        snake[snake.length-1][0] = snakeX;
        snake[snake.length-1][1] = snakeY;
        snake.unshift(snake.pop());

        context.fillStyle = "lime";
        snakeX += velocityX * blocksize;
        snakeY += velocityY * blocksize;
        context.fillRect(snake[0][0], snake[0][1], blocksize, blocksize);
        for(let i = 0; i < snake.length; i++){
            context.fillRect(snake[i][0], snake[i][1], blocksize, blocksize);
        }

    if(snake[0][0] < 0 || snake[0][0] >= cols*blocksize || snake[0][1] < 0 || snake[0][1] >= rows*blocksize){
        // alert("Game Over\nScore: " + snake.length + "\nPress 'R' to restart");
        gameOver = true;
        scoreElement.textContent = "Score: " + snake.length;
        gameOverScreen.style.display = "block";   
    }

    for(let i = 1; i < snake.length; i++){
        if(snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]){
        //    alert("Game Over\nScore: " + snake.length + "\nPress 'R' to restart");
        gameOver = true;
        scoreElement.textContent = "Score: " + snake.length;
        gameOverScreen.style.display = "block";     
     }
    }


}

    function placeFood(){
        foodX = Math.floor(Math.random() * cols) * blocksize;
        foodY = Math.floor(Math.random() * rows) * blocksize;
    }

    function changeDirection(e){
        if(e.code == "ArrowUp" && velocityY != 1){
            velocityX = 0;
            velocityY = -1;
        }
        else if(e.code == "ArrowDown" && velocityY != -1){
            velocityX = 0;
            velocityY = 1;
        }
        else if(e.code == "ArrowLeft" && velocityX != 1){
            velocityX = -1;
            velocityY = 0;
        }
        else if(e.code == "ArrowRight" && velocityX != -1){
            velocityX = 1;
            velocityY = 0;
        }
        else if(e.key == 'r' && gameOver){
            reset();
        }
    }

    function reset()
    {
            snakeX = blocksize * 5;
            snakeY = blocksize * 5;
            while(snake.length > 0){
                snake.pop();
            }
            snake.push([blocksize * 5, blocksize * 5]);
            placeFood();
            gameOver = false;
            gameOverScreen.style.display = "none";
            
    }