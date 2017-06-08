import loadAudio from 'sound'
import screenfull from 'screenfull'

import './bg.css'
import zapAudio from 'audio/zap.webm'

let currentBgIndex = 0

function getNextClassName () {
  const idx = (++currentBgIndex) % 14
  return `bg--color-${idx.toString(16)}`
}

let bodyElement
let soundEffect

export default function setup () {
  loadAudio(zapAudio).then(audio => { soundEffect = audio }).then(setupClick)
  bodyElement = document.body
}

function setupClick () {
  window.addEventListener('click', onClick, false)
  window.addEventListener('touchstart', onTouchStart, false)
  window.addEventListener('touchend', onTouchEnd, false)
}

function onClick () {
  if (screenfull.enabled && !screenfull.isFullscreen) {
    screenfull.request()
  }
  const colorClassName = getNextClassName()
  bodyElement.className = `bg ${colorClassName}`
  soundEffect.play()
}

function onTouchStart () {
  bodyElement.innerText = 'TOUCHING'
}

function onTouchEnd () {
  bodyElement.innerText = 'NOT TOUCHING'
}
