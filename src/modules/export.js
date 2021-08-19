/* eslint-disable prefer-const */
'use strict'

import * as secondLevelModule from './second-level-module'

export var publicVarOne = 'public `var` one'
var publicVarThree = 'public `var` three'
var privateVarOne = 'private `var` one'

export let publicLetOne = 'public `let` one'
let publicLetThree = 'public `let` three'
let privateLetOne = 'private `let` one'

export const PUBLIC_CONST_ONE = 'public `const` one'
const PUBLIC_CONST_THREE = 'public `const` three'
export const PUBLIC_CONST_FOUR = 'public `const` four'
const PUBLIC_CONST_FIVE = 'public `const` five'
const privateConstOne = 'private `const` one'

export function publicFunctionOne () {
  console.log('publicFunctionOne() called.')
}

function publicFunctionThree () {
  console.log('publicFunctionThree() called.')
}

function privateFunctionOne () {
  console.log('privateFunctionOne() called.')
}

export class PublicClassOne {
  constructor () {
    console.log('Instantiating `PublicClassOne`.')
  }
}

class PublicClassThree {
  constructor () {
    console.log('Instantiating `PublicClassThree`.')
  }
}

/*
 * `default` is just a special name which can be utilised by external `import`s if available. The rules applied to it
 * are the same of those applied to any other `export`s.
 * `export default` can be used on functions, classes and object literals, but not on variables and constants.
 * The shorthand `export default class DefaultClassSix {}` version is the equivalent to:
 *
 * class DefaultClassSix { ... }
 * export { DefaultClassSix as default }
 */
export default class DefaultClassSix {
  constructor () {
    console.log('Instantiating `DefaultClassSix`.')
  }
}

class PrivateClassOne {
  constructor () {
    console.log('Instantiating `PrivateClassOne`.')
  }
}

// Module body.
console.log('Executing `export.js` body.')

// `export` list.
export { publicVarThree, publicLetThree, PUBLIC_CONST_THREE, publicFunctionThree, PublicClassThree }

// Renaming `export`.
export { PUBLIC_CONST_FIVE as RENAMED_CONST_FIVE }

/*
 * Aggregate (import then export the same) modules. It's LIKE (but not the same) the shorthand version of:
 *
 * import { AGGREGATED_MODULE_CONSTANT } from './second-level-additional-module'
 * export AGGREGATED_MODULE_CONSTANT
 *
 * Note: `export * from ...` works too.
 */
export { AGGREGATED_MODULE_CONSTANT as RENAMED_AGGREGATED_MODULE_CONSTANT } from './second-level-additional-module'

// Different to the import-then-export approach, the "forwarded" member is invisible in the current scope.
try {
  console.log(AGGREGATED_MODULE_CONSTANT)
} catch (e) {
  console.log(e.name + ': ' + e.message) // ReferenceError: AGGREGATED_MODULE_CONSTANT is not defined.
}
