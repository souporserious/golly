import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import createStyledElement from 'create-styled-element'
import Flex from './Flex'

class Grid extends Component {
  static propTypes = {
    tag: PropTypes.string,
    margin: PropTypes.number,
    columns: PropTypes.number,
    gutterX: PropTypes.number,
    gutterY: PropTypes.number,
  }

  static defaultProps = {
    tag: 'div',
    margin: 0,
    columns: 12,
    gutterX: 16,
    gutterY: 16,
  }

  getRows() {
    const { columns, gutterX, gutterY, direction, wrap, children } = this.props
    const getColumnSize = size => size / columns * 100 + '%'
    const childrenArray = Children.toArray(children)
    const childrenCount = Children.count(children)
    const rows = []
    let row = []
    let totalCurrentColumns = 0

    // gather all "rows" in the Grid component
    childrenArray.forEach((column, columnIndex) => {
      const { size } = column.props

      // keep track of total columns so we know when to create a row
      totalCurrentColumns += size

      // determine whether we need to make a new row or just add to one
      if (!size) {
        row.push(column)
        totalCurrentColumns = 0
      } else if (totalCurrentColumns < columns) {
        row.push(column)
      } else if (totalCurrentColumns > columns) {
        rows.push(row)
        row = []
        row.push(column)
        totalCurrentColumns = size
      } else if (totalCurrentColumns === columns) {
        row.push(column)
        rows.push(row)
        row = []
        totalCurrentColumns = 0
      }

      // if we've made it to the last column, push the final row
      if (columnIndex === childrenCount - 1) {
        rows.push(row)
      }
    })

    // reduce each row back down with the proper styles
    return rows.reduce(
      (flattenedRows, row, rowIndex) => [
        ...flattenedRows,
        ...row.map((column, columnIndex) => {
          const { size, offset } = column.props
          const columnSize = getColumnSize(size)
          const offsetSize = getColumnSize(offset)
          const gutterCount = row.length - 1
          const cellProps = {
            columnSize: `calc(${columnSize} - ${gutterX * gutterCount / row.length}px)`,
            // columnSize,
            offsetSize,
          }

          if (direction === 'row-reverse') {
            if (columnIndex !== 0) {
              cellProps.marginRight = gutterX
            }
          } else {
            if (columnIndex !== row.length - 1) {
              cellProps.marginRight = gutterX
            }
          }

          if (wrap === 'reverse') {
            if (rowIndex !== 0) {
              cellProps.marginBottom = gutterY
            }
          } else {
            if (rowIndex !== rows.length - 1) {
              cellProps.marginBottom = gutterY
            }
          }

          return cloneElement(column, { cellProps })
        }),
      ],
      []
    )
  }

  render() {
    const {
      tag,
      maxWidth,
      margin,
      columns,
      gutterX,
      gutterY,
      children,
      ...props
    } = this.props
    const flexProps = { wrap: true, ...props }
    const css = {
      width: `calc(100% - ${isNaN(margin) ? `${margin}px` : margin})`,
      margin,
    }
    return createStyledElement(Flex, flexProps, this.getRows())(css)
  }
}

export default Grid
