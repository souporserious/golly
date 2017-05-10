import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import createStyledElement from 'create-styled-element'
import Flex from './Flex'

function Cell(props, context) {
  const { size, offset, ...cellProps } = props
  const { grid: { columns, gutterX, gutterY } } = context
  const getCellSize = size => 100 * size / columns + '%'
  const marginX = gutterX / 2
  const marginY = gutterY / 2
  const css = {
    marginTop: marginY,
    marginRight: marginX,
    marginBottom: marginY,
    marginLeft: marginX,
  }

  if (offset !== null) {
    css.marginLeft = `calc(${getCellSize(offset)} + ${gutterX}px)`
  }

  if (size === 'auto') {
    cellProps.grow = 1
    cellProps.basis = 'auto'
  } else {
    cellProps.shrink = 0
    cellProps.basis = `calc(${getCellSize(size)} - ${gutterX}px)`
  }

  return createStyledElement(Flex, cellProps)(css)
}

Cell.contextTypes = {
  grid: PropTypes.object,
}

Cell.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  offset: PropTypes.number,
}

Cell.defaultProps = {
  size: 'auto',
  offset: null,
}

export default Cell
