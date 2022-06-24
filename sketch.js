const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var piratelaughsound, backgroundmusic, cannonexplode, watersplash;
var isGameOver= false;
var isLaughing = false;
var cannonBall;
var canvas, angle, tower, ground, cannon;
var boat;
var balls = [];
var boats = [];
var score = 0;
var boatanimation = [];
var boatspritedata, boatspritesheet;

var brokenboatanimation = [];
var brokenboatspritedata, brokenboatspritesheet;

var watersplashanimation = [];
var watersplashspritedata, watersplashspritesheet;
function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatspritedata = loadJSON("./assets/boat/boat.json")
  boatspritesheet = loadImage("./assets/boat/boat.png")
  brokenboatspritedata = loadJSON("./assets/boat/brokenboat.json")
  brokenboatspritesheet = loadImage("./assets/boat/brokenboat.png")
  watersplashspritedata = loadJSON("./assets/water/watersplash.json")
  watersplashspritesheet = loadImage("./assets/water/waterSplash.png")
  backgroundmusic = loadSound("./assets/background.mp3")
  piratelaughsound = loadSound("./assets/piratelaugh.mp3")
  cannonexplode = loadSound("./assets/explode.mp3")
  watersplash = loadSound("./assets/splash.mp3")
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  


  angleMode(DEGREES);
  angle = 15;
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);
 cannon = new Cannon(180,110,120,100,angle);

 var boatframes = boatspritedata.frames;
 for( var i = 0; i< boatframes.length;i++) {
  var pos = boatframes[i].position;
  var img = boatspritesheet.get(pos.x,pos.y,pos.w,pos.h);
  boatanimation.push(img)
 }

 var brokenboatframes = brokenboatspritedata.frames;
 for(var i=0; i < brokenboatframes.length; i++) {
  var pos= brokenboatframes[i].position;
  var img = brokenboatspritesheet.get(pos.x,pos.y,pos.w,pos.h);
  brokenboatanimation.push(img);
 }

 var watersplashframes = watersplashspritedata.frames;
 for(var i=0; i < watersplashframes.length;i++) {
  var pos = watersplashframes[i].position;
  var img = watersplashspritesheet.get(pos.x,pos.y,pos.w,pos.h)
  watersplashanimation.push(img);
 }



}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);
 
  fill("black")
  textSize(35)
  text(`Score:${score}`, width-200, 50)
  textAlign(CENTER,CENTER)

if(!backgroundmusic.isPlaying()) {
  backgroundmusic.play();
  backgroundmusic.setVolume(0.2);
}
  
  rect(ground.position.x, ground.position.y, width * 2, 1);
  
   
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  

for( var i = 0; i < balls.length; i++ ) {
  showCannonBalls(balls[i],i);
  collisionwithboats(i);
}

showboats();
  cannon.display();
 

}

function keyReleased() {
  if(keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
   cannonexplode.play();
  }
}
function showCannonBalls(ball,index){
  if(ball) {
    ball.display();
    ball.animate();
    if(ball.body.position.x> width || ball.body.position.y >= height-50 ) {
      watersplash.play()
      ball.remove(index)
    }

  } 
  
}

function keyPressed() {
  if(keyCode === DOWN_ARROW) {
    cannonBall = new CannonBall(cannon.x, cannon.y);
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall)
  }
}

function showboats() {
  if(boats.length > 0) {
    if(
       boats[boats.length -1] === undefined ||
       boats[boats.length -1].body.position.x < width - 300
    ){
      var positions = [-50, -80, -70,-40, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position,boatanimation)



      boats.push(boat)

    }

    for( var i= 0; i <boats.length; i++) {
         if(boats[i]) {
          Matter.Body.setVelocity(boats[i].body, {
            x: -0.9,
            y : 0
          });
          boats[i].display();
          boat[i].animate();
          var collision = Matter.SAT.collides(this.tower, boats[i].body);
          if(collision.collided && !boats[i].isBroken) {
            if(!isLaughing && !piratelaughsound.isPlaying()){
              piratelaughsound.play();
              isLaughing = true;
            }
            isGameOver= true;
            gameOver();
          }
         } else {
          boats[i];
         }
          
    }
  
      
  
  } else {
    var boat = new Boat(width, height, -60,170,170,-60, boatanimation);
    boats.push(boat);
  }


}


function collisionwithboats(index) {
  for(var i=0; i < boats.length; i++) {
    if(balls[index] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body,boats[i].body);

      if(collision.collided) {
        boats[i].remove(i)
       score +=5;
        Matter.World.remove(world,balls[index].body);
        delete balls[index];
      }
    }
  }
}

function gameOver() {
  swal(
    {
      title: `GAME OVER!!!`,
      text:  `THANKS FOR PLAYING:) `,
      imageUrl:
      "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"

    },
    function(isConfirm) {
      if(isConfirm) {
        location.reload();
      }
    }

  )
}