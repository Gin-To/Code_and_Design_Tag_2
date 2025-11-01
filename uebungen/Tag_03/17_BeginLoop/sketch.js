
function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(0, 50);
  noFill();
  stroke(255);

  

  //ellipse(width / 2, height / 2, durchmesser, durchmesser);


  for (let i = 0; i < 10; i = i + 1) {
    //plan: y Position ist abhängig von Distanz von Maus zur Mitte der Ellipse
    let distanz = dist(mouseX, mouseY, i * 200, height / 2);
    let yPos = map(distanz, 0, width, -100, 300);

    
  //Distanz des Zentrums der ellipse zur Maus messen, dist gibt immer einen positiven Wert zurück

  let durchmesser = map(distanz, 0, width, 500, 500);

   
    ellipse(i * 200, height / 2 + yPos, durchmesser, durchmesser);
  }

  //Studiere mal den Code ab hier. Welche Blöcke wiederholen sich?
  //Welche Werte verändern sich?




  /*
  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;

  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;

  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;

  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;

  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;

  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;

  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;

  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;

  ellipse(i * 200, height / 2, 200, 200);
  i = i + 1;

  ellipse(i * 200, height / 2, 200, 200);
  */

}
