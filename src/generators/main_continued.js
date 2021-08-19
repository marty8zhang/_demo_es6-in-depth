'use strict'

import { TestingTextFormatter } from '../_helpers/TestingTextFormatter.js'

const testingTextFormatter = new TestingTextFormatter()

function * getGenerator () {
  try {
    yield 1
    yield 2
    yield 3
  } finally {
    console.log('The `finally` block executed.')
  }
}

/*
 * Outputs:
 * 1
 * The `finally` block executed.
 * { value: undefined, done: true }
 */
testingTextFormatter.logTestingStart()
let testGenerator = getGenerator()
let i = 1
for (const number of testGenerator) {
  if (i++ > 1) {
    break
  }

  console.log(number)
}
// The generator will be marked as `done` as soon as the `for...of` loop ended no matter what.
// This is the expected behaviour of `Iterator`s.
console.log(testGenerator.next())

/*
 * Outputs:
 * 1
 * 2
 * The `finally` block executed.
 * { value: undefined, done: true }
 */
testingTextFormatter.logTestingStart()
testGenerator = getGenerator()
i = 1
for (const number of testGenerator) {
  if (i++ > 2) {
    break
  }

  console.log(number)
}
console.log(testGenerator.next())

/*
 * Underlyingly, it's `Generator.return()` that's executing the `finally` block. Outputs:
 * { value: 1, done: false }
 * { value: 2, done: false }
 * The `finally` block executed.
 * { value: undefined, done: true }
 */
testingTextFormatter.logTestingStart()
testGenerator = getGenerator()

console.log(testGenerator.next())
console.log(testGenerator.next())

testGenerator.return({})

console.log(testGenerator.next())

// `Generator.next()` takes an optional parameter.
// The value of the parameter will be treated as the result of the previous `yield`.
testingTextFormatter.logTestingStart()
function * getAdvancedGenerator () {
  const [username, password] = yield 'Connecting...Please provide [username,password].'

  const selectedOptionNumber = yield 'Successfully logged in as `' + username + '`.'

  const terminatingOperation = yield 'You\'ve selected Option #' + selectedOptionNumber + '.'

  console.log(terminatingOperation)
}

testGenerator = getAdvancedGenerator()

console.log(testGenerator.next().value) // Connecting...Please provide [username,password].
// Note: You can only provide the result for the first yield during the SECOND `next()` call; then so on and forth.
console.log(testGenerator.next(['marty', 'dummyPwd']).value) // Successfully logged in as `marty`.
console.log(testGenerator.next(12).value) // You've selected Option #12.
// The below line doesn't yield anymore, but the `Generator` will finish off what's left to do in the function body
// first, which means `Do this and do that` will be output first. Finally, it returns the `undefined` value.
console.log(testGenerator.next('Do this and do that.').value) // undefined

// `Generator.throw()`.
testingTextFormatter.logTestingStart()
try {
  testGenerator.throw(new Error('`Generator`s can `throw()`.'))
} catch (e) {
  console.log('I caught this error message: ' + e)
}

// `yield *`.
testingTextFormatter.logTestingStart()
function * concatLongerVersion (iter1, iter2) {
  for (const value of iter1) {
    yield value
  }
  for (const value of iter2) {
    yield value
  }
}

for (const char of concatLongerVersion('abc', 'def')) {
  console.log(char) // a, b, c, d, e, f
}

testingTextFormatter.logTestingStart()
function * concatShorterVersion (iter1, iter2) {
  // A `yield *` expression consumes an entire iterator and yields all its values.
  yield * iter1
  yield * iter2
}

for (const char of concatShorterVersion('abc', 'def')) {
  console.log(char) // Same as above.
}
