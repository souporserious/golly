import React, { Component, createElement } from 'react'
import ReactDOM, { render } from 'react-dom'
import { css } from 'glamor'
import { Flex, Grid, Cell } from '../src/index'
import { Media, Container } from 'react-matches'
import createStyledElement from 'create-styled-element'

css.global('body', {
  padding: 0,
  margin: 32,
  fontFamily: 'Helvetica',
  fontSize: 16,
  backgroundColor: '#f2f5ff',
})

css.global('small', {
  fontSize: 14,
})

const Heading = props => createStyledElement('h1', props)()
const Subhead = props => createStyledElement('h2', props)()
const gridStyles = { backgroundColor: '#bbf58e' }
const cellStyles = {
  padding: 12,
  color: 'rgba(255, 255, 255, 0.9)',
  backgroundColor: '#89d350',
}

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Heading>Golly</Heading>
          <Flex innerRef={c => console.log({ flexRef: c })} tag="p">
            a reasonable way to layout elements in React.
          </Flex>
        </div>

        <Subhead>One Row</Subhead>
        <Grid innerRef={c => console.log({ gridRef: c })} css={gridStyles}>
          <Cell size={10} css={cellStyles}>
            10
          </Cell>
          <Cell size={2} css={cellStyles}>
            2
          </Cell>
        </Grid>

        <Subhead>Three Columns</Subhead>
        <Grid
          direction="column"
          gutter={8}
          css={{ ...gridStyles, height: 200 }}
        >
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

          <Cell size={4} css={cellStyles}>
            4
          </Cell>
          <Cell size={4} css={cellStyles}>
            4
          </Cell>
          <Cell size={4} css={cellStyles}>
            4
          </Cell>
        </Grid>

        <Subhead>Grid</Subhead>
        <Grid size={3} gutter={2} css={gridStyles}>
          <Cell size={1} css={cellStyles}>
            3
          </Cell>
          <Cell size={1} css={cellStyles}>
            3
          </Cell>
          <Cell size={1} css={cellStyles}>
            3
          </Cell>
          <Cell size={1} css={cellStyles}>
            3
          </Cell>
          <Cell size={1} css={cellStyles}>
            3
          </Cell>
          <Cell size={1} css={cellStyles}>
            3
          </Cell>
        </Grid>

        <Subhead>Reverse</Subhead>
        <Grid
          wrap="reverse"
          direction="row-reverse"
          gutter={{ x: 8, y: 16 }}
          css={gridStyles}
        >
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

          <Cell size={3} css={cellStyles}>
            3
          </Cell>
          <Cell size={6} css={cellStyles}>
            6
          </Cell>
          <Cell size={3} css={cellStyles}>
            3
          </Cell>
        </Grid>

        <Subhead>
          Auto <small>note this can only work as a row right now</small>
        </Subhead>
        <Grid css={gridStyles}>
          <Cell size={6} css={cellStyles}>
            6
          </Cell>
          <Cell size="auto" css={cellStyles}>
            Auto
          </Cell>
          <Cell size={3} css={cellStyles}>
            3
          </Cell>
          <Cell size="auto" css={cellStyles}>
            Auto
          </Cell>
        </Grid>

        <Subhead>
          Order
          {' '}
          <small>
            because of the grid implementation we actually reorder elements on the React side
          </small>
        </Subhead>
        <Grid gutter={16} css={{ ...gridStyles, padding: 16 }}>
          <Cell size={6} css={cellStyles}>
            6
          </Cell>
          <Cell size={3} css={cellStyles}>
            3
          </Cell>
          <Cell size={3} css={cellStyles}>
            3
          </Cell>
          <Cell order={2} size={6} css={cellStyles}>
            6
          </Cell>
          <Cell order={1} size={3} css={cellStyles}>
            3
          </Cell>
          <Cell size={3} css={cellStyles}>
            3
          </Cell>
        </Grid>
      </div>
    )
  }
}
render(<App />, document.getElementById('app'))
