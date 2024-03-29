// Længden af slangen og startretning.
const numSegments = 10
let direction = 'right'
let highscore = 0

// Slangens startposition.
const xStart = 0
const yStart = 250
const diff = 10

// Liste over slangens x-koordinater og y-koordinater.
let xCor = []
let yCor = []

let score = 0

// Klasse for svarmulighederne.
class Answer {
  constructor (answer, x, y, isAnswer) {
    this.answer = answer
    this.x = x
    this.y = y
    this.isAnswer = isAnswer
  }
}

// Klasse for opgaverne.
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

  // Genererer de tilfældige forkerte svar på kanvas.
  generateWrongAnswers (min, max) {
    let tmp = 0
    const usedAnswers = []
    while (true) {
      const r = Math.floor(random(min, max))
      console.log(r, this.answer.answer)
      if (r !== this.answer.answer && !usedAnswers.includes(r)) {
        this.wrongAnswers.push(
          new Answer(r, random(50, windowWidth - 50), random(50, windowHeight - 50), false)
        )
        usedAnswers.push(r)
        tmp++
        if (tmp === this.numberOfWrongAnswers) {
          break
        }
      }
    }
  }

  // Tegner opgaverne og svarmulighederne ind på kanvas.
  draw () {
    push()
    textSize(24)
    strokeWeight(0)
    textAlign(CENTER, CENTER)
    fill('white')
    text(this.text, windowWidth / 2, 20)
    for (let i = 0; i < this.wrongAnswers.length; i++) {
      text(
        this.wrongAnswers[i].answer,
        this.wrongAnswers[i].x,
        this.wrongAnswers[i].y - 24
      )
      circle(this.wrongAnswers[i].x, this.wrongAnswers[i].y, 10)
    }
    fill('white')
    text(this.answer.answer, this.answer.x, this.answer.y - 24)
    circle(this.answer.x, this.answer.y, 10)
    pop()
  }
}

let assignment

// Genererer opgaver tilfældigt ud fra de givne emner.
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

// Genererer ligninger.
function generateEquation () {
  const a = round(random(1, 10), 0)
  const b = round(random(0, 10), 0) * a
  const c = round(random(0, 10), 0) * a
  const solution = round((c - b) / a, 1)
  return new Assignment('Løs ligningen ' + a + 'x+' + b + '=' + c, solution, 4, solution - 3, solution + 3)
}

// Genererer plusstykker.
function generateAddition () {
  const a = round(random(1, 10), 0)
  const b = round(random(0, 10), 0)
  const solution = a + b
  return new Assignment('Udregn plusstykket ' + a + '+' + b, solution, 4, solution - 3, solution + 3)
}

// Genererer minusstykker.
function generateSubtraction () {
  const a = round(random(1, 10), 0)
  const b = round(random(0, 10), 0)
  const solution = a - b
  return new Assignment('Udregn minusstykket ' + a + '-' + b, solution, 4, solution - 3, solution + 3)
}

// Genererer gangestykker.
function generateMultiplikation () {
  const a = round(random(1, 10), 0)
  const b = round(random(0, 10), 0)
  const solution = a * b
  return new Assignment('Udregn gangestykket ' + a + '*' + b, solution, 4, solution - 3, solution + 3)
}

// Genererer dividerstykker.
function generateDivision () {
  const a = round(random(1, 10), 0)
  const b = round(random(0, 10), 0)
  const solution = round(a / b)
  return new Assignment('Udregn dividerstykket ' + a + '/' + b, solution, 4, solution - 3, solution + 3)
}

// Sætter kanvas op.
function setup () {
  // assignment = generateEquation()
  // assignment = generateAddition()
  // assignment = generateSubtraction()
  // assignment = generateMultiplikation()
  // assignment = generateDivision()
  generateAssignment()

  createCanvas(windowWidth, windowHeight)
  frameRate(60)
  stroke(255)
  strokeWeight(10)

  // Sætter slangen op.
  for (let i = 0; i < numSegments; i++) {
    xCor.push(xStart + i * diff)
    yCor.push(yStart)
  }
}

// Tegner scoren.
function drawScore () {
  push()
  textSize(24)
  noStroke()
  fill('white')
  text('Score: ' + score, 5, 30)
  pop()
}

// Tegner highscoren.
function drawHighScore () {
  push()
  textSize(24)
  noStroke()
  fill('white')
  text('HighScore: ' + highscore, windowWidth - 150, 30)
  pop()
}

// Tegner alt ovenstående ind på kanvas.
function draw () {
  background(0)
  drawScore()
  drawHighScore()
  assignment.draw()
  // For-lykke, som tegner slangens linjesegmenter mellem slangens punkter.
  for (let i = 0; i < numSegments - 1; i++) {
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1])
  }
  updateSnakeCoordinates()
  checkGameStatus()
  checkCollisionWithAssignment()
}

// Tjekker om slangens hoved rammer svarmulighederne.
function checkIfHeadIsInCircle (headX, headY, x, y, r) {
  if (sqrt(pow(x - headX, 2) + pow(y - headY, 2)) < 2 * r) {
    return true
  }
}

// Tegner Game Over teksten.
function showGameOver () {
  push()
  noStroke()
  textAlign(CENTER, CENTER)
  textSize(40)
  fill('red')
  text('GAME OVER', windowWidth / 2, windowHeight / 2)
  text('Tryk på R for at starte et nyt spil', windowWidth / 2, windowHeight / 2 + 45)
  pop()
}

// Tjekker om slangen rammer nogle af de forkerte svarmuligheder.
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
      // Hvis slangen rammer nogle af de forkerte svarmuligheder, så er der Game Over, og highscoren opdateres, hvis ny score er højere.
      noLoop()
      showGameOver()
      if (score > highscore) {
        highscore = score
      }
      // Hvis slangen rammer den rigtige svarmulighed, så stiger scoren og spillet fortsætter med en ny opgave.
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

// Får slangen til at bevæge sig.
function updateSnakeCoordinates () {
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1]
    yCor[i] = yCor[i + 1]
  }
  // Skifter slanges retning.
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

// Tjekker om slangen kolliderer med kanvas rammerne.
function checkGameStatus () {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision()
  ) {
    noLoop()
    showGameOver()
    if (score > highscore) {
      highscore = score
    }
  }
}

// Tjekker om slangen kolliderer med sig selv.
function checkSnakeCollision () {
  const snakeHeadX = xCor[xCor.length - 1]
  const snakeHeadY = yCor[yCor.length - 1]
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true
    }
  }
}

// bestemmer spillets kontrols med piletasterne.
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
      // Reset-knappen.
    case 82:
      // R
      // Genstarter spillet med ny highscore.
      if (score > highscore) {
        highscore = score
      }
      xCor = []
      yCor = []
      score = 0
      generateAssignment()

      createCanvas(windowWidth, windowHeight)
      frameRate(60)
      stroke(255)
      strokeWeight(10)

      for (let i = 0; i < numSegments; i++) {
        xCor.push(xStart + i * diff)
        yCor.push(yStart)
      }
      /* eslint-disable */
      if (!isLooping()) {
        // Vi kommer kun ind i denne if-sætning
        // hvis isLooping-kaldet returnerer false.
        // Dvs. når vi allerede har kaldt noLoop().
        // p5.js bryder sig ikke om, at man kan loop,
        // når vi i forvejen er i loop-mode.
        loop()
        
      }
  }
}

// Eksporterer disse funktioner til sketch.js.
export { setup, draw, keyPressed }
