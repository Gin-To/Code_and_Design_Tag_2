let x, y;
let prevX, prevY;
let colors;
let colorIndex = 0; // Start mit der ersten Farbe

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  prevX = x;
  prevY = y;
  
  // Drei feste Farben
  colors = [
    color(50, 0, 50),   // magenta hell
    color(255, 0, 255),   // Magenta
    color(0, 0, 200)    // hellBlau
  ];

  background(200);
}

function draw() {
  // Zufällige Bewegung
  x += random(-5, 5);
  y += random(-5, 5);

  // Linie vom vorherigen Punkt zum neuen Punkt
  stroke(0); // Linie bleibt schwarz
  strokeWeight(2);
  line(prevX, prevY, x, y);

  // Kreis an neuer Position
  fill(colors[colorIndex]);
  noStroke();
  ellipse(x, y, 150, 150);

  // Speichere aktuelle Position
  prevX = x;
  prevY = y;
}

// Maus klick = Farbe wechseln
function mousePressed() {
  colorIndex = (colorIndex + 1) % colors.length; // Index erhöht und modulo Arraylänge
}