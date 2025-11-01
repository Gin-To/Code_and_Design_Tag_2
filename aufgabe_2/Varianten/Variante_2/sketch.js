let yOff = 0; // Offset für die Wellenbewegung

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  strokeWeight(2);
  noFill();
}

function draw() {
  background(0);

  beginShape();
  for (let x = 0; x <= width; x += 1) {
    // Basis-Sinuswelle
    let baseY = height / 2 + sin((x * 0.05) + yOff) * 50;
    
    // Abstand der Maus zum aktuellen x-Punkt
    let distance = abs(mouseX - x);
    
    // Stärke der Wellenamplitude abhängig von der Mausnähe
    let influence = map(distance, 0, 200, 1.5, 0.5); // näher -> stärker
    influence = constrain(influence, 0.5, 1.5);
    
    let y = height / 2 + sin((x * 0.05) + yOff) * 50 * influence;
    curveVertex(x, y);
  }
  endShape();

  yOff += 0.05;
}