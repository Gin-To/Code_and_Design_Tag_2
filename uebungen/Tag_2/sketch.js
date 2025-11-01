let posX = 0;
let posY = 0;

// let threshold = 600;


function setup() {
  createCanvas(windowWidth, windowHeight);
  threshold = width / 2;
  //frameRate (30);
}

function draw() {
  background(220, 80);

  if (posX < threshold) {
    //farbe vor der Position 600
    fill(255, 0, 255, 50);
  } else {
    //farbe nach der Position 600
    fill(0, 0, 255)

  }

  //Zufallswert für Y Position
  //frameCount
  if (frameCount % 40 == 0) {
    posY = random(-100, 10);
  }


  rect(posX, height / 2 + posY, 100, 100);

  // posX = posX + 1; //pos++

  /*
  exakt gelich            posX== 350
  kleiner als             posX < 350
  grösser als             posX > 350
  kleiner oder gleich     posX <= 350 (wahr, falls posX 350 ist)
  grösser oder gleich     posX >= 350 
  ungleich                posX != 350 (trifft immer zu, ausser posX har den Wert von 350)

  */

  if (posX < windowWidth - 50) {
    //falls die Bedingung zutrifft

    posX = posX + 2; //posX++
  }

}


