'use strict'

function * quips (name) {
  yield 'Hello ' + name + '!'

  yield 'I hope you are enjoying our conversation.'

  if (name.startsWith('X')) {
    yield "It's cool how your name starts with X, " + name + '.'
  }

  yield 'See you later!'
}

let testGenerator = quips('Tom')
console.log(testGenerator) // Object [Generator] {}.
let line
do {
  line = testGenerator.next()
  console.log(line) // { value: 'Hello Tom!', done: false }, ...
} while (line.done !== true)

// `Generator`s are `Iterator`s.
testGenerator = quips('Jerry')
// The `for...of` loop will call `next()`, extract the `value` from returned generator objects,
// and finally check if the generator is `done` or not for you.
for (const line of testGenerator[Symbol.iterator]()) {
  console.log(line) // 'Hello Jerry!', ...
}

// The common use of a `Generator`.
testGenerator = quips('Xander')
for (const line of testGenerator) {
  console.log(line) // 'Hello Xander!', ...
}

// Make an object iterable using a `Generator`.
class IterableClass {
  [Symbol.iterator] () {
    return this._getProperties()
  }

  * _getProperties () {
    for (const prop in this) {
      if (
        Object.prototype.hasOwnProperty.call(this, prop)
          /*
           * Methods defined in the class definition belongs to `IterableClass.prototype`. JavaScript sets the
           * `enumerable` flag to `false` for all methods in `prototype`. Hence, such methods won't be shown in
           * `for...in` by default.
           * What we're excluding out here are the methods defined after an object has been initialised. E.g., the
           * `testMethod()` defined few lines below.
           */
          && typeof this[prop] !== 'function'
      ) {
        yield [prop, this[prop]]
      }
    }
  }
}

const iterableObject = new IterableClass()

iterableObject.a = 1
iterableObject.b = false
iterableObject.testMethod = function () {}

for (const [name, value] of iterableObject) {
  console.log(name, value) // a 1, b false
}

// Accidentally list a method as a property, which is unconventional if you're more familiar with Java, PHP, etc.
for (const name in iterableObject) {
  if (Object.prototype.hasOwnProperty.call(iterableObject, name)) {
    console.log(name, iterableObject[name]) // a 1, b false, testMethod [Function]
  }
}

// Plain objects are non-iterable.
// for (const name of {}) {} // TypeError: {} is not iterable
