import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import createStyledElement from 'create-styled-element'
import Flex from './Flex'

class Grid extends Component {
  static propTypes = {
    margin: PropTypes.number,
    columns: PropTypes.number,
    gutterX: PropTypes.number,
    gutterY: PropTypes.number,
  }

  static defaultProps = {
    margin: 0,
    columns: 12,
    gutterX: 16,
    gutterY: 16,
  }

  static childContextTypes = {
    grid: PropTypes.object,
  }

  getChildContext() {
    return {
      grid: {
        columns: this.props.columns,
        gutterX: this.props.gutterX,
        gutterY: this.props.gutterY,
      },
    }
  }

  render() {
    const {
      maxWidth,
      margin,
      columns,
      gutterX,
      gutterY,
      ...gridProps
    } = this.props
    const marginX = margin - gutterX / 2
    const marginY = margin - gutterY / 2
    const css = {
      marginTop: marginY,
      marginRight: marginX,
      marginBottom: marginY,
      marginLeft: marginX,
    }
    gridProps.wrap = true
    return createStyledElement(Flex, gridProps)(css)
  }
}

export default Grid
