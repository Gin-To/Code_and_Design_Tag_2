let eyesClosed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 182, 193); // Rosa Hintergrund (#FFB6C1)

  let eyeSize = 200; // Durchmesser der Augen
  let pupilSize = 100; // Durchmesser der Pupillen
  let eyeSpacing = 250; // Abstand zwischen den Augen
  let pupilRange = 30;  // Wie weit sich die Pupille bewegen darf

  // Mittelpunkt des Fensters
  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;

  // Positionen der Augen
  let leftEyeX = centerX - eyeSpacing / 2;
  let rightEyeX = centerX + eyeSpacing / 2;

  if (eyesClosed) {
    // Geschlossene Augen zeichnen (rosa Linien)
    stroke(255, 182, 193);
    strokeWeight(15);
    line(leftEyeX - eyeSize / 2, centerY, leftEyeX + eyeSize / 2, centerY);
    line(rightEyeX - eyeSize / 2, centerY, rightEyeX + eyeSize / 2, centerY);
  } else {
    // Offene Augen zeichnen
    noStroke();
    fill(255);
    ellipse(leftEyeX, centerY, eyeSize);
    ellipse(rightEyeX, centerY, eyeSize);

    // Pupillen zeichnen
    fill(0);
    let leftPupil = pupilPosition(leftEyeX, centerY);
    let rightPupil = pupilPosition(rightEyeX, centerY);
    ellipse(leftPupil.x, leftPupil.y, pupilSize);
    ellipse(rightPupil.x, rightPupil.y, pupilSize);
  }
}

function pupilPosition(eyeX, eyeY) {
  let pupilRange = 30;
  let dx = mouseX - eyeX;
  let dy = mouseY - eyeY;
  let angle = atan2(dy, dx);
  let px = eyeX + cos(angle) * pupilRange;
  let py = eyeY + sin(angle) * pupilRange;
  return createVector(px, py);
}

// Augen schliessen bei Mausklick
function mousePressed() {
  eyesClosed = true;
}

// Augen wieder öffnen, wenn Maus losgelassen wird
function mouseReleased() {
  eyesClosed = false;
}