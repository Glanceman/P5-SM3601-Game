let size= 10;
let size2=10;
let bR=0;
let bG=0;
let bB=0;
let disappear;
let song;
let amplitude;

function setup() {
  //song=loadSound('/01.mp3');
  createCanvas(windowWidth, windowHeight);
  disappear=255;
  //amplitude=new p5.Amplitude();
}

function draw() {
  background(bR,bG,bB,20);
  if(disappear>0){
    display("Designed by Ben",windowWidth/2,windowHeight/2,disappear,disappear);
    //display("BGM:今日のことは忘れられないよ ",windowWidth/2,windowHeight/2+50,disappear,disappear);
   disappear--; 
  }else{
    // if (song.isPlaying()==false){
    //   song.play();
    // }
    // let level= amplitude.getLevel()*10;
  FadingEillipse(windowWidth/2,windowHeight/2,windowHeight*3/4,size,150,220,255,bR,bG,bB,10);
  FadingEillipse(windowWidth/4,windowHeight/4,windowHeight*3/4,size,200,220,255,bR,bG,bB,10);
  FadingEillipse(windowWidth/4,windowHeight*3/4,windowHeight*3/4,size,200,80,150,bR,bG,bB,10);
  FadingEillipse(windowWidth*3/4,windowHeight/4,windowHeight*3/4,size,80,220,150,bR,bG,bB,10);
  FadingEillipse(windowWidth*3/4,windowHeight*3/4,windowHeight*3/4,size,200,220,70,bR,bG,bB,10);
  if(size<windowHeight*3/4){
    size++;
  }else{
    size=0;
  }
  }
}