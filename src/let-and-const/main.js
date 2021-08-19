/* eslint-disable no-constant-condition, no-redeclare, prefer-const */
'use strict'

import { TestingTextFormatter } from '../_helpers/TestingTextFormatter.js'

const testingTextFormatter = new TestingTextFormatter()

// The scope of a `var` declared in a JS function is the whole body of that function.
// In other words, `var`s are function-scoped.
testingTextFormatter.logTestingStart()

function testVar () {
  var t = 2

  t *= 3

  console.log(t) // 6.

  if (true) {
    var t = {}
  }

  console.log(t) // {}.
}

testVar()

function testLet () {
  let t = 2

  t *= 3

  console.log(t) // 6.

  if (true) {
    let t = {}
  }

  console.log(t) // 6.
}

testLet()

// `var`s are overly shared among loops.
testingTextFormatter.logTestingStart()

function doBuggyCatTalkWithVars () {
  var messages = ['Meow!', "I'm a talking cat!", 'Callbacks are fun!']

  for (var i = 0; i < messages.length; i++) {
    setTimeout(function () {
      // The string will only be computed when the time is up. By then, the shared `var i` has become `3` already.
      console.log(messages[i])
    }, i * 500)
  }
}

// undefined, undefined, undefined
doBuggyCatTalkWithVars()

function doCatTalkWithLet () {
  var messages = ['Meow!', "I'm a talking cat!", 'Callbacks are fun!']

  // `let` variables are block-scoped. Hence, `i` isn't shared among each loop iteration.
  for (let i = 0; i < messages.length; i++) {
    setTimeout(function () {
      console.log(messages[i])
    }, i * 500)
  }
}

// Meow!
// I'm a talking cat!
// Callbacks are fun!
setTimeout(doCatTalkWithLet, 2000)

function doCatTalkWithForEach () {
  var messages = ['Meow!', "I'm a talking cat!", 'Callbacks are fun!']
  var i = 0

  messages.forEach(
    (message) => {
      setTimeout(function () {
        console.log(message)
      }, i++ * 500)
    },
  )
}

// Same as above.
setTimeout(doCatTalkWithForEach, 4000)

// `const`s.
const TEST_CONSTANT = 123

// TEST_CONSTANT = 456 // Error: "TEST_CONSTANT" is read-only.
// TEST_CONSTANT++ // Same as above.

// const TEST_CONSTANT_WITHOUT_VALUE // SyntaxError
