'use strict'

class TestingTextFormatter {
  constructor () {
    this._testRunIndex = 1
  }

  logTestingStart () {
    console.log('\n# Test round ' + this._testRunIndex++ + ':')
  }
}

export { TestingTextFormatter }
