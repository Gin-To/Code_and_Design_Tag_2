function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  //initialisierung; Bedingung; Update
  for (let i = 0; i < 5; i = i + 1) {
    //anweisung
    console.log(i);
    ellipse(100 * i, height / 2, 50, 50);

  }
}
