import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import createStyledElement from 'create-styled-element'
import Flex from './Flex'

function Cell({
  cellProps,
  size,
  offset,
  order, // pull off order since we take care of it in Grid
  ...props
}) {
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
  columnSize: PropTypes.string.isRequired,
  offsetSize: PropTypes.string.isRequired,
  gutterX: PropTypes.number.isRequired,
  gutterY: PropTypes.number.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  offset: PropTypes.number,
}

Cell.defaultProps = {
  size: 'auto',
  offset: null,
}

export default Cell
