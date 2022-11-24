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
const numberOfNodes = 100
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
  // Laver en liste med samme længde som V og som indeholder Infinity på alle pladser.
  const distances = Array(V.length).fill(Infinity)
  // Laver en liste med samme længde som V og sætter alle pladser til undefined.
  const predecessors = Array(V.length).fill(undefined)
  // Vi antager, at det er knude 0, der er source og sætter derfor dens afstand til 0.
  distances[0] = 0
  // Vi laver en liste med samme længde som V og sætter alle pladser til false.
  const visited = Array(V.length).fill(false)

  // Vha. variablen numberOfVisitedNodes holder vi styr på hvor mange knuder, vi mangler at besøge
  let numberOfVisitedNodes = 0

  // Nu starter while-løkken i Dijkstras algoritme:
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
  /*
    //dijkstra
    const [distances, predecessors] = dijkstra(V, E)
    drawShortestPath(distances, predecessors, V.length - 1)
    */

  /*
    //prim
    */
  Prim(V, E)
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

function drawShortestPath (distances, predecessors, destinationNode) {
  while (predecessors[destinationNode] !== undefined) {
    const pred = predecessors[destinationNode]
    stroke('red')
    strokeWeight(10)
    line(V[destinationNode].x, V[destinationNode].y, V[pred].x, V[pred].y)
    destinationNode = predecessors[destinationNode]
  }
}

function Prim (V, E) {
  const T = new Set()
  const U = new Set()
  U.add(V[0])

  while (U.length < V.length) {
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

  console.log(U.has(V[2]))
  for (const item of U.keys()) {
    console.log(item)
  }
}

function draw () {

}

export { setup, draw }
