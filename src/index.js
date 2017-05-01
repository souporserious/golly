import React, { Component } from 'react'
import createStyledElement from 'create-styled-element'
import PropTypes from 'prop-types'

const alignTypes = {
  baseline: 'baseline',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
}

const justifyTypes = {
  around: 'space-around',
  between: 'space-between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
}

class Row extends Component {
  static childContextTypes = {
    row: PropTypes.object,
  }

  static propTypes = {
    columns: PropTypes.number,
    gutter: PropTypes.number,
    alignItems: PropTypes.string,
    justify: PropTypes.string,
    wrap: PropTypes.string,
  }

  static defaultProps = {
    columns: 12,
    gutter: 16,
    alignItems: '',
    justify: '',
    wrap: 'wrap',
  }

  getChildContext() {
    return {
      row: {
        columns: this.props.columns,
        gutter: this.props.gutter,
      },
    }
  }

  render() {
    const { columns, gutter, alignItems, justify, wrap, ...props } = this.props
    const css = {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: wrap,
      width: '100%',
      padding: gutter / 2,
    }

    if (alignItems !== '') {
      css.alignItems = alignTypes[alignItems]
    }

    if (justify !== '') {
      css.justifyContent = justifyTypes[justify]
    }

    return createStyledElement('div', props)(css)
  }
}

function Column({ order, size, align, pull, push, ...props }, context) {
  const getColumnSize = size => size / context.row.columns * 100 + '%'
  const columnSize = size === 'auto' ? '1 1 auto' : getColumnSize(size)
  const css = {
    boxSizing: 'border-box',
    display: 'flex',
    order: order,
    flexDirection: 'column',
    flex: `0 0 ${columnSize}`,
    maxWidth: `${columnSize}`,
    padding: (context.row.gutter || 0) / 2,
  }

  if (align !== '') {
    css.alignSelf = alignTypes[align]
  }

  if (pull) {
    css.marginLeft = -getColumnSize(pull)
  }

  if (push) {
    css.marginLeft = getColumnSize(push)
  }

  return createStyledElement('div', props)(css)
}

Column.contextTypes = {
  row: PropTypes.object,
}

Column.propTypes = {
  order: PropTypes.number,
  size: PropTypes.number,
  align: PropTypes.string,
  pull: PropTypes.number,
  push: PropTypes.number,
}

export { Row, Column }
