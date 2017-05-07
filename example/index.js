import React, { Component, createElement } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Row, Column } from '../src/index'
import styledElements from 'create-styled-element/lib/styled-elements'

const { Div } = styledElements

class App extends Component {
  render() {
    return (
      <Row columns={12} gutter={8} css={{ backgroundColor: 'pink' }}>
        <Column size={6} order={2} css={{ backgroundColor: 'red' }}>
          Col 6
        </Column>
        <Column size={6} css={{ backgroundColor: 'orange' }}>
          Col 6
        </Column>

        <Column size={4} css={{ backgroundColor: 'red' }}>
          Col 4
        </Column>
        <Column size={4} order={1} css={{ backgroundColor: 'orange' }}>
          Col 4
        </Column>
        <Column size={4} css={{ backgroundColor: 'green' }}>
          Col 4
        </Column>

        <Column size={3} css={{ backgroundColor: 'red' }}>
          Col 3
        </Column>
        <Column size={3} css={{ backgroundColor: 'orange' }}>
          Col 3
        </Column>
        <Column size={4} css={{ backgroundColor: 'green' }}>
          Col 4
        </Column>
        <Column size={3} css={{ backgroundColor: 'lime' }}>
          Col 3
        </Column>
      </Row>
    )
    return (
      <div>
        <Row columns={12} alignItems="center">
          <Column size={3}>
            <Div css={{ height: 50, backgroundColor: 'red' }}>
              Col 1
            </Div>
          </Column>
          <Column size={3}>
            <Div css={{ height: 100, backgroundColor: 'orange' }}>
              Col 2
            </Div>
          </Column>
          <Column size={6}>
            <Div css={{ height: 75, backgroundColor: 'purple' }}>
              Col 3
            </Div>
          </Column>
          <Column size={6}>
            <Div css={{ height: 25, backgroundColor: 'lime' }}>
              Col 4
            </Div>
          </Column>
        </Row>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
