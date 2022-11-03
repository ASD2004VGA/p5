import Matter from 'matter-js'

const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies

let engine

let box, ball, ground

class Ball {
  constructor (x, y, radius, color, options) {
    this.body = Bodies.circle(x, y, radius, options)
    this.radius = radius
    this.color = color
    World.add(engine.world, this.body)
  }

  draw () {
    const pos = this.body.position
    fill(this.color)
    circle(pos.x, pos.y, 2 * this.radius)
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
    push()
    fill(this.color)
    rectMode(CENTER)
    rect(pos.x, pos.y, this.w, this.h)
    pop()
  }
}

function setup () {
  createCanvas(windowWidth, windowHeight)
  engine = Engine.create()
  // Bemærk: Matter.js tegner rektangler med rectMode sat til "CENTER"
  box = new Box(windowWidth / 4 + 50, 0, 50, 50, 'yellow', { restitution: 1.1 })
  ball = new Ball(windowWidth / 4 + 150, 0, 25, 'red', { restitution: 0.1, frictionAir: 0 })
  ground = new Box(windowWidth / 2, windowHeight / 2, windowWidth / 2, 50, 'green', { isStatic: true })
}

function draw () {
  background('lightblue')
  Engine.update(engine)
  ball.draw()
  box.draw()
  ground.draw()
}

export { setup, draw }
