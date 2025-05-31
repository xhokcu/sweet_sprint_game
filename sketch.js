/*

The Game Project

Week 3

Game interaction

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var cloud1;
var cloud2;
var cloud3;
var sun;
var mountain1;
var mountain2;
var collectable;
var canyon;

var isLeft;
var isRight;
var isPlummeting;
var isFalling;

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 3;
  gameChar_y = floorPos_y;

  isLeft = false;
  isRight = false;
  isPlummeting = false;
  isFalling = false;

  cloud1 = {
    x: 160,
    y: 100,
    width: 120,
    height: 30,
    ellipseSize: 60,
  };

  cloud2 = {
    x: 650,
    y: 200,
    width: 160,
    height: 40,
    ellipseSize: 80,
  };

  cloud3 = {
    x: 860,
    y: 120,
    width: 80,
    height: 20,
    ellipseSize: 40,
  };

  sun = {
    x: width / 2,
    y: height / 2,
    diameter: 40,
  };

  mountain1 = {
    x1: 0,
    y1: floorPos_y,
  };

  mountain2 = {
    x: 260,
    y: floorPos_y,
  };

  collectable = {
    x: 800,
    y: floorPos_y - 40,
    size: 40,
    isFound: false,
  };

  canyon = {
    x1: width / 2,
    length: 80,
  };
}

function draw() {
  ///////////DRAWING CODE//////////

  background(254, 192, 183); //fill the sky blue
  noStroke();

  // SUN
  fill(253, 157, 83, 100);
  ellipse(sun.x, sun.y, sun.diameter * 8, sun.diameter * 8);
  fill(254, 182, 81, 100);
  ellipse(sun.x, sun.y, sun.diameter * 6, sun.diameter * 6);
  fill(254, 205, 89, 100);
  ellipse(sun.x, sun.y, sun.diameter * 4, sun.diameter * 4);

  // CLOUDS
  fill(255, 220, 199);
  // cloud 1
  rect(cloud1.x, cloud1.y, cloud1.width, cloud1.height, 24);
  ellipse(
    cloud1.x + cloud1.width / 2,
    cloud1.y,
    cloud1.ellipseSize,
    cloud1.ellipseSize,
    cloud1.ellipseSize / 2,
  );
  // cloud 2
  rect(cloud2.x, cloud2.y, cloud2.width, cloud2.height, 24);
  ellipse(
    cloud2.x + cloud2.width / 2,
    cloud2.y,
    cloud2.ellipseSize,
    cloud2.ellipseSize,
    cloud2.ellipseSize / 2,
  );
  // cloud 3
  rect(cloud3.x, cloud3.y, cloud3.width, cloud3.height, 24);
  ellipse(
    cloud3.x + cloud3.width / 2,
    cloud3.y,
    cloud3.ellipseSize,
    cloud3.ellipseSize,
    cloud3.ellipseSize / 2,
  );

  // MOUNTAINS
  fill(245, 151, 143);
  stroke(245, 151, 143);
  strokeWeight(20);
  strokeJoin(ROUND);
  // mountain 1
  triangle(
    mountain1.x1,
    mountain1.y1,
    mountain1.x1 + 140,
    floorPos_y - 200,
    mountain1.x1 + 140 * 2,
    mountain1.y1,
  );
  // mountain 2
  fill(237, 115, 117);
  stroke(237, 115, 117);
  strokeWeight(20);
  strokeJoin(ROUND);
  triangle(
    mountain2.x,
    mountain2.y,
    mountain2.x + 100,
    mountain2.y - 160,
    mountain2.x + 100 * 2,
    mountain2.y,
  );
  noStroke();

  // COLLECTABLE
  if (!collectable.isFound) {
    // doughnut
    noFill();
    stroke(240, 158, 90);
    strokeWeight(4);
    ellipse(collectable.x, collectable.y, collectable.size, collectable.size);
    // chocolate
    noFill();
    stroke(145, 48, 36);
    strokeWeight(12);
    ellipse(
      collectable.x,
      collectable.y,
      collectable.size - 16,
      collectable.size - 16,
    );
    noStroke();
    // candy
    // yellow
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
    // blue
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
    // green
    stroke(137, 171, 128);
    strokeWeight(3);
    line(
      collectable.x,
      collectable.y - 12,
      collectable.x + 4,
      collectable.y - 12,
    );
    noStroke();
    fill(137, 171, 128);
    ellipse(collectable.x + 8, collectable.y + 10, 4);
    // orange
    fill(255, 120, 69);
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

  // FLOOR
  // floor top
  fill(220, 20, 60);
  rect(0, floorPos_y, width / 2, 20, 0, 24, 0, 0);
  rect(
    canyon.x1 + canyon.length,
    floorPos_y,
    width - canyon.x1 - canyon.length,
    20,
    24,
    0,
    0,
    0,
  );
  // floor
  fill(255, 182, 123);
  rect(0, floorPos_y + 20, width / 2, height - floorPos_y - 20);
  rect(
    canyon.x1 + canyon.length,
    floorPos_y + 20,
    width - canyon.x1 - canyon.length,
    height - floorPos_y - 20,
  );

  // GAME CHARACTER
  if (isLeft && isFalling) {
    // add your jumping-left code
    // Body
    fill(220, 20, 60);
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
    fill(255, 220, 180);
    stroke(255, 220, 180);
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
    // add your jumping-right code
    // Body
    fill(220, 20, 60);
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
    fill(255, 220, 180);
    stroke(255, 220, 180);
    strokeWeight(4);
    line(gameChar_x - 4, gameChar_y - 44, gameChar_x - 10, gameChar_y - 34);
    pop();

    // Legs
    fill(255, 220, 180);
    push();
    fill(255, 220, 180);
    stroke(255, 220, 180);
    strokeWeight(4);
    line(gameChar_x - 4, gameChar_y - 12, gameChar_x - 10, gameChar_y - 6);
    line(gameChar_x + 6, gameChar_y - 12, gameChar_x, gameChar_y - 6);
    pop();

    // Shoes
    fill(52, 73, 94);
    ellipse(gameChar_x - 10, gameChar_y - 4, 10, 6);
    ellipse(gameChar_x, gameChar_y - 4, 10, 6);
  } else if (isLeft) {
    // add your walking left code

    // Body
    fill(220, 20, 60);
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
    fill(255, 220, 180);
    stroke(255, 220, 180);
    strokeWeight(4);
    line(gameChar_x + 4, gameChar_y - 40, gameChar_x + 2, gameChar_y - 30);
    pop();

    // Legs
    fill(255, 220, 180);
    push();
    fill(255, 220, 180);
    stroke(255, 220, 180);
    strokeWeight(4);
    line(gameChar_x - 6, gameChar_y - 8, gameChar_x - 8, gameChar_y - 1);
    line(gameChar_x + 4, gameChar_y - 8, gameChar_x + 6, gameChar_y - 1);
    pop();

    // Shoes
    fill(52, 73, 94);
    ellipse(gameChar_x - 10, gameChar_y - 10 + 10, 10, 6);
    ellipse(gameChar_x + 4, gameChar_y - 10 + 10, 10, 6);
  } else if (isRight) {
    // add your walking right code
    // Body
    fill(220, 20, 60);
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
    fill(255, 220, 180);
    stroke(255, 220, 180);
    strokeWeight(4);
    line(gameChar_x - 4, gameChar_y - 40, gameChar_x - 2, gameChar_y - 30);
    pop();

    // Legs
    push();
    fill(255, 220, 180);
    stroke(255, 220, 180);
    strokeWeight(4);
    line(gameChar_x - 4, gameChar_y - 8, gameChar_x - 6, gameChar_y - 1);
    line(gameChar_x + 6, gameChar_y - 8, gameChar_x + 8, gameChar_y - 1);
    pop();

    // Shoes
    fill(52, 73, 94);
    ellipse(gameChar_x - 4, gameChar_y - 10 + 10, 10, 6);
    ellipse(gameChar_x + 10, gameChar_y - 10 + 10, 10, 6);
  } else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code
    // Body
    fill(220, 20, 60);
    rect(gameChar_x - 16, gameChar_y - 72, 32, 60, 8);

    // Straw
    fill(243, 156, 18); // orange
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
    fill(255, 220, 180);
    // left
    rect(gameChar_x - 20, gameChar_y - 44, 4, 4);
    rect(gameChar_x - 22, gameChar_y - 44, 4, 12, 3);
    // right
    rect(gameChar_x + 16, gameChar_y - 44, 4, 4);
    rect(gameChar_x + 18, gameChar_y - 44, 4, 12, 3);

    // Legs
    fill(255, 220, 180);
    rect(gameChar_x - 8, gameChar_y - 12, 4, 8);
    rect(gameChar_x + 4, gameChar_y - 12, 4, 8);

    // Shoes
    fill(52, 73, 94);
    ellipse(gameChar_x - 6, gameChar_y - 14 + 10, 12, 6);
    ellipse(gameChar_x + 6, gameChar_y - 14 + 10, 12, 6);
  } else {
    // add your standing front facing code

    // Body
    fill(220, 20, 60);
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
    fill(255, 220, 180);
    // left
    rect(gameChar_x - 20, gameChar_y - 40, 4, 4);
    rect(gameChar_x - 22, gameChar_y - 40, 4, 12, 3);
    // right
    rect(gameChar_x + 16, gameChar_y - 40, 4, 4);
    rect(gameChar_x + 18, gameChar_y - 40, 4, 12, 3);

    // Legs
    fill(255, 220, 180);
    rect(gameChar_x - 8, gameChar_y - 8, 4, 8);
    rect(gameChar_x + 4, gameChar_y - 8, 4, 8);

    // Shoes
    fill(52, 73, 94);
    ellipse(gameChar_x - 6, gameChar_y - 10 + 10, 12, 6);
    ellipse(gameChar_x + 6, gameChar_y - 10 + 10, 12, 6);
  }

  ///////////INTERACTION CODE//////////
  //Put conditional statements to move the game character below here

  if (isLeft) {
    gameChar_x -= 3;
  }
  if (isRight) {
    gameChar_x += 3;
  }

  if (gameChar_y < floorPos_y) {
    isFalling = true;
    gameChar_y += 3;
  } else {
    isFalling = false;
  }

  // collect item
  if (dist(gameChar_x, gameChar_y, collectable.x, collectable.y) < 50) {
    collectable.isFound = true;
  }

  // plummeting from canyon
  if (
    gameChar_x > canyon.x1 &&
    gameChar_x < canyon.x1 + canyon.length &&
    gameChar_y >= floorPos_y
  ) {
    isPlummeting = true;
  } else {
    isPlummeting = false;
  }

  if (isPlummeting) {
    gameChar_y += 2;
  }
}

function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.

  //open up the console to see how these work
  // console.log('keyPressed: ' + key);
  // console.log('keyPressed: ' + keyCode);

  if (!isPlummeting) {
    if (keyCode == 37) {
      isLeft = true;
    }

    if (keyCode == 39) {
      isRight = true;
    }

    if (!isFalling && (keyCode == 87 || keyCode == 38)) {
      gameChar_y -= 150;
    }
  }
}

function keyReleased() {
  // if statements to control the animation of the character when
  // keys are released.

  // console.log('keyReleased: ' + key);
  // console.log('keyReleased: ' + keyCode);

  if (keyCode == 37) {
    isLeft = false;
  }

  if (keyCode == 39) {
    isRight = false;
  }
}
