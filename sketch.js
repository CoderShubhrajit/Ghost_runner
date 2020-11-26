var gameState = "play";
var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invisibleGameOverer,gameOvererGroup;
var spookySound;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spookySound.play();
  
  tower = createSprite(300,300,600,600);
  tower.addImage("backGround",towerImage);
  
  ghost = createSprite(300,300,10,10);
  ghost.addImage("player",ghostImage);
  ghost.scale = 0.35;
  
  climberGroup = createGroup();
  doorGroup = createGroup();
  gameOvererGroup = createGroup();
 }

function draw(){
  background(0);
  
  if (gameState === "play"){
  
  if (keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  
  if (keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }
  
  if (keyDown("space")){
    ghost.velocityY = -3;
    
  }
    
  ghost.velocityY = ghost.velocityY+0.5;
    
  tower.velocityY = 1;
  
  if (tower.y>400){
    tower.y = 300;
  }
    
    if (gameOvererGroup.isTouching(ghost) ||
       ghost.y>600){
      ghost.destroy();
      tower.destroy();
      doorGroup.destroyEach();
      climberGroup.destroyEach();
      
      gameState = "end";
    }
    
    if (climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
  
   spawnClimber();
  }
  
  else if (gameState === "end"){
    
    background(0);
    
    fill("yellow");
    textSize(30);
    text("Game over",250,250);
    
    }
  
  drawSprites();
}

function spawnClimber(){
  if (frameCount%250===0){
    climber = createSprite(Math.round(random(50,550)),0);
    climber.addImage("saver",climberImage);
    climber.velocityY = 1;
    climber.lifetime = 600;
    door = createSprite(climber.x,-70);
    door.addImage(doorImage);
    door.velocityY = 1;
    door.lifetime = 600;
    invisibleGameOverer =          createSprite(climber.x,climber.y+7,100,5);
    invisibleGameOverer.velocityY = 1;
    invisibleGameOverer.lifetime = 600;
    invisibleGameOverer.visible = false;
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth+1;
    
    climberGroup.add(climber);
    doorGroup.add(door);
    gameOvererGroup.add(invisibleGameOverer);
  }
}