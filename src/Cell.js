import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import Flex from './Flex'
import createStyledElement from 'create-styled-element'

function Cell({
  columnSize,
  marginLeft,
  marginRight,
  marginBottom,
  tag = 'div',
  size = 'auto',
  offset,
  ...props
}) {
  const css = {
    marginLeft,
    marginRight,
    marginBottom,
  }
  const cellProps = {
    ...props,
  }

  if (size === 'auto') {
    cellProps.grow = 0
    cellProps.basis = 'auto'
  } else {
    cellProps.shrink = 0
    cellProps.basis = columnSize
  }

  // if (offset) {
  //   css.marginLeft = offsetSize
  // }

  return createStyledElement(Flex, cellProps)(css)
}

Cell.propTypes = {
  columnSize: PropTypes.string,
  offsetSize: PropTypes.string,
  gutterX: PropTypes.number,
  gutterY: PropTypes.number,
  tag: PropTypes.string,
  size: PropTypes.number,
  offset: PropTypes.number,
}

export default Cell
