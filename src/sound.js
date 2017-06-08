import { Howl } from 'howler'

export default function loadAudio (path) {
  return new Promise(function (resolve, reject) {
    const soundEffect = new Howl({
      src: [path]
    })
    soundEffect.on('load', () => resolve(soundEffect))
  })
}
