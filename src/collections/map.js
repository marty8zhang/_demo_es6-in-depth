'use strict'

// A `Map` is a collection of KEY-VALUE pairs.
const testMap = new Map([['key1', 'value1'], ['key2', 'value2']])

console.log(testMap.size) // `2`. Note: `size` is a property, not a method.
console.log(testMap) // Map { 'key1' => 'value1', 'key2' => 'value2' }.

// `Map`s getter, setter & checker.
testMap.set('key1', 'newValue1') // This overrides an existing entry.
testMap.set('key4', 'value4') // This creates a new entry.

console.log(testMap.get('key1')) // newValue1.
console.log(testMap.has('key4')) // true.
console.log(testMap) // Map { 'key1' => 'newValue1', 'key2' => 'value2', 'key4' => 'value4' }.

// `Map` keys aren't limited to strings only.
const objectKey = { a: 1 }

testMap.set(objectKey, 'objectKeyValue')

console.log(testMap.get(objectKey)) // objectKeyValue.
console.log(testMap) // Map { 'key1' => 'newValue1', 'key2' => 'value2', 'key4' => 'value4', { a: 1 } => 'objectKeyValue' }.

// The underlying method for `Map` entries iteration.
for (const [key, value] of testMap[Symbol.iterator]()) {
  console.log(key, value) // key1 newValue1, key2 value2, key4 value4, { a: 1 } objectKeyValue.
}
// Same as the above.
for (const [key, value] of testMap.entries()) {
  console.log(key, value) // Same as above.
}
// Same as the above.
for (const [key, value] of testMap) {
  console.log(key, value) // Same as above.
}

// `Map`s also have `forEach()`. Note the order of the arguments.
testMap.forEach((value, key, self) => console.log(key, value)) // Same as above.

// Access the keys & values of a `Map`.
for (const key of testMap.keys()) {
  console.log(key) // key1, key2, key4, { a: 1 }
}
for (const value of testMap.values()) {
  console.log(value) // newValue1, value2, value4, objectKeyValue
}

// Clone `Map`s and delete `Map` entries.
const clonedMap = new Map(testMap)

testMap.delete(objectKey)

console.log(testMap) // Map { 'key1' => 'newValue1', 'key2' => 'value2', 'key4' => 'value4' }.
console.log(clonedMap) // Map { 'key1' => 'newValue1', 'key2' => 'value2', 'key4' => 'value4', { a: 1 } => 'objectKeyValue' }.

clonedMap.clear()

console.log(testMap) // Map { 'key1' => 'newValue1', 'key2' => 'value2', 'key4' => 'value4' }.
console.log(clonedMap) // Map {}.
