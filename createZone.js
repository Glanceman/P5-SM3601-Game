class zone{
  constructor(x,y,sizeW,sizeH){
  this.x=x;
  this.y=y;
  this.temp=0;
  this.step=0;
  this.targetW=sizeW;
  this.targetH=sizeH;
  this.Width = sizeW;
  this.Height = sizeH;

  this.amplitude=new p5.Amplitude();
  }
  
  draw(){
  push();
  background(240,247,238);
  rectMode(CENTER);
  fill(196,215,242);
  noStroke();
  rect(this.x, this.y, this.Width, this.Height);
  pop();
  //this.update();
  //console.log(this.amplitude.getLevel()*4);
  }
  
  update(level){
  this.Width = lerp(width, width * 0.5, this.temp);
  this.Height = lerp(height, height* 0.5, this.temp);
  if (level>0.1){
    if (frameCount%30==0){  
    this.temp+=0.09;
    }
  }else{
    this.temp-=0.005;
  }
  if(this.temp>1){
    this.temp=1;
  }else if(this.temp<0){
    this.temp=0;
  }
  }

}