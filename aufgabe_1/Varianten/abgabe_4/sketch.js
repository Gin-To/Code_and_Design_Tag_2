//Statische Kreise

/* let valueSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  valueSlider = createSlider(0, 100, 50);
  valueSlider.position(10, 10);
  noStroke();

  fill(0); // schwarze Kreise
}

function draw() {
  background(255);

  let cols = 5;
  let rows = 5;
  let d = 50; // Durchmesser
  let spacing = d; // Abstand zwischen Kreisen

  // Gesamte Breite und Höhe des Kreisrasters
  let totalW = (cols - 1) * spacing;
  let totalH = (rows - 1) * spacing;

  // Startposition, um das Raster zu zentrieren
  let startX = width / 2 - totalW / 2;
  let startY = height / 2 - totalH / 2;

  // 5x5 Kreise zeichnen
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ellipse(startX + x * spacing, startY + y * spacing, d);
    }
  }
} */


//animierte Kreise im 5x5


/* let valueSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  valueSlider = createSlider(0, 100, 50);
  valueSlider.addClass("slider");
  noStroke();
  fill(0);
}

function draw() {
  background(255);

  let cols = 5;
  let rows = 5;
  let baseD = 50; // Basisdurchmesser
  let spacing = baseD; // Abstand zwischen Kreisen

  // Gesamte Breite und Höhe des Basisrasters
  let totalW = (cols - 1) * spacing;
  let totalH = (rows - 1) * spacing;

  // Startposition, um das Raster zu zentrieren
  let startX = width / 2 - totalW / 2;
  let startY = height / 2 - totalH / 2;

  // Slider steuert die Vergrösserung des mittleren Kreises
  let growth = map(valueSlider.value(), 0, 100, 0, 200);
  let centerD = baseD + growth;

  // Mittelpunktkoordinaten des mittleren Kreises
  let centerX = startX + 2 * spacing;
  let centerY = startY + 2 * spacing;

  // 5x5 Kreise zeichnen
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let posX = startX + x * spacing;
      let posY = startY + y * spacing;

      // Durchmesser
      let d = baseD;

      // Mittlerer Kreis
      if (x === 2 && y === 2) {
        d = centerD;
      } else {
        // Abstand zum Zentrum (in Raster-Schritten)
        let dx = x - 2;
        let dy = y - 2;
        let distFromCenter = dist(0, 0, dx, dy);

        // Wenn nicht der mittlere Kreis: wegschieben um Radiusdifferenz
        if (distFromCenter > 0) {
          let extra = (centerD - baseD) / 2; // wie viel größer der Radius ist
          posX += (dx / distFromCenter) * extra;
          posY += (dy / distFromCenter) * extra;
        }
      }

      ellipse(posX, posY, d);
    }
  }
} */


// kreise volles Window 

let valueSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  valueSlider = createSlider(0, 100, 50);
  valueSlider.addClass("slider");
  noStroke();
  fill(0);
}

function draw() {
  background(255);

  let baseD = 50; // Durchmesser der kleinen Kreise
  let spacing = baseD; // Abstand zwischen Kreisen

  // Anzahl der Spalten und Reihen, die das ganze Fenster füllen
  let cols = floor(width / spacing);
  let rows = floor(height / spacing);

  // Mittelpunkt-Index
  let centerCol = floor(cols / 2);
  let centerRow = floor(rows / 2);

  // Slider steuert Vergrösserung des mittleren Kreises
  let growth = map(valueSlider.value(), 0, 100, 0, 400);
  let centerD = baseD + growth;

  // Mittelpunktkoordinaten des mittleren Kreises
  let startX = (width - (cols - 1) * spacing) / 2;
  let startY = (height - (rows - 1) * spacing) / 2;
  let centerX = startX + centerCol * spacing;
  let centerY = startY + centerRow * spacing;

  // Alle Kreise zeichnen
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let posX = startX + x * spacing;
      let posY = startY + y * spacing;

      let d = baseD;

      // Mittlerer Kreis
      if (x === centerCol && y === centerRow) {
        d = centerD;
      } else {
        // Richtung vom Zentrum
        let dx = x - centerCol;
        let dy = y - centerRow;
        let distFromCenter = dist(0, 0, dx, dy);

        if (distFromCenter > 0) {
          // Schiebe alle anderen Kreise so weit nach aussen,
          // dass sie den großen Kreis nicht berühren
          let extra = (centerD - baseD) / 2;
          posX += (dx / distFromCenter) * extra;
          posY += (dy / distFromCenter) * extra;
        }
      }

      ellipse(posX, posY, d);
    }
  }
}