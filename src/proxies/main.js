'use strict'

import { TestingTextFormatter } from '../_helpers/TestingTextFormatter'

const testingTextFormatter = new TestingTextFormatter()

const testTarget = {}; const testHandler = {}
const testProxy = new Proxy(testTarget, testHandler)

// All the internal methods of a `Proxy` are forwarded to the `Proxy`'s target.
// In the below example, the object's internal `[[Set]]()` call has been forwarded to `testTarget` via `testProxy`.
testingTextFormatter.logTestingStart()
testProxy.colour = 'red'

console.log(testTarget) // { colour: 'red' }
// Even though for most of the time, our `testProxy` behaves the same as the `testTarget`, they are with different types.
// As a particular example, something like `document.body.appendChild(proxyElement)` is likely to cause a `TypeError`.
console.log(testProxy === testTarget) // false

// A `Proxy` treeHandler example.
testingTextFormatter.logTestingStart()
testHandler.set = function (target, key, value, receiver) {
  console.log('-- Trying to set --')
  console.log('Target:', target)
  console.log('Key: `' + key + '` to ' + 'Value: `' + value + '`')

  if (key === 'id') {
    throw new Error(`Setting \`${key}\` isn't allowed.`)
  }

  /*
   * Note: Use the `target.key` syntax here will introduce a bug, which sets the literal `key` property for you
   * rather than using the key name you provided.
   * E.g., what you want: `{ typeId: 2 }`; what you actually get: `{ key: 2 }`.
   */
  target[key] = value

  /*
   * Note: `set()` should return a boolean value.
   * Return `true` to indicate that assignment succeeded; or
   * if return `false`, and the assignment happened in the strict mode, a `TypeError` will be thrown.
   */
  return true
}

/* Output:
 * -- Trying to set --
 * Target: { colour: 'red' }
 * Key: `typeId` to Value: 2
 */
testProxy.typeId = 2

console.log(testTarget) // { colour: 'red', typeId: 2 }

try {
  /* Output:
   * -- Trying to set --
   * Target: { colour: 'red', typeId: 2 }
   * Key: `id` to Value: `123`
   */
  testProxy.id = 123
} catch (e) {
  console.log(e) // Error: Setting `id` isn't allowed...
}

// Example: Auto-populate object properties.
testingTextFormatter.logTestingStart()

let tree = {}

// tree.branch1.branch2.twig = 'green' // TypeError: Cannot read property 'branch2' of undefined.
// tree.branch1.branch3.twig = 'yellow' // TypeError: Cannot read property 'branch3' of undefined.

const treeHandler = {
  // In an assignment, `[[Get]]()` is called first, and `[[Set]]()` afterwards. Hence, we only need a proxy `get()` here.
  get (target, key, value, receiver) {
    if (!(key in target)) {
      target[key] = getProxyTree()
    }

    return Reflect.get(target, key, receiver)
    // (?) I assume the above use of `Reflect` is an "overkill", and is a harder to understand alternative to the below line.
    // return target[key]
  },
}

function getProxyTree () {
  return new Proxy({}, treeHandler)
}

tree = getProxyTree()

tree.branch1.branch2.twig = 'green'
tree.branch1.branch3.twig = 'yellow'

console.log(tree) // { branch1: { branch2: { twig: 'green' }, branch3: { twig: 'yellow' } } }

// Example: A flawed proxy for converting objects into their immutable version.
testingTextFormatter.logTestingStart()

const denyModification = () => {
  throw new Error('Modification not allowed.')
}

const immutableHandler = {
  // First thing first, override all five mutating methods.
  set: denyModification,
  defineProperty: denyModification,
  deleteProperty: denyModification,
  preventExtensions: denyModification,
  setPrototypeOf: denyModification,

  get (target, key, receiver) {
    // const result = target[key]
    const result = Reflect.get(target, key, receiver)

    // We'll also need to make the result object (if any) immutable.
    if (Object(result) === result) {
      return getImmutableVersion(result)
    }

    return result
  },

  // Just like `get()`, additional processing needs to happen to `getPrototypeOf()`, `getOwnPropertyDescriptor()`, and
  // so on too.

  // Another possible but important aspect that might need to be dealt with: How do we make sure our proxy passes some
  // strict type check against `this` inside some object methods?
}

function getImmutableVersion (target) {
  return new Proxy(target, immutableHandler)
}

const testMutable = { colour: 'brown', size: 'large' }
const testImmutable = getImmutableVersion(testMutable)

testMutable.colour = 'blue'

console.log(testMutable) // { colour: 'blue', size: 'large' }

try {
  testImmutable.colour = 'purple'
} catch (e) {
  console.log(e) // Error: Modification not allowed.
}
