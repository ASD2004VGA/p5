import importedImage from 'url:./assets/explosion.png'
import importedAudio from 'url:./assets/audio.mp3'

let img
let audio

let angle = 0
let xSun, ySun
let xEarth, yEarth, earthOffset
let xMerkur, yMerkur, merkurOffset
let xVenus, yVenus, venusOffset

function preload () {
  img = loadImage(importedImage)
  audio = loadSound(importedAudio)
}

function setup () {
  createCanvas(windowWidth, windowHeight)
  xSun = windowWidth / 2
  ySun = windowHeight / 2
  // earth
  earthOffset = 300
  xEarth = xSun + earthOffset
  yEarth = ySun
  // merkur
  merkurOffset = 200
  xMerkur = xSun + merkurOffset
  yMerkur = ySun
  // venus
  venusOffset = 400
  xVenus = xSun + venusOffset
  yVenus = ySun
}

function draw () {
  background('black')
  drawSun()
  drawMerkur()
  drawEarth()
  angle += 0.001
}

function drawSun () {
  fill('yellow')
  circle(xSun, ySun, 100)
}

function drawEarth () {
  fill('blue')
  const y = windowHeight / 2
  circle(xEarth, yEarth, 50)
  xEarth = xSun + earthOffset * Math.cos(angle)
  yEarth = ySun + earthOffset * Math.sin(angle)
}

function drawVenus () {

}

function drawMerkur () {
  fill('lightgrey')
  const y = windowHeight / 2
  circle(xMerkur, yMerkur, 100)
  xMerkur = xSun + merkurOffset * Math.cos(angle * 20)
  yMerkur = ySun + merkurOffset * Math.sin(angle * 20)
}

export { preload, setup, draw }
