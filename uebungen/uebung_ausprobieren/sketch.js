let valueSlider;
let maxDiameter = 800; // maximaler Durchmesser
let minDiameter = 20;  // minimaler Durchmesser

function setup() {
  createCanvas(windowWidth, windowHeight);
  valueSlider = createSlider(0, 100, 50);
  valueSlider.position(10, 10);
  noStroke();

}

function draw() {

  


  // Hintergrundhälften
  fill(86, 60, 92);
  rect(0, 0, width / 2, height);

  fill(242, 189, 205);
  rect(width / 2, 0, width / 2, height);

  // Slider steuert Grösse gegengleich
  let leftDiameter = map(val, 0, 100, maxDiameter, minDiameter);
  let rightDiameter = map(val, 0, 100, minDiameter, maxDiameter);

  let midX = width / 2;
  let centerY = height / 2;

  // Linker Kreis
  fill(242, 189, 205);
  ellipse(leftX, centerY, leftDiameter, leftDiameter);

  // Rechter Kreis
  fill(86, 60, 92);
  ellipse(rightX, centerY, rightDiameter, rightDiameter);






  //let kreisoutputValue = map (inputValue, inputMin, outputMin, outputMax, outputMin)
  //background 0, kreis 255
  //background 255, kreis 0
  //background 125, kreis 125
  //background 100, kreis 155





}
