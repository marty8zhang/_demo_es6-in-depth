'use strict'

const { foo, bar } = { foo: 'lorem', baz: 'merol', bar: 'ipsum' }
console.log(foo, bar) // lorem ipsum

// "Map" the property to a variable, which has a different name.
const { message: msg } = { message: 'All good' }

console.log(msg) // All good

// Nested properties.
const complicatedObj = {
  arrayProp: [
    'Zapp',
    { second: 'Brannigan' },
    'third',
  ],
}

let first, second // Without this line, there'll be "ReferenceError: first/second is not defined" errors.
// Note: Destructuring doesn't create a new object/array. The below line is the same as
// `const duplicatedObj = complicatedObj`, besides the destructuring part.
const duplicatedObj = { arrayProp: [first, { second }] } = complicatedObj

console.log(duplicatedObj) // { arrayProp: [ 'Zapp', { second: 'Brannigan' }, 'third' ] }
console.log(first, second) // Zapp Brannigan

// Undefined properties.
const { missing } = {}
console.log(missing) // undefined
