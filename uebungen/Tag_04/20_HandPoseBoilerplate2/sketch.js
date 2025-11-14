/**
 * HandPose Boilerplate mit ml5.js
 * 
 * Dieses Sketch erkennt Hände über die Webcam und zeichnet die erkannten Keypoints.
 * Es dient als Ausgangspunkt für eigene Hand-Tracking-Projekte.
 * 
 * Dokumentation: https://docs.ml5js.org/#/reference/handpose
 * 
 * Jede Hand hat 21 Keypoints (0-20):
 * - 0: Handgelenk
 * - 1-4: Daumen
 * - 5-8: Zeigefinger
 * - 9-12: Mittelfinger
 * - 13-16: Ringfinger
 * - 17-20: Kleiner Finger
 */

// Globale Variablen
let handpose;           // Das ml5.js HandPose-Modell
let video;              // Die Webcam
let hands = [];         // Array mit allen erkannten Händen
let ratio;              // Skalierungsfaktor zwischen Video und Canvas
let isModelReady = false; // Flag, ob das Modell geladen und Hände erkannt wurden

// Kreis-Variablen (rechte Hand)
let circleX, circleY;   // Position des Kreises
let circleSize = 120;   // Größe des Kreises

// Rechteck-Variablen (linke Hand)
let rectX, rectY;       // Position des Rechtecks
let rectSize = 120;     // Größe des Rechtecks

/**
 * Lädt das HandPose-Modell vor dem Setup
 * Diese Funktion wird automatisch vor setup() ausgeführt
 */
function preload() {
  handpose = ml5.handPose();
}

/**
 * Initialisiert Canvas und Webcam
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Performanceoptimierung

  // Webcam einrichten
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // Versteckt das Standard-Video-Element

  // Berechne Skalierungsfaktor für Video-zu-Canvas-Anpassung
  ratio = width / video.width;

  // Starte Hand-Erkennung
  handpose.detectStart(video, gotHands);
  
  // Initialisiere Kreis und Rechteck Positionen
  circleX = width * 0.33;  // Links positioniert
  circleY = height / 2;
  
  rectX = width * 0.66;    // Rechts positioniert
  rectY = height / 2;
}

/**
 * Hauptzeichnungs-Loop
 */
function draw() {
  background(0);

  // Positionen aktualisieren
  circleX = width * 0.33;
  circleY = height / 2;
  rectX = width * 0.66;
  rectY = height / 2;

  // Spiegle die Darstellung horizontal (für intuitivere Interaktion)
  push();
  translate(width, 0);
  scale(-1, 1);

  //Zeige das Video (optional)
  //image(video, 0, 0, video.width * ratio, video.height * ratio);

  // Zeichne nur, wenn das Modell bereit ist und Hände erkannt wurden
  if (isModelReady) {
    updateShapeSizes(); // Aktualisiere Größen basierend auf Handdistanz
    drawHandPoints();
  }

  pop();
  
  // Zeichne Formen NACH dem pop() (außerhalb der Transformation)
  drawShapes();
}

/**
 * Callback-Funktion für HandPose-Ergebnisse
 * Wird automatisch aufgerufen, wenn neue Hand-Daten verfügbar sind
 * 
 * @param {Array} results - Array mit erkannten Händen
 */
function gotHands(results) {
  hands = results;

  // Setze Flag, sobald erste Hand erkannt wurde
  if (hands.length > 0) {
    isModelReady = true;
  }
}

/**
 * Zeichnet alle erkannten Hand-Keypoints
 * Jede Hand hat 21 Keypoints (siehe Kommentar oben)
 */
function drawHandPoints() {
  // Durchlaufe alle erkannten Hände (normalerweise max. 2)
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    // Durchlaufe alle 21 Keypoints einer Hand
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];

      // Zeichne Keypoint als grüner Kreis
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x * ratio, keypoint.y * ratio, 10);
    }
  }
}

/**
 * Aktualisiert die Größen der Formen basierend auf der Distanz zur Kamera
 * Je näher die Hand, desto größer die Form
 */
function updateShapeSizes() {
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    
    // Berechne die durchschnittliche z-Tiefe der Hand (z-Wert des Handgelenks)
    let handZ = hand.keypoints[0].z;
    
    // Je negativer der z-Wert, desto näher ist die Hand an der Kamera
    // Mappe z-Wert auf Größe (typischer Bereich: -100 bis 100)
    let size = map(handZ, -50, 50, 300, 50);
    size = constrain(size, 50, 300); // Begrenze die Größe
    
    // Bestimme ob es die rechte oder linke Hand ist
    // Handedness kann "Left" oder "Right" sein
    if (hand.handedness === "Right") {
      // Rechte Hand steuert den Kreis
      circleSize = size;
    } else if (hand.handedness === "Left") {
      // Linke Hand steuert das Rechteck
      rectSize = size;
    }
  }
}

/**
 * Zeichnet Kreis und Rechteck
 */
function drawShapes() {
  // Zeichne Kreis (rechte Hand)
  fill(100, 150, 255);
  noStroke();
  circle(circleX, circleY, circleSize);
  
  // Glanz-Effekt für Kreis
  fill(255, 255, 255, 120);
  circle(circleX - circleSize/6, circleY - circleSize/6, circleSize/3);
  
  // Label für Kreis
  fill(255);
  textAlign(CENTER);
  textSize(16);
  text("Rechte Hand", circleX, circleY + circleSize/2 + 30);
  
  // Zeichne Rechteck (linke Hand)
  fill(255, 150, 100);
  noStroke();
  rectMode(CENTER);
  rect(rectX, rectY, rectSize, rectSize);
  
  // Glanz-Effekt für Rechteck
  fill(255, 255, 255, 120);
  rect(rectX - rectSize/6, rectY - rectSize/6, rectSize/3, rectSize/3);
  
  // Label für Rechteck
  fill(255);
  textAlign(CENTER);
  text("Linke Hand", rectX, rectY + rectSize/2 + 30);
}

