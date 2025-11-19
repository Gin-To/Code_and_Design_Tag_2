// Gleiche Kreise, Maus meidet sie, Farbe reagiert

let circles = [];
let numCircles = 70; //Anzahl der zu erzeugenden Kreise
let circleRadius = 30; // feste Grösse für alle Kreise

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Kreis-Objekte erzeugen. Die Schleife läuft 70 Mal
  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: random(width), //zufällige x-Position
      y: random(height), //zufällige y-Position
      r: circleRadius,
      vx: random(-3, 3),   // etwas stärkere Anfangsgeschwindigkeit
      vy: random(-3, 3),
      baseColor: color(237, 235, 221), // Grundfarbe (beige)
      intensity: 0 // Farbstärke bei Mausnähe
    });
  }
}

function draw() {
  background(99, 0, 0);


//Für jeden Kreis im Array circles diesen Code ausführen
  for (let c of circles) {
    // --- autonome Bewegung ---
    //Position = Position + Geschwindigkeit (c.x = c.x + c.vx)
    c.x += c.vx;
    c.y += c.vy;

    // schnelle Bewegung der Kreise
    c.vx += random(-0.3, 0.3);
    c.vy += random(-0.3, 0.3);

    // Ränder abprallen lassen (mit puffern durch r)
    // die Mitte des Kreises niemals näher als r am Rand sein.
    if (c.x < c.r) { //Ist der Kreis über den linken Rand hinausgeraten?
      c.x = c.r; // Zurück auf die Wand setzen.
      c.vx *= -1; // Geschwindigkeit umdrehen = Abprallen!
    }
    if (c.x > width - c.r) { //rechter Rand
      c.x = width - c.r; // Zurück auf die Wand setzen.
      c.vx *= -1; // Geschwindigkeit umdrehen = Abprallen!
    }
    if (c.y < c.r) { //oberer Rand
      c.y = c.r; // Zurück auf die Wand setzen.
      c.vy *= -1; // Geschwindigkeit umdrehen = Abprallen!
    }
    if (c.y > height - c.r) { //unterer Rand
      c.y = height - c.r; // Zurück auf die Wand setzen.
      c.vy *= -1; // Geschwindigkeit umdrehen = Abprallen!
    }

    // --- Mausreaktion: fliehen wenn zu nah ---
    let d = dist(mouseX, mouseY, c.x, c.y); // Distanz Maus - Kreiszentrum
    let safeDistance = 100; // Abstand, ab dem der Kreis reagiert

    if (d < safeDistance) { // d kleiner als sicherer Abstand
      // Der Winkel zeigt vom Mauszeiger zum Kreis.
      let angle = atan2(c.y - mouseY, c.x - mouseX);
      // je näher, desto stärker flüchtet der Kreis
      let force = map(d, 0, safeDistance, 4, 0);
      c.vx += cos(angle) * force * 0.35; // Kreis erhält einen Schub
      c.vy += sin(angle) * force * 0.35; 
      // Farbstärke abhängig von Nähe (0..1)
      c.intensity = map(d, 0, safeDistance, 1, 0);
    } else {
      // langsam beruhigen (intensity zurückziehen)
      c.intensity = lerp(c.intensity, 0, 0.05);
    }

     // Reibung (leicht weniger Reibung => grössere Bewegungen) geschwindigkeit mal 0.985
    c.vx *= 0.985;
    c.vy *= 0.985;

    // --- Farbe berechnen ---
    let nearCol = color(120, 1, 0); // rot bei Nähe
    let col = lerpColor(c.baseColor, nearCol, c.intensity); // mischt die beiden Farben linear je nach intensity
    fill(col);

    // Kreis (gleiche Grösse für alle)
    circle(c.x, c.y, c.r * 2);
  }

}
