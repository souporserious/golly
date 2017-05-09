import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import Flex from './Flex'
import createStyledElement from 'create-styled-element'

function Cell({ cellProps, tag = 'div', size = 'auto', offset, ...props }) {
  const { columnSize, offsetSize, ...css } = cellProps
  const flexProps = {
    ...props,
  }

  if (size === 'auto') {
    flexProps.grow = 1
    flexProps.basis = 'auto'
  } else {
    flexProps.shrink = 0
    flexProps.basis = columnSize
  }

  if (offsetSize) {
    css.marginLeft = offsetSize
  }

  return createStyledElement(Flex, flexProps)(css)
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
