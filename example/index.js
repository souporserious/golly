import React, { Component, createElement } from 'react'
import ReactDOM, { render } from 'react-dom'
import { css } from 'glamor'
import { Grid, Cell } from '../src/index'
import styledElements from 'create-styled-element/lib/styled-elements'

const { Div } = styledElements

css.global('body', {
  padding: 0,
  margin: 0,
})

class App extends Component {
  render() {
    return (
      <Grid columns={12} margin={8} gutter={8}>
        <Cell size={6} css={{ backgroundColor: 'red' }}>
          Col 6
        </Cell>
        <Cell size={7} css={{ backgroundColor: 'orange' }}>
          Col 7
        </Cell>

        <Cell size={4} css={{ backgroundColor: 'red' }}>
          Col 4
        </Cell>
        <Cell size={4} css={{ backgroundColor: 'orange' }}>
          Col 4
        </Cell>
        <Cell size={4} css={{ backgroundColor: 'green' }}>
          Col 4
        </Cell>

        <Cell
          size={3}
          css={{
            backgroundColor: 'red',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Col 3
        </Cell>

        <Cell size={12} css={{ backgroundColor: 'brown' }}>
          Col 12
        </Cell>

        <Cell size={12} css={{ backgroundColor: 'orange' }}>
          Col 12
        </Cell>
        <Cell size={9} css={{ backgroundColor: 'green' }}>
          Col 9
        </Cell>

        <Cell size={12} css={{ backgroundColor: 'blue' }}>
          Col 12
        </Cell>

        <Cell size={3} css={{ backgroundColor: 'brown' }}>
          Col 3
        </Cell>
        <Cell size={6} css={{ backgroundColor: 'brown' }}>
          Col 6
        </Cell>
        <Cell size={2} css={{ backgroundColor: 'aqua' }}>
          Col 2
        </Cell>

        <Cell size={4} css={{ backgroundColor: 'lime' }}>
          Col 4
        </Cell>
        <Cell size={4} css={{ backgroundColor: 'lime' }}>
          Col 4
        </Cell>
      </Grid>
    )
  }
}

render(<App />, document.getElementById('app'))
