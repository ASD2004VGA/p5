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

function drawMST (T) {
  T.forEach(edge => {
    stroke('orange')
    strokeWeight(6)
    line(edge.knude1.x, edge.knude1.y, edge.knude2.x, edge.knude2.y)
  })
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

  const T = Prim(V, E)
  drawMST(T)
}

function Prim (V, E) {
  const T = new Set()
  const U = new Set()
  U.add(V[0])
  while (U.size < V.length) {
    let minWeight = Infinity
    let nextEdge
    // find cheapest edge (u,v) with u in U and v in V\U
    for (let index = 0; index < E.length; index++) {
      const e = E[index]
      const n1 = e.knude1
      const n2 = e.knude2
      if (!T.has(e) && ((U.has(n1) && !U.has(n2)) || ((!U.has(n1) && U.has(n2))))) {
        // Now we know: Edge e is not in T and either n1 or n2 is in U (but not both)

        if (e.vægt < minWeight) {
          minWeight = e.vægt
          nextEdge = e
        }
      }
    }

    if (U.has(nextEdge.knude1)) {
      U.add(nextEdge.knude2)
    } else {
      U.add(U.add(nextEdge.knude1))
    }
    T.add(nextEdge)
  }

  return T
}

function draw () {

}

export { setup, draw }
