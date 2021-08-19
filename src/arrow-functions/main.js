'use strict'

// Simplest form. The result of the arrow function body will be automatically returned.
// ES5
let selected = allJobs.filter(function (job) {
  return job.isSelected()
})
// ES6
selected = allJobs.filter(job => job.isSelected())

// Use parameter parentheses when there are multiple/no arguments, rest parameters, defaults, destructuring arguments.
// ES5
let total = values.reduce(function (a, b) {
  return a + b
}, 0)
// ES6
total = values.reduce((a, b) => a + b, 0)

// Use curly brackets to wrap the arrow function body when there are multiple statements.
// Note: An arrow function with a body block doesn't automatically return a value. When there isn't an explicit
// `return`, by default, `undefined` will be the function/method call result.
// ES5
buttonOne.click(function (event) {
  playTrumpet()
  fireConfettiCannon()

  return true
})
// ES6
buttonOne.click(event => {
  playTrumpet()
  fireConfettiCannon()

  return true
})

// It's needed to wrap the returning plain object with parentheses in the simplest form.
const puppies = ['goldie', 'sharpie']
// The below line will be interpreted as an arrow function with a body block wrapped by curly brackets. The body block
// returns nothing, which results in `undefined` being returned.
let chewToys = puppies.map(puppy => { puppy })
console.log(chewToys) // [ undefined, undefined ]
chewToys = puppies.map(puppy => ({ puppy }))
console.log(chewToys) // [ { puppy: 'goldie' }, { puppy: 'sharpie' } ]

// The value of `this`.
// ES5
{
  // ...

  addAll: function addAll(pieces) {
    let self = this

    _.each(pieces, function (piece) {
      // the inner function doesn’t inherit the outer function’s `this` value. Inside the inner function, `this` might
      // be `window` or `undefined`. Hence, we'll need the temporary `self` variable declared and assigned above.
      self.add(piece);
    });
  },

  // ...
}
// ES6
{
  // ...

  addAll: function addAll(pieces) {
    // In ES6, arrow functions do not have their own `this` value. The value of `this` inside an arrow function is
    // always inherited from the enclosing scope.
    _.each(pieces, piece => this.add(piece));
  },

  // ...
}
// ES6 with method syntax
{
  // ...

  addAll(pieces) {
    _.each(pieces, piece => this.add(piece));
  },

  //...
}
