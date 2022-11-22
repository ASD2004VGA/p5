class Node {
  constructor (x, y, navn) {
    this.x = x
    this.y = y
    this.navn = navn
  }
}

class Edge {
  constructor (knude1, knude2, vægt, navn) {
    this.knude1 = knude1
    this.knude2 = knude2
    this.vægt = vægt
    this.navn = navn
  }
}

const V = []
const E = []
const numberOfNodes = 100
const numberOfEdges = 2 * numberOfNodes

function findNeighbours () {
  const neighbours = []

  for (let index = 0; index < array.length; index++) {
    const element = array[index]
  }

  return neighbours
}

function getRandomInt (max) {
  return Math.floor(Math.random() * max)
}

function dijkstra () {
  const distances = Array(V.length).fill(Infinity)
  const predecessors = Array(V.length).fill(undefined)
  // source er altid knude på plads 0.

  for (let index = 0; index < V.length; index++) {
    const currentNode = V[index]
  }
}

function getTwoDifferentRandomNumbers (max) {
  let random1 = getRandomInt(max)
  const random2 = getRandomInt(max)
  if (random1 === random2) {
    if (random1 === max - 1) {
      random1--
    } else if (random1 === 0) {
      random1++
    } else {

    }
  }
  return [random1, random2]
}

function setup () {
  // generate nodes...
  for (let index = 0; index < numberOfNodes; index++) {
    V.push(new Node(random(windowWidth), random(windowHeight), index))
  }
  // generate edges...
  for (let index = 0; index < numberOfEdges; index++) {
    const [random1, random2] = getTwoDifferentRandomNumbers(V.length)
    const node1 = V[random1]
    const node2 = V
    E.push(new Edge(node1, node2, random(0, 100), index))
  }
  createCanvas(windowWidth, windowHeight)
  drawGraph()
  dijkstra()
}

function drawEdge (e) {
  fill('red')
  circle(e.knude1.x, e.knude1.y, 10)
  circle(e.knude2.x, e.knude2.y, 10)
  line(e.knude1.x, e.knude1.y, e.knude2.x, e.knude2.y)
}

function drawGraph () {
  // background('grey')
  for (let index = 0; index < E.length; index++) {
    const edge = E[index]
    drawEdge(edge)
  }
}

function draw () {

}

function mousePressed () {
  console.log('You clicked the mouse!')
}

function keyPressed () {
  console.log('You pressed this key: ', key)
}

export { setup, draw, mousePressed, keyPressed }
