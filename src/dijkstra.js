class Node {
  constructor (x, y, index) {
    this.x = x
    this.y = y
    this.index = index
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
const numberOfNodes = 10
const numberOfEdges = 2 * numberOfNodes

function getRandomInt (max) {
  return Math.floor(Math.random() * max)
}

function findUnvisitedNodeWithSmallestDistance (distances, visited) {
  let minValue = Infinity
  let minIndex
  for (let index = 0; index < visited.length; index++) {
    if (visited[index] === false && distances[index] < minValue) {
      minValue = distances[index]
      minIndex = index
    }
  }
  return minIndex
}

function relax (distances, predecessors, V, E, index) {
  for (let i = 0; i < E.length; i++) {
    if (E[i].knude1.index === index) {
      // Vi har en kant der udgår fra knuden, der er nummereret med index.
      if (distances[index] + E[i].vægt < distances[E[i].knude2.index]) {
        distances[E[i].knude2.index] = distances[index] + E[i].vægt
        predecessors[E[i].knude2.index] = index
      }
    } else if (E[i].knude2.index === index) {
      if (distances[index] + E[i].vægt < distances[E[i].knude1.index]) {
        distances[E[i].knude1.index] = distances[index] + E[i].vægt
        predecessors[E[i].knude1.index] = index
      }
    }
  }
}

function dijkstra (V, E) {
  const distances = Array(V.length).fill(Infinity)
  const predecessors = Array(V.length).fill(undefined)
  distances[0] = 0 // source er altid knuden på plads 0 i V.
  const visited = Array(V.length).fill(false)

  let numberOfVisitedNodes = 0

  while (numberOfVisitedNodes < V.length) {
    const index = findUnvisitedNodeWithSmallestDistance(distances, visited)
    visited[index] = true
    numberOfVisitedNodes++
    relax(distances, predecessors, V, E, index)
  }

  return [distances, predecessors]
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
      random1++
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
    const node2 = V[random2]
    E.push(new Edge(node1, node2, random(0, 100)))
  }
  createCanvas(windowWidth, windowHeight)
  drawGraph()
  const [distances, predecessors] = dijkstra(V, E)
  drawShortestPath(distances, predecessors, 8)
}

function drawEdge (e) {
  textSize(24)
  textAlign(CENTER)
  fill('lightblue')
  circle(e.knude1.x, e.knude1.y, 40)
  fill('black')
  text(e.knude1.index, e.knude1.x, e.knude1.y)
  fill('lightblue')
  circle(e.knude2.x, e.knude2.y, 40)
  fill('black')
  text(e.knude2.index, e.knude2.x, e.knude2.y)
  line(e.knude1.x, e.knude1.y, e.knude2.x, e.knude2.y)
  text(round(e.vægt, 0), (e.knude1.x + e.knude2.x) / 2, (e.knude1.y + e.knude2.y) / 2)
}

function drawGraph () {
  // background('grey')
  for (let index = 0; index < E.length; index++) {
    const edge = E[index]
    drawEdge(edge)
  }
}

function drawShortestPath (distances, predecessors, dest) {
  for (let index = 0; index < predecessors.length; index++) {
    if (predecessors[dest] !== undefined) {
      const pred = predecessors[dest]
      stroke('blue')
      line(V[dest].x, V[dest].y, V[pred].x, V[pred].y)
      console.log('vi er her')
    }
  }
}

function draw () {

}

export { setup, draw }
