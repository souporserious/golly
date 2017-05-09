import React, { Component, createElement } from 'react'
import ReactDOM, { render } from 'react-dom'
import { css } from 'glamor'
import { Flex, Grid, Cell } from '../src/index'
import { Media, Container } from 'react-matches'
import createStyledElement from 'create-styled-element'

const { Div } = createStyledElement

const MediaGrid = ({ children, ...props }) => (
  <Media
    queries={{
      sm: { minWidth: 0 },
      md: { minWidth: 480 },
      lg: { minWidth: 720 },
    }}
  >
    {activeQueries => <Grid {...props} children={children(activeQueries)} />}
  </Media>
)

const cellStyles = {
  justifyContent: 'center',
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
}

const cellChildStyles = {
  width: '100%',
  color: 'rgba(255, 255, 255, 0.95)',
  backgroundColor: '#8cee40',
}

const StyledCell = ({ size, cellProps, ...props }) => (
  <Cell size={size} cellProps={cellProps} justify="center" css={cellStyles}>
    <Div css={cellChildStyles} {...props} />
  </Cell>
)

const makeArr = size =>
  [...new Array(12 / size)].map((_, i) => (
    <StyledCell key={size + i} size={size} children={`${i + 1}`} />
  ))

const precise = [
  11,
  1,
  10,
  2,
  9,
  3,
  8,
  4,
  7,
  5,
  6,
  6,
  5,
  7,
  4,
  8,
  3,
  9,
  2,
  10,
  1,
  11,
]

css.global('body', {
  padding: 0,
  margin: 0,
  fontFamily: 'Helvetica',
  fontSize: 16,
  backgroundColor: '#f2f5ff',
  overflowX: 'hidden',
})

const InputLabel = props => (
  <Flex
    tag="label"
    direction="column"
    alignItems="center"
    justify="center"
    {...props}
  />
)

const StyledH1 = props =>
  createStyledElement('h1', props)({
    marginBottom: 16,
    color: '#304897',
  })

const StyledInput = props =>
  createStyledElement('input', props)({
    width: 32,
    height: 32,
    padding: 0,
    textAlign: 'center',
  })

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
        <Grid>
          <Cell size={4} alignItems="center" justify="center">
            <InputLabel>
              <StyledH1>Margin</StyledH1>
              <StyledInput
                type="number"
                value={margin}
                onChange={e => this.setState({ margin: +e.target.value })}
              />
            </InputLabel>
          </Cell>

          <Cell size={4} alignItems="center" justify="center">
            <InputLabel>
              <StyledH1>GutterX</StyledH1>
              <StyledInput
                type="number"
                value={gutterX}
                onChange={e => this.setState({ gutterX: +e.target.value })}
              />
            </InputLabel>
          </Cell>

          <Cell size={4} alignItems="center" justify="center">
            <InputLabel>
              <StyledH1>GutterY</StyledH1>
              <StyledInput
                type="number"
                value={gutterY}
                onChange={e => this.setState({ gutterY: +e.target.value })}
              />
            </InputLabel>
          </Cell>
        </Grid>

        <Grid
          {...this.state}
          // direction="row-reverse"
          // wrap={false}
          // wrap="reverse"
        >
          {makeArr(1)}
          {makeArr(2)}
          {makeArr(4)}
          {makeArr(6)}
          {makeArr(12)}

          {precise.map((size, index) => (
            <StyledCell key={Math.random()} size={size}>{size}</StyledCell>
          ))}

          <StyledCell size={6}>6</StyledCell>

          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>

          <StyledCell size={4}>6</StyledCell>

          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
        </Grid>

        <Grid>
          <StyledCell size={4}>6</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
          <StyledCell>Auto</StyledCell>
        </Grid>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
