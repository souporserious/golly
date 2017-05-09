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
    const { columns, gutterX, gutterY, children } = this.props
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
          const gutterCount = row.length
          const columnProps = {
            columnSize: `calc(${columnSize} - ${gutterX * gutterCount / row.length}px)`,
            // offsetSize,
          }

          // if (columnIndex !== 0) {
          columnProps.marginLeft = gutterX / 2
          // }

          // if (columnIndex !== row.length - 1) {
          columnProps.marginRight = gutterX / 2
          // }

          if (rowIndex !== rows.length - 1) {
            columnProps.marginBottom = gutterY
          }

          return cloneElement(column, columnProps)
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
      css, // don't allow any outside styling
      className,
      style,
      children,
      ...props
    } = this.props
    const gridMargin = gutterX / 2 - margin
    const styles = {
      // width: '100%',
      // maxWidth,
      // paddingTop: margin,
      // paddingRight: -gridMargin,
      // paddingBottom: margin,
      // paddingLeft: -gridMargin,
    }
    return <Flex wrap css={styles} {...props} children={this.getRows()} />
  }
}

export default Grid
