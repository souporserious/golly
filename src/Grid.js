import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import createStyledElement from 'create-styled-element'
import alignTypes from './align-types'
import justifyTypes from './justify-types'

class Grid extends Component {
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
    const getColumnSize = size => (size / columns * 100).toFixed(2) + '%'
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
      if (totalCurrentColumns < columns) {
        row.push(column)
      } else if (totalCurrentColumns > columns) {
        rows.push(row)
        row = []
        row.push(column)
        totalCurrentColumns = size
      } else if (totalCurrentColumns === columns) {
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
          const columnSize = size ? getColumnSize(size) : 'auto'
          const offsetSize = getColumnSize(offset, columns)
          const gutterCount = row.length - 1
          const gutterMargin = (gutter * gutterCount / row.length).toFixed(2)
          return cloneElement(column, {
            columnSize: `calc(${columnSize} - ${gutterMargin}px)`,
            offsetSize: `calc(${offsetSize} - ${gutterMargin}px + ${gutter}px)`,
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
      width: `calc(100% - ${margin})`,
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

export default Grid
