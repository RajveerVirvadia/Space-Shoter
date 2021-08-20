var peacefulBackground , normalBackground , hardBackground ;
var startingImage,gameOverImage;
var gameState = 0;
var pc , pcImage , pcBulletsImage , pcBullets;
var bulletSound;
var alien1 , alien1Image , alienBulletsImage , alienBullets;
var score = 0;
var alien2 , alien2Image;
var main,mainImage;
var playButton,playButtonImage,playAgain,playAgainImage;
var homeButton;

function preload(){
  peacefulBackground = loadImage("Images/PeacefulBg.png");
  normalBackground = loadImage("Images/Normal.jpg");
  hardBackground = loadImage("Images/Hard.jpg");
  pcImage = loadImage("Images/Player.png");
  pcBulletsImage = loadImage("Images/PlayerBullets.png");
  bulletSound = loadSound("sounds/BulletSound.mp3");
  alien1Image = loadImage("Images/Alien3.png");
  alienBulletsImage = loadImage("Images/AliensLazer.png");
  alien2Image = loadImage("Images/Alien2.png");
  mainImage = loadImage("Images/MainSpaceship.png");
  mainBulletsImage = loadImage("Images/BossLazer.png");
  playButtonImage = loadImage("PlayButton.png");
  startingImage = loadImage("Images/StartingImage.png");
  gameoverImage = loadImage("Images/GameOver.jpg");

}
function setup() {
  createCanvas(windowWidth,windowHeight);
  pc = createSprite(500,500);
  pc.addImage(pcImage);
  pc.scale = 0.2;

  pcBulletsGroup = new Group();
  alien1Group = new Group();
  alienBulletsGroup = new Group();
  alien2Group = new Group();
  pc.debug = false;
  pc.setCollider("rectangle",0,0,300,550);
  pc.visible = false;

  main = createSprite(600,-150,10,10);
  main.addImage(mainImage);
  
  playButton = createImg("PlayButton.png");
  playButton.position(615,275);
  playButton.size(110,70);
  playButton.mouseClicked(gameState1);



}

function draw() {
  background(startingImage);


  
  if(gameState === 1){
    background(peacefulBackground);
    pc.visible = true;
    playButton.hide();
    fill("yellow");
    textSize(30);
    text("SCORE:"+score,50,50);

  fill("red");
    textSize(30);
    text("LEVEL 1",500,50);

  if(keyDown(LEFT_ARROW)){
      pc.x=pc.x-10;
  }
  if(keyDown(RIGHT_ARROW)){
    pc.x=pc.x+10;
}
  if(keyWentDown("space")){
    pcBullets = createSprite(pc.x,pc.y);
    pcBullets.velocityY = -9
    pcBullets.addImage(pcBulletsImage);
    pcBullets.scale = 0.1;
    bulletSound.play();
    
    pcBulletsGroup.add(pcBullets);
  }
  
  

  aliens();
  
 

  if(pcBulletsGroup.isTouching(alien1Group)){
    alien1Group.destroyEach();
    score = score+5;
  }
  if(alienBulletsGroup.isTouching(pc)){
    pc.destroy();
    gameState = 2;
  }
  if(alien1Group.isTouching(pc)){
    pc.destroy();
    gameState = 2;
   
  }
  if(score>=5 && score<15){
    background(normalBackground);
    aliens2();
    fill("yellow");
    textSize(30);
    text("SCORE:"+score,50,50);
    fill("red");
    textSize(30);
    text("LEVEL 2",700,50);
  
  }
  if(pcBulletsGroup.isTouching(alien2Group)){
    alien2Group.destroyEach();
    score = score+7;
  }
  if(alien2Group.isTouching(pc)){
    pc.destroy();
    gameState = 2;
   
  }
  if(score>=15){
    background(hardBackground)
    
    fill("yellow");
    textSize(30);
    text("SCORE:"+score,50,50);
    fill("red");
    textSize(30);
    text("LEVEL 3",500,50);
    main.velocityY = 3;
    if(main.y >= 100){
      main.velocityY = 0;
    }
    spawnMainBullets();

    alien1Group.setLifetimeEach(0);
    
  }
  }
  if(gameState===2){
    pc.destroy();
    alien1Group.destroyEach();
    alien2Group.destroyEach();
    alienBulletsGroup.destroyEach();
    background(gameoverImage);
    playAgain = createImg("PlayAgain.png");
    playAgain.position(615,575);
    playAgain.size(110,70);
    playAgain.mouseClicked(gameState1);
    main.destroy();
    homeButton = createImg("HomeButton.jpg");
    homeButton.position(615,575);
    homeButton.size(110,70);
    homeButton.mouseClicked(gameState1);

  }
  
  drawSprites();
}
function aliens(){
  if(frameCount%200===0){
    var no = Math.round(random(20,windowWidth-20));
    alien1 = createSprite(no,-10);
    alien1.velocityY = 3;
    alien1.addImage(alien1Image);
    alien1.scale = 0.5;
    var alienBullets = createSprite(alien1.x , alien1.y);
    alienBullets.setCollider("rectangle",0,0,100,100)
    alienBullets.addImage(alienBulletsImage);
    alienBullets.velocityY = 6;
    alienBullets.scale = 0.1;
    alien1Group.add(alien1); 
    alienBulletsGroup.add(alienBullets);  
    
  }

}
function aliens2(){
  if(frameCount%150===0){
    var no = Math.round(random(20,windowWidth-20));
    alien2 = createSprite(no,-10);
    alien2.velocityY = 5;
    alien2.addImage(alien2Image);
    alien2.scale = 0.3;
    var alienBullets = createSprite(alien2.x , alien2.y);
    alienBullets.setCollider("rectangle",0,0,100,100)
    alienBullets.addImage(alienBulletsImage);
    alienBullets.velocityY = 8;
    alienBullets.scale = 0.1;
    alien2Group.add(alien2);
    alienBulletsGroup.add(alienBullets);   
    alien2.setCollider("rectangle",0,0,200,250);
    
  }

}
function gameState1(){
  gameState = 1
}
function spawnMainBullets(){
  if(frameCount%30===0){
    var mainBullets = createSprite(main.x-30 , main.y+30);
    mainBullets.setCollider("rectangle",0,0,100,100);
    mainBullets.addImage(mainBulletsImage);
    mainBullets.velocityY = 8;
    mainBullets.velocityX = Math.round(random(-4,4));
    mainBullets.scale = 0.1;
  }
  if(frameCount%50===0){
    var mainBullets2 = createSprite(main.x+30 , main.y+30);
    mainBullets2.setCollider("rectangle",0,0,100,100);
    mainBullets2.addImage(mainBulletsImage);
    mainBullets2.velocityY = 8;
    mainBullets2.velocityX = Math.round(random(-4,4));
    mainBullets2.scale = 0.1;
  }
}
