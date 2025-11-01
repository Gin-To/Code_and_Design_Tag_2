let posX = 600;
let posY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
}

function draw() {
  background(0);


  // Kreis zeichnen, der in der Mitte steht



  let glowOuter = 300;
  let glowInner = 200;

  // falls posX über Mitte liegt, diese Wert, glowOuter und glowInner neu setzen

  if (posX < width / 2 + 100 && posX > width / 2 - 100) {
    let distanzMitte = abs(width / 2 - posX);


    glowOuter = map(distanzMitte, 0, 100, 220, 300);
    glowInner = map(distanzMitte, 0, 100, 120, 200);
  }


  for (let r = glowOuter; r > glowInner; r = r - 5) {
    fill(255, 255, 255, map(r, 200, 300, 120, 10)); // Transparenter nach aussen
    ellipse(width / 2, height / 2, r);
  }

  fill(255, 255, 255);
  ellipse(width / 2, height / 2, 200, 200);
  noStroke();

  //Zufallswert für Y Position
  //frameCount

  fill(0, 0, 0);
  ellipse(posX, height / 2 + posY, 200, 200);


  posX = posX + 2; //posX++

  // Wenn der Kreis rechts raus ist, wieder links starten
  if (posX > 1100) {
    posX = 600;
  }
}
