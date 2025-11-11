let x;         // x-Position des Vierecks
let angle = 0; // Drehwinkel
let rectColor; // Farbe des Rechtecks

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  x = width / 2; // Start in der Mitte
  rectColor = color(255, 0, 0); // Anfangsfarbe Rot
}

function draw() {
  background(220);

  // Bewegung & Rotation aktualisieren
  x += 2;           // gehe nach rechts
  angle += PI / 180; // drehe dich langsam

  // Zeichnungstransformationen
  push();
  translate(x, height / 2);
  rotate(angle);
  fill(rectColor);     // Rechteck mit aktueller Farbe füllen
  rect(0, 0, 100, 100);
  pop();

  // Wenn das Viereck aus dem Bild ist, neu starten
  if (x - 50 > width) {
    x = -50;
    angle = 0;
  }
}

// Diese Funktion MUSS außerhalb von draw() stehen
function mousePressed() {
  rectColor = color(
    random(255),
    random(255),
    random(255)
  );
}