var canvas, backgroundImage;
var astronaut,astronautImg,astronaut2,astronaut2Img;
var bg
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
var bullet,bulletImg,bullet2,bullet2Img;
var gameOver,gameOverImg;
var gameState=0;
var asteroidsGroup;
var score=0;
var life1=1;
var life2=1;
var form;
var blast,blastImg;
var player1name,player2name;
var Shootingsound1,Shootingsound2,ExplodingSound;
var score1=0,score2=0;
var bg1,bg2;

function preload(){
astronautImg=loadImage("Images/astronaut.png");
astronaut2Img=loadImage("Images/astronaut_new.png")
backgroundImage=loadImage("Images/background.jpg");
obstacle1=loadImage("Images/alien_1-removebg-preview.png")
obstacle2=loadImage("Images/alien_2-removebg-preview.png")
obstacle3=loadImage("Images/alien_3.png")
obstacle4=loadImage("Images/asteroid.png");
obstacle5=loadImage("Images/asteroid_2.png");
bulletImg=loadImage("Images/Fireball.png");
bullet2Img=loadImage("Images/Fireball-2.png");
gameOverImg=loadImage("Images/game over.png");
blastImg=loadImage("Images/boom.png");
introBG=loadImage("Images/background-form1.jpg");
//Shootingsound=loadSound("Images/Shootingsound.wav");
bg1=loadImage("Images/Background1.jpg")
bg2=loadImage("Images/Background2.jpg")
ExplodingSound=loadSound("Images/Explosion+1.wav");
Shootingsound1=loadSound("gun1.mp3");
Shootingsound2=loadSound("gun2.mp3");
}

function setup(){
        
  createCanvas(1200,750);
  bg=createSprite(600,300,1400,20);
bg.addImage(backgroundImage);
bg.velocityX=-2;
createAstronaut();
createAstronaut2();


obstaclesGroup=new Group();
asteroidsGroup=new Group();
bulletGroup=new Group();
bullet2Group=new Group();

form=new Form();
form2=new Form2();
edges=createEdgeSprites();
}

function draw(){

if(gameState===0){
form.display();

}
if(gameState===1){
  form2.display();
  
  }
if(gameState===2){
  background("Black");
  
spawnAsteroids();
spawnObstacles();
if(bg.x<200){
bg.x=900;//bg.width/2;
}
if(keyDown("UP_ARROW")){
astronaut.y=astronaut.y-5;

}
if(keyDown("DOWN_ARROW")){
astronaut.y=astronaut.y+5;
}
if(keyDown("SPACE")){
Lightball();

}
if(keyDown("ENTER")){
  Lightball2();
  
  }
if(keyDown("W")){
  astronaut2.y=astronaut2.y-5;
}
if(keyDown("S")){
  astronaut2.y=astronaut2.y+5;
}

for(var i=0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).collide(astronaut)){
    obstaclesGroup.get(i).destroy();
    astronaut.destroy();
    blast();
    blast.y=astronaut.y+20;
    life1=life1-1;
    object=setTimeout(createAstronaut,2000);
    ExplodingSound.play();
 }
}
for(var i=0;i<asteroidsGroup.length;i++){
  if(asteroidsGroup.get(i).collide(astronaut)){
    asteroidsGroup.get(i).destroy();
    astronaut.destroy();
    blast();
    blast.y=astronaut.y+20;
    life1=life1-1;
    object=setTimeout(createAstronaut,2000);
    ExplodingSound.play();
  }
 }

for(var i=0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).collide(astronaut2)){
    obstaclesGroup.get(i).destroy();
    astronaut2.destroy();
    blast();
    blast.y=astronaut2.y+10;
    life2=life2-1;
    object=setTimeout(createAstronaut2,2000);
    ExplodingSound.play();
  
 }

}

for(var i=0;i<asteroidsGroup.length;i++){
  if(asteroidsGroup.get(i).collide(astronaut2)){
    asteroidsGroup.get(i).destroy();
    astronaut2.destroy();
    blast();
    blast.y=astronaut2.y+10;
    life2=life2-1;
    object=setTimeout(createAstronaut2,2000);
    ExplodingSound.play();
  
 }
}

if(life1===0 || life2===0){
  
 gameState=3;

}

for(var i=0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).isTouching(bulletGroup)){
    obstaclesGroup.get(i).destroy();
    bulletGroup.destroyEach();
    score1=score1+1;
 }
}
for(var i=0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).isTouching(bullet2Group)){
    obstaclesGroup.get(i).destroy();
    bullet2Group.destroyEach();
    score2=score2+1;
 }
}
astronaut.collide(edges[3]);
astronaut2.collide(edges[3]);
drawSprites();
textSize(20);
fill("white");
textFont("Comic Sans MS");
text(player1name +"'s Score: "+ score1, 100,50);
text(player2name +"'s Score: "+ score2, 900,50);
text(player1name +"'s Life: "+ life1, 100,75);
text(player2name +"'s Life: "+ life2, 900,75);


}

if(gameState===3){
//background("green");
if(score1>score2){
  textSize(40);
  textFont("Comic Sans MS");
  fill("white");
  text("Congratulations!",490,300);
  text(player1name+" has won!",500,400);
}
if(score2>score1){
textSize(40);
textFont("Comic Sans MS");
fill("white");
text("Congratulations!",490,300);
text(player2name+" has won!",500,400);
}

//gameOver=createSprite(600,300,100,100);
//gameOver.scale=0.3;
//gameOver.visible=false;
//gameOver.addImage(gameOverImg);
}
}





function spawnObstacles() {
  if(frameCount % 201 === 0) {
    var obstacle = createSprite(1200,300,10,40);
    obstacle.debug=false;
    obstacle.velocityX =-6;// (-6 + 3*score/100);
    
   
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      
      default: break;
    }
    
            
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
 
    obstaclesGroup.add(obstacle);
  }
}
  function spawnAsteroids() {
        if(frameCount % 401 === 0) {
          var asteroid = createSprite(1200,150,10,40);
         asteroid.debug=false;
         asteroid.setCollider("rectangle",0,0,200,200);
          asteroid.velocityX =-6;// (-6 + 3*score/100);
          asteroid.scale=0.5;
         
          var rand = Math.round(random(1,2));
          switch(rand) {
            case 1: asteroid.addImage(obstacle4);
                    break;
            case 2: asteroid.addImage(obstacle5);
                    break;
            default: break;
            
            
          }
          asteroidsGroup.add(asteroid);
        }
}
function Lightball(){
var bullet=createSprite(200,300,50,50);
bullet.debug=false;
bullet.scale=0.2;
bullet.addImage(bulletImg);
bullet.velocityX=5;
bullet.y=astronaut.y+20;
bulletGroup.add(bullet);
Shootingsound1.play();
}
function Lightball2(){
var bullet2=createSprite(200,300,50,50);
bullet2.scale=0.2;
bullet2.addImage(bullet2Img);
bullet2.velocityX=5;
bullet2.y=astronaut2.y-25;
bullet2Group.add(bullet2);
Shootingsound2.play();
}
function blast(){
  var blast=createSprite(200,300,50,50);
  
  blast.addImage(blastImg);
 blast.lifetime=10;
  
  //bulletGroup.add(bullet);
  }
  function createAstronaut(){
    astronaut=createSprite(100,250,50,50);
astronaut.debug=false;
astronaut.addImage(astronautImg);
astronaut.scale=0.3;
  }
  function createAstronaut2(){
    astronaut2=createSprite(100,500,50,50);
astronaut2.debug=false;
astronaut2.addImage(astronaut2Img);
astronaut2.scale=0.7;
  }
