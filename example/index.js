import React, { Component, createElement } from 'react'
import ReactDOM, { render } from 'react-dom'
import { css } from 'glamor'
import { Flex, Grid, Cell } from '../src/index'
import { Media, Container } from 'react-matches'

const gridStyles = { backgroundColor: '#3bafda' }
const cellStyles = { padding: 12, backgroundColor: '#1c7393' }

class App extends Component {
  state = {
    columns: 12,
    margin: 16,
    gutterX: 16,
    gutterY: 16,
  }
  render() {
    const { margin, gutterX, gutterY } = this.state
    return (
      <div>
        <Grid css={gridStyles}>
          <Cell size={6} css={cellStyles}>
            6
          </Cell>
          <Cell size={6} css={cellStyles}>
            6
          </Cell>
          <Cell size={3} css={cellStyles}>
            3
          </Cell>
          <Cell size={9} css={cellStyles}>
            9
          </Cell>
        </Grid>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
