let valueSlider;
let maxDiameter = 800; // maximaler Durchmesser Kreis
let minDiameter = 20;  // minimaler Durchmesser Kreis

//Slider im Stylesheet nach unten in der mitte positioniert
function setup() {
  createCanvas(windowWidth, windowHeight);
  valueSlider = createSlider(0, 100, 50);
  valueSlider.addClass("slider");
  noStroke();
}

function draw() {

  let val = valueSlider.value();

  // Farben
  let dark = color(86, 60, 92);
  let light = color(242, 189, 205);

  // Hintergrundhälften
  //Position 0,0 oben links
  fill(dark);
  rect(0, 0, width / 2, height);

  //Position width/2 ist oben in der Mitte
  fill(light);
  rect(width / 2, 0, width / 2, height);

  //Slider steuert Grösse gegengleich
  //Syntax: map(value, start1, stop1, start2, stop2) übersetzt value von Bereich [start1, stop1] linear in den Bereich [start2, stop2].
  //Wenn val = 0 → leftDiameter = maxDiameter (800).
  let leftDiameter = map(val, 0, 100, maxDiameter, minDiameter);
  let rightDiameter = map(val, 0, 100, minDiameter, maxDiameter);


  //midX ist die x-Koordinate der vertikalen Mittellinie, centerY die Y-Koordinate
  // Kreise in der Mitte des Canvas zeichnen
  let midX = width / 2;
  let centerY = height / 2;

  // Sicherstellen, dass die Kreise nicht über die mittellinie gehen
  let leftX = max(leftDiameter / 2, midX - leftDiameter / 2); // links im Feld
  let rightX = min(width - rightDiameter / 2, midX + rightDiameter / 2); // rechts im Feld

  // Linker Kreis
  fill(light);
  ellipse(leftX, centerY, leftDiameter, leftDiameter);

  // Rechter Kreis
  fill(dark);
  ellipse(rightX, centerY, rightDiameter, rightDiameter);
}