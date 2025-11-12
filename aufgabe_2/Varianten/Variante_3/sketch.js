let circles = [];
let numCircles = 70;
let circleRadius = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      r: circleRadius,
      vx: random(-3, 3),
      vy: random(-3, 3),
      col: color(237, 235, 221), // Startfarbe
      intensity: 0
    });
  }
}

function draw() {
  background(99, 0, 0);

  for (let c of circles) {
    c.x += c.vx;
    c.y += c.vy;

    // Ränder abprallen lassen (mit puffern durch r)
    if (c.x < c.r) {
      c.x = c.r;
      c.vx *= -1;
    }
    if (c.x > width - c.r) {
      c.x = width - c.r;
      c.vx *= -1;
    }
    if (c.y < c.r) {
      c.y = c.r;
      c.vy *= -1;
    }
    if (c.y > height - c.r) {
      c.y = height - c.r;
      c.vy *= -1;
    }

    // Versuch: Farbe soll rot werden, wenn Maus in der Nähe ist
    if (dist(mouseX, mouseY, c.x, c.y) < 100) {
      c.col = color(99, 0, 0);
    } else {
      c.col = color(237, 235, 221);
    }

    fill(c.col);
    circle(c.x, c.y, c.r * 2);
  }
}