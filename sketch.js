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
   createCanvas(windowWidth, windowHeight);
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
   particlePosX = windowWidth / 2;
   particlePosY = windowHeight / 2;
 }

 function draw() { ////////////////////////////
   playBGM();
   createZone();
   startMenu();
   countScore();
   if (start == true && starting == false) {  //generate particle
     for (var i = 0; i < 10; i++) {
       parX[i] = random(windowWidth);
       parY[i] = random(windowHeight);
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
     text("GAMEOVER", windowWidth / 2, windowHeight / 2);
     text("Your score: " + score, windowWidth / 2, windowHeight / 2 + 50);
     text("Press any mouse's button to restart!", windowWidth / 2, windowHeight / 2 + 100);
     pop();
     score = 0;
     noLoop();
   }
 } /////////////////////////////////////////////////////////

 function createZone() {
   push();
   zoneWidth = lerp(windowWidth, windowWidth * 3 / 5, temp);
   zoneHeight = lerp(windowHeight, windowHeight * 4 / 5, temp);
   background(100);
   rectMode(CENTER);
   fill(200);
   stroke(0);
   strokeWeight(2);
   rect(windowWidth / 2, windowHeight / 2, zoneWidth, zoneHeight);
   temp = sin(a);
   a = a + 1 / (12 * PI);
   pop();
 }

 function Player() {
   particlePosX = lerp(particlePosX, mouseX, 0.1);
   particlePosY = lerp(particlePosY, mouseY, 0.1);
   push();
   noStroke();
   fill(255);
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
     };
     if ((Angle > PI / 2 && Angle < PI) || (Angle > -PI / 2 && Angle < 0)) {
       fy = -1
     } else {
       fy = 1
     };
     sx = 1 * sin(Angle) * fx;
     sy = 1 * cos(Angle) * fy;
     control = createVector(sx * noise(mouseX), sy * noise(mouseY));
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
   if ((particlePosX > (windowWidth + zoneWidth - playerSize) / 2 || particlePosX < (windowWidth - zoneWidth + playerSize) / 2) || (particlePosY < (windowHeight - zoneHeight + playerSize) / 2 || particlePosY > (windowHeight + zoneHeight -
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
       parX[i] = random(windowWidth);
       parY[i] = random(windowHeight);
       obstacle[i] = new Particle(parX[i], parY[i]);
     }
     //reset player position
     particlePosX = windowWidth / 2;
     particlePosY = windowHeight / 2;
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
   text("Score: " + score, windowWidth / 2, windowHeight * 1 / 9);
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
     text("Press any mouse's button to start!", windowWidth / 2, windowHeight / 2);
     pop();
     noLoop();
   }
 }