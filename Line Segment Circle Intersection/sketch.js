let v0 //origin of the two lines
let v1 //end of the first line
let closePoint


let center
let radius = 50
//let scalar

function setup() 
{
  createCanvas(400, 400);
  colorMode(RGB, 1)
  
  center = createVector(width/2, height/2)
  
  v0 = createVector(random(10, width-10), random(10, height-10))  
  v1 = createVector()
  
  closePoint = createVector()
}

function draw() 
{
  background(220);
  ellipse(center.x, center.y, radius*2)

  
  v1.x = mouseX
  v1.y = mouseY
  line(v0.x, v0.y, v1.x, v1.y)
  
  
  let sp = 
      drawScalar(p5.Vector.sub(center, v0), p5.Vector.sub(v1, v0))
  
  closePoint = createVector(v0.x+sp.x, v0.y+sp.y)
  
  let bool = inRange(v0, v1, closePoint)
  
  if (bool)
  {
      ellipse(closePoint.x, closePoint.y, 10)
  }
  else
  {
    closePoint = getCloserPoint(v0, v1, center)
    ellipse(closePoint.x, closePoint.y, 10)
  }


  
  if (radius < p5.Vector.sub(center, closePoint).mag())
  {
    text("Not Intersecting", 15, 30)
  }
  else
  {
    text("Intersecting", 15, 30)
  }
    
  
  
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

function inRange(start, end, p)
{
  let dx = end.x - start.x
  let dy = end.y - start.y
  
  let innerProduct = (p.x - start.x)*dx + (p.y-start.y)*dy
  
  return 0 <= innerProduct && innerProduct <= dx*dx + dy*dy;
  
}

function getCloserPoint(p1, p2, current)
{
  let dist1 = dist(p1.x, p1.y, current.x, current.y)
  let dist2 = dist(p2.x, p2.y, current.x, current.y)
  
  if (dist1 > dist2) return p2
  else return p1
}
