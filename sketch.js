var monkey, monkeyImage
var bananaGroup, BananaImage
var rockGroup, rockImage
var jungle, jungleImage
var invisible_ground;
var score = 0;

function preload() {
  monkeyImage = loadAnimation("Monkey_01.png",
    "Monkey_02.png",
    "Monkey_03.png",
    "Monkey_04.png",
    "Monkey_05.png",
    "Monkey_06.png",
    "Monkey_07.png",
    "Monkey_08.png",
    "Monkey_09.png",
    "Monkey_10.png")
  bananaImage = loadImage("banana.png")
  rockImage = loadImage("stone.png")
  jungleImage = loadImage("jungle.jpg")
}

function setup() {
  createCanvas(600, 600);
  jungle = createSprite(300, 300);
  jungle.addImage(jungleImage);
  jungle.velocityX = -4;
  jungle.scale = 1.5

  monkey = createSprite(50, 590, 10, 10)
  monkey.addAnimation("monkey", monkeyImage)
  monkey.scale = 0.12;

  bananaGroup = createGroup();
  rockGroup = createGroup();
  invisible_ground = createSprite(50, 590, 600, 20);
  invisible_ground.visible = false;


}

function draw() {
  background(0);
  drawSprites();
  stroke("black");
  strokeWeight(4);
  textSize(18)
  fill("white")
  text("Score:" + score, 300, 50);
  monkey.collide(invisible_ground)

  if (keyDown("space")) {
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  if (jungle.x < 0) {
    jungle.x = jungle.width / 2;
  }
  spawnBanana();
  spawnRocks();
  if (monkey.isTouching(bananaGroup)) {
    score = score + 1;
    bananaGroup.destroyEach();
  }
  if (monkey.isTouching(rockGroup)) {
    monkey.scale = 0.10;

  }
  switch (score) {
    case 5:
      monkey.scale = 0.14;
      break;
    case 10:
      monkey.scale = 0.16;
      break;
    case 15:
      monkey.scale = 0.18;
      break;
    case 20:
      monkey.sclae = 0.20;
      break;
    default:
      break;

  }


}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, Math.round(random(150, 300)), 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 150;
    monkey.depth = banana.depth + 1;
    bananaGroup.add(banana);
  }
}

function spawnRocks() {
  if (frameCount % 300 === 0) {
    var rocks = createSprite(650, 550, 10, 10);
    rocks.addImage(rockImage);
    rocks.scale = 0.12;
    rocks.velocityX = -4;
    rocks.lifetime = 150;

    rockGroup.add(rocks);
  }
}