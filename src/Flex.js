import React from 'react'
import PropTypes from 'prop-types'
import createStyledElement from 'create-styled-element'
import alignTypes from './align-types'
import contentTypes from './content-types'
import justifyTypes from './justify-types'

function Flex({
  tag,
  inline,
  order,
  grow,
  shrink,
  direction,
  wrap,
  justify,
  align,
  alignItems,
  alignContent,
  basis,
  ...props
}) {
  const flexWrap = wrap === 'reverse'
    ? 'wrap-reverse'
    : wrap === true ? 'wrap' : 'nowrap'
  const css = {
    boxSizing: 'border-box',
    display: inline ? 'inline-flex' : 'flex',
    flex: `${grow} ${shrink} ${basis}`,
    flexFlow: `${direction} ${flexWrap}`,
    minWidth: basis, // fixes flex bug in IE
  }

  if (justify !== '') {
    css.justifyContent = justifyTypes[justify]
  }

  if (align !== '') {
    css.alignSelf = alignTypes[align]
  }

  if (alignItems !== '') {
    css.alignItems = alignTypes[alignItems]
  }

  if (alignContent !== '') {
    css.alignItems = contentTypes[alignContent]
  }

  if (order) {
    css.order = order
  }

  return createStyledElement(tag, props)(css)
}

Flex.defaultProps = {
  tag: 'div',
  inline: false,
  direction: 'row',
  wrap: false,
  justify: 'start',
  alignItems: 'start',
  alignContent: 'start',
  order: 0,
  grow: 0,
  shrink: 1,
  basis: 'auto',
  align: 'start',
}

Flex.propTypes = {
  tag: PropTypes.string,
  inline: PropTypes.bool,
  order: PropTypes.number,
  grow: PropTypes.number,
  shrink: PropTypes.number,
  basis: PropTypes.string,
  direction: PropTypes.oneOf([
    'row',
    'row-reverse',
    'column',
    'column-reverse',
  ]),
  wrap: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  justify: PropTypes.oneOf([
    'center',
    'end',
    'space-around',
    'space-between',
    'start',
  ]),
  align: PropTypes.oneOf(['baseline', 'stretch', 'center', 'end', 'start']),
  alignItems: PropTypes.oneOf([
    'baseline',
    'stretch',
    'center',
    'end',
    'start',
  ]),
  alignContent: PropTypes.oneOf([
    'center',
    'end',
    'space-around',
    'space-between',
    'start',
    'stretch',
  ]),
}

export default Flex
