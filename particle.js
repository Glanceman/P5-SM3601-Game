class Particle {
  constructor(x,y,size){
   this.pos = createVector(x, y);
   this.vel = createVector(0, 0);
   this.acc = createVector(0, 0);
   this.lifeSpan=250;  
   this.size=size;
   this.seed=Math.floor(random(0,3));
  
  }
   follow() {
     if(this.pos.x>mouseX){
       this.acc.x=-0.4;
     }else if(this.pos.x<mouseX){
       this.acc.x=0.4;
     }else{
       this.acc.x=0;
     }
     
     if(this.pos.y>mouseY){
       this.acc.y=-0.4;
     }else if(this.pos.y<mouseY){
       this.acc.y=0.4;
     }else{
       this.acc.y=0;
     }
   }
  
    applyForce(force) {
      this.acc.add(force);
     }

   update(n) {
     this.vel.add(this.acc);
     this.vel.limit(n);
     this.pos.add(this.vel);
     this.acc.mult(0);
     this.lifeSpan--;
   }
   show() {
     push()
     noStroke();
     fill(200,random(0,150),0);
     translate(this.pos.x,this.pos.y)
     ellipse(0, 0, this.size-5, this.size-5);
     pop()
     this.follow();
     push();
     strokeWeight(2);
     noStroke();
     fill(20);
     switch(this.seed){
       case 0://circle
         this.update(6.5);
         translate(this.pos.x,this.pos.y)
         rotate(this.rotateToMouse());
         ellipse(0,0,this.size,this.size);
         fill(255);
         ellipse(0,-5,5,5);
         break;
       case 1:
         this.update(5);//rect
         translate(this.pos.x,this.pos.y)
         rotate(this.rotateToMouse());
         rectMode(CENTER);
         rect(0,0,this.size,this.size);
         fill(255);
         ellipse(-5,5,5,5)
         break;
       case 2:
         this.update(7.5);//triangle
         translate(this.pos.x,this.pos.y)
         rotate(frameCount%PI)
         triangle(0,10,-8.66,-5,8.66,-5);
         fill(255);
         ellipse(0,0,5,5);
         break;
     }
     pop();
   }
  
  showBubble(lifeSpan){
    this.update(20);
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
    this.goToDestination(lifeSpan);
  }
  
  goToDestination(lifeSpan){
    let temp=dist(this.pos.x,this.pos.y,mouseX,mouseY)
    if (lifeSpan>30){
      let acc=map(temp,0,height,-0.5,random(2,5));
      if(this.pos.x>mouseX){
         this.acc.x=-acc;
       }else if(this.pos.x<mouseX){
         this.acc.x=acc;
       }else{
         this.acc.x=0;
       }

       if(this.pos.y>mouseY){
         this.acc.y=-acc;
       }else if(this.pos.y<mouseY){
         this.acc.y=acc;
       }else{
         this.acc.y=0;
     }
    }else{
      let vel=map(temp,0,width,1,400);
      if(this.pos.x>mouseX){
         this.vel.x=-vel;
       }else if(this.pos.x<mouseX){
         this.vel.x=vel;
       }else{
         this.vel.x=0;
       }

       if(this.pos.y>mouseY){
         this.vel.y=-vel;
       }else if(this.pos.y<mouseY){
         this.vel.y=vel;
       }else{
         this.vel.y=0;
      }
    }
  }
  
    isDead(){
      if (this.lifeSpan<0){
        return true;
      }else{
        return false;
      }
    }
  
    rotateToMouse(){
      let w=this.pos.x-mouseX;
      let h=this.pos.y-mouseY;
      let a=atan2(h,w);
      return a;
    }
 }