let durchmesser;
durchmesser = 200;
let vergroessert = false; // merkt sich, ob sie gerade groß ist oder nicht

//let durchmesser = 10; man kann es auch so schreiben

let rotwert = 0;

//variabeln oben ausserhalb definieren, die let dinger


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 50);

  console.log(rotwert); //Wert von rot ausgeben lassen im chrome in der Console

  fill(0, 255, 0);
  triangle(500, 300, 600, 100, 700, 300);

  rectMode(CENTER);
  fill(rotwert, 0, 0);
  rect(500, 500, 100, 100, 40);

  fill(255, 0, 255, 100);
  ellipse(mouseX, mouseY, durchmesser, durchmesser);

  //durchmesser = durchmesser+1;
  // rotwert = rotwert+3;

}

function mouseClicked() {
  if (vergroessert) {
    // wenn sie groß ist, wieder verkleinern
    durchmesser -= 200;
    vergroessert = false;
  } else {
    // wenn sie klein ist, vergrößern
    durchmesser += 200;
    vergroessert = true;
  }
}
