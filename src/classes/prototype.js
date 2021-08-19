/* eslint-disable no-prototype-builtins */
'use strict'

import { TestingTextFormatter } from '../_helpers/TestingTextFormatter.js'

const testingTextFormatter = new TestingTextFormatter()

// `prototype` is a special property which only exists in JavaScript functions by default.
testingTextFormatter.logTestingStart()

const testFunction = function () {
}
const testObject = {}

console.log(typeof Object) // function.
console.log(typeof testFunction) // function.
console.log(typeof testObject) // object.
console.log(Object.prototype) // {}.
console.log(testFunction.prototype) // testFunction {}.
console.log(testObject.prototype) // undefined.

// `prototype` is used to define the structure (members) of any instances created via the `new`
// keyword in conjunction with the particular function.
testingTextFormatter.logTestingStart()

const ParentFunction = function () {
}

ParentFunction.prototype = {
  propertyOne: 'Property One',

  methodOne: function () {
    console.log('methodOne() called.')
  },
}

const childOne = new ParentFunction()

console.log(childOne.propertyOne) // Property One.
childOne.methodOne() // methodOne() called.

/*
 * Though `prototype` relates to inheritance and some might misled by its name, it isn't meant to
 * be used for querying/modifying inheritance relationship.
 * In most of mainstream OO programming languages, such as Java, something like
 * `object = new Something()` will naturally lead to a notion as "`Something` is the `object`s
 * prototype". The notion might then trick you into writing a line below, but the outcome might
 * surprise you.
 */
testingTextFormatter.logTestingStart()

const childTwo = new ParentFunction()
console.log(childTwo.prototype === ParentFunction) // Expected `true`, but it returns `false`.
// Why `false`? `prototype` exists for functions only.
console.log(typeof childTwo, childTwo.prototype) // object, undefined.

/*
 * Instead, there are few `*PrototypeOf()` methods which were designed for querying/modifying
 * inheritance relationship.
 * Note how the additional `.prototype` was needed for the check to work as expected below. Only
 * an OBJECT, but not a function, can be the prototype of another object. In other words, the
 * descendants' prototype is stored as the value of their parent's `prototype` property.
 */
console.log(ParentFunction.isPrototypeOf(childTwo)) // false.
console.log(ParentFunction.prototype.isPrototypeOf(childTwo)) // true.
console.log(ParentFunction.prototype === Object.getPrototypeOf(childTwo)) // true.

// It's also worthy to be noted that, even though `prototype` and `instanceof` are both related to
// inheritance, they are two different concepts.
testingTextFormatter.logTestingStart()

const objectOne = {}
const objectTwo = {}

// We've changed the inheritance relationship of `objectTwo` now.
Object.setPrototypeOf(objectTwo, objectOne)

console.log(objectTwo instanceof Object) // true.
/*
 * Note: `instanceof` requires its right-hand side operand to be a function/callable, or more
 * specifically, a CONSTRUCTOR.
 * The below line will give us: "TypeError: Right-hand side of 'instanceof' is not callable."
*/
// console.log(objectTwo instanceof objectOne)

console.log(Object.getPrototypeOf(objectOne) === Object.prototype) // true.
console.log(Object.getPrototypeOf(objectTwo) === Object.prototype) // false. No the direct child.
console.log(Object.getPrototypeOf(objectTwo) === objectOne) // true.
