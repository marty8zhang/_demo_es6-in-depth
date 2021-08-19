/**
 * In order to transpile any file sits outside this folder on the fly (with `@babel/register`), we'll need this file.
 */
'use strict'

require('@babel/register')({
  // Assuming we'd like to use preset settings from a parent file.
  extends: '../.babelrc',
  // The default `ignore` value was preventing us from transpiling files in other folders.
  // Hence, we'll need to override with the specific value that we need.
  ignore: [/node_modules/],
})
