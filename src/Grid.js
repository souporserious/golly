import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import Flex from './Flex'

class Grid extends Component {
  static propTypes = {
    columns: PropTypes.number,
    gutterX: PropTypes.number,
    gutterY: PropTypes.number,
  }

  static defaultProps = {
    columns: 12,
    gutterX: 16,
    gutterY: 16,
  }

  getRows() {
    const { columns, gutterX, gutterY, direction, wrap, children } = this.props
    const getColumnSize = size => 100 * size / columns + '%'
    const childrenArray = Children.toArray(children)
    const childrenCount = Children.count(children)
    const rows = []
    let row = []
    let totalCurrentColumns = 0

    // sort children by "order" property
    childrenArray.sort((a, b) => a.props.order - b.props.order)

    // gather all "rows" in the Grid component
    childrenArray.forEach((column, columnIndex) => {
      const { size } = column.props

      // keep track of total columns so we know when to create a row
      // we treat auto sized cells as a unit of 1 so we can still create rows
      // this is still kind of wonky and needs some thought
      if (!size || size === 'auto') {
        totalCurrentColumns += 1
      } else {
        totalCurrentColumns += size
      }

      // determine whether we need to make a new row or just add to one
      if (totalCurrentColumns < columns) {
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
      if (row.length && columnIndex === childrenCount - 1) {
        rows.push(row)
      }
    })

    // reduce each row back down with the proper styles
    return rows.reduce(
      (flattenedRows, row, rowIndex) => [
        ...flattenedRows,
        ...row.map((column, columnIndex) => {
          const { size, offset } = column.props
          const gutterOffset = gutterX - gutterX * (size / columns)
          const cellProps = {
            columnSize: `calc(${getColumnSize(size)} - ${gutterOffset}px)`,
            offsetSize: `calc(${getColumnSize(offset)} - ${gutterOffset}px)`,
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
    const { columns, gutterX, gutterY, children, ...props } = this.props
    return <Flex wrap {...props} children={this.getRows()} />
  }
}

export default Grid
