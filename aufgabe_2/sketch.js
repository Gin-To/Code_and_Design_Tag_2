// 🌈 Freie Kreise, die Mausnähe meiden & farbig reagieren
// 100% p5.js – reine Kreise, keine externen Funktionen

let circles = [];
let numCircles = 70;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // viele Kreise zufällig im Canvas verteilen
  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      r: random(6, 14),
      vx: random(-1.5, 1.5),
      vy: random(-1.5, 1.5),
      baseColor: color(80, 200, 255), // Grundfarbe (bläulich)
      intensity: 0 // wird bei Mausnähe erhöht
    });
  }
}

function draw() {
  background(15);

  for (let c of circles) {
    // --- autonome Bewegung ---
    c.x += c.vx;
    c.y += c.vy;

    // leichtes Driften (Zufallsänderung der Richtung)
    c.vx += random(-0.05, 0.05);
    c.vy += random(-0.05, 0.05);

    // Ränder abprallen
    if (c.x < c.r || c.x > width - c.r) c.vx *= -1;
    if (c.y < c.r || c.y > height - c.r) c.vy *= -1;

    // --- Mausreaktion ---
    let d = dist(mouseX, mouseY, c.x, c.y);
    let safeDistance = 100;

    if (d < safeDistance) {
      // flieht von der Maus weg
      let angle = atan2(c.y - mouseY, c.x - mouseX);
      let force = map(d, 0, safeDistance, 4, 0);
      c.vx += cos(angle) * force * 0.3;
      c.vy += sin(angle) * force * 0.3;

      // Farbstärke abhängig von Nähe
      c.intensity = map(d, 0, safeDistance, 1, 0);
    } else {
      // langsam wieder beruhigen
      c.intensity = lerp(c.intensity, 0, 0.05);
    }

    // Bewegung bremsen (Reibung)
    c.vx *= 0.98;
    c.vy *= 0.98;

    // --- Farbe berechnen ---
    let nearCol = color(255, 80, 150); // leuchtendes Pink bei Nähe
    let col = lerpColor(c.baseColor, nearCol, c.intensity);
    fill(col);

    // Kreis zeichnen
    circle(c.x, c.y, c.r * 2);
  }

}
