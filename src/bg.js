import './bg.css'

const BACKGROUNDS = [
  '#898cff',
  '#ff89b5',
  '#ffdc89',
  '#90d4f7',

  '#71e096',
  '#f5a26f',
  '#668de5',
  '#ed6d79',

  '#5ad0e5',
  '#da97e0',
  '#cff381',
  '#cff381',

  '#bb96ff',
  '#67eebd'
]

let currentBgIndex = 0

function getNextClassName () {
  const idx = (++currentBgIndex) % 14
  return `bg--color-${idx.toString(16)}`
}

let bodyElement

export default function setup () {
  bodyElement = document.body
  window.addEventListener('click', onClick, false)
}

function onClick () {
  const colorClassName = getNextClassName()
  bodyElement.className = `bg ${colorClassName}`
}
