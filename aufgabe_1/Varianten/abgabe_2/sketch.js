let valueSlider;

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
  noStroke();
  fill(dark);
  rect(0, 0, width / 2, height);
  fill(light);
  rect(width / 2, 0, width / 2, height);

  // Slider steuert Grösse
  let leftRadius = map(val, 0, 100, width * 0.4, 10);
  let rightRadius = map(val, 0, 100, 10, width * 0.4);

  // Kreise an Mittellinie anheften
  let midX = width / 2;
  let centerY = height / 2;

  // Linker Kreis: wächst nach links hinaus
  fill(light);
  ellipse(midX - leftRadius, centerY, leftRadius * 2, leftRadius * 2);

  // Rechter Kreis: wächst nach rechts hinaus
  fill(dark);
  ellipse(midX + rightRadius, centerY, rightRadius * 2, rightRadius * 2);
}