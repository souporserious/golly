import React from 'react'
import PropTypes from 'prop-types'
import createStyledElement from 'create-styled-element'
import alignTypes from './align-types'
import justifyTypes from './justify-types'

function Cell({
  columnSize,
  offsetSize,
  marginRight,
  marginBottom,

  order,
  size,
  align,
  offset,

  ...props
}) {
  const css = {
    boxSizing: 'border-box',
    display: 'flex',
    order: order,
    flexDirection: 'column',
    flex: `0 0 ${columnSize}`,
    minWidth: columnSize,
  }

  if (align !== '') {
    css.alignSelf = alignTypes[align]
  }

  if (marginRight) {
    css.marginRight = marginRight
  }

  if (marginBottom) {
    css.marginBottom = marginBottom
  }

  if (offset) {
    css.marginLeft = offsetSize
  }

  return createStyledElement('div', props)(css)
}

Cell.propTypes = {
  size: PropTypes.number,
  order: PropTypes.number,
  align: PropTypes.string,
  offset: PropTypes.number,
}

export default Cell
