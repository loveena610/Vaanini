var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bgImg;
var astro, astroImg;
var m, maze;
var alien1,alien2,alien3;
var aliensGroup, blobGroup;

var score=0;

var gameOver, restart;



function preload(){
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  bgImg = loadImage("spaceship dark.png");

  astroImg = loadImage("a1.png")

  maze = loadImage("metal plate.png")
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  alien3 = loadImage("alien3.png");
}

function setup() {
  createCanvas(displayWidth-50,displayHeight-200);
  
  
  
  astro = createSprite(100,100);
  astro.addImage(astroImg);
  astro.scale = 0.1;
  

  m = createSprite(100,200,500,20);

  aliensGroup = new Group();
  blobGroup = new Group();
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(bgImg);
  text("Score: "+ score, 500,50);

  if(keyDown(UP_ARROW)) {
    astro.velocityY = -12;
  }

  astro.velocityY = astro.velocityY + 0.8;

  if(keyDown(LEFT_ARROW)){
    astro.x = astro.x-3;
  }

  if(keyDown(RIGHT_ARROW)){
    astro.x = astro.x+3;
  }
  
  astro.collide(m);
  
  spawnAliens();
    
  drawSprites();
}

function spawnBlob() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnAliens() {
  var rand1 = Math.round(random(60,100));
  if(frameCount % rand1 === 0) {
    var alien = createSprite(displayWidth,165,10,40);
    //alien.debug = true;
    alien.velocityX = -(6 + 3*score/100);
    
    //generate random aliens
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: alien.addImage(alien1);
              break;
      case 2: alien.addImage(alien2);
              break;
      case 3: alien.addImage(alien3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the alien           
    alien.scale = 0.1;
    alien.lifetime = 300;
    //add each alien to the group
    aliensGroup.add(alien);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  aliensGroup.destroyEach();
  blobGroup.destroyEach();
  
  //alien.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}