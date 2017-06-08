export function * cycleIdx (count) {
  let idx = 0
  while (true) {
    yield idx
    idx = (idx + 1) % count
  }
}
