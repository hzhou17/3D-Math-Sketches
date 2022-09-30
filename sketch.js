//click and drag the red dots

let p1, p2, p3, p4

let radius = 20 //radius of the achor points

let points = []

function setup() 
{
    createCanvas(600, 600);
    colorMode(RGB, 1)

    p1 = createVector(50, 50)
    p2 = createVector(100, 100)  
    p3 = createVector(250, 200)  
    p4 = createVector(350, 350)

    points.push(p1)
    points.push(p2)
    points.push(p3)
    points.push(p4)  
}

function draw() 
{
    background(0.9);
  
    push()
        fill(1, 0, 0)
        ellipse(p1.x, p1.y, radius)
        ellipse(p2.x, p2.y, radius)
        ellipse(p3.x, p3.y, radius)
        ellipse(p4.x, p4.y, radius)
    pop()
  
  
  
    for (let i=p1.x; i<p4.x; i+=1)
    {
        let t = map(i, p1.x, p4.x, 0, 1)
        
        //en.wikipedia.org/wiki/B%C3%A9zier_curve
      
        let x = (1-t)*(1-t)*(1-t)*p1.x + 
                3*(1-t)*(1-t)*t*p2.x +
                3*(1-t)*t*t*p3.x +
                t*t*t*p4.x

        let y = (1-t)*(1-t)*(1-t)*p1.y + 
                3*(1-t)*(1-t)*t*p2.y +
                3*(1-t)*t*t*p3.y +
                t*t*t*p4.y
        
        let dx = 3*(1-t)*(1-t)*(p2.x-p1.x) + 6*(1-t)*t*(p3.x-p2.x) + 
                  3*t*t*(p4.x-p3.x)
        
        let dy = 3*(1-t)*(1-t)*(p2.y-p1.y) + 6*(1-t)*t*(p3.y-p2.y) + 
                  3*t*t*(p4.y-p3.y)
        
        let k = dy/dx
        
        let angle = atan(k)
        
        

        stroke(1, 0.5, 0)
        strokeWeight(1.5)
        point(x, y)
      
      if (i%18==0)
      {
        push()
          translate(x, y)
          stroke(0, 0, 1)
          rotate(angle+PI/2)
          triangle(0, -15, -2, 2, 2, 2)
        pop()
      }

      
    }
}

function mouseDragged()
{
    for (i of points)
    {
        if (abs(mouseX-i.x) < radius && abs(mouseY-i.y) < radius)
        {
            if (mouseX < width && mouseX > 0)
            {
                i.x = mouseX
            }

            if (mouseY < height && mouseY > 0)
            {
                i.y = mouseY
            }
        }
    }
}
