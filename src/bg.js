import './bg.css'
import { Howl } from 'howler'
import zapAudio from 'audio/zap.webm'

let currentBgIndex = 0

function getNextClassName () {
  const idx = (++currentBgIndex) % 14
  return `bg--color-${idx.toString(16)}`
}

let bodyElement
let soundEffect

export default function setup () {
  soundEffect = new Howl({
    src: [zapAudio]
  })
  bodyElement = document.body
  soundEffect.on('load', setupClick)
}

function setupClick () {
  window.addEventListener('click', onClick, false)
}

function onClick () {
  const colorClassName = getNextClassName()
  bodyElement.className = `bg ${colorClassName}`
  soundEffect.play()
}
