/*
  The Game Project 
*/

// == Global Variable Declarations ==
var gameCharX;
var gameCharY;
var gameCharHeight;
var floorPosY;
var cameraPosX;
var verticalVelocity;

var isLeft;
var isRight;
var isFalling;
var isJumping;
var isPlummeting;

var isGameWon;
var isGameLost;
var isCharDead;
var gameScore;
var lives;
var flagpole;

var treesX;
var floors;
var canyons;
var clouds;
var suns;
var collectables;
var mountains;
var enemies;

var collectSound;
var fallSound;
var jumpSound;

function preload() {
  soundFormats('mp3', 'wav');

  // == Preload Game Sounds ==
  collectSound = loadSound('assets/collect.wav');
  fallSound = loadSound('assets/fall.mp3');
  jumpSound = loadSound('assets/jump.mp3');
}

function setup() {
  createCanvas(1024, 576);
  floorPosY = (height * 3) / 4;
  lives = 3;

  startGame();
}

function draw() {
  // == Camera Follows Player ==
  cameraPosX = gameCharX - width / 2;

  // == Draw Background Sky ==
  background(135, 206, 235);
  noStroke();

  // == Apply Camera Translation ==
  push();
  translate(-cameraPosX, 0);

  // == Rendering Floors ==
  drawFloors();

  // == Rendering Canyons ==
  for (let i = 0; i < canyons.length; i++) {
    drawCanyon(canyons[i]);
    checkCanyon(canyons[i]);
  }

  // == Rendering Sun ==
  for (let i = 0; i < suns.length; i++) {
    suns[i].draw();
  }

  // == Rendering Clouds ==
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].draw();
  }

  // == Rendering Mountains ==
  drawMountains();

  // == Rendering Trees ==
  drawTrees();

  // == Rendering Collectables ==
  for (let i = 0; i < collectables.length; i++) {
    drawCollectable(collectables[i]);
    checkCollectable(collectables[i]);
  }

  // == Rendering Flagpole ==
  flagpole.draw();

  // == Rendering Enemies ==
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw();

    let isContact = enemies[i].checkContact(gameCharX, gameCharY);
    if (isContact) {
      lives--;
      fallSound.play();
      if (lives > 0) {
        startGame();
        break;
      }
      if (lives < 1) {
        isCharDead = true;
        isGameLost = true;
        fallSound.stop();
        break;
      }
    }
  }

  // == Rendering Game Character ==
  if (!isCharDead) {
    drawCharacter();
  }

  pop();

  // == Display Lives in Top-Right Corner ==
  drawLiveCharacter();

  // == Display Score in Top-Left Corner ==
  drawScore();

  // == Display Game Over Text ==
  if (isGameLost) {
    drawText('Game Over', 'Press R to Restart');
  }

  // == Display You Won Text ==
  if (isGameWon) {
    drawText('🍩 Game Complete 🍩', 'Press R to Play Again');
  }

  // == Movement Logic ==
  if (!isPlummeting) {
    if (isLeft) gameCharX -= 6;
    if (isRight) gameCharX += 6;
  }

  // == Jumping and Falling Logic ==
  // Character Is Jumping
  if (isJumping) {
    gameCharY += verticalVelocity;
    verticalVelocity += 1;
    isFalling = true;

    // Character Lands on Floor
    if (gameCharY >= floorPosY) {
      gameCharY = floorPosY;
      isJumping = false;
      verticalVelocity = 0;
      isFalling = false;
    }
  }

  // == Plummeting Detection ==
  if (isPlummeting) {
    gameCharY += 2;

    if (!fallSound.isPlaying()) {
      fallSound.play();
    }
  }

  // == Check Flagpole ==
  if (!flagpole.isReached) {
    flagpole.check();
  }

  // == Winning Logic ==
  if (flagpole.isReached) {
    isGameWon = true;
  }

  // == Reset Game State Logic ==
  if (lives > 0) {
    checkPlayerDie();
  }
}

function keyPressed() {
  // == Moving with Arrow Keys ==
  if (!isPlummeting && !isGameWon && !isGameLost) {
    console.log('girdi');
    if (keyCode == 37) {
      isLeft = true;
    }

    if (keyCode == 39) {
      isRight = true;
    }

    // == Jumping with W, Up Arrow, and Spacebar ==
    if (
      !isFalling &&
      !isJumping &&
      (keyCode == 87 || keyCode == 38 || keyCode == 32)
    ) {
      isJumping = true;
      verticalVelocity = -18;
      jumpSound.play();
    }
  }
  // == Resetting Game with R Key ==
  if (keyCode === 82 && (isGameWon || isGameLost)) {
    lives = 3;
    startGame();
  }
}

function keyReleased() {
  if (keyCode === 37) {
    isLeft = false;
  }

  if (keyCode === 39) {
    isRight = false;
  }
}

function startGame() {
  // == Global Variable Initialisations ==
  gameCharX = width / 3;
  gameCharY = floorPosY;
  gameCharHeight = 72;
  cameraPosX = 0;
  verticalVelocity = 0;

  isLeft = false;
  isRight = false;
  isFalling = false;
  isJumping = false;
  isPlummeting = false;

  isGameWon = false;
  isGameLost = false;
  isCharDead = false;
  gameScore = 0;

  // World Objects
  flagpole = new Flagpole(4200, floorPosY, 150);

  enemies = [];
  enemies.push(new Enemy(100, floorPosY - 10, 120));
  enemies.push(new Enemy(1100, floorPosY - 10, 80));
  enemies.push(new Enemy(1600, floorPosY - 10, 100));
  enemies.push(new Enemy(2200, floorPosY - 10, 140));
  enemies.push(new Enemy(3400, floorPosY - 10, 100));
  enemies.push(new Enemy(3900, floorPosY - 10, 80));

  treesX = [-100, 100, 800, 1350, 2000, 2200, 2850, 3500, 3800, 4000];

  floors = [
    { x: -1000, width: 100 },
    { x: -200, width: 800 },
    { x: 700, width: 200 },
    { x: 1000, width: 400 },
    { x: 1500, width: 300 },
    { x: 1900, width: 600 },
    { x: 2600, width: 100 },
    { x: 2800, width: 100 },
    { x: 3000, width: 100 },
    { x: 3200, width: 400 },
    { x: 3700, width: 1000 },
    { x: 5400, width: 500 },
  ];

  canyons = [
    { x: -900, width: 700 },
    { x: 600, width: 100 },
    { x: 900, width: 100 },
    { x: 1400, width: 100 },
    { x: 1800, width: 100 },
    { x: 2500, width: 100 },
    { x: 2700, width: 100 },
    { x: 2900, width: 100 },
    { x: 3100, width: 100 },
    { x: 3600, width: 100 },
    { x: 4700, width: 700 },
  ];

  clouds = [];
  for (let i = 0; i < 15; i++) {
    let x = 400 + i * 400;
    let y = random(height / 2 - 220, height / 2 - 100);
    let w = random([80, 100, 120, 140, 160]);
    clouds.push(new Cloud(x, y, w));
  }

  suns = [];
  for (let i = 0; i < 20; i++) {
    let x = 400 + i * 400;
    let y = random(height / 2 - 220, height / 2 - 100);
    let d = random([5, 10, 15, 20]);
    suns.push(new Sun(x, y, d));
  }

  collectables = [
    { x: 450, y: floorPosY - 40, isFound: false },
    { x: 650, y: floorPosY - 120, isFound: false },
    { x: 800, y: floorPosY - 40, isFound: false },
    { x: 950, y: floorPosY - 120, isFound: false },
    { x: 1200, y: floorPosY - 40, isFound: false },
    { x: 1450, y: floorPosY - 120, isFound: false },
    { x: 1600, y: floorPosY - 40, isFound: false },
    { x: 1850, y: floorPosY - 120, isFound: false },
    { x: 2100, y: floorPosY - 40, isFound: false },
    { x: 2400, y: floorPosY - 40, isFound: false },
    { x: 2550, y: floorPosY - 120, isFound: false },
    { x: 2750, y: floorPosY - 120, isFound: false },
    { x: 2950, y: floorPosY - 120, isFound: false },
    { x: 3300, y: floorPosY - 40, isFound: false },
    { x: 3650, y: floorPosY - 120, isFound: false },
    { x: 3800, y: floorPosY - 40, isFound: false },
    { x: 4050, y: floorPosY - 120, isFound: false },
  ];

  mountains = [
    {
      x1: 200,
      y1: floorPosY - 10,
      x2: 300,
      y2: floorPosY - 120,
      x3: 400,
      y3: floorPosY - 10,
      color: [255, 188, 133],
    },
    {
      x1: 40,
      y1: floorPosY - 10,
      x2: 160,
      y2: floorPosY - 200,
      x3: 300,
      y3: floorPosY - 10,
      color: [251, 165, 95],
    },
    {
      x1: 300,
      y1: floorPosY - 10,
      x2: 400,
      y2: floorPosY - 160,
      x3: 500,
      y3: floorPosY - 10,
      color: [245, 139, 51],
    },
    {
      x1: 1100,
      y1: floorPosY - 10,
      x2: 1200,
      y2: floorPosY - 160,
      x3: 1300,
      y3: floorPosY - 10,
      color: [245, 139, 51],
    },
    {
      x1: 1550,
      y1: floorPosY - 10,
      x2: 1650,
      y2: floorPosY - 120,
      x3: 1750,
      y3: floorPosY - 10,
      color: [251, 165, 95],
    },
    {
      x1: 2000,
      y1: floorPosY - 10,
      x2: 2140,
      y2: floorPosY - 200,
      x3: 2280,
      y3: floorPosY - 10,
      color: [251, 165, 95],
    },
    {
      x1: 2200,
      y1: floorPosY - 10,
      x2: 2300,
      y2: floorPosY - 160,
      x3: 2400,
      y3: floorPosY - 10,
      color: [245, 139, 51],
    },
    {
      x1: 3300,
      y1: floorPosY - 10,
      x2: 3400,
      y2: floorPosY - 160,
      x3: 3500,
      y3: floorPosY - 10,
      color: [245, 139, 51],
    },
    {
      x1: 3800,
      y1: floorPosY - 10,
      x2: 3940,
      y2: floorPosY - 200,
      x3: 4080,
      y3: floorPosY - 10,
      color: [251, 165, 95],
    },
    {
      x1: 4000,
      y1: floorPosY - 10,
      x2: 4100,
      y2: floorPosY - 160,
      x3: 4200,
      y3: floorPosY - 10,
      color: [245, 139, 51],
    },
  ];
}

function checkPlayerDie() {
  if (gameCharY - gameCharHeight > height) {
    lives--;
    fallSound.stop();

    if (lives > 0) {
      startGame();
    } else {
      isGameLost = true;
      isPlummeting = false;
    }
  }
}

function drawCharacter() {
  if (isLeft && isFalling) {
    // Jumping Left
    // Body
    fill(200, 0, 4);
    rect(gameCharX - 10, gameCharY - 72, 20, 60, 6);

    // Straw
    fill(243, 156, 18);
    rect(gameCharX - 10, gameCharY - 66, 20, 4);

    // Eyes
    fill(255);
    ellipse(gameCharX - 6, gameCharY - 54, 10, 10);
    fill(0);
    ellipse(gameCharX - 6, gameCharY - 54, 5, 5);

    // Smirk
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(gameCharX - 11, gameCharY - 39, 12, 8, 0, PI / 3);
    noStroke();

    // Arms
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameCharX + 4, gameCharY - 44, gameCharX + 10, gameCharY - 34);
    pop();

    // Legs
    fill(255, 220, 180);
    push();
    fill(255, 220, 180);
    stroke(255, 220, 180);
    strokeWeight(4);
    line(gameCharX - 6, gameCharY - 12, gameCharX, gameCharY - 6);
    line(gameCharX + 4, gameCharY - 12, gameCharX + 10, gameCharY - 6);
    pop();

    // Shoes
    fill(52, 73, 94);
    ellipse(gameCharX, gameCharY - 14 + 10, 10, 6);
    ellipse(gameCharX + 10, gameCharY - 14 + 10, 10, 6);
  } else if (isRight && isFalling) {
    // Jumping Right
    // Body
    fill(200, 0, 4);
    rect(gameCharX - 10, gameCharY - 72, 20, 60, 6);

    // Straw
    fill(243, 156, 18);
    rect(gameCharX - 10, gameCharY - 66, 20, 4);

    // Eyes
    fill(255);
    ellipse(gameCharX + 6, gameCharY - 54, 10, 10);
    fill(0);
    ellipse(gameCharX + 6, gameCharY - 54, 5, 5);

    // Smirk
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(gameCharX + 10, gameCharY - 39, 12, 8, PI - PI / 3, PI);
    noStroke();

    // Arms
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameCharX - 4, gameCharY - 44, gameCharX - 10, gameCharY - 34);
    pop();

    // Legs
    fill(255, 184, 102);
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameCharX - 4, gameCharY - 12, gameCharX - 10, gameCharY - 6);
    line(gameCharX + 6, gameCharY - 12, gameCharX, gameCharY - 6);
    pop();

    // Shoes
    fill(52, 73, 94);
    ellipse(gameCharX - 10, gameCharY - 4, 10, 6);
    ellipse(gameCharX, gameCharY - 4, 10, 6);
  } else if (isLeft) {
    // Walking Left
    // Body
    fill(200, 0, 4);
    rect(gameCharX - 10, gameCharY - 68, 20, 60, 6);

    // Straw
    fill(243, 156, 18);
    rect(gameCharX - 10, gameCharY - 62, 20, 4);

    // Eyes
    fill(255);
    ellipse(gameCharX - 6, gameCharY - 50, 10, 10);
    fill(0);
    ellipse(gameCharX - 6, gameCharY - 50, 5, 5);

    // Smirk
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(gameCharX - 11, gameCharY - 35, 12, 8, 0, PI / 3);
    noStroke();

    // Arms
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameCharX + 4, gameCharY - 40, gameCharX + 2, gameCharY - 30);
    pop();

    // Legs
    fill(255, 184, 102);
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameCharX - 6, gameCharY - 8, gameCharX - 8, gameCharY - 1);
    line(gameCharX + 4, gameCharY - 8, gameCharX + 6, gameCharY - 1);
    pop();

    // Shoes
    fill(52, 73, 94);
    ellipse(gameCharX - 10, gameCharY - 10 + 10, 10, 6);
    ellipse(gameCharX + 4, gameCharY - 10 + 10, 10, 6);
  } else if (isRight) {
    // Walking Right
    // Body
    fill(200, 0, 4);
    rect(gameCharX - 10, gameCharY - 68, 20, 60, 6);

    // Straw
    fill(243, 156, 18);
    rect(gameCharX - 10, gameCharY - 62, 20, 4);

    // Eyes
    fill(255);
    ellipse(gameCharX + 6, gameCharY - 50, 10, 10);
    fill(0);
    ellipse(gameCharX + 6, gameCharY - 50, 5, 5);

    // Smirk
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(gameCharX + 10, gameCharY - 35, 12, 8, PI - PI / 3, PI);
    noStroke();

    // Arms
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameCharX - 4, gameCharY - 40, gameCharX - 2, gameCharY - 30);
    pop();

    // Legs
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameCharX - 4, gameCharY - 8, gameCharX - 6, gameCharY - 1);
    line(gameCharX + 6, gameCharY - 8, gameCharX + 8, gameCharY - 1);
    pop();

    // Shoes
    fill(52, 73, 94);
    ellipse(gameCharX - 4, gameCharY - 10 + 10, 10, 6);
    ellipse(gameCharX + 10, gameCharY - 10 + 10, 10, 6);
  } else if (isFalling || isPlummeting) {
    // Jumping Facing Forwards
    // Body
    fill(200, 0, 4);
    rect(gameCharX - 16, gameCharY - 72, 32, 60, 8);

    // Straw
    fill(243, 156, 18);
    rect(gameCharX - 16, gameCharY - 66, 32, 4);

    // Eyes
    fill(255);
    ellipse(gameCharX - 8, gameCharY - 54, 10, 10);
    ellipse(gameCharX + 8, gameCharY - 54, 10, 10);
    fill(0);
    ellipse(gameCharX - 8, gameCharY - 54, 5, 5);
    ellipse(gameCharX + 8, gameCharY - 54, 5, 5);

    // Smirk
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(gameCharX, gameCharY - 39, 12, 8, 0, PI);
    noStroke();

    // Arms
    fill(255, 184, 102);
    rect(gameCharX - 20, gameCharY - 44, 4, 4);
    rect(gameCharX - 22, gameCharY - 44, 4, 12, 3);
    rect(gameCharX + 16, gameCharY - 44, 4, 4);
    rect(gameCharX + 18, gameCharY - 44, 4, 12, 3);

    // Legs
    fill(255, 184, 102);
    rect(gameCharX - 8, gameCharY - 12, 4, 8);
    rect(gameCharX + 4, gameCharY - 12, 4, 8);

    // Shoes
    fill(52, 73, 94);
    ellipse(gameCharX - 6, gameCharY - 14 + 10, 12, 6);
    ellipse(gameCharX + 6, gameCharY - 14 + 10, 12, 6);
  } else {
    // Standing Front Facing
    // Body
    fill(200, 0, 4);
    rect(gameCharX - 16, gameCharY - 68, 32, 60, 8);

    // Straw
    fill(243, 156, 18);
    rect(gameCharX - 16, gameCharY - 62, 32, 4);

    // Eyes
    fill(255);
    ellipse(gameCharX - 8, gameCharY - 50, 10, 10);
    ellipse(gameCharX + 8, gameCharY - 50, 10, 10);
    fill(0);
    ellipse(gameCharX - 8, gameCharY - 50, 5, 5);
    ellipse(gameCharX + 8, gameCharY - 50, 5, 5);

    // Smirk
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(gameCharX, gameCharY - 35, 12, 8, 0, PI);
    noStroke();

    // Arms
    fill(255, 191, 118);
    rect(gameCharX - 20, gameCharY - 40, 4, 4);
    rect(gameCharX - 22, gameCharY - 40, 4, 12, 3);
    rect(gameCharX + 16, gameCharY - 40, 4, 4);
    rect(gameCharX + 18, gameCharY - 40, 4, 12, 3);

    // Legs
    fill(255, 184, 102);
    rect(gameCharX - 8, gameCharY - 8, 4, 8);
    rect(gameCharX + 4, gameCharY - 8, 4, 8);

    // Shoes
    fill(52, 73, 94);
    ellipse(gameCharX - 6, gameCharY - 10 + 10, 12, 6);
    ellipse(gameCharX + 6, gameCharY - 10 + 10, 12, 6);
  }
}

function drawTrees() {
  for (let i = 0; i < treesX.length; i++) {
    fill(63, 119, 128);
    rect(treesX[i] - 10, floorPosY - 60, 20, 60);
    fill(12, 83, 113);
    rect(treesX[i] - 50, floorPosY - 100, 100, 40, 40);
    rect(treesX[i] - 40, floorPosY - 140, 80, 40, 30);
    rect(treesX[i] - 30, floorPosY - 180, 60, 40, 30);
  }
}

function drawFloors() {
  for (let i = 0; i < floors.length; i++) {
    let floorX = floors[i].x;
    let floorWidth = floors[i].width;
    let floorTopY = floorPosY;
    let floorBottomY = floorPosY + 20;
    let floorSoilHeight = height - floorBottomY;

    // == Floor Top ==
    fill(179, 85, 23);
    rect(floorX, floorTopY, floorWidth, 20, 24, 24, 0, 0);

    // == Floor Base Soil ==
    fill(255, 198, 142);
    rect(floorX, floorBottomY, floorWidth, floorSoilHeight);

    // == Generate Grains ==
    if (!floors[i].grains) {
      floors[i].grains = [];

      let dotCount = max(3, Math.floor(floorWidth / 12));
      let margin = 8;
      let usableWidth = max(10, floorWidth - margin * 2);
      let spacing = usableWidth / (dotCount - 1);

      for (var j = 0; j < dotCount; j++) {
        let grainX = floorX + margin + j * spacing;
        let grainY = random(
          floorBottomY + 6,
          floorBottomY + floorSoilHeight - 6,
        );
        let grainWidth = random(7, 12);
        let grainHeight = random(grainWidth * 0.9, grainWidth * 1.1);
        let grainAlpha = random(20, 100);

        floors[i].grains.push({
          x: grainX,
          y: grainY,
          width: grainWidth,
          height: grainHeight,
          alpha: grainAlpha,
        });
      }
    }

    // == Draw Grains ==
    noStroke();
    for (var g = 0; g < floors[i].grains.length; g++) {
      var grain = floors[i].grains[g];
      fill(179, 85, 23, grain.alpha);
      ellipse(grain.x, grain.y, grain.width, grain.height);
    }
  }
}

function drawCanyon(canyon) {
  fill(100, 151, 177);
  rect(canyon.x, floorPosY + 60, canyon.width, height - floorPosY - 60);
}

function checkCanyon(canyon) {
  let canyonStart = canyon.x;
  let canyonEnd = canyon.x + canyon.width;

  // == Plummeting Detection ==
  if (
    gameCharX > canyonStart &&
    gameCharX < canyonEnd &&
    gameCharY >= floorPosY &&
    gameCharY + gameCharHeight < height
  ) {
    isPlummeting = true;
  }
}

function drawMountains() {
  for (let i = 0; i < mountains.length; i++) {
    fill(...mountains[i].color);
    stroke(...mountains[i].color);
    strokeWeight(20);
    strokeJoin(ROUND);
    triangle(
      mountains[i].x1,
      mountains[i].y1,
      mountains[i].x2,
      mountains[i].y2,
      mountains[i].x3,
      mountains[i].y3,
    );
  }
  noStroke();
}

function drawCollectable(collectable) {
  if (!collectable.isFound) {
    // == Base Doughnut Shape ==
    noFill();
    stroke(240, 158, 90);
    strokeWeight(4);
    ellipse(collectable.x, collectable.y, 40, 40);

    // == Chocolate Coating ==
    noFill();
    stroke(145, 48, 36);
    strokeWeight(12);
    ellipse(collectable.x, collectable.y, 24, 24);
    noStroke();

    // == Yellow Sprinkle ==
    fill(253, 171, 72);
    ellipse(collectable.x - 6, collectable.y - 10, 4);
    ellipse(collectable.x + 10, collectable.y - 6, 4);
    stroke(253, 171, 72);
    strokeWeight(3);
    line(
      collectable.x - 10,
      collectable.y - 4,
      collectable.x - 12,
      collectable.y,
    );
    noStroke();

    // == Blue Sprinkle ==
    fill(111, 148, 209);
    ellipse(collectable.x - 6, collectable.y - 10, 4);
    stroke(111, 148, 209);
    strokeWeight(3);
    line(
      collectable.x - 4,
      collectable.y + 10,
      collectable.x,
      collectable.y + 12,
    );

    // == Green Sprinkle ==
    stroke(137, 171, 128);
    line(
      collectable.x,
      collectable.y - 12,
      collectable.x + 4,
      collectable.y - 12,
    );
    noStroke();
    fill(137, 171, 128);
    ellipse(collectable.x + 8, collectable.y + 10, 4);

    // == Orange Sprinkle ==
    ellipse(collectable.x - 10, collectable.y + 6, 4);
    stroke(255, 120, 69);
    strokeWeight(3);
    line(
      collectable.x + 12,
      collectable.y,
      collectable.x + 10,
      collectable.y + 4,
    );
    noStroke();
  }
}

function checkCollectable(collectable) {
  // == Collection Detection ==
  if (
    !collectable.isFound &&
    dist(gameCharX, gameCharY, collectable.x, collectable.y) < 50
  ) {
    collectable.isFound = true;
    gameScore += 1;
    collectSound.play();
  }
}

function drawScore() {
  fill(12, 83, 113);
  textSize(24);
  textFont('Georgia');
  textAlign(LEFT, TOP);
  text('Score: ' + gameScore, 20, 20);
}

function drawText(header, description) {
  // == Overlay Background ==
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  // == Header ==
  textFont('Georgia');
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(255);
  text(header, width / 2, height / 2 - 30);

  // == Description ==
  textSize(24);
  text(description, width / 2, height / 2 + 20);
}

function drawLiveCharacter() {
  for (let i = 0; i < lives; i++) {
    let x = width - 40 - i * 50;
    let y = 20;
    // == Head ==
    fill(200, 0, 4);
    rect(x, y, 30, 30, 6);

    // == Eyes ==
    fill(255);
    ellipse(x + 9, y + 10, 8, 8);
    ellipse(x + 21, y + 10, 8, 8);
    fill(0);
    ellipse(x + 9, y + 10, 4, 4);
    ellipse(x + 21, y + 10, 4, 4);

    // == Smirk ==
    noFill();
    stroke(0);
    strokeWeight(1.5);
    arc(x + 15, y + 20, 10, 6, 0, PI);
    noStroke();
  }
}

function drawEnemy(x, y) {
  let choco = color(90, 58, 46);
  let chocoDeep = color(65, 42, 34);
  let glaze = color(120, 78, 60);
  let cream = color(255, 240, 220);

  // == Body ==
  push();
  noStroke();
  fill(choco);
  rectMode(CENTER);
  rect(x, y - 18, 48, 45, 12);

  // == Chocolate Drips ==
  rect(x - 15, y + 3, 6, 12, 3);
  rect(x + 8, y + 5, 5, 9, 3);
  rect(x + 16, y + 2, 7, 13, 3);

  // == Top Glaze Highlight ==
  fill(glaze);
  arc(x, y - 41, 36, 18, 0, PI, CHORD);
  pop();

  // == Eyes (Blink) ==
  let blink = frameCount % 120 < 8;
  push();
  fill(cream);
  if (!blink) {
    ellipse(x - 11, y - 26, 8, 9);
    ellipse(x + 11, y - 26, 8, 9);
    fill(20);
    let px = -2;
    ellipse(x - 11 + px, y - 25, 3, 4);
    ellipse(x + 11 + px, y - 25, 3, 4);
  } else {
    fill(20);
    rect(x - 11, y - 26, 8, 1, 1);
    rect(x + 11, y - 26, 8, 1, 1);
  }
  pop();

  // == Eyebrows ==
  push();
  stroke(20);
  strokeWeight(1);
  line(x - 15, y - 32, x - 6, y - 29);
  line(x + 15, y - 32, x + 6, y - 29);

  pop();

  // == Mouth ==
  push();
  fill(20);
  rectMode(CENTER);
  rect(x, y - 15, 18, 8, 2);

  // == Teeth ==
  fill(cream);
  triangle(x - 6, y - 19, x - 3, y - 19, x - 5, y - 16);
  triangle(x, y - 19, x + 3, y - 19, x + 2, y - 16);
  triangle(x + 6, y - 19, x + 9, y - 19, x + 8, y - 16);
  pop();

  // == Chocolate Shine ==
  push();
  noStroke();
  fill(255, 255, 255, 25);
  ellipse(x - 18, y - 29, 8, 5);
  ellipse(x + 15, y - 9, 6, 4);
  pop();

  // == Arms ==
  push();
  fill(chocoDeep);
  ellipse(x - 27, y - 18, 8, 10);
  ellipse(x + 27, y - 18, 8, 10);
  pop();
}

// == FlagPole Constructor ==
function Flagpole(poleX, poleY, poleHeight) {
  this.x = poleX;
  this.y = poleY;
  this.height = poleHeight;
  this.isReached = false;

  this.draw = function () {
    push();

    // == Pole ==
    strokeWeight(6);
    stroke(179, 85, 23);
    line(this.x, this.y, this.x, this.y - this.height);

    // == Pole Top ==
    fill(255, 140, 0);
    ellipse(this.x, this.y - this.height, 14);

    // == Flag ==
    noStroke();
    let flagColor = color(220, 50, 50);
    fill(flagColor);

    let flagWidth = 50;
    let flagHeight = 30;
    let zigzag = 5;

    // == Flag Y Offset if Reached ==
    let yOffset = this.isReached ? this.height - 20 : 0;

    beginShape();
    vertex(this.x, this.y - this.height + yOffset);
    for (let i = 0; i < flagHeight; i += zigzag) {
      let xOffset = (i / zigzag) % 2 === 0 ? flagWidth : flagWidth - 10;
      vertex(this.x + xOffset, this.y - this.height + i + yOffset);
    }
    vertex(this.x, this.y - this.height + flagHeight + yOffset);
    endShape(CLOSE);

    pop();
  };
  this.check = function () {
    var d = abs(gameCharX - this.x);
    if (d < 15) {
      this.isReached = true;
    }
  };
}

// == Enemy Constructor ==
function Enemy(startX, startY, range) {
  this.x = startX;
  this.y = startY;
  this.range = range;

  this.currentX = startX;
  this.inc = 1;

  this.update = function () {
    this.currentX += this.inc;
    if (this.currentX >= this.x + this.range) {
      this.inc = -1;
    } else if (this.currentX < this.x) {
      this.inc = 1;
    }
  };
  this.draw = function () {
    this.update();
    drawEnemy(this.currentX, this.y);
  };
  this.checkContact = function (gc_x, gc_y) {
    let d = dist(gc_x, gc_y, this.currentX, this.y);
    if (d < 40) {
      return true;
    }
    return false;
  };
}

// == Sun Constructor ==
function Sun(sunX, sunY, sunDiameter) {
  this.x = sunX;
  this.y = sunY;
  this.diameter = sunDiameter;

  this.draw = function () {
    fill(253, 157, 83, 100);
    ellipse(this.x, this.y, this.diameter * 8, this.diameter * 8);
    fill(254, 182, 81, 200);
    ellipse(this.x, this.y, this.diameter * 6, this.diameter * 6);
    fill(254, 205, 89, 100);
    ellipse(this.x, this.y, this.diameter * 4, this.diameter * 4);
  };
}

// == Cloud Constructor ==
function Cloud(x, y, width) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = width / 4;
  this.ellipseSize = this.height * 2;

  this.draw = function () {
    fill(255, 234, 213);
    rect(this.x, this.y, this.width, this.height, 24);
    ellipse(
      this.x + this.width / 2,
      this.y,
      this.ellipseSize,
      this.ellipseSize,
    );
  };
}
