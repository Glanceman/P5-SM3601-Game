let bgm;
let start;
let Zone;
let Player;
let particles=[];
let p;
let isGenerated;
let stop;
let score;
let highestScore;
let amplitude;
let isAbilityOn;
 function preload() {
   bgm = loadSound('BGM.m4a');
 }
 
 function playBGM() {
   if (!bgm.isPlaying()) {
      amplitude=new p5.Amplitude();
      bgm.setVolume(0.25);
      bgm.loop();
   }
 }

 function setup() {
   createCanvas(800, 800);// fix size (square)
   background(240,247,238);
   noCursor();
   start=false;
   isGenerated=false;
   isAbilityOn=false;
   Zone =new zone(width/2,height/2,width,height);
   Player = new player(width,height);
   score= new countScore(width,height,0);
   highestScore=0;
   amplitude=new p5.Amplitude();
   //p=new Particle(200,200,10);
   frameRate(60);
 }

 function draw() {
   if (start==false){
    //background(240,247,238);
    stop=true;
    startMenu(width,height);
   }else if (stop==true){
    bgm.stop();
    StopMenu(width,height,score.score,highestScore);
   }else{
      //background(240,247,238);
      playBGM();
      let level =amplitude.getLevel()*4;
      Zone.update(level);
      Zone.draw();
      Player.show(isAbilityOn);
      var frame=0;
      if (score.score<30){
        frame=90;  
      }else if(score.score<60){
        frame=70
      }else{
        frame=45;
      }
      if(level>0.05 && frameCount%frame==0){
        var generateX=random(50,width);
        var generateY=random(50,height);
        while(dist(generateX,generateY,Player.x,Player.y)<300){
          generateX=random(50,width);
          generateY=random(50,height);
        }
        p=new Particle(generateX,generateY,20);
        particles.push(p);
      }
      for(let i=particles.length-1;i>=0;i--){
        particles[i].show();
        if (particles[i].isDead()){
          particles.splice(i,1);
        }
      }
      if(Player.isTouchParticles(particles)||Player.isTouchZone(Zone)){
         stop=true;
      }
    //text(Player.isTouchParticles(particles)+" "+Zone.x+" "+Zone.Width+" ",100,100);
      score.show();
      score.update();
      if(highestScore<score.score){
         highestScore=score.score
       }
   }
 }

  function mousePressed(){
    start=true;
    if (stop==true){
      stop=false;
      Zone.temp=0.01;
      frameCount=0;
      for(let i=particles.length-1;i>=0;i--){
        particles.splice(i,1);
      }
      Player = new player(width,height);
      frameCount=0;
    }
    if (stop==false){
      isAbilityOn=true;
    }
  }

  function mouseReleased(){
    isAbilityOn=false;
  }