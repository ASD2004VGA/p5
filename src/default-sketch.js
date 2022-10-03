import explosionImage from 'url:./assets/explosion.png'
import testAudio from 'url:./assets/audio.mp3'

let img
let audio

function preload () {
  img = loadImage(explosionImage)
  audio = loadSound(testAudio)
}

function setup () {
  createCanvas(windowWidth, windowHeight)
}

function draw () {
  background(220)
  circle(windowWidth / 2, windowHeight / 2, 50)
  image(img, 0, 0)
}

function mousePressed () {
  console.log('You clicked the mouse!')
  audio.play()
}

function keyPressed () {
  console.log('You pressed this key: ', key)
}

export { preload, setup, draw, mousePressed, keyPressed }
