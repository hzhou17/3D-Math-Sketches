//move mouse on canvas

let v0 //origin of the two lines
let v1 //end of the first line

let myMouse, myLine

//let scalar

function setup() 
{
  createCanvas(400, 400);
  colorMode(RGB, 1)
  
  myMouse = createVector(width/2, height/2)
  
  v0 = createVector(random(10, width-10), random(10, height-10))  
  v1 = createVector(random(10, width-10), random(10, height-10))
  
  myLine = createVector(v1.x - v0.x, v1.y - v0.y)
}

function draw() 
{
  background(220);
  strokeWeight(3)
  push()
    stroke(0.5, 0, 1)
    line(v0.x, v0.y, v1.x, v1.y)
  pop()
  
  myMouse.x = mouseX - v0.x
  myMouse.y = mouseY - v0.y
  line(v0.x, v0.y, mouseX, mouseY)
  
  
  let sp = drawScalar(myMouse, myLine)
  
  let bool = inRange(v0, v1, createVector(mouseX, mouseY))
  
  if (bool)
  {
    push()    
      //line(v0.x, v0.y, sp.x+v0.x, sp.y+v0.y)
      stroke(1, 0, 0)

      circle(sp.x+v0.x, sp.y+v0.y, 15)

      line(mouseX, mouseY, sp.x+v0.x, sp.y+v0.y)
    pop()
  
  
    text("distance: " + 
         dist(mouseX, mouseY,sp.x+v0.x, sp.y+v0.y ), 10 ,30)
  }
  //print(bool)
}

function drawScalar(a, b)
{
  let bCopy = b.copy().normalize()
  
  //https://en.wikipedia.org/wiki/Scalar_projection
  //lenght = ||a|| * cos(theta). cos(theta) = dot(a, b)/||a||||b||
  
  let length = a.dot(b)/b.mag()
  
  //return a vector with the same direction as b, but new length
  return bCopy.mult(length)
}

//http://www.sunshine2k.de/coding/java/PointOnLine/PointOnLine.html
//https://stackoverflow.com/questions/17581738/check-if-a-point-projected-on-a-line-segment-is-not-outside-it
function inRange(start, end, p)
{
  let dx = end.x - start.x
  let dy = end.y - start.y
  
  let innerProduct = (p.x - start.x)*dx + (p.y-start.y)*dy
  
  return 0 <= innerProduct && innerProduct <= dx*dx + dy*dy;
  
}
