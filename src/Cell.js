import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import createStyledElement from 'create-styled-element'
import Flex from './Flex'

function Cell({
  cellProps,
  size,
  pull,
  push,
  order, // don't pass order through since we take care of it in the Grid component
  ...props
}) {
  const { cellSize, pullSize, pushSize, ...css } = cellProps
  const flexProps = {
    inline: true,
    direction: 'column',
    ...props,
  }

  if (size === 'auto') {
    flexProps.grow = 1
    flexProps.basis = 'auto'
  } else {
    flexProps.shrink = 0
    flexProps.basis = cellSize
  }

  if (pull) {
    css.marginRight = pullSize
  }

  if (push) {
    css.marginLeft = pushSize
  }

  return createStyledElement(Flex, flexProps)(css)
}

Cell.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pull: PropTypes.number,
  push: PropTypes.number,
}

Cell.defaultProps = {
  size: 1,
  pull: null,
  push: null,
}

export default Cell
