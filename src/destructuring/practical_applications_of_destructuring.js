'use strict'

// Convert function/method call results into multiple constants/variables.
function returnArray () {
  return [
    // ...
  ]
}

function returnObject () {
  return {
    // ...
  }
}

const [result1, result2] = returnArray()
const { result3, result4 } = returnObject()

// Destructure via function parameter definitions.
function removeBreakpoint ({ url, line, column }) {
  // ...
}

// Function parameter definitions with destructuring defaults.
function removeBreakpointV2 ({
  url = 'https://www.example.com',
  line = 12,
  column = 34,
}) {
  // ...
}

// Work with Maps.
const testMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
])

// Or other similar uses, e.g., `for (const [key] of testMap) {}` or `for (const [, value] of testMap) {}`.
for (const [key, value] of testMap) {
  console.log(key, value) // "key1 value1", then "key2 value2"
}

// Import modules.
// ES6 style.
// import { Component1, Component2 } from 'module1'
// CommonJS style.
// const { Component3, Component4 } = require('module2')
