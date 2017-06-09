import Tap from 'tap'

window.addEventListener('load', onLoad, false)

function onLoad () {
  new Tap(document.body)
}
