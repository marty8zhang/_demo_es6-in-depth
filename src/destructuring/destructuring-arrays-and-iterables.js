'use strict'

const someArray = ['a', 'b', 'c']

// Old syntax.
const oldFirst = someArray[0]
const oldSecond = someArray[1]
const oldThird = someArray[2]

// New syntax.
// Declare and assign values.
let [newFirst, newSecond, newThird] = someArray;
// Assign values only.
[newFirst, newSecond, newThird] = someArray

// Destructure nested array.
const [foo, [[bar], baz]] = [1, [[2], 3]]
console.log(foo, bar, baz) // 1 2 3

// Skip over array items.
const [, , third] = ['foo', 'bar', 'baz']
console.log(third) // baz

// Destructure with a rest pattern.
const [head, ...tail] = [1, 2, 3, 4]
console.log(tail) // [2, 3, 4]

// Out of bound scenario.
const [missing] = []
console.log(missing) // undefined. Same as `console.log([][0])`.

// Destructure on iterables.
function * fibs () {
  let a = 0
  let b = 1

  while (true) {
    yield a;

    [a, b] = [b, a + b]
  }
}

const [firstFib, secondFib, thirdFib, fourthFib, fifthFib, sixthFib] = fibs()
console.log(firstFib, secondFib, thirdFib, fourthFib, fifthFib, sixthFib) // 0 1 1 2 3 5
