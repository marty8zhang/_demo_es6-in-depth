'use strict'

import { TestingTextFormatter } from '../_helpers/TestingTextFormatter'

const testingTextFormatter = new TestingTextFormatter()

// ES5 function constructor.
function ES5Circle (radius) {
  // Some `radius` checking code...
  console.log(`Instantiating a \`${radius}\` radius circle.`)

  this._radius = radius

  ES5Circle.circlesMade++
}

ES5Circle.draw = function (circle, canvas) {
  console.log(`Drawing a \`${circle.radius}\` radius circle onto the \`${canvas.id}\` canvas.`)

  // Canvas drawing code...
}

Object.defineProperty(ES5Circle, 'circlesMade', {
  get: function () {
    return !this._count ? 0 : this._count
  },

  set: function (val) {
    this._count = val
  },
})

ES5Circle.prototype = {
  area: function () {
    return Math.pow(this._radius, 2) * Math.PI
  },
}

Object.defineProperty(ES5Circle.prototype, 'radius', {
  get: function () {
    return this._radius
  },

  set: function (radius) {
    // Some `radius` checking code...

    this._radius = radius
  },
})

testingTextFormatter.logTestingStart()

var testCircle = new ES5Circle(2)

ES5Circle.draw(testCircle, { id: 'test-canvas' }) // Drawing a `2` radius circle onto the `test-canvas` canvas.
console.log(ES5Circle.circlesMade) // 1.
console.log(testCircle.area()) // 12.566...

testCircle.radius = 1.23
console.log(testCircle.radius) // 1.23.

testingTextFormatter.logTestingStart()

ES5Circle.draw(new ES5Circle(2.13), { id: 'test-canvas-2' })
console.log(ES5Circle.circlesMade) // 2.

// ES6 `Class`.
class ES6Circle {
  // Equivalent to the constructor method in ES5.
  constructor (radius) {
    // Some `radius` checking code...
    console.log(`Instantiating a \`${radius}\` radius circle.`)

    this._radius = radius

    ES6Circle.circlesMade++
  }

  // A class static method is the equivalent to an ES5 method, which directly owned by the constructor method.
  static draw (circle, canvas) { /* ... */ }

  // Same as above.
  static get circlesMade () { /* ... */ }

  // Same as above.
  static set circlesMade (val) { /* ... */ }

  // A class instance method is the equivalent to an ES5 method, which owned by the constructor method's `prototype`.
  area () { /* ... */ }

  // Same as above.
  get radius () { /* ... */ }

  // Same as above.
  set radius (radius) { /* ... */ }
}

export { ES5Circle, testingTextFormatter }
