/* eslint-disable import/first, import/no-duplicates, no-eval */
'use strict'

import { TestingTextFormatter } from '../_helpers/TestingTextFormatter'

const testingTextFormatter = new TestingTextFormatter()

/*
 * Use exported members of a module.
 *
 * Note: All bodies of the imported modules will be executed first, despite how further down the `import` lines are in
 * the current file. Moreover, imported module bodies will be executed in a first-come-first-served order. Hence, we'll
 * see the following outputs (in the specific order) before anything else.
 *
 * Executing `second-level-export.js` body. (`export.js` firstly imports `second-level-module.js`,)
 * Executing `second-level-additional-module.js` body. (then `export.js` imports `second-level-additional-module.js`.)
 * Executing `export.js` body.
 * ReferenceError: AGGREGATED_MODULE_CONSTANT is not defined (still in the `export.js` body)
 * Executing `first-level-additional-module.js` body. (This file is imported far down in the current file.)
 */
import {
  publicVarOne,
  publicLetOne,
  PUBLIC_CONST_ONE,
  publicFunctionOne,
  PublicClassOne,
} from './export'

testingTextFormatter.logTestingStart()
console.log(publicVarOne) // public `var` one.
console.log(publicLetOne) // public `let` one.
console.log(PUBLIC_CONST_ONE) // public `const` one.
publicFunctionOne() // publicFunctionOne() called.
const publicClassOne = new PublicClassOne() // Instantiating `PublicClassOne`.

// Use non-exported members of a module will cause `ReferenceError`s.
testingTextFormatter.logTestingStart()
const privateModuleMemberAccessors = [
  'console.log(privateVarOne)', // ReferenceError: privateVarOne is not defined.
  'console.log(privateLetOne)', // ReferenceError: privateLetOne is not defined.
  'console.log(privateConstOne)', // ReferenceError: privateConstOne is not defined.
  'privateFunctionOne()', // ReferenceError: privateFunctionOne is not defined.
  'const privateClassOne = new PrivateClassOne()', // ReferenceError: PrivateClassOne is not defined.
]

privateModuleMemberAccessors.forEach((privateModuleMemberAccessor) => {
  try {
    eval(privateModuleMemberAccessor)
  } catch (e) {
    console.log(e.name + ': ' + e.message)
  }
})

// Repetitive `import`s with the same module won't cause its module body being executed repeatedly.
testingTextFormatter.logTestingStart()

import {
  publicVarThree,
  publicLetThree,
  PUBLIC_CONST_THREE,
  publicFunctionThree,
  PublicClassThree,
} from './export'

console.log(publicVarThree) // public `var` three.
console.log(publicLetThree) // public `let` three.
console.log(PUBLIC_CONST_THREE) // public `const` three.
publicFunctionThree() // publicFunctionThree() called.
const publicClassThree = new PublicClassThree() // Instantiating `PublicClassThree`.

// Renamed `import`s.
testingTextFormatter.logTestingStart()

import { PUBLIC_CONST_FOUR as RENAMED_CONST_FOUR } from './export'

try {
  console.log(PUBLIC_CONST_FOUR) // ReferenceError: PUBLIC_CONST_FOUR is not defined.
} catch (e) {
  console.log(e.name + ': ' + e.message)
}
console.log(RENAMED_CONST_FOUR) // public `const` four.

// Use renamed `export`s.
testingTextFormatter.logTestingStart()

// Note: Errors might not be thrown when `import`ing a non-exported member from a module.
import { PUBLIC_CONST_FIVE } from './export'

console.log(PUBLIC_CONST_FIVE) // undefined.

import { RENAMED_CONST_FIVE } from './export'

console.log(RENAMED_CONST_FIVE) // public `const` FIVE.

/*
 * `default` imports are particularly useful when using ES6 syntax in conjunction with CommonJS modules. CommonJS
 * modules will be treated as if there are already `default` export(s) in them.
 * Note: While using the `default` `import`s, curly brackets shouldn't be used around the importing name.
 * The shorthand `import DefaultClassSix from ...` version is the equivalent to:
 *
 * import { default as DefaultClassSix } from ...
 */
testingTextFormatter.logTestingStart()

import DefaultClassSix from './export'

const defaultClassSix = new DefaultClassSix() // Instantiating `DefaultClassSix`.

// `import * as ... from ...`.
// Note: Curly brackets shouldn't be used with this syntax.
testingTextFormatter.logTestingStart()

import * as firstLevelAdditionalModule from './first-level-additional-module'

// ReferenceError: PUBLIC_CONST_SEVEN is not defined.
try {
  console.log(PUBLIC_CONST_SEVEN)
} catch (e) {
  console.log(`${e.name}: ${e.message}.`)
}

console.log(firstLevelAdditionalModule.PUBLIC_CONST_SEVEN) // public `const` two.

// Test aggregate (import then export the same) modules.
testingTextFormatter.logTestingStart()

import { RENAMED_AGGREGATED_MODULE_CONSTANT } from './export'

console.log(RENAMED_AGGREGATED_MODULE_CONSTANT) // Aggregated module constant.
