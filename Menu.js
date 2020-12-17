 function startMenu(width,height) {
     push();
     textAlign(CENTER);
     stroke(0);
     strokeWeight(10);
     fill(255);
     textSize(20)
     text("Press any mouse's button to start!", width / 2, height / 2);
     pop();
 }

function StopMenu(width,height,score,highestScore){
    push();
     textAlign(CENTER);
     stroke(0);
     strokeWeight(10);
     fill(255);
     textSize(20)
     text("TRY AGAIN", width / 2, height / 2);
     text("Your Score:"+" "+score, width / 2, height / 2+40);
    text("Your Highest Score:"+" "+highestScore, width / 2, height / 2+80);
     pop();
}