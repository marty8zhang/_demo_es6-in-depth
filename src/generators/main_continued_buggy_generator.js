'use strict'

import { TestingTextFormatter } from '../_helpers/TestingTextFormatter.js'

const testingTextFormatter = new TestingTextFormatter()

// A "buggy" `Generator` that's not recommended.
function * getBuggyGenerator () {
  yield 1
  yield 2

  try {
    yield 3
  } finally {
    console.log('The `finally` block executed.')
  }
}

/*
 * The `finally` block WON'T be executed, which is different than the similar example in `main_continued.js`. Outputs:
 * 1
 * { value: undefined, done: true }
 */
testingTextFormatter.logTestingStart()
let testGenerator = getBuggyGenerator()
let i = 1
for (const number of testGenerator) {
  if (i++ > 1) {
    break
  }

  console.log(number)
}
console.log(testGenerator.next())

/*
 * Outputs:
 * 1
 * 2
 * The `finally` block executed.
 * { value: undefined, done: true }
 */
testingTextFormatter.logTestingStart()
testGenerator = getBuggyGenerator()
i = 1
for (const number of testGenerator) {
  if (i++ > 2) {
    break
  }

  console.log(number)
}
console.log(testGenerator.next())

/*
 * The strange case that `Generator.return()` doesn't execute the `finally` block. Outputs:
 * { value: 1, done: false }
 * { value: 2, done: false }
 * { value: undefined, done: true }
 */
testingTextFormatter.logTestingStart()
testGenerator = getBuggyGenerator()

console.log(testGenerator.next())
console.log(testGenerator.next())

// Note: This won't execute the `finally` block, which is different than the similar example in `main_continued.js`.
testGenerator.return({})

console.log(testGenerator.next())
