
const liste = []
let runSimulation = true

const N = 5000

class Cirkel {
  constructor (x, y, d, a, b) {
    this.x = x
    this.y = y
    this.d = d
    this.a = a
    this.b = b
    this.f = color(random(255), random(255), random(255))
  }

  draw () {
    fill(this.f)
    circle(this.x, this.y, this.d)
    this.x += this.a
    this.y += this.b
  }
}

function preload () {}

export function setup () {
  createCanvas(windowWidth, windowHeight)

  for (let index = 0; index < N; index++) {
    const cirkel = new Cirkel(
      windowWidth / 2,
      windowHeight / 2,
      20,
      random(-10, 10),
      random(-10, 10)
    )
    liste.push(cirkel)
  }
}

export function draw () {
  if (runSimulation) {
    for (let index = 0; index < N; index++) {
      liste[index].draw()
    }
  }
}

export function mousePressed () {
  runSimulation = !runSimulation
}

function keyPressed () {}
