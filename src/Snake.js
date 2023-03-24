const numSegments = 10
let direction = 'right'

const xStart = 0
const yStart = 250
const diff = 10

const xCor = []
const yCor = []

const xFruit = 0
const yFruit = 0
let scoreElem
let score = 0

class Answer {
  constructor (answer, x, y, isAnswer) {
    this.answer = answer
    this.x = x
    this.y = y
    this.isAnswer = isAnswer
  }
}

class Assignment {
  constructor (text, answer, numberOfWrongAnswers, min, max) {
    this.text = text
    this.answer = new Answer(
      answer,
      random(50, windowWidth - 50),
      random(50, windowHeight - 50),
      true
    )
    this.wrongAnswers = []
    this.numberOfWrongAnswers = numberOfWrongAnswers
    this.generateWrongAnswers(min, max)
  }

  generateWrongAnswers (min, max) {
    let tmp = 0

    while (true) {
      // const r = Math.floor(Math.random() * 100)
      const r = Math.floor(random(min, max))
      console.log(r, this.answer.answer)
      if (r !== this.answer.answer) {
        this.wrongAnswers.push(
          new Answer(r, random(50, windowWidth - 50), random(50, windowHeight - 50), false)
        )
        tmp++
        if (tmp === this.numberOfWrongAnswers) {
          break
        }
      }
    }
  }

  draw () {
    push()
    // Jeg tegner opgaveteksten
    textSize(24)
    strokeWeight(0)
    textAlign(CENTER, CENTER)
    fill('white')
    text(this.text, windowWidth / 2, 20)
    // Jeg tegner de forkerte svar
    for (let i = 0; i < this.wrongAnswers.length; i++) {
      text(
        this.wrongAnswers[i].answer,
        this.wrongAnswers[i].x,
        this.wrongAnswers[i].y - 24
      )
      circle(this.wrongAnswers[i].x, this.wrongAnswers[i].y, 10)
    }
    // Jeg tegner det rigtige svar
    fill('white')
    text(this.answer.answer, this.answer.x, this.answer.y - 24)
    circle(this.answer.x, this.answer.y, 10)
    pop()
  }
}

let assignment

function generateAssignment () {
  const r = ceil(random(0, 5))
  if (r === 1) {
    assignment = generateEquation()
  }
  if (r === 2) {
    assignment = generateAddition()
  }
  if (r === 3) {
    assignment = generateSubtraction()
  }
  if (r === 4) {
    assignment = generateMultiplikation()
  }
  if (r === 5) {
    assignment = generateDivision()
  }
}

function generateEquation () {
  const a = round(random(1, 10), 0)
  const b = round(random(0, 10), 0) * a
  const c = round(random(0, 10), 0) * a
  const solution = round((c - b) / a, 1)
  return new Assignment('Løs ligningen ' + a + 'x+' + b + '=' + c, solution, 4, solution - 3, solution + 3)
}

function generateAddition () {
  const a = round(random(1, 10), 0)
  const b = round(random(0, 10), 0)
  const solution = a + b
  return new Assignment('Udregn plusstykket ' + a + '+' + b, solution, 4, solution - 3, solution + 3)
}

function generateSubtraction () {
  const a = round(random(1, 10), 0)
  const b = round(random(0, 10), 0)
  const solution = a - b
  return new Assignment('Udregn minusstykket ' + a + '-' + b, solution, 4, solution - 3, solution + 3)
}

function generateMultiplikation () {
  const a = round(random(1, 10), 0)
  const b = round(random(0, 10), 0)
  const solution = a * b
  return new Assignment('Udregn gangestykket ' + a + '*' + b, solution, 4, solution - 3, solution + 3)
}

function generateDivision () {
  const a = round(random(1, 10), 0)
  const b = round(random(0, 10), 0)
  const solution = round(a / b)
  return new Assignment('Udregn dividerstykket ' + a + '/' + b, solution, 4, solution - 3, solution + 3)
}

function setup () {
  // assignment = new Assignment("Løs ligningen 2x+4=10.", 10, 4);
  // assignment = generateEquation()
  // assignment = generateAddition()
  // assignment = generateSubtraction()
  // assignment = generateMultiplikation()
  // assignment = generateDivision()
  generateAssignment()

  scoreElem = createDiv()
  scoreElem.position(10, windowHeight - 25)
  scoreElem.id = 'score'
  scoreElem.style('color', 'white')

  createCanvas(windowWidth, windowHeight)
  frameRate(60)
  stroke(255)
  strokeWeight(10)

  for (let i = 0; i < numSegments; i++) {
    xCor.push(xStart + i * diff)
    yCor.push(yStart)
  }
}

function drawScore () {
  push()
  textSize(24)
  noStroke()
  fill('white')
  text('Score: ' + score, 5, 30)
  pop()
}

function draw () {
  background(0)
  drawScore()
  assignment.draw()
  for (let i = 0; i < numSegments - 1; i++) {
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1])
  }
  updateSnakeCoordinates()
  checkGameStatus()
  checkCollisionWithAssignment()
}

function checkIfHeadIsInCircle (headX, headY, x, y, r) {
  if (sqrt(pow(x - headX, 2) + pow(y - headY, 2)) < 2 * r) {
    return true
  }
}

function checkCollisionWithAssignment () {
  const snakeHeadX = xCor[xCor.length - 1]
  const snakeHeadY = yCor[yCor.length - 1]
  for (let i = 0; i < assignment.wrongAnswers.length; i++) {
    if (
      checkIfHeadIsInCircle(
        snakeHeadX,
        snakeHeadY,
        assignment.wrongAnswers[i].x,
        assignment.wrongAnswers[i].y,
        5
      )
    ) {
      noLoop()
      const scoreVal = parseInt(scoreElem.html().substring(8))
      scoreElem.html('Game Over! Din score var : ' + score)
    } else if (checkIfHeadIsInCircle(
      snakeHeadX,
      snakeHeadY,
      assignment.answer.x,
      assignment.answer.y,
      5
    )) {
      score++
      // assignment = generateEquation()
      // assignment = generateAddition()
      // assignment = generateSubtraction()
      // assignment = generateMultiplikation()
      // assignment = generateDivision()
      generateAssignment()
    }
  }
}

function updateSnakeCoordinates () {
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1]
    yCor[i] = yCor[i + 1]
  }
  switch (direction) {
    case 'right':
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff
      yCor[numSegments - 1] = yCor[numSegments - 2]
      break
    case 'up':
      xCor[numSegments - 1] = xCor[numSegments - 2]
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff
      break
    case 'left':
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff
      yCor[numSegments - 1] = yCor[numSegments - 2]
      break
    case 'down':
      xCor[numSegments - 1] = xCor[numSegments - 2]
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff
      break
  }
}

function checkGameStatus () {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision()
  ) {
    noLoop()
    const scoreVal = parseInt(scoreElem.html().substring(8))
    scoreElem.html('Game Over! Din score var : ' + score)
  }
}

function checkSnakeCollision () {
  const snakeHeadX = xCor[xCor.length - 1]
  const snakeHeadY = yCor[yCor.length - 1]
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true
    }
  }
}

function keyPressed () {
  switch (keyCode) {
    case 37:
      if (direction !== 'right') {
        direction = 'left'
      }
      break
    case 39:
      if (direction !== 'left') {
        direction = 'right'
      }
      break
    case 38:
      if (direction !== 'down') {
        direction = 'up'
      }
      break
    case 40:
      if (direction !== 'up') {
        direction = 'down'
      }
      break
  }
}

export { setup, draw, keyPressed }
