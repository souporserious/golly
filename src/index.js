import React, { Component, Children, cloneElement } from 'react'
import createStyledElement from 'create-styled-element'
import PropTypes from 'prop-types'

const getColumnSize = (size, columns) => (size / columns * 100).toFixed(2) + '%'

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
  static propTypes = {
    margin: PropTypes.number,
    columns: PropTypes.number,
    gutter: PropTypes.number,
    alignItems: PropTypes.string,
    justify: PropTypes.string,
    wrap: PropTypes.string,
  }

  static defaultProps = {
    margin: 0,
    columns: 12,
    gutter: 16,
    alignItems: '',
    justify: '',
    wrap: 'wrap',
  }

  getRows() {
    const { columns, gutter, children } = this.props
    const childrenArray = Children.toArray(children)
    const childrenCount = Children.count(children)
    const rows = []
    let row = []
    let columnCount = 0

    // gather all "rows" in grid
    childrenArray.forEach((column, columnIndex) => {
      // keep track of total columns so we know when we've created a row
      columnCount += column.props.size

      // determine if this was the last column of the row, or just the last column available
      if (columnCount === columns || columnIndex === childrenCount - 1) {
        // add column to row
        row.push(column)

        // add row to rows
        rows.push(row)

        // reset row so we can start building another row
        row = []

        // reset columnCount
        columnCount = 0
      } else if (columnCount > columns) {
        // add row to rows
        rows.push(row)

        // reset row so we can start building another row
        row = []

        // add column to row
        row.push(column)

        // reset columnCount to this new column
        columnCount = column.props.size
      } else {
        // add column to row
        row.push(column)
      }
    })

    // reduce each row back down with the proper styles
    return rows.reduce(
      (flattenedRows, row, rowIndex) => [
        ...flattenedRows,
        ...row.map((column, columnIndex) => {
          const columnSize = getColumnSize(column.props.size, columns)
          const gutterCount = row.length - 1
          const gutterMargin = (gutter * gutterCount / row.length).toFixed(2)
          return cloneElement(column, {
            columns,
            columnSize: `calc(${columnSize} - ${gutterMargin}px)`,
            marginRight: columnIndex !== row.length - 1 && gutter,
            marginBottom: rowIndex !== rows.length - 1 && gutter,
          })
        }),
      ],
      []
    )
  }

  render() {
    const {
      margin,
      columns,
      gutter,
      alignItems,
      justify,
      wrap,
      children,
      ...props
    } = this.props

    const css = {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: wrap,
      width: '100%',
      margin,
    }

    if (alignItems !== '') {
      css.alignItems = alignTypes[alignItems]
    }

    if (justify !== '') {
      css.justifyContent = justifyTypes[justify]
    }

    return createStyledElement('div', props, this.getRows())(css)
  }
}

function Column({
  columns,
  columnSize,
  marginRight,
  marginBottom,
  order,
  size,
  align,
  pull,
  push,
  ...props
}) {
  const css = {
    boxSizing: 'border-box',
    display: 'flex',
    order: order,
    flexDirection: 'column',
    width: '100%',

    // http://stackoverflow.com/questions/21942183/multiline-flexbox-in-ie11-calculating-widths-incorrectly
    // flex: 'auto',
    flex: `0 0 ${columnSize}`,
    maxWidth: columnSize,
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

  if (pull) {
    css.marginLeft = -getColumnSize(pull, columns)
  }

  if (push) {
    css.marginLeft = getColumnSize(push, columns)
  }

  return createStyledElement('div', props)(css)
}

Column.propTypes = {
  order: PropTypes.number,
  size: PropTypes.number,
  align: PropTypes.string,
  pull: PropTypes.number,
  push: PropTypes.number,
}

function Flex({
  direction,
  wrap,
  flow,
  justify,
  alignItems,
  alignContent,
  order,
  grow,
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

export { Row, Column, Flex }
