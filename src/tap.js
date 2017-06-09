import loadAudio from 'sound'
import screenfull from 'screenfull'
import { cycleIdx } from 'iter'

import 'tap.css'
import zapAudio from 'audio/zap.webm'
import zap2Audio from 'audio/zap2.webm'

function * cycleClassNames (prefix, count) {
  const indices = cycleIdx(count)
  while (true) {
    const idx = indices.next().value
    yield `${prefix}${idx.toString(16)}`
  }
}

export default class Tap {
  constructor (element) {
    this.element = element
    this.classNames = cycleClassNames('bg--color-', 14)
    this.loadAudio().then(this.setup.bind(this))
  }

  loadAudio () {
    return Promise.all([
      loadAudio(zapAudio),
      loadAudio(zap2Audio)
    ]).then(soundEffects => {
      this.soundEffects = soundEffects
    })
  }

  setup () {
    for (const [eventName, handler] of [
      ['touchstart', this.onTouchStart],
      ['touchend', this.onTouchEnd],
      ['touchmove', this.onTouchMove],
      ['click', this.onClick]
    ]) {
      this.element.addEventListener(eventName, handler.bind(this), false)
    }
  }

  onClick () {
    if (screenfull.enabled && !screenfull.isFullscreen) {
      screenfull.request(this.element)
    }
  }

  onTouchStart () {
    console.log('START')

    const colorClassName = this.classNames.next().value
    this.element.className = `bg ${colorClassName}`
    this.soundEffects[0].play()
  }

  onTouchEnd () {
    console.log('END')
    this.soundEffects[1].play()
  }

  onTouchMove () {
    console.log('MOVE')
  }
}
