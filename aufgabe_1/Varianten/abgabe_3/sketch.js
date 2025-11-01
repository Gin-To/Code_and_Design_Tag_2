let valueSlider;
let maxDiameter = 800; // maximaler Durchmesser
let minDiameter = 20;  // minimaler Durchmesser

function setup() {
  createCanvas(windowWidth, windowHeight);
  valueSlider = createSlider(0, 100, 50);
  valueSlider.position(10, 10);
  noStroke();
}

function draw() {
  
  let val = valueSlider.value();

  // Farben
  let dark = color(86, 60, 92);
  let light = color(242, 189, 205);

  // Hintergrundhälften
  fill(dark);
  rect(0, 0, width / 2, height);

  fill(light);
  rect(width / 2, 0, width / 2, height);

  // Slider steuert Grösse gegengleich
  let leftDiameter = map(val, 0, 100, maxDiameter, minDiameter);
  let rightDiameter = map(val, 0, 100, minDiameter, maxDiameter);

  let midX = width / 2;
  let centerY = height / 2;

  // Sicherstellen, dass die Kreise nicht über den Rand hinausgehen
  let leftX = max(leftDiameter / 2, midX - leftDiameter / 2); // links im Feld
  let rightX = min(width - rightDiameter / 2, midX + rightDiameter / 2); // rechts im Feld

  // Linker Kreis
  fill(light);
  ellipse(leftX, centerY, leftDiameter, leftDiameter);

  // Rechter Kreis
  fill(dark);
  ellipse(rightX, centerY, rightDiameter, rightDiameter);
}