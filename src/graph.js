import importedImage from 'url:./assets/explosion.png'
import importedAudio from 'url:./assets/audio.mp3'

class Node {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

class Edge {
  constructor (knude1, knude2, vægt) {
    this.knude1 = knude1
    this.knude2 = knude2
    this.vægt = vægt
  }
}

const V = []
const E = []
const numberOfNodes = 1000
const numberOfEdges = 2 * numberOfNodes

function setup () {
  // generate nodes...
  for (let index = 0; index < numberOfNodes; index++) {
    V.push(new Node(random(windowWidth), random(windowHeight)))
  }
  // generate edges...
  for (let index = 0; index < numberOfEdges; index++) {
    const node1 = random(V)
    const node2 = random(V)
    E.push(new Edge(node1, node2, random(0, 100)))
  }
  console.log(E)
  createCanvas(windowWidth, windowHeight)
}

function drawEdge (e) {
  fill('red')
  circle(e.knude1.x, e.knude1.y, 10)
  circle(e.knude2.x, e.knude2.y, 10)
  line(e.knude1.x, e.knude1.y, e.knude2.x, e.knude2.y)
}

function draw () {
  background('grey')
  for (let index = 0; index < E.length; index++) {
    const edge = E[index]
    drawEdge(edge)
  }
}

function mousePressed () {
  console.log('You clicked the mouse!')
}

function keyPressed () {
  console.log('You pressed this key: ', key)
}

export { setup, draw, mousePressed, keyPressed }
