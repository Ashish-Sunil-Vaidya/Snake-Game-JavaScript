let food = { x: 10, y: 10 };
let ltime = 0;
let speed = 6;
let snakeArr = [{ x: 13, y: 12 }];
let snake_direction = { x: 0, y: 0 };
let max = 2;
let min = 16;
let score_value = 0;
let highscore_value = 0;
const bgMusic = new Audio("./GameFiles/Snake Game - Theme Song.mp3");
bgMusic.volume = 1;
let play = false;
let foodElement = document.createElement('div');
let isStart = true;
let isCollide = false;
let isOpen = false;
let volume = 100;


const vol_inc = () => {
    if (volume <= 100) {
        volume += 10;
        bgMusic.volume = volume / 100;
        volumeval.style.width = `${volume}%`;
    }
}

const vol_dec = () => {
    if (volume >= 0) {
        volume -= 10;
        bgMusic.volume = volume / 100;
        volumeval.style.width = `${volume}%`;
    }
}

const start_game = () => {
    play = true;
    bgMusic.play();
    bgMusic.loop = true;
    startgame.style.opacity = '0';
    setTimeout(() => {
        startgame.style.transform = 'translateY(100%)';
    })
}

const game_settings = () => {
    if (isOpen) {
        settings.style.width = "0";
        settings.style.height = "0";
        settings.style.opacity = "0";
        isOpen = false
    }
    else {
        settings.style.width = "28%";
        settings.style.height = "90svh";
        settings.style.opacity = "1";
        isOpen = true;
    }
}

const resume_game = () => {
    play = true;
    resume.style.transform = "translateY(100%)";
    bgMusic.play();
};

const restart_game = () => {
    bgMusic.load();
    bgMusic.play();
    isCollide = false;
    play = true;
    snakeArr = [{ x: 13, y: 12 }];
    snake_direction = { x: 0, y: 0 };
    score_value = 0;
    score.innerText = score_value;
    endgame.style.transform = "translateY(100%)";
}

// console.log(document.get);

const mainFrame = (ctime) => {
    requestAnimationFrame(mainFrame);
    if ((ctime - ltime) / 1000 < 1 / speed) return;
    ltime = ctime;
    if (play) { gameEngine(); }
    else {
        bgMusic.pause();
    }
}
const collision = (snake) => {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }

    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }
}
const gameEngine = () => {
    // console.log(`Snake position : X - ${snakeArr[0].y} Y - ${snakeArr[0].x}`)
    // console.log(`Food position : X - ${food.y} Y - ${food.x}`)

    //Menu Overlay



    //Snake Mechanics
    if (collision(snakeArr)) {
        bgMusic.pause();
        new Audio('./GameFiles/crash.mp3').play();
        play = false
        endgame.style.display = "flex";
        endgame.style.transform = "translateY(0%)";
        isCollide = true;
    }

    //Snake Generator
    gameBoard.innerHTML = "";
    snakeArr.forEach((pos, index) => {
        let snakeArrPart = document.createElement('div');
        snakeArrPart.style.gridRowStart = pos.y;
        snakeArrPart.style.gridColumnStart = pos.x;
        (index == 0) ? snakeArrPart.classList.add('snake-head') : snakeArrPart.classList.add('snake-body');
        gameBoard.appendChild(snakeArrPart);
    }
    )
    // Snake Movement
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += snake_direction.x;
    snakeArr[0].y += snake_direction.y;



    //Food Mechanics
    foodElement.classList.add('snake-food');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    gameBoard.appendChild(foodElement);

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        new Audio('./GameFiles/chomp.mp3').play();
        snakeArr.unshift({ x: snakeArr[0].x + snake_direction.x, y: snakeArr[0].y + snake_direction.y })
        food.x = Math.floor(Math.random() * (max - min) + 18);
        food.y = Math.floor(Math.random() * (max - min) + 18);
        score_value += 1;
        score.innerText = score_value;
        if (score_value >= highscore_value) {
            highscore_value += 1;
            highscore.innerText = score_value;
        }
    }



}
requestAnimationFrame(mainFrame);
const snake_controls = addEventListener('keydown', (e) => {
    if (play) {
        switch (e.key) {
            case 'ArrowUp':
                if (snake_direction.x == 0 && snake_direction.y == 1) { return };
                snake_direction.x = 0;
                snake_direction.y = -1;
                break;
            case 'ArrowDown':
                if (snake_direction.x == 0 && snake_direction.y == -1) { return };
                snake_direction.x = 0;
                snake_direction.y = 1;
                break;
            case 'ArrowLeft':
                if (snake_direction.x == 1 && snake_direction.y == 0) { return };
                snake_direction.x = -1;
                snake_direction.y = 0;
                break;
            case 'ArrowRight':
                if (snake_direction.x == -1 && snake_direction.y == 0) { return };
                snake_direction.x = 1;
                snake_direction.y = 0;
                break;

            default: return;
        }
    }
}
)





const game_controls = addEventListener('keydown', (e) => {
    if (e.key == "Escape" && !isCollide) {
        if (isStart) {
            start_game();
            isStart = false;
        }
        else {
            if (!play) {
                bgMusic.play()
                play = true;
                resume.style.transform = "translateY(100%)";
                console.log("game resumed");
            }
            else {
                bgMusic.pause();
                play = false;
                resume.style.transform = "translateY(0%)";
                console.log("game paused");
            }
        }
    }
})
