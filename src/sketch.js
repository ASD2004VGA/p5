
import p5 from 'p5'

const sketch = function (p) {
  const x = 100
  const y = 100

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight)
  }

  p.draw = function () {
    p.background(0)
    p.fill('red')
    p.rect(x, y, 50, 50)
  }
}

// eslint-disable-next-line new-cap, no-new
new p5(sketch)
