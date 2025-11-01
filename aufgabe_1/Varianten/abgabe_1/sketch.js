/*let valueSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  valueSlider = createSlider(0, 100, 50); // mittlere Position
  valueSlider.position(30, 30);
  noStroke();
}

function draw() {
  let val = valueSlider.value();
  
  // Farben
  let dark = color(86, 60, 92);
  let light = color(242, 189, 205);
  
  // Hintergrundhälften
  noStroke();
  fill(dark);
  rect(0, 0, width / 2, height);
  fill(light);
  rect(width / 2, 0, width / 2, height);
  
  // Sliderwert in Kreisgrößen umwandeln
  let leftSize = map(val, 0, 100, width * 0.8, width * 0.05);
  let rightSize = map(val, 0, 100, width * 0.05, width * 0.8);
  
  // Kreise zeichnen
  fill(light);
  ellipse(width / 4, height / 2, leftSize, leftSize);   // linker Kreis
  fill(dark);
  ellipse(3 * width / 4, height / 2, rightSize, rightSize); // rechter Kreis
}*/




let valueSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  valueSlider = createSlider(0, 100, 50);
  valueSlider.position(30, 30);
  noStroke();
}

function draw() {
  let val = valueSlider.value();

  // Farben
  let dark = color(86, 60, 92);
  let light = color(242, 189, 205);

  // Kreisgrößen
  let leftSize = map(val, 0, 100, width * 0.8, width * 0.05);
  let rightSize = map(val, 0, 100, width * 0.05, width * 0.8);

  // Interpolationswert für smooth Übergang (0 = linker Kreis klein, 1 = rechter Kreis klein)
  let t = map(leftSize - rightSize, -width*0.75, width*0.75, 0, 1);
  t = constrain(t, 0, 1);

  // Hintergrundfarbe: dunkler Hintergrund für kleinen linken Kreis, heller für kleinen rechten
  let bgColor = lerpColor(dark, light, t);
  background(bgColor);

  // Kreisfarbe: kontrastierend zum Hintergrund
  let circleColor = lerpColor(light, dark, t);

  // Nur kleiner Kreis anzeigen
  if (leftSize < rightSize) {
    fill(circleColor);         // heller Kreis auf dunklem Hintergrund
    ellipse(width / 4, height / 2, leftSize, leftSize);
  } else {
    fill(circleColor);         // dunkler Kreis auf hellem Hintergrund
    ellipse(3 * width / 4, height / 2, rightSize, rightSize);
  }
}