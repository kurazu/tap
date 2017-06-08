import loadAudio from 'sound'
import screenfull from 'screenfull'
import { cycleIdx } from 'iter'

import './bg.css'
import zapAudio from 'audio/zap.webm'

function * cycleClassNames (prefix, count) {
  const indices = cycleIdx(count)
  while (true) {
    const idx = indices.next().value
    yield `${prefix}${idx.toString(16)}`
  }
}

let bodyElement
let soundEffect

export default function setup () {
  loadAudio(zapAudio).then(audio => { soundEffect = audio }).then(setupClick)
  bodyElement = document.body
}

function setupClick () {
  const classNames = cycleClassNames('bg--color-', 14)
  window.addEventListener('click', onClick.bind(null, classNames), false)
  window.addEventListener('touchstart', onTouchStart, false)
  window.addEventListener('touchend', onTouchEnd, false)
}

function onClick (classNames) {
  if (screenfull.enabled && !screenfull.isFullscreen) {
    screenfull.request()
  }
  const colorClassName = classNames.next().value
  bodyElement.className = `bg ${colorClassName}`
  soundEffect.play()
}

function onTouchStart () {
  bodyElement.innerText = 'TOUCHING'
}

function onTouchEnd () {
  bodyElement.innerText = 'NOT TOUCHING'
}
