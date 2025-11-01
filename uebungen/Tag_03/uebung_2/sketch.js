function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0,80);

  //plan: Durchmesser abhängig von Distanz der Maus

  let durchmesser;
  //Distanz des Zentrums der ellipse zur Maus messen, dist gibt immer einen positiven Wert zurück

  let distanz = dist(mouseX, mouseY, width / 2, height / 2);
  //console.log(distanz);

  durchmesser = map(distanz, 0, width / 2, 10, 500);

  ellipse(width / 2, height / 2, durchmesser, durchmesser);
}
