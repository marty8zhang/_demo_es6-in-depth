'use strict'

function * hexRange (start, stop, step) {
  for (let i = start; i < stop; i += step) {
    yield i
  }
}

function printColors () {
  const content$ = $('#content')

  // contrived example
  for (const hex of hexRange(900, 999, 10)) {
    const newDiv = $('<div>')
      .attr('class', 'color')
      .css({'background-color': `#${hex}`})
      .append(`hex code: #${hex}`)

    content$.append(newDiv)
  }
}

$(printColors)
