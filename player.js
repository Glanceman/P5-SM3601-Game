class player {
  constructor(initalx,initaly){
    this.x=initalx/2;
    this.y=initaly/2;
    this.size=40;
    this.bubbles=[];
    this.initialise=false;
    this.bubbleLifeSpan=-1;
    this.coolDown=60;
  }
  
  show(isAbilityOn){
    push()
    noStroke()
    this.update();
    if((isAbilityOn==false&&this.bubbleLifeSpan<0) || (this.coolDown>0 && this.coolDown<=60)){ //finish split
      for(let i = this.size; i>0;i-=3){
        noFill();
        strokeWeight(2);
        if (this.coolDown<=0){
          stroke(255,255-i*10);
        }else{
          stroke(255,0,0,255-i*10);
        }
        ellipse(this.x, this.y, this.size-i, this.size-i);
      }
      this.coolDown--;
    }else if (this.coolDown<=0){
      this.genBubbles(10,isAbilityOn)
    }
    pop()
  }
  
  update(){
    this.x=lerp(this.x, mouseX, 0.2);
    this.y=lerp(this.y, mouseY, 0.2);
  }
  
  intialBubbles(n){
      this.resetLifeSpan(this.bubbleLifeSpan);
      for(let i=0; i<n;i++){
        let bubble=new Particle(this.x,this.y,10)
        this.bubbles.push(bubble);
        let rand_X=random(-5,5);
        let rand_Y=random(-5,5);
        let force=createVector(rand_X,rand_Y)
        this.bubbles[i].applyForce(force)
        this.bubbles[i].update();
    }
    return true;
  }
  
  showBubbles(){
      if (this.bubbles){
        for(let i=0; i<this.bubbles.length;i++){
            this.bubbles[i].showBubble(this.bubbleLifeSpan);
        }
      }
  }
  
  deleteBubbles(){
    if (this.bubbleLifeSpan==0){
      this.bubbles.splice(0,this.bubbles.length)
      this.initialise=false;
      this.coolDown=60;
    }
    this.bubbleLifeSpan--;
  }
  
  resetLifeSpan(){
    this.bubbleLifeSpan=150
  }
  
  genBubbles(n,isAbilityOn){
    if (isAbilityOn==true&&this.initialise==false){
      this.initialise=this.intialBubbles(n);
    }
    this.showBubbles(n);
    this.deleteBubbles();
  }
  
  
  isTouchZone(Zone){
    if(this.x<((Zone.x+Zone.Width/2)-this.size/2)&&this.x>((Zone.x-Zone.Width/2)+this.size/2)&&this.y<((Zone.y+Zone.Height/2)-this.size/2)&&this.y>((Zone.y-Zone.Height/2)+this.size/2)){
      return false; 
    }else{
      return true;
    }
  }
  
  isTouchParticles(p){
    this.check=false;
    for(let j=0;j<=p.length-1;j++){
      if(dist(p[j].pos.x,p[j].pos.y,this.x,this.y)<=(this.size/2+20/2)){
        this.check=true;
      }
    }
    if (this.bubbleLifeSpan>0){
      this.check=false;
    }
    return this.check;
  }
  
}
