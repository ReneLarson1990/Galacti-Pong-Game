let gameState = 'start';
let paddle_1 = document.querySelector('.paddle_1');
let paddle_2 = document.querySelector('.paddle_2');
let board = document.querySelector('.board');
let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball');
let score_1 = document.querySelector('.player_1_score');
let score_2 = document.querySelector('.player_2_score');
let message = document.querySelector('.message');
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
let board_coord = board.getBoundingClientRect();
let paddle_common = document.querySelector('.paddle').getBoundingClientRect();   
let dx = Math.floor(Math.random() * 4) + 2;
let dy = Math.floor(Math.random() * 4) + 2;
let dxd = Math.floor(Math.random() * 1);
let dyd = Math.floor(Math.random() * 1);
  
document.addEventListener('keydown', (e) => {
if (e.key == 'Enter') {
    gameState = gameState == 'start' ? 'play' : 'start';
    if (gameState == 'play') {
    message.innerHTML = 'Game Started';
    message.style.center = 50 + 'vw';
    requestAnimationFrame(() => {
        dx = Math.floor(Math.random() * 4) + 2;
        dy = Math.floor(Math.random() * 4) + 2;
        dxd = Math.floor(Math.random() * 1);
        dyd = Math.floor(Math.random() * 1);
        moveBall(dx, dy, dxd, dyd);
    });
    }
}
if (gameState == 'play') {
    if (e.key == '') {
    paddle_1.style.top =
        Math.max(
        board_coord.top,
        paddle_1_coord.top - window.innerHeight * 0.03
        ) + 'px';
    paddle_1_coord = paddle_1.getBoundingClientRect();
    }
    if (e.key == '') {
    paddle_1.style.top =
        Math.min(
        board_coord.bottom - paddle_common.height,
        paddle_1_coord.top + window.innerHeight * 0.03
        ) + 'px';
    paddle_1_coord = paddle_1.getBoundingClientRect();
    }
  
    if (e.key == 'ArrowUp') {
    paddle_2.style.top =
        Math.max(
        board_coord.top,
        paddle_2_coord.top - window.innerHeight * 0.1
        ) + 'px';
    paddle_2_coord = paddle_2.getBoundingClientRect();
    }
    if (e.key == 'ArrowDown') {
    paddle_2.style.top =
        Math.min(
        board_coord.bottom - paddle_common.height,
        paddle_2_coord.top + window.innerHeight * 0.1
        ) + 'px';
    paddle_2_coord = paddle_2.getBoundingClientRect();
    }
}
});
  
function moveBall(dx, dy, dxd, dyd) {

let paddle_1_center = paddle_1_coord.top + (paddle_common.height / 2);

  // Determine whether to move the paddle up or down
  let shouldMoveUp = Math.random() < 0.5;
  let shouldMoveDown = Math.random() < 0.5;


  // Add some randomness to the paddle's position
  let moveAmount = window.innerHeight * 0.2 * Math.random();
  if (shouldMoveUp) {
    // Move the paddle up
    paddle_1.style.top =
      Math.max(
        board_coord.top,
        paddle_1_coord.top - moveAmount
      ) + 'px';
  } else {
    // Move the paddle down
    paddle_1.style.top =
      Math.min(
        board_coord.bottom - paddle_common.height,
        paddle_1_coord.top + moveAmount
      ) + 'px';
  }

  // Update the paddle's position
  paddle_1_coord = paddle_1.getBoundingClientRect();

if (ball_coord.top <= board_coord.top) {
    dyd = 1;
}
if (ball_coord.bottom >= board_coord.bottom) {
    dyd = 0;
}

let paddle1HitSound = document.querySelector('#paddle1HitSound');

if (
    ball_coord.left <= paddle_1_coord.right &&
    ball_coord.top >= paddle_1_coord.top &&
    ball_coord.bottom <= paddle_1_coord.bottom
) {
    paddle1HitSound.currentTime = 0;
    paddle1HitSound.play();
    paddle1HitSound.volume = 0.2;
    

    dxd = 1;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
}

let paddle2HitSound = document.querySelector('#paddle2HitSound');

if (
    ball_coord.right >= paddle_2_coord.left &&
    ball_coord.top >= paddle_2_coord.top &&
    ball_coord.bottom <= paddle_2_coord.bottom
) {
    paddle2HitSound.currentTime = 0;
    paddle2HitSound.play();
    paddle2HitSound.volume = 0.2;


    dxd = 0;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
}
//scoring code 
if (
    ball_coord.left <= board_coord.left ||
    ball_coord.right >= board_coord.right
) {
    if (ball_coord.left <= board_coord.left) {
    score_2.innerHTML = +score_2.innerHTML + 1;
    document.getElementById('player2ScoreSound').play();
    player2ScoreSound.volume = 0.3;
    } else {
    score_1.innerHTML = +score_1.innerHTML + 1;
    document.getElementById('player1ScoreSound').play();
    player1ScoreSound.volume = 0.3;
    }

    gameState = 'start';
    
    ball_coord = initial_ball_coord;
    ball.style = initial_ball.style;

    message.innerHTML = 'Press Enter to Play';
    message.style.center = 50 + 'vw';
    return;
}
ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
ball_coord = ball.getBoundingClientRect();
requestAnimationFrame(() => {
    moveBall(dx, dy, dxd, dyd);
});
}
//obstacles codes 


// background music 
function AutoPlayBackgroundMusic() {
    let bgMusic = new Audio('./Assests/birthofahero.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.1;
    bgMusic.play();
  }
  
  document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
      AutoPlayBackgroundMusic();
    }
  });
