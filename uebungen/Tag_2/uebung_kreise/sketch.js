let drehwinkel = 0;
let bild;

/*function preload () {
  bild = loadImage("/Users/ginatoschi/Desktop/HFIAD24/Git2/Code_and_Design/uebungen/Tag_2/Uebungen_2/uebung_kreise/images/colorful.jpg/colorful.jpg");
}
  */

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);

  push();

  //Rechteck Rechts
  // Koordinatensystem verschieben
  translate(width / 2 + 200, height / 2);

  // rotieren
  rotate(drehwinkel);

  fill(0, 0, 255)
  rect(0, 0, 200, 200);

  pop();


  push();

  //Rechteck Links
  // Koordinatensystem verschieben
  translate(width / 2 - 200, height / 2);

  // rotieren
  rotate(- drehwinkel);

  fill(80, 0, 80)
  rect(0, 0, 200, 200);

  pop();



   fill(255, 0, 0);
  //Koordinatensystem zurück gesetzt

  rect(0, 0, 200, 200);

  

  drehwinkel = drehwinkel + 5;
}
