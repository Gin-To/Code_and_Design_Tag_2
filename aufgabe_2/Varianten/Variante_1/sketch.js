let x;         // x-Position des Vierecks
let angle = 0; // Drehwinkel

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  x = width / 2; // Start in der Mitte
}

function draw() {
  background(220);

  // Bewegung & Rotation aktualisieren
  x += 2;           // gehe nach rechts
  angle += PI / 180; // drehe dich langsam (90° = PI/2)

  // Zeichnungstransformationen
  push(); 
  translate(x, height / 2); // Position verschieben
  rotate(angle);            // drehen
  fill(100, 0, 100);
  rect(0, 0, 100, 100);     // Viereck zeichnen
  pop();

  // Wenn das Viereck aus dem Bild ist, neu starten
  if (x - 50 > width) {
    x = -50;      // starte links wieder
    angle = 0;    // Winkel zurücksetzen
  }
}