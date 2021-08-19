'use strict'

const id = 1

const myObject = { // `this` is from the global scope.
  id: 22,
  thisId: this.id,

  printIds: function () { // `this` has its own scope now, which is within the object literal.
    console.log(this.id + ' vs ' + this.thisId) // 22 vs undefined.
  },

  printIdsInArrowFunction: () => { // `this` inherits the global scope from its parent.
    console.log(this.id + ' vs ' + this.thisId) // undefined vs undefined.
  },
}
myObject.printIds()
myObject.printIdsInArrowFunction()

class TestClass {
  id = 333
  thisId = this.id

  printIds () {
    console.log(this.id + ' vs ' + this.thisId) // 333 vs 333.
  }

  printIdsInArrowFunction = () => {
    console.log(this.id + ' vs ' + this.thisId) // 333 vs 333.
  }
}
const myTest = new TestClass()
myTest.printIds()
myTest.printIdsInArrowFunction()
