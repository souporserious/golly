import React from 'react'
import PropTypes from 'prop-types'
import createStyledElement from 'create-styled-element'
import alignTypes from './align-types'
import contentTypes from './content-types'
import justifyTypes from './justify-types'

function Flex({
  tag,
  innerRef,
  inline,
  order,
  grow,
  shrink,
  direction,
  wrap,
  justifyContent,
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
    flex: `${grow === true ? 1 : grow} ${shrink} ${basis}`,
    flexFlow: `${direction} ${flexWrap}`,
  }

  if (justifyContent) {
    if (justifyContent === 'space-evenly') {
      css.justifyContent = 'space-between'
      css['&:before, &:after'] = {
        content: '""',
      }
    } else {
      css.justifyContent = justifyTypes[justifyContent]
    }
  }

  if (align) {
    css.alignSelf = alignTypes[align]
  }

  if (alignItems) {
    css.alignItems = alignTypes[alignItems]
  }

  if (alignContent) {
    css.alignItems = contentTypes[alignContent]
  }

  if (order) {
    css.order = order
  }

  return createStyledElement(tag, { ref: innerRef, ...props })(css)
}

Flex.defaultProps = {
  tag: 'div',
  innerRef: () => null,
  inline: false,
  direction: 'row',
  wrap: false,
  justifyContent: null,
  alignItems: null,
  alignContent: null,
  order: null,
  grow: 0,
  shrink: 1,
  basis: 'auto',
  align: null,
}

Flex.propTypes = {
  tag: PropTypes.string,
  innerRef: PropTypes.func,
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
  justifyContent: PropTypes.oneOf([
    'center',
    'end',
    'space-around',
    'space-between',
    'space-evenly',
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
