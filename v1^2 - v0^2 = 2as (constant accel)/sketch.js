//calculate declaration (braking) force using Newton's formula: 
//v1^2 - v0^2 = 2as
//When the sketch starts running, click on the canvas to start braking

let vel, pos, target

let mass = 1

let brake, startedBrake;

let speed, acc

let myColor

function setup() 
{
    createCanvas(400, 400)
    colorMode(RGB, 1)
    myColor = color(1)

    vel = createVector()
    pos = createVector()

    target = createVector(350, 350)  

    vel = p5.Vector.sub(target, pos)
    vel.normalize()
    vel.mult(4) // 4 is initial speed

    speed = vel.mag()
    acc = 0
}

function draw() 
{ 
    if (speed > 0.01)
    {
      speed -= acc;
      vel.normalize()
      vel.mult(speed)
    }
    else
    {
      vel.mult(0)
    }

    pos = p5.Vector.add(pos, vel)

    background(0.5);
    fill(myColor)
    ellipse(target.x, target.y, 5)

    ellipse(pos.x, pos.y, 10)

    text("current vel: " + vel.mag(), 50, 50)  
}

function mousePressed() 
{
  let distance = dist(pos.x, pos.y, target.x, target.y)

  acc = vel.mag()*vel.mag()/(2*distance) //a = -u^2 / (2s)
  myColor = color(0,1,1)

                      
  print("start to brake");
  print(acc)
}
