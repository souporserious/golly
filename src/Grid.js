import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import Flex from './Flex'

class Grid extends Component {
  static propTypes = {
    size: PropTypes.number,
    gutter: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    ]),
  }

  static defaultProps = {
    size: 12,
    gutter: 16,
    direction: 'row',
    wrap: true,
  }

  constructor(props, context) {
    super(props, context)
    const { direction, gutter } = props
    this.isRow = direction.indexOf('row') > -1
    this.gutterX = gutter.x || gutter
    this.gutterY = gutter.y || gutter
  }

  getGridSize(size) {
    const { size: trackSize } = this.props
    const gutter = this.isRow ? this.gutterX : this.gutterY

    if (isNaN(size)) {
      return null
    }

    return `calc(${99.99 * size / trackSize}% - ${gutter - gutter * (size / trackSize)}px)`
  }

  getTracks() {
    const { size: maxTrackSize, children } = this.props
    const childrenArray = Children.toArray(children)
    const childrenCount = Children.count(children)
    const tracks = []
    let track = []
    let totalTrackSize = 0

    // sort children by "order" property
    childrenArray.sort((a, b) => a.props.order - b.props.order)

    // loop children to gather "tracks"
    childrenArray.forEach((cell, cellIndex) => {
      const { size } = cell.props

      // keep track of total trackSize so we know when to create a new track
      // we treat auto sized cells as a unit of 1 so we can still create tracks
      // this is still kind of wonky and needs some thought
      if (!size || size === 'auto') {
        totalTrackSize += 1
      } else {
        totalTrackSize += size
      }

      // determine whether we need to make a new track or just add to one
      if (totalTrackSize < maxTrackSize) {
        track.push(cell)
      } else if (totalTrackSize > maxTrackSize) {
        tracks.push(track)
        track = []
        track.push(cell)
        totalTrackSize = size
      } else if (totalTrackSize === maxTrackSize) {
        track.push(cell)
        tracks.push(track)
        track = []
        totalTrackSize = 0
      }

      // if we've made it to the last cell, push the final track
      if (track.length && cellIndex === childrenCount - 1) {
        tracks.push(track)
      }
    })

    return tracks
  }

  renderCells() {
    const { direction, wrap } = this.props
    const tracks = this.getTracks()
    const colSide = this.isRow ? 'Right' : 'Bottom'
    const rowSide = this.isRow ? 'Bottom' : 'Right'
    let cells = []

    tracks.forEach((track, trackIndex) => {
      const newTrack = track.map((cell, cellIndex) => {
        const { size, pull, push } = cell.props
        const cellProps = {
          cellSize: this.getGridSize(size),
          pullSize: this.getGridSize(pull),
          pushSize: this.getGridSize(push),
        }

        if (cellProps.cellSize !== null) {
          if (this.isRow) {
            cellProps.width = '100%'
            cellProps.maxWidth = cellProps.cellSize
          } else {
            cellProps.height = '100%'
            cellProps.maxHeight = cellProps.cellSize
          }
        }

        if (
          (['row-reverse', 'column-reverse'].indexOf(direction) > -1 &&
            cellIndex !== 0) ||
          (['row', 'column'].indexOf(direction) > -1 &&
            cellIndex !== track.length - 1)
        ) {
          cellProps[`margin${colSide}`] = this.isRow
            ? this.gutterX
            : this.gutterY
        }

        if (
          (wrap === 'reverse' && trackIndex !== 0) ||
          (wrap === true && trackIndex !== tracks.length - 1)
        ) {
          cellProps[`margin${rowSide}`] = this.isRow
            ? this.gutterY
            : this.gutterX
        }

        return cloneElement(cell, { cellProps })
      })
      cells = [...cells, ...newTrack]
    })

    return cells
  }

  render() {
    const { size, gutter, children, ...props } = this.props
    return <Flex {...props} children={this.renderCells()} />
  }
}

export default Grid
