/*
  Project: The Game Project - Midterm Assignment  
  Description: A platformer game where the player collects doughnuts and avoids falling.
  All sections between START and END comments were personally written without assistance.
*/

// == Global Variable Declarations ==
var gameChar_x;
var gameChar_y;
var floorPos_y;

var isGameWon;

var cameraPos_x;

var trees_x;
var trees_y;

var floors;
var clouds;
var suns;
var collectables;
var mountains;

var score;
var lives;

var isLeft;
var isRight;
var isFalling;
var isJumping;
var isPlummeting;
var verticalVelocity;

var collectSound;
var fallSound;
var jumpSound;

// == Preload Game Sounds ==
function preload() {
  soundFormats('mp3', 'wav');
  collectSound = loadSound('assets/collect.wav');
  fallSound = loadSound('assets/fall.mp3');
  jumpSound = loadSound('assets/jump.mp3');
}

function setup() {
  // == Global Variable Initialisations ==
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 3;
  gameChar_y = floorPos_y;

  isGameWon = false;

  cameraPos_x = 0;

  score = 0;
  lives = 3;

  isLeft = false;
  isRight = false;
  isFalling = false;
  isJumping = false;
  isPlummeting = false;
  verticalVelocity = 0;

  trees_x = [-100, 100, 800, 1350, 2000, 2200, 2850, 3500, 3800, 4000];
  trees_y = floorPos_y;

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
    { x: 3700, width: 600 },
    { x: 5000, width: 100 },
  ];

  clouds = [
    { x: 150, y: 100, width: 120 },
    { x: 600, y: 200, width: 160 },
    { x: 900, y: 120, width: 80 },
    { x: 1200, y: 200, width: 120 },
    { x: 1700, y: 100, width: 80 },
    { x: 2200, y: 160, width: 160 },
    { x: 2500, y: 120, width: 80 },
    { x: 3000, y: 140, width: 120 },
    { x: 3400, y: 100, width: 80 },
    { x: 3900, y: 160, width: 160 },
  ];

  suns = [
    { x: 300, y: height / 2 - 200, diameter: 10 },
    { x: 700, y: height / 2 - 140, diameter: 15 },
    { x: 1000, y: height / 2 - 200, diameter: 5 },
    { x: 1500, y: height / 2 - 100, diameter: 20 },
    { x: 2000, y: height / 2 - 180, diameter: 5 },
    { x: 2600, y: height / 2 - 120, diameter: 10 },
    { x: 3000, y: height / 2 - 140, diameter: 15 },
    { x: 3500, y: height / 2 - 100, diameter: 10 },
    { x: 4000, y: height / 2 - 180, diameter: 25 },
    { x: 4400, y: height / 2 - 200, diameter: 10 },
  ];

  collectables = [
    { x: 500, y: floorPos_y - 40, isFound: false },
    { x: 730, y: floorPos_y - 40, isFound: false },
    { x: 1200, y: floorPos_y - 40, isFound: false },
    { x: 1600, y: floorPos_y - 40, isFound: false },
    { x: 2100, y: floorPos_y - 40, isFound: false },
    { x: 2400, y: floorPos_y - 40, isFound: false },
    { x: 2550, y: floorPos_y - 120, isFound: false },
    { x: 2750, y: floorPos_y - 120, isFound: false },
    { x: 2950, y: floorPos_y - 120, isFound: false },
    { x: 3300, y: floorPos_y - 40, isFound: false },
    { x: 4000, y: floorPos_y - 120, isFound: false },
    { x: 4200, y: floorPos_y - 120, isFound: false },
  ];

  mountains = [
    {
      x1: 200,
      y1: floorPos_y - 10,
      x2: 300,
      y2: floorPos_y - 120,
      x3: 400,
      y3: floorPos_y - 10,
      color: [255, 188, 133],
    },
    {
      x1: 40,
      y1: floorPos_y - 10,
      x2: 160,
      y2: floorPos_y - 200,
      x3: 300,
      y3: floorPos_y - 10,
      color: [251, 165, 95],
    },
    {
      x1: 300,
      y1: floorPos_y - 10,
      x2: 400,
      y2: floorPos_y - 160,
      x3: 500,
      y3: floorPos_y - 10,
      color: [245, 139, 51],
    },
    {
      x1: 1100,
      y1: floorPos_y - 10,
      x2: 1200,
      y2: floorPos_y - 160,
      x3: 1300,
      y3: floorPos_y - 10,
      color: [245, 139, 51],
    },
    {
      x1: 1550,
      y1: floorPos_y - 10,
      x2: 1650,
      y2: floorPos_y - 120,
      x3: 1750,
      y3: floorPos_y - 10,
      color: [251, 165, 95],
    },
    {
      x1: 2000,
      y1: floorPos_y - 10,
      x2: 2140,
      y2: floorPos_y - 200,
      x3: 2280,
      y3: floorPos_y - 10,
      color: [251, 165, 95],
    },
    {
      x1: 2200,
      y1: floorPos_y - 10,
      x2: 2300,
      y2: floorPos_y - 160,
      x3: 2400,
      y3: floorPos_y - 10,
      color: [245, 139, 51],
    },
    {
      x1: 3300,
      y1: floorPos_y - 10,
      x2: 3400,
      y2: floorPos_y - 160,
      x3: 3500,
      y3: floorPos_y - 10,
      color: [245, 139, 51],
    },
    {
      x1: 3800,
      y1: floorPos_y - 10,
      x2: 3940,
      y2: floorPos_y - 200,
      x3: 4080,
      y3: floorPos_y - 10,
      color: [251, 165, 95],
    },
    {
      x1: 4000,
      y1: floorPos_y - 10,
      x2: 4100,
      y2: floorPos_y - 160,
      x3: 4200,
      y3: floorPos_y - 10,
      color: [245, 139, 51],
    },
  ];
}

function draw() {
  // == Camera Follows Player ==
  cameraPos_x = gameChar_x - width / 2;

  // == Draw Background Sky ==
  background(135, 206, 235);
  noStroke();

  // START: Original Section
  // This section was implemented by me without assistance.

  // == Display Game Objective ==
  if (score === 0 && lives === 3 && !isGameWon) {
    fill(0, 0, 0, 80);
    rect(0, 0, width, height);

    fill(255);
    textSize(20);
    textAlign(CENTER, TOP);
    text('Collect all the 12 doughnuts to win the game!', width / 2, 20);
  }

  // == Apply Camera Translation ==
  push();
  translate(-cameraPos_x, 0);

  // == Rendering Floors ==
  for (var i = 0; i < floors.length; i++) {
    // Top
    fill(179, 85, 23);
    rect(floors[i].x, floorPos_y, floors[i].width, 20, 24, 24, 0, 0);

    // Bottom
    fill(255, 198, 142);
    rect(
      floors[i].x,
      floorPos_y + 20,
      floors[i].width,
      height - floorPos_y - 20,
    );
  }

  // == Rendering Canyons ==
  for (var i = 0; i < floors.length - 1; i++) {
    let currentFloor = floors[i];
    let nextFloor = floors[i + 1];

    let canyonStart = currentFloor.x + currentFloor.width;
    let canyonEnd = nextFloor.x;
    let canyonWidth = canyonEnd - canyonStart;

    if (canyonWidth > 0) {
      fill(100, 151, 177);
      rect(canyonStart, floorPos_y + 60, canyonWidth, height - floorPos_y - 60);
    }
  }

  // == Rendering Sun Decorations ==
  for (var i = 0; i < suns.length; i++) {
    fill(253, 157, 83, 100);
    ellipse(suns[i].x, suns[i].y, suns[i].diameter * 8, suns[i].diameter * 8);
    fill(254, 182, 81, 200);
    ellipse(suns[i].x, suns[i].y, suns[i].diameter * 6, suns[i].diameter * 6);
    fill(254, 205, 89, 100);
    ellipse(suns[i].x, suns[i].y, suns[i].diameter * 4, suns[i].diameter * 4);
  }

  // == Rendering Clouds ==
  for (var i = 0; i < clouds.length; i++) {
    let x = clouds[i].x;
    let y = clouds[i].y;
    let width = clouds[i].width;
    let height = width / 4;
    let ellipseSize = height * 2;

    fill(255, 234, 213);
    rect(x, y, width, height, 24);
    ellipse(x + width / 2, y, ellipseSize, ellipseSize);
  }

  // == Rendering Mountains ==
  for (var i = 0; i < mountains.length; i++) {
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

  // == Rendering Trees ==
  for (var i = 0; i < trees_x.length; i++) {
    fill(63, 119, 128);
    rect(trees_x[i] - 10, trees_y - 60, 20, 60);
    fill(12, 83, 113);
    rect(trees_x[i] - 50, trees_y - 100, 100, 40, 40);
    rect(trees_x[i] - 40, trees_y - 140, 80, 40, 30);
    rect(trees_x[i] - 30, trees_y - 180, 60, 40, 30);
  }

  // == Rendering Collectables ==
  for (var i = 0; i < collectables.length; i++) {
    if (!collectables[i].isFound) {
      // == Base Doughnut Shape ==
      noFill();
      stroke(240, 158, 90);
      strokeWeight(4);
      ellipse(collectables[i].x, collectables[i].y, 40, 40);

      // == Chocolate Coating ==
      noFill();
      stroke(145, 48, 36);
      strokeWeight(12);
      ellipse(collectables[i].x, collectables[i].y, 24, 24);
      noStroke();

      // == Yellow Sprinkle ==
      fill(253, 171, 72);
      ellipse(collectables[i].x - 6, collectables[i].y - 10, 4);
      ellipse(collectables[i].x + 10, collectables[i].y - 6, 4);
      stroke(253, 171, 72);
      strokeWeight(3);
      line(
        collectables[i].x - 10,
        collectables[i].y - 4,
        collectables[i].x - 12,
        collectables[i].y,
      );
      noStroke();

      // == Blue Sprinkle ==
      fill(111, 148, 209);
      ellipse(collectables[i].x - 6, collectables[i].y - 10, 4);
      stroke(111, 148, 209);
      strokeWeight(3);
      line(
        collectables[i].x - 4,
        collectables[i].y + 10,
        collectables[i].x,
        collectables[i].y + 12,
      );

      // == Green Sprinkle ==
      stroke(137, 171, 128);
      line(
        collectables[i].x,
        collectables[i].y - 12,
        collectables[i].x + 4,
        collectables[i].y - 12,
      );
      noStroke();
      fill(137, 171, 128);
      ellipse(collectables[i].x + 8, collectables[i].y + 10, 4);

      // == Orange Sprinkle ==
      ellipse(collectables[i].x - 10, collectables[i].y + 6, 4);
      stroke(255, 120, 69);
      strokeWeight(3);
      line(
        collectables[i].x + 12,
        collectables[i].y,
        collectables[i].x + 10,
        collectables[i].y + 4,
      );
      noStroke();
    }
  }

  // END: Original Section

  // == Rendering Game Character ==
  if (isLeft && isFalling) {
    // Jumping Left
    // Body
    fill(200, 0, 4);
    rect(gameChar_x - 10, gameChar_y - 72, 20, 60, 6);

    // Straw
    fill(243, 156, 18);
    rect(gameChar_x - 10, gameChar_y - 66, 20, 4);

    // Eyes
    fill(255);
    ellipse(gameChar_x - 6, gameChar_y - 54, 10, 10);
    fill(0);
    ellipse(gameChar_x - 6, gameChar_y - 54, 5, 5);

    // Smirk
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(gameChar_x - 11, gameChar_y - 39, 12, 8, 0, PI / 3);
    noStroke();

    // Arms
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameChar_x + 4, gameChar_y - 44, gameChar_x + 10, gameChar_y - 34);
    pop();

    // Legs
    fill(255, 220, 180);
    push();
    fill(255, 220, 180);
    stroke(255, 220, 180);
    strokeWeight(4);
    line(gameChar_x - 6, gameChar_y - 12, gameChar_x, gameChar_y - 6);
    line(gameChar_x + 4, gameChar_y - 12, gameChar_x + 10, gameChar_y - 6);
    pop();

    // Shoes
    fill(52, 73, 94);
    ellipse(gameChar_x, gameChar_y - 14 + 10, 10, 6);
    ellipse(gameChar_x + 10, gameChar_y - 14 + 10, 10, 6);
  } else if (isRight && isFalling) {
    // Jumping Right
    // Body
    fill(200, 0, 4);
    rect(gameChar_x - 10, gameChar_y - 72, 20, 60, 6);

    // Straw
    fill(243, 156, 18);
    rect(gameChar_x - 10, gameChar_y - 66, 20, 4);

    // Eyes
    fill(255);
    ellipse(gameChar_x + 6, gameChar_y - 54, 10, 10);
    fill(0);
    ellipse(gameChar_x + 6, gameChar_y - 54, 5, 5);

    // Smirk
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(gameChar_x + 10, gameChar_y - 39, 12, 8, PI - PI / 3, PI);
    noStroke();

    // Arms
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameChar_x - 4, gameChar_y - 44, gameChar_x - 10, gameChar_y - 34);
    pop();

    // Legs
    fill(255, 184, 102);
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameChar_x - 4, gameChar_y - 12, gameChar_x - 10, gameChar_y - 6);
    line(gameChar_x + 6, gameChar_y - 12, gameChar_x, gameChar_y - 6);
    pop();

    // Shoes
    fill(52, 73, 94);
    ellipse(gameChar_x - 10, gameChar_y - 4, 10, 6);
    ellipse(gameChar_x, gameChar_y - 4, 10, 6);
  } else if (isLeft) {
    // Walking Left
    // Body
    fill(200, 0, 4);
    rect(gameChar_x - 10, gameChar_y - 68, 20, 60, 6);

    // Straw
    fill(243, 156, 18);
    rect(gameChar_x - 10, gameChar_y - 62, 20, 4);

    // Eyes
    fill(255);
    ellipse(gameChar_x - 6, gameChar_y - 50, 10, 10);
    fill(0);
    ellipse(gameChar_x - 6, gameChar_y - 50, 5, 5);

    // Smirk
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(gameChar_x - 11, gameChar_y - 35, 12, 8, 0, PI / 3);
    noStroke();

    // Arms
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameChar_x + 4, gameChar_y - 40, gameChar_x + 2, gameChar_y - 30);
    pop();

    // Legs
    fill(255, 184, 102);
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameChar_x - 6, gameChar_y - 8, gameChar_x - 8, gameChar_y - 1);
    line(gameChar_x + 4, gameChar_y - 8, gameChar_x + 6, gameChar_y - 1);
    pop();

    // Shoes
    fill(52, 73, 94);
    ellipse(gameChar_x - 10, gameChar_y - 10 + 10, 10, 6);
    ellipse(gameChar_x + 4, gameChar_y - 10 + 10, 10, 6);
  } else if (isRight) {
    // Walking Right
    // Body
    fill(200, 0, 4);
    rect(gameChar_x - 10, gameChar_y - 68, 20, 60, 6);

    // Straw
    fill(243, 156, 18);
    rect(gameChar_x - 10, gameChar_y - 62, 20, 4);

    // Eyes
    fill(255);
    ellipse(gameChar_x + 6, gameChar_y - 50, 10, 10);
    fill(0);
    ellipse(gameChar_x + 6, gameChar_y - 50, 5, 5);

    // Smirk
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(gameChar_x + 10, gameChar_y - 35, 12, 8, PI - PI / 3, PI);
    noStroke();

    // Arms
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameChar_x - 4, gameChar_y - 40, gameChar_x - 2, gameChar_y - 30);
    pop();

    // Legs
    push();
    fill(255, 184, 102);
    stroke(255, 184, 102);
    strokeWeight(4);
    line(gameChar_x - 4, gameChar_y - 8, gameChar_x - 6, gameChar_y - 1);
    line(gameChar_x + 6, gameChar_y - 8, gameChar_x + 8, gameChar_y - 1);
    pop();

    // Shoes
    fill(52, 73, 94);
    ellipse(gameChar_x - 4, gameChar_y - 10 + 10, 10, 6);
    ellipse(gameChar_x + 10, gameChar_y - 10 + 10, 10, 6);
  } else if (isFalling || isPlummeting) {
    // Jumping Facing Forwards
    // Body
    fill(200, 0, 4);
    rect(gameChar_x - 16, gameChar_y - 72, 32, 60, 8);

    // Straw
    fill(243, 156, 18);
    rect(gameChar_x - 16, gameChar_y - 66, 32, 4);

    // Eyes
    fill(255);
    ellipse(gameChar_x - 8, gameChar_y - 54, 10, 10);
    ellipse(gameChar_x + 8, gameChar_y - 54, 10, 10);
    fill(0);
    ellipse(gameChar_x - 8, gameChar_y - 54, 5, 5);
    ellipse(gameChar_x + 8, gameChar_y - 54, 5, 5);

    // Smirk
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(gameChar_x, gameChar_y - 39, 12, 8, 0, PI);
    noStroke();

    // Arms
    fill(255, 184, 102);
    rect(gameChar_x - 20, gameChar_y - 44, 4, 4);
    rect(gameChar_x - 22, gameChar_y - 44, 4, 12, 3);
    rect(gameChar_x + 16, gameChar_y - 44, 4, 4);
    rect(gameChar_x + 18, gameChar_y - 44, 4, 12, 3);

    // Legs
    fill(255, 184, 102);
    rect(gameChar_x - 8, gameChar_y - 12, 4, 8);
    rect(gameChar_x + 4, gameChar_y - 12, 4, 8);

    // Shoes
    fill(52, 73, 94);
    ellipse(gameChar_x - 6, gameChar_y - 14 + 10, 12, 6);
    ellipse(gameChar_x + 6, gameChar_y - 14 + 10, 12, 6);
  } else {
    // Standing Front Facing
    // Body
    fill(200, 0, 4);
    rect(gameChar_x - 16, gameChar_y - 68, 32, 60, 8);

    // Straw
    fill(243, 156, 18);
    rect(gameChar_x - 16, gameChar_y - 62, 32, 4);

    // Eyes
    fill(255);
    ellipse(gameChar_x - 8, gameChar_y - 50, 10, 10);
    ellipse(gameChar_x + 8, gameChar_y - 50, 10, 10);
    fill(0);
    ellipse(gameChar_x - 8, gameChar_y - 50, 5, 5);
    ellipse(gameChar_x + 8, gameChar_y - 50, 5, 5);

    // Smirk
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(gameChar_x, gameChar_y - 35, 12, 8, 0, PI);
    noStroke();

    // Arms
    fill(255, 191, 118);
    rect(gameChar_x - 20, gameChar_y - 40, 4, 4);
    rect(gameChar_x - 22, gameChar_y - 40, 4, 12, 3);
    rect(gameChar_x + 16, gameChar_y - 40, 4, 4);
    rect(gameChar_x + 18, gameChar_y - 40, 4, 12, 3);

    // Legs
    fill(255, 184, 102);
    rect(gameChar_x - 8, gameChar_y - 8, 4, 8);
    rect(gameChar_x + 4, gameChar_y - 8, 4, 8);

    // Shoes
    fill(52, 73, 94);
    ellipse(gameChar_x - 6, gameChar_y - 10 + 10, 12, 6);
    ellipse(gameChar_x + 6, gameChar_y - 10 + 10, 12, 6);
  }

  pop();

  // START: Original Section
  // This section was implemented by me without assistance.

  // == Display Lives in Top-Right Corner ==
  for (var i = 0; i < lives; i++) {
    let x = width - 40 - i * 50;
    let y = 20;

    // Head
    fill(200, 0, 4);
    rect(x, y, 30, 30, 6);

    // Eyes
    fill(255);
    ellipse(x + 9, y + 10, 8, 8);
    ellipse(x + 21, y + 10, 8, 8);
    fill(0);
    ellipse(x + 9, y + 10, 4, 4);
    ellipse(x + 21, y + 10, 4, 4);

    // Smirk
    noFill();
    stroke(0);
    strokeWeight(1.5);
    arc(x + 15, y + 20, 10, 6, 0, PI);
    noStroke();
  }

  // == Display Score in Top-Left Corner ==
  fill(12, 83, 113);
  textSize(24);
  textFont('Georgia');
  textAlign(LEFT, TOP);
  text('Score: ' + score, 20, 20);

  // == Display Game Over Text ==
  if (lives <= 0) {
    fill(0, 0, 0, 80);
    rect(0, 0, width, height);

    textAlign(CENTER, CENTER);
    textSize(48);
    fill(255);
    text('Game Over', width / 2, height / 2 - 30);
    textSize(24);
    text('Press R to Restart', width / 2, height / 2 + 20);
  }

  // == Display You Won Text ==
  if (isGameWon) {
    fill(0, 0, 0, 80);
    rect(0, 0, width, height);

    textAlign(CENTER, CENTER);
    textSize(48);
    fill(255);
    text('🥇', width / 2, height / 2 - 100);
    text(' You Won!', width / 2, height / 2 - 30);
    textSize(24);
    text('Press R to Play Again', width / 2, height / 2 + 20);
  }

  // == Movement Logic ==
  if (!isPlummeting) {
    if (isLeft) {
      gameChar_x -= 6;
    }
    if (isRight) {
      gameChar_x += 6;
    }
  }

  // == Jumping and Falling Logic ==
  // Character Is Jumping
  if (isJumping) {
    gameChar_y += verticalVelocity;
    verticalVelocity += 1;
    isFalling = true;

    // Character Lands on Floor
    if (gameChar_y >= floorPos_y) {
      gameChar_y = floorPos_y;
      isJumping = false;
      verticalVelocity = 0;
      isFalling = false;
    }
  }

  // == Plummeting Detection ==
  for (var i = 0; i < floors.length - 1; i++) {
    let floorEnd = floors[i].x + floors[i].width;
    let nextFloorStart = floors[i + 1].x;
    if (
      gameChar_x > floorEnd &&
      gameChar_x < nextFloorStart &&
      gameChar_y >= floorPos_y
    ) {
      isPlummeting = true;
      break;
    }
  }
  if (isPlummeting) {
    gameChar_y += 2;
    if (!fallSound.isPlaying()) {
      fallSound.play();
    }
  }

  // == Collecting Item and Keeping Score ==
  for (var i = 0; i < collectables.length; i++) {
    if (
      !collectables[i].isFound &&
      dist(gameChar_x, gameChar_y, collectables[i].x, collectables[i].y) < 50
    ) {
      collectables[i].isFound = true;
      score += 10;
      collectSound.play();
    }
  }

  // == Winning Logic ==
  if (score >= 120 && !isGameWon) {
    isGameWon = true;
  }

  // == Reset Game State Logic ==
  if (gameChar_y > height) {
    lives--;
    fallSound.stop();

    if (lives > 0) {
      // Reset Position
      floorPos_y = (height * 3) / 4;
      gameChar_x = width / 3;
      gameChar_y = floorPos_y;
      cameraPos_x = 0;
      isGameWon = false;

      // Reset Motion and Status
      isLeft = false;
      isRight = false;
      isPlummeting = false;
      isFalling = false;
      isJumping = false;
    }

    // Reset Score and Collectibles
    score = 0;
    for (var i = 0; i < collectables.length; i++) {
      collectables[i].isFound = false;
    }
  }
  // END: Original Section
}

function keyPressed() {
  // == Moving with Arrow Keys ==
  if (!isPlummeting && !isGameWon) {
    if (keyCode == 37) {
      isLeft = true;
    }

    if (keyCode == 39) {
      isRight = true;
    }

    // START: Original Section
    // This section was implemented by me without assistance.

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
  if (keyCode === 82) {
    lives = 3;
    score = 0;

    gameChar_x = width / 3;
    gameChar_y = floorPos_y;
    cameraPos_x = 0;
    isGameWon = false;

    isLeft = false;
    isRight = false;
    isPlummeting = false;
    isFalling = false;
    isJumping = false;
    verticalVelocity = 0;

    for (var i = 0; i < collectables.length; i++) {
      collectables[i].isFound = false;
    }
  }
  // END: Original Section
}

function keyReleased() {
  if (keyCode === 37) {
    isLeft = false;
  }

  if (keyCode === 39) {
    isRight = false;
  }
}
