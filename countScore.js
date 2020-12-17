class countScore {
  
  constructor(width,height,initalscore,highestScore){
    this.score=initalscore;
    this.width=width/2;
    this.height=height*1/9;
  }
   
  
  show(){
   push();
   textAlign(CENTER);
   stroke(0);
   strokeWeight(8);
   textSize(20);
   fill(255);
   text("Score: " + this.score, this.width, this.height);
   pop();
  }
  
  update(){
    this.score = floor((frameCount / 60) * (40 / 40));
  }
  
 }
