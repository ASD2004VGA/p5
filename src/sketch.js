
import * as P5 from 'p5'

const sketch = function (p) {
  const x = 100
  const y = 100

  p.setup = function () {
    p.createCanvas(700, 410)
  }

  p.draw = function () {
    p.background(0)
    p.fill('blue')
    p.rect(x, y, 50, 50)
  }
}

const myp5 = new P5(sketch)
