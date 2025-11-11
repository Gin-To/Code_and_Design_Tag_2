// Gleiche Kreise, Maus meidet sie, Farbe reagiert

let circles = [];
let numCircles = 70;
let circleRadius = 30; // feste Grösse für alle Kreise

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Kreis-Objekte erzeugen
  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      r: circleRadius,
      vx: random(-3, 3),   // etwas stärkere Anfangsgeschwindigkeit
      vy: random(-3, 3),
      baseColor: color(80, 200, 255), // Grundfarbe (bläulich)
      intensity: 0 // Farbstärke bei Mausnähe
    });
  }
}

function draw() {
  background(15);

  for (let c of circles) {
    // --- autonome Bewegung ---
    c.x += c.vx;
    c.y += c.vy;

    // stärkere Drift, damit Bewegung „grösser“ wirkt
    c.vx += random(-0.08, 0.08);
    c.vy += random(-0.08, 0.08);

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

    // --- Mausreaktion: fliehen wenn zu nah ---
    let d = dist(mouseX, mouseY, c.x, c.y);
    let safeDistance = 100;

    if (d < safeDistance) {
      // Richtung vom Mauszeiger weg
      let angle = atan2(c.y - mouseY, c.x - mouseX);
      // je näher, desto stärker die Flucht
      let force = map(d, 0, safeDistance, 4, 0);
      c.vx += cos(angle) * force * 0.35;
      c.vy += sin(angle) * force * 0.35;
      // Farbstärke abhängig von Nähe (0..1)
      c.intensity = map(d, 0, safeDistance, 1, 0);
    } else {
      // langsam beruhigen (intensity zurückziehen)
      c.intensity = lerp(c.intensity, 0, 0.05);
    }

    // Reibung (leicht weniger Reibung => grössere Bewegungen)
    c.vx *= 0.985;
    c.vy *= 0.985;

    // --- Farbe berechnen ---
    let nearCol = color(255, 80, 150); // pink bei Nähe
    let col = lerpColor(c.baseColor, nearCol, c.intensity);
    fill(col);

    // Kreis (gleiche Grösse für alle)
    circle(c.x, c.y, c.r * 2);
  }

}
