'use strict'

// A `Set` is a collection of VALUES.
const desserts = new Set('🍪🍦🍧🍩')

console.log((desserts.size)) // `4`. Note: `size` is a property, not a method.
console.log((desserts)) // Set { '🍪', '🍦', '🍧', '🍩' }.

// A `Set` can contain the same value once.
desserts.add('🍪')

console.log((desserts.size)) // 4.
console.log((desserts)) // Set { '🍪', '🍦', '🍧', '🍩' }.

// `Set`s membership testing is faster than the one with arrays.
const arrayWords = ['hello', 'world', 'good', 'day']
const setWords = new Set(arrayWords)

console.log(arrayWords.indexOf('day') !== -1) // `true` with okay performance.
console.log(setWords.has('day')) // `true` with BETTER performance.

// `Set`s don't have indexing as what arrays have.
console.log(arrayWords[1]) // world.
console.log(setWords[1]) // undefined.

// Delete values from a `Set`.
const testDelete = new Set([1, 2, 3, 4])

testDelete.delete(2)

console.log(testDelete) // Set { 1, 3, 4 }.

testDelete.clear() // Delete all entries.

console.log(testDelete) // Set {}.

// `Set`s are iterable by default.
const testSet = new Set([1, 2, 3, 4])

for (const value of testSet[Symbol.iterator]()) {
  console.log(value) // 1, 3, 4.
}
// The below is the same as the above `for` loop.
for (const value of testSet) {
  console.log(value) // 1, 3, 4.
}

// `Set`s do have `forEach()` as what arrays have.
testSet.forEach(value => console.log(value)) // 1, 3, 4.

// Note: The entry keys of a `Set` are the same as the entry values.
console.log(testSet.keys()) // [Set Iterator] { 1, 3, 4 }.
console.log(testSet.values()) // [Set Iterator] { 1, 3, 4 }.
console.log(testSet.entries()) // [Set Entries] { [ 1, 1 ], [ 3, 3 ], [ 4, 4 ] }.

// `Set`s can be cloned via its constructor.
const originalSet = new Set('abc')
const clonedSet = new Set(originalSet)

originalSet.delete('a')

console.log(originalSet) // Set { 'b', 'c' }.
console.log(clonedSet) // Set { 'a', 'b', 'c' }.
