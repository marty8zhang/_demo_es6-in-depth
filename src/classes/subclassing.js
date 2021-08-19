'use strict'

import { ES5Circle, testingTextFormatter } from './main'

// "Subclassing"/inheritance in ES5.
var ES5Shape = function () {}

ES5Shape.clearAll = function () {
  console.log('`ES5Shape.clearAll()` called.')
}

ES5Shape.prototype = { /* ... */ }

Object.defineProperty(ES5Shape.prototype, 'colour', {
  get: function () {
    return this._colour
  },

  set: function (colour) {
    if (colour !== this._colour) {
      this._colour = colour
      this._colourChanged = true
    }
  },
})

testingTextFormatter.logTestingStart()

var subclassedES5Circle = new ES5Circle(3)

/*
 * Link INSTANCE properties/methods.
 * Note: This can happen even after an object has been instantiated. It means the inheritance relationship is
 * dynamically checked.
 */
Object.setPrototypeOf(ES5Circle.prototype, ES5Shape.prototype)

subclassedES5Circle.colour = 'red'
console.log(subclassedES5Circle.colour) // red.

// ES5Circle.clearAll() // TypeError: _main.ES5Circle.clearAll is not a function.

// Link STATIC properties/methods.
Object.setPrototypeOf(ES5Circle, ES5Shape)

ES5Circle.clearAll() // `ES5Shape.clearAll()` called.

// The more intuitive subclassing form in ES6.
class ES6Shape {
  static clearAll () { /* ... */ }

  get colour () { /* ... */ }

  set colour (colour) { /* ... */ }
}

class ES6Circle extends ES6Shape { /* ... */ }

// Shadowing/overriding properties/methods and `super`
testingTextFormatter.logTestingStart()

class Square {
  constructor (sideLength) {
    this._sideLength = sideLength
  }

  get sideLength () {
    return this._sideLength
  }

  set sideLength (sideLength) {
    this._sideLength = sideLength
  }
}

class ScalableSquare extends Square {
  // If no additional processing needed, subclasses can skip declaring their own constructor, and their parent's
  // constructor will be called by default.
  constructor (sideLength, scalingFactor) {
    /*
     * In JavaScript, the base constructor is responsible for allocating `this`. Hence, it'll be an error trying to
     * use `this` before calling `super()` in a subclass' constructor.
     * On the other hand, if a subclass and all of its ascendants don't need to interact with `this`, calling `super()`
     * can be optional.
     */
    // this._someProperty = 'something' // TypeError: Cannot set property '_someProperty' of undefined.

    super(sideLength)

    this._scalingFactor = scalingFactor
  }

  get sideLength () {
    return this._scalingFactor * super.sideLength
  }

  set sideLength (sideLength) {
    throw new Error('Changing the side length of a scalable square isn\'t allowed.')
  }
}

const square = new Square(1)

square.sideLength = 1.1
console.log(square.sideLength) // 1.1.

const scalableSquare = new ScalableSquare(2.2, 2)

console.log(scalableSquare.sideLength) // 4.4.
try {
  scalableSquare.sideLength = 2.2
} catch (e) {
  console.log(e) // Error: Changing the side length of a scalable square isn't allowed.
}

/*
 * In order to know which class to used to allocate `this` in the base constructor, JavaScript now automatically store
 * the information about the directly invoked constructor in `new.target`.
 * Calling a function with `new` sets `new.target` to be the called function, and calling `super()` within that function
 * forwards the same `new.target` value.
 * `new.target` exists in any function, and if the function is not invoked with `new`, it will be set to `undefined`.
 */
testingTextFormatter.logTestingStart()

class ClassOne {
  constructor () {
    console.log(new.target)
  }
}

class SubclassOne extends ClassOne {}

const classOne = new ClassOne() // [Function: ClassOne].
const subclassOne = new SubclassOne() // [Function: SubclassOne].
