 let player;
 let playerSize;
 let particleSize = 20;
 let particlePosX;
 let particlePosY;
 let step = 0;
 let obstacle = [];
 let parX = [];
 let parY = [];
 let angle = [];
 let control;
 let temp;
 let sx, sy, dx, dy, fx, fy;
 var Angle, a;
 let start, starting;
 let distanceRecord = [];
 let touchFlag;
 let zoneWidth, zoneHeight;
 let score;

 let bgm;
 
 function preload() {
   bgm = loadSound('BGM.m4a');
 }
 
 function playBGM() {
   if (!bgm.isPlaying()) {
     bgm.play();
   }
 }

 function setup() {
   var width=900;
   var height=900
   createCanvas(width, height);// fix size (square)
   background(160, 82, 45);
   frameRate(60);
   stroke(0);
   strokeWeight(10);
   start = false;
   starting = false;
   touchFlag = false;
   temp = 0;
   score = 0;
   a = 0;
   playerSize = 40;
   particlePosX = width / 2;
   particlePosY = height / 2;
 }

 function draw() { ////////////////////////////
   playBGM();
   createZone();
   startMenu();
   countScore();
   if (start == true && starting == false) {  //start generate particle
     for (var i = 0; i < 10; i++) {
       parX[i] = random(width);
       parY[i] = random(height);
       while (dist(parX[i],parY[i],width/2,height/2)<(playerSize+particleSize+100)){
       parX[i] = random(width);
       parY[i] = random(height);
       }
       obstacle[i] = new Particle(parX[i], parY[i]); 
     }
     starting = true;
   }
   for (var k = 0; k < obstacle.length; k++) {
     obstacle[k].follow();
     obstacle[k].update();
     obstacle[k].show();
   }
   Player();
   if (isPlayerTouchAnything() == true && start == true) {///stop the program
     push();
     stroke(0);
     strokeWeight(10);
     textSize(20);
     fill(255);
     text("GAMEOVER", width / 2, height / 2);
     text("Your score: " + score, width / 2, height / 2 + 50);
     text("Press any mouse's button to restart!", width / 2, height / 2 + 100);
     pop();
     score = 0;
     noLoop();
   }
 } /////////////////////////////////////////////////////////

 function createZone() {
   push();
   zoneWidth = lerp(width, width * 3 / 5, temp);
   zoneHeight = lerp(height, height * 4 / 5, temp);
   background(100);
   rectMode(CENTER);
   fill(200);
   stroke(0);
   strokeWeight(2);
   rect(width / 2, height / 2, zoneWidth, zoneHeight);
   temp = sin(a);
   a = a + 1 / (12 * PI);
   pop();
 }

 function Player() {
   particlePosX = lerp(particlePosX, mouseX, 0.1);
   particlePosY = lerp(particlePosY, mouseY, 0.1);
   push();
   noStroke();
   let isNear=false;/////change color of player;
   for(let i =0;i<distanceRecord.length;i++){
     if (distanceRecord[i]<(playerSize+particleSize+10)){
        isNear=true;
      }
     }
   if (isNear==true){
     fill(255,0,0,50);
   }else{
     fill(255);
   }
   ellipse(particlePosX, particlePosY, playerSize, playerSize);
   pop();
 }

 function keyTyped() {////change size of player
   if (key === 'q') {
     playerSize = 100;
   } else if (key === 'e') {
     playerSize = 25;
   } else if (key === 'w') {
     playerSize = 40;
   }
 }



 function Particle(x, y) {
   this.pos = createVector(x, y);
   this.vel = createVector(0, 0);
   this.acc = createVector(0, 0);

   this.follow = function() {
     dx = this.pos.x - pmouseX;
     dy = this.pos.y * (-1) - pmouseY * (-1);
     Angle = atan2(dy, dx);
     if ((Angle > 0 && Angle < PI / 2) || (Angle > -PI && Angle < -PI / 2)) {
       fx = -1
     } else {
       fx = 1
     }
     if ((Angle > PI / 2 && Angle < PI) || (Angle > -PI / 2 && Angle < 0)) {
       fy = -1
     } else {
       fy = 1
     }
     sx = 1 * sin(Angle+(random(-0.1,0.1))) * fx;
     sy = 1 * cos(Angle+random(-0.1,0.1)) * fy;
     control = createVector(sx, sy);
     this.applyForce(control);
   }
   this.applyForce = function(force) {
     this.acc.add(force);
   }

   this.update = function() {
     this.vel.add(this.acc);
     this.vel.limit(10);
     this.pos.add(this.vel);
     this.acc.mult(0);
   }
   this.show = function() {
     push();
     strokeWeight(2);
     fill(20);
     ellipse(this.pos.x, this.pos.y, particleSize, particleSize);
     pop();
   }
 }

 function isPlayerTouchAnything() {
   if ((particlePosX > (width + zoneWidth - playerSize) / 2 || particlePosX < (width - zoneWidth + playerSize) / 2) || (particlePosY < (height - zoneHeight + playerSize) / 2 || particlePosY > (height + zoneHeight -
       playerSize) / 2)) {
     touchFlag = true;
   }
   for (let j = 0; j < obstacle.length; j++) {
     distanceRecord[j] = dist(obstacle[j].pos.x, obstacle[j].pos.y, particlePosX, particlePosY);
     if (distanceRecord[j] <= ((playerSize + particleSize) / 2)) {
       touchFlag = true;
     }
     // push();
     // strokeWeight(2);
     // text(distanceRecord[j] + " " + touchFlag, 100, 100 + 30 * j);
     // pop();
   }
   // push();
   // strokeWeight(1)
   // text(touchFlag, 100, 100 + 30);
   // pop();
   return touchFlag;

 }




 function mousePressed() {//control start and restart of the program
   if (start == false) {
     start = true;
     loop();
   }
   //Restart
   if (touchFlag == true && start == true) {
     touchFlag = false;
     for (var i = 0; i < 10; i++) {
       parX[i] = random(width);
       parY[i] = random(height);
       obstacle[i] = new Particle(parX[i], parY[i]);
     }
     //reset player position
     particlePosX = width / 2;
     particlePosY = height / 2;
     playerSize=40;
     a=0;
     frameCount=0;
     loop();
   }
 }

 function countScore() {
   score = score + floor((frameCount / 60) * (playerSize / 40));
   push();
   textAlign(CENTER);
   stroke(0);
   strokeWeight(8);
   textSize(20);
   fill(255);
   text("Score: " + score, width / 2, height * 1 / 9);
   pop();
 }

 function startMenu() {
   if (start == false) {
     push();
     textAlign(CENTER);
     stroke(0);
     strokeWeight(10);
     fill(255);
     textSize(20)
     text("Press any mouse's button to start!", width / 2, height / 2);
     pop();
     noLoop();
   }
 }