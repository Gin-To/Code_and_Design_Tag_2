let maxDiameter = 800; // maximaler Durchmesser
let minDiameter = 20;  // minimaler Durchmesser
let val = 0;           // Wert, der den Slider ersetzt
let speed = .8;         // Geschwindigkeit der Bewegung
let direction = 1;     // 1 = aufwärts, -1 = abwärts

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(255); // Hintergrund löschen

  // val automatisch hin und her bewegen
  val += speed * direction;

  // Wenn die Grenzen erreicht sind, Richtung umkehren
  if (val >= 100 || val <= 0) {
    direction *= -1;
  }

  // Farben
  let dark = color(86, 60, 92);
  let light = color(242, 189, 205);

  // Hintergrundhälften
  fill(dark);
  rect(0, 0, width / 2, height);

  fill(light);
  rect(width / 2, 0, width / 2, height);

  // Durchmesser gegensinnig verändern
  let leftDiameter = map(val, 0, 100, maxDiameter, minDiameter);
  let rightDiameter = map(val, 0, 100, minDiameter, maxDiameter);

  let midX = width / 2;
  let centerY = height / 2;

  // Sicherstellen, dass die Kreise im Bereich bleiben
  let leftX = max(leftDiameter / 2, midX - leftDiameter / 2);
  let rightX = min(width - rightDiameter / 2, midX + rightDiameter / 2);

  // Linker Kreis
  fill(light);
  ellipse(leftX, centerY, leftDiameter, leftDiameter);

  // Rechter Kreis
  fill(dark);
  ellipse(rightX, centerY, rightDiameter, rightDiameter);
}