class CannonBall {
    constructor(x,y){
        var options = {
            isStatic: true
        }
        this.r = 30;
        this.body = Bodies.circle(x,y, this.r, options);
        this.image = loadImage("./assets/cannonball.png");
        this.animation = [this.image]
        this.isSink = false;
        this.trajectory = [];
        World.add(world, this.body);
    }
    animate() {
        this.speed += 0.05;
    }

    shoot() {
        var newAngle = cannon.angle - 27;
        newAngle = newAngle *(3.14/180)
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body, {
            x: velocity.x *(180/3.14), y: velocity.y *(180/3.14)
        });
        
    }
     
    remove(index) {
        this.isSink = true;
        Matter.Body.setVelocity(this.body,{x:0, y:0});

        this.animation = watersplashanimation;
        this.speed = 0.05;
        this.r = 150;

        setTimeout(() => {
        Matter.World.remove(world, this.body);
        delete balls[index];
        },1000)
    }
    display() {
        var posi = this.body.position;
        var index = floor(this.speed & this.animation.length)
        push();
        imageMode(CENTER);
        image(this.animation[index], posi.x, posi.y, this.r, this.r);
        pop();
        if(this.body.velocity.x > 0 && posi.x > 10) {
            var position = [posi.x, posi.y];
            this.trajectory.push(position);

        }

        for(var i = 0; i < this.trajectory.length; i++) {
            image(this.image, this.trajectory[i][0], this.trajectory[i][1], 6,6 );
        }
    
        } 
        
    }
      

