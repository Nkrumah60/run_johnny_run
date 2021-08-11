var grass,grassImg
var boy,boyImg,jumpImg;
var stickImg
var invisibleGround;
var crying,cryingImg;
var gameOver,gameOverImg;
var cryingSound,cryingMp3
var rockImg,rockGroup;
var restart,restartImg;
var score = 0;
var gameState = 1;
var SERVE = 1;
var PLAY = 2
var END = 3;


function preload(){
    grassImg = loadImage("grass.jpg");
    boyImg = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png");
    jumpImg = loadAnimation("jump.png");
    cryingImg = loadAnimation("crying.png");
    stickImg = loadImage("twig-md.png");
    gameOverImg = loadImage("gameOver.png");
    rockImg = loadImage ("rock.jpg");
    restartImg = loadImage("restart.png");
    cryingMp3 = loadSound("cryingSound.m4a");
}

function setup() {
    createCanvas(600,425);

    grass = createSprite(200,200),
    grass.addImage("grass",grassImg);
    

    boy = createSprite(100,300);
    boy.addAnimation("boy",boyImg);
    boy.addAnimation("jump",jumpImg);
    boy.addAnimation("crying",cryingImg);
    

    invisibleGround = createSprite(100,380,1000,20);
    invisibleGround.visible = false

        gameOver = createSprite(300,150,10,10);
        gameOver.addImage("GameOver",gameOverImg);
        gameOver.scale = 0.2;

        restart = createSprite(300,250,10,10);
        restart.addImage("restart",restartImg);
        restart.scale = 0.04;

    
    
    stickGroup = new Group();
    rockGroup = new Group();
}

gameState = SERVE;


function draw() {
    background(220);
    

    if(gameState===PLAY){
        
        gameOver.visible = false;
        restart.visible = false;

        boy.scale = 0.5;
        grass.velocityX = -(4+3*score/100);
         score = score + Math.round(frameCount/600)
        if(grass.x<200){
            grass.x = 400
          }

          if(boy.isTouching(invisibleGround)){
            boy.changeAnimation("boy",boyImg);
            

          }

          if(keyDown("space") && boy.y >= 140){
            boy.velocityY = -11      
            boy.changeAnimation("jump",jumpImg);
          }
          boy.velocityY = boy.velocityY + 0.8;
          boy.collide(invisibleGround);
          

          grass.velocityX = -3;

          if(stickGroup.isTouching(boy)){
              gameState = END;
              cryingMp3.play();
          }

          if(rockGroup.isTouching(boy)){
              gameState = END;
              cryingMp3.play();
          }
          
          spwanSticks();
          spwanRocks();
    }

    if(gameState===END){
    
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)){
     gameState =  PLAY;
     score = 0;
    }
    boy.changeAnimation("crying",cryingImg);
    boy.scale = 0.2;
    grass.velocityX = 0;
    boy.collide(invisibleGround);
    stickGroup.destroyEach();
    rockGroup.destroyEach();

    

    }

    
   

    drawSprites();
    textSize(20);
    text("score: "+score,480,50);

    if(gameState===SERVE){
        boy.scale = 0.5;
        gameOver.visible = false;
        restart.visible = false;
        if(keyDown("space")){
            gameState = PLAY;
        }
        textSize(20);
        text("Press the space key to start",200,200);
    }

    

}

function spwanSticks(){
   if(frameCount %200===0){
    var stick = createSprite(600,350,10,10);
    stick.x = Math.round(random(375,450));
    stick.addImage("stick",stickImg);
    stick.scale = 0.3;
    stick.velocityX= -2;
    stick.lifetime = 225;
    stickGroup.add(stick);
}
}

function spwanRocks(){
    if(frameCount %500===0){
     var rock = createSprite(600,350,10,10);
     rock.x = Math.round(random(300,425));
     rock.addImage("rock",rockImg);
     rock.scale = 0.03;
     rock.velocityX= -2;
     rock.lifetime = 225;
     rockGroup.add(rock);

}





}
