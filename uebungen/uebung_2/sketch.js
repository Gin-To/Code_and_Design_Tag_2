let valueSlider;

function setup() {
  createCanvas(400, 400);

valueSlider= createSlider (-10, 38, 9);
valueSlider.position (10, 10);

}

function draw() {

  // variabeln sind ausserhalb, sie sie global und überall zugänglich -> weniger Probleme
  // hier sind sie innerhalb da man sie nur inwändig brauchen

  let inputValue = valueSlider.value();

  let inputMin = -10;
  let inputMax = 38;

  let outputMin = 0;
  let outputMax = 255;

  let outputValue = map (inputValue, inputMin, inputMax, outputMin, outputMax);
  //console.log (outputValue);

  background(outputValue);

  //let kreisoutputValue = map (inputValue, inputMin, outputMin, outputMax, outputMin)
  //background 0, kreis 255
  //background 255, kreis 0
  //background 125, kreis 125
  //background 100, kreis 155

  fill(255-outputValue);
  ellipse(200, 200, 400, 400);


}
