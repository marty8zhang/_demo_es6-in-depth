'use strict'

function testSymbol (anObject) {
  // The below three `Symbol`s are all unique, even though they have the same description.
  const mySymbol = Symbol('My Symbol')
  const mySymbol2 = Symbol('My Symbol')
  const mySymbol3 = Symbol('My Symbol')

  // Define `Symbol`-keyed properties, which can only be accessed via square brackets syntax but not dot syntax.
  anObject[mySymbol] = 'This is My Symbol property.'
  anObject[mySymbol2] = 'This is my second Symbol property.'
  anObject[mySymbol3] = 'This is my third Symbol property.'

  // Interact with an object's `Symbol`-keyed properties.
  if (mySymbol3 in anObject) {
    delete anObject[mySymbol3]
  }
}

const myObject = {}
const mySymbol = Symbol('My Symbol')

testSymbol(myObject)

// The description doesn't act like an identifier. You cannot retrieve a previously defined `Symbol` via the same
// description.
console.log(myObject[mySymbol]) // undefined

// Retrieve previously defined `Symbol`s.
for (const symbol of Object.getOwnPropertySymbols(myObject)) {
  // First, `Symbol(My Symbol) : This is My Symbol property.`;
  // then, `Symbol(My Symbol) : This is my second Symbol property.`
  // Note how the `Symbol`s having the same description but referring to two different entities.
  console.log(symbol, ':', myObject[symbol])

  // `Symbol`s can’t be automatically converted to strings. Instead, use `String(symbol) or `symbol.toString()`.
  // console.log(symbol + ': ' + myObject[symbol]) // TypeError: Cannot convert a Symbol value to a string
}

// ES6 new API `Reflect`, which can also be used for retrieving `Symbol`s.
console.log(Reflect.ownKeys(myObject)) // [ Symbol(My Symbol), Symbol(My Symbol) ]

// `Symbol`s won't be listed as object keys or property names in the conventional way.
console.log(Object.keys(myObject)) // []
console.log(Object.getOwnPropertyNames(myObject)) // []

// Shared symbols in the global symbol registry.
// Note: The only parameter of `Symbol.for()` acts as a key / an identifier, not like a description that `Symbol()`
// accepts. The SAME Symbol will always be returned by calling it with the same key.
const globalSymbol1 = Symbol.for('My Global Symbol')
const globalSymbol2 = Symbol.for('My Global Symbol')
const localSymbol1 = Symbol('My Local Symbol')
const localSymbol2 = Symbol('My Local Symbol')

console.log(globalSymbol1 === globalSymbol2) // true
console.log(localSymbol1 === localSymbol2) // false
