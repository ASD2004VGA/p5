
const sketch = function (p) {
  const x = 100
  const y = 100

  p.setup = function () {
    p.createCanvas(700, 410)
  }

  p.draw = function () {
    p.background(0)
    p.fill('red')
    p.rect(x, y, 50, 50)
  }
}

// eslint-disable-next-line
const myp5 = new p5(sketch)
