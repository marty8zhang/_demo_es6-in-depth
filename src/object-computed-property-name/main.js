'use strict'

function generateObject (propertyName) {
  return {
    ['_' + propertyName]: 'It worked!',
  }
}

const testObject = generateObject('test')

console.log(testObject._test) // It worked!
/* eslint-disable-next-line */
console.log(testObject['_test']) // It worked!
