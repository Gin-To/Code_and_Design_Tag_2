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

// Ball-Variablen
let ballX, ballY;       // Position des Balls
let ballSize = 80;      // Größe des Balls
let heldByHand = null;  // Welche Hand hält den Ball (0 oder 1)

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
  
  // Initialisiere Ball in der Mitte
  ballX = width / 2;
  ballY = height / 2;
}

/**
 * Hauptzeichnungs-Loop
 */
function draw() {
  background(0);

  // Spiegle die Darstellung horizontal (für intuitivere Interaktion)
  push();
  translate(width, 0);
  scale(-1, 1);

  //Zeige das Video (optional)
  //image(video, 0, 0, video.width * ratio, video.height * ratio);

  // Zeichne nur, wenn das Modell bereit ist und Hände erkannt wurden
  if (isModelReady) {
    drawHandSkeleton();  // Zuerst die Linien zeichnen
    drawHandPoints();     // Dann die Punkte darüber
    updateBall();         // Ball-Logik aktualisieren
    drawBall();           // Ball zeichnen
  }
  
  pop();
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
 * Zeichnet die Verbindungslinien zwischen den Keypoints einer Hand
 */
function drawHandSkeleton() {
  // Durchlaufe alle erkannten Hände
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let keypoints = hand.keypoints;
    
    // Linien-Stil
    stroke(255, 255, 255);
    strokeWeight(2);
    noFill();
    
    // Handgelenk zu jedem Finger-Ansatz
    drawLine(keypoints[0], keypoints[1]);  // Handgelenk -> Daumen
    drawLine(keypoints[0], keypoints[5]);  // Handgelenk -> Zeigefinger
    drawLine(keypoints[0], keypoints[9]);  // Handgelenk -> Mittelfinger
    drawLine(keypoints[0], keypoints[13]); // Handgelenk -> Ringfinger
    drawLine(keypoints[0], keypoints[17]); // Handgelenk -> Kleiner Finger
    
    // DAUMEN (1-4)
    drawLine(keypoints[1], keypoints[2]);
    drawLine(keypoints[2], keypoints[3]);
    drawLine(keypoints[3], keypoints[4]);
    
    // ZEIGEFINGER (5-8)
    drawLine(keypoints[5], keypoints[6]);
    drawLine(keypoints[6], keypoints[7]);
    drawLine(keypoints[7], keypoints[8]);
    
    // MITTELFINGER (9-12)
    drawLine(keypoints[9], keypoints[10]);
    drawLine(keypoints[10], keypoints[11]);
    drawLine(keypoints[11], keypoints[12]);
    
    // RINGFINGER (13-16)
    drawLine(keypoints[13], keypoints[14]);
    drawLine(keypoints[14], keypoints[15]);
    drawLine(keypoints[15], keypoints[16]);
    
    // KLEINER FINGER (17-20)
    drawLine(keypoints[17], keypoints[18]);
    drawLine(keypoints[18], keypoints[19]);
    drawLine(keypoints[19], keypoints[20]);
  }
}

/**
 * Hilfsfunktion zum Zeichnen einer Linie zwischen zwei Keypoints
 */
function drawLine(keypoint1, keypoint2) {
  line(
    keypoint1.x * ratio, keypoint1.y * ratio,
    keypoint2.x * ratio, keypoint2.y * ratio
  );
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
      
      // Zeichne Keypoint als weisser Kreis
      fill(255, 255, 255);
      noStroke();
      circle(keypoint.x * ratio, keypoint.y * ratio, 10);
    }
  }
}

/**
 * Aktualisiert die Ball-Position basierend auf der Hand-Position
 */
function updateBall() {
  if (hands.length === 0) {
    heldByHand = null;
    return;
  }
  
  // Prüfe jede Hand, ob sie den Ball "greift"
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    
    // Berechne das Zentrum der Hand (Durchschnitt aller Keypoints)
    let handCenterX = 0;
    let handCenterY = 0;
    for (let j = 0; j < hand.keypoints.length; j++) {
      handCenterX += hand.keypoints[j].x * ratio;
      handCenterY += hand.keypoints[j].y * ratio;
    }
    handCenterX /= hand.keypoints.length;
    handCenterY /= hand.keypoints.length;
    
    // Berechne Distanz zwischen Hand-Zentrum und Ball
    let distance = dist(handCenterX, handCenterY, ballX, ballY);
    
    // Wenn Hand nah genug am Ball ist, "greift" sie ihn
    if (distance < ballSize) {
      heldByHand = i;
      ballX = handCenterX;
      ballY = handCenterY;
      break;
    }
  }
  
  // Wenn eine Hand den Ball hält, folge dieser Hand
  if (heldByHand !== null && heldByHand < hands.length) {
    let hand = hands[heldByHand];
    let handCenterX = 0;
    let handCenterY = 0;
    for (let j = 0; j < hand.keypoints.length; j++) {
      handCenterX += hand.keypoints[j].x * ratio;
      handCenterY += hand.keypoints[j].y * ratio;
    }
    handCenterX /= hand.keypoints.length;
    handCenterY /= hand.keypoints.length;
    
    ballX = handCenterX;
    ballY = handCenterY;
  }
}

/**
 * Zeichnet den interaktiven Ball
 */
function drawBall() {
  // Ball-Farbe ändert sich, wenn er gehalten wird
  if (heldByHand !== null) {
    fill(255, 150, 0); // Orange wenn gehalten
  } else {
    fill(0, 150, 255); // Blau wenn frei
  }
  
  noStroke();
  circle(ballX, ballY, ballSize);
  
  // Leichter Glanz-Effekt
  fill(255, 255, 255, 100);
  circle(ballX - ballSize/6, ballY - ballSize/6, ballSize/3);
}