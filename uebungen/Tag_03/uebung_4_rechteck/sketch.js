function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(250, 50);

  let rectWidth = 50;
  let rectHeight = 25;
  let spacing = 50;
  let count = 5;

  let totalWidth = count * rectWidth + (count - 1) * spacing;
  let startX = width / 2 - totalWidth / 2 + rectWidth / 2;
  let y = height / 2;

  fill(255, 0, 0);
  noStroke();

  for (let i = 0; i < count; i++) {
    let x = startX + i * (rectWidth + spacing);

    // Abstand der Maus zum jeweiligen Rechteck
    let distToMouse = abs(mouseX - x);

    // Je näher die Maus, desto größer das Rechteck
    let grow = map(distToMouse, 0, 100, 300, rectHeight);
    grow = constrain(grow, rectHeight, 300);

    

    // Rechteck wächst nach oben
    push();
    translate(x, y + (rectHeight - grow) / 2);
    rect(0, 0, rectWidth, grow);
    pop();
  }
}