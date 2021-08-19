'use strict'

// Rest parameters.
function containsAll (haystack, ...needles) {
  for (const needle of needles) {
    if (haystack.indexOf(needle) === -1) {
      return false
    }
  }

  return true
}

console.log(containsAll('test', 'es', 'te'))
console.log(containsAll('test', 'ea', 'es'))

// Parameter default values.
function animalSentenceFancy (
  animals2 = 'tigers',
  animals3 = animals2 === 'bears' ? 'sea lions' : 'bears',
) {
  return `Lions and ${animals2} and ${animals3}! Oh my!`
}

console.log(animalSentenceFancy('monkeys'))
console.log(animalSentenceFancy('bears'))
