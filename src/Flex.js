import React from 'react'
import PropTypes from 'prop-types'
import createStyledElement from 'create-styled-element'
import alignTypes from './align-types'
import justifyTypes from './justify-types'

function Flex({
  direction,
  wrap,
  flow,
  justify,
  alignItems,
  alignContent,
  order,
  grow,
  shrink,
  ...props
}) {
  const css = {
    display: 'flex',
  }

  if (direction !== '') {
    css.flexDirection = direction
  }

  if (wrap !== '') {
    css.flexDirection = wrap
  }

  if (flow !== '') {
    css.flexFlow = flow
  }

  if (justify !== '') {
    css.justifyContent = justifyTypes[justify]
  }

  if (alignItems !== '') {
    css.alignItems = alignTypes[alignItems]
  }

  if (alignContent !== '') {
    css.alignContent = alignContent
  }

  if (alignContent !== '') {
    css.alignContent = alignContent
  }

  if (order) {
    css.order = order
  }

  if (grow !== '') {
    css.flexGrow = grow
  }

  return createStyledElement('div', props)(css)
}

Flex.propTypes = {
  direction: PropTypes.number,
  wrap: PropTypes.number,
  flow: PropTypes.number,
  justify: PropTypes.number,
  alignItems: PropTypes.number,
  alignContent: PropTypes.string,
  order: PropTypes.string,
  grow: PropTypes.string,
  shrink: PropTypes.string,
  basis: PropTypes.string,
  flex: PropTypes.string,
  align: PropTypes.string,
}

export default Flex
