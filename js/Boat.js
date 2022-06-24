class Boat {
    constructor(x,y,width,height, boatposi, boatanimation){
        this.body = Bodies.rectangle(x,y,width,height);
        this.width = width;
        this.height = height;
        this.speed = 0.05
          this.animation = boatanimation;
      
        this.boatPosition = boatposi;

         this.isBroken= false;
        World.add(world,this.body);

        
    }
animate() {
    this.speed += 0.05;
}

    remove(index) {
         this.animation = brokenboatanimation;
         this.speed = 0.05
         this.width = 300
         this.height = 300
         this.isBroken=true;
        setTimeout(()=> {
        Matter.World.remove(world,boats[index].body);
        delete boats[index];
        },1000)
        }

    

    display() {
         var angle = this.body.angle;
         var Pos = this.body.position;
         var index = floor(this.speed % this.animation.length);

         push();
         translate(Pos.x, Pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index],0, this.boatPosition, this.width, this.height);
        pop();
    }
}
