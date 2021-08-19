'use strict'

// Default values for array items.
const [missing = true] = []

console.log(missing) // true

// Default values for object properties.
const { x = 3 } = {}
const { message: msg = 'Something went wrong' } = {}

console.log(x) // 3
console.log(msg) // "Something went wrong"
