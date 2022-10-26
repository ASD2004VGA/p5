import Matter from 'matter-js'

const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies

let engine

let box, ball, ground

class Ball {
  constructor (x, y, diameter, options) {
    this.body = Bodies.circle(x, y, diameter, options)
    this.diameter = diameter
    World.add(engine.world, this.body)
  }

  draw () {
    const pos = this.body.position
    circle(pos.x, pos.y, this.diameter)
  }
}

class Box {
  constructor (x, y, w, h, color, options) {
    this.body = Bodies.rectangle(x, y, w, h, options)
    this.w = w
    this.h = h
    this.color = color
    World.add(engine.world, this.body)
  }

  draw () {
    const pos = this.body.position
    const angle = this.body.angle
    push()
    fill(this.color)
    translate(pos.x, pos.y)
    rotate(angle)
    rectMode(CENTER)
    rect(0, 0, this.w, this.h)
    pop()
  }
}

function setup () {
  createCanvas(windowWidth, windowHeight)
  engine = Engine.create()
  box = new Box(300, 10, 80, 80, 'yellow', { restitution: 1.1 })
  ball = new Ball(100, 50, 40, { restitution: 0.7 })
  ground = new Box(0, windowHeight - 50, windowWidth, 50, 'green', { isStatic: true })
}

function draw () {
  background('lightblue')
  Engine.update(engine)
  box.draw()
  ball.draw()
}

export { setup, draw }
