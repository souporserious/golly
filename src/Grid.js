import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import createStyledElement from 'create-styled-element'
import Flex from './Flex'

class Grid extends Component {
  static propTypes = {
    mask: PropTypes.bool,
    margin: PropTypes.number,
    columns: PropTypes.number,
    gutterX: PropTypes.number,
    gutterY: PropTypes.number,
  }

  static defaultProps = {
    mask: true,
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
      mask,
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
      width: `calc(100% + ${-marginX * 2}px)`,
      marginTop: marginY,
      marginRight: marginX,
      marginBottom: marginY,
      marginLeft: marginX,
    }
    gridProps.wrap = true
    const FlexGrid = createStyledElement(Flex, gridProps)(css)

    if (mask) {
      return (
        <Flex css={{ overflow: 'hidden', width: '100%' }}>
          {FlexGrid}
        </Flex>
      )
    }

    return FlexGrid
  }
}

export default Grid
