## Golly 👻

[![npm version](https://badge.fury.io/js/golly.svg)](https://badge.fury.io/js/golly)
[![Dependency Status](https://david-dm.org/souporserious/golly.svg)](https://david-dm.org/souporserious/golly)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Powerful flexbox grid system built on top of [glamor](https://github.com/threepointone/glamor). If you want even more super powers, pair this library with [react-matches](https://github.com/souporserious/react-matches) to change yer columns when the screen resizes 🔥

near-future goals:

- generate as little CSS as possible.

- tests

- docs/demo site

## Install

`yarn add golly`

`npm install golly --save`


## Example Usage

```js
import { Flex, Grid, Cell } from 'golly'

const GridComponent = () => (
  <Grid size={12} gutter={{ x: 32, y: 16 }}>
    <Cell size={6} alignItems="center" justify="center">
      <Flex>
        Flex all the way down 🐢
      </Flex>
    </Cell>
    <Cell size={6} alignItems="center" justify="center">
      <Flex>
        Always rely on your flex hammer 🔨
      </Flex>
    </Cell>
  </Grid>
)
```

## `Flex` component

This is the base component of the grid system. It renders a flex `div` by default and provides a convenient API around all of the possible flex styles.

#### `tag`: PropTypes.string

The HTML tag to render.

#### `innerRef`: PropTypes.func

Get access to the internal ref.

#### `inline`: PropTypes.bool

Sets CSS `display` property to `inline-flex`

#### `order`: PropTypes.number

Sets CSS `order` property

#### `grow`: PropTypes.number

Sets CSS `flexGrow` property

#### `shrink`: PropTypes.number

Sets CSS `flexShrink` property

#### `basis`: PropTypes.string

Sets CSS `basis` property as well as `minWidth` to help normalize bugs in IE

#### `direction`: PropTypes.oneOf(['row','row-reverse','column','column-reverse'])

Sets CSS `flexDirection` property

#### `wrap`: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])

Sets CSS `flexWrap` property

#### `justifyContent`: PropTypes.oneOf(['center','end','space-around','space-between','start'])

Sets CSS `justifyContent` property

#### `align`: PropTypes.oneOf(['baseline', 'stretch', 'center', 'end', 'start'])

Sets CSS `alignSelf` property

#### `alignItems`: PropTypes.oneOf(['baseline','stretch','center','end','start'])

Sets CSS `alignItems` property

#### `alignContent`: PropTypes.oneOf(['center','end','space-around','space-between','start','stretch'])

Sets CSS `alignContent` property

## `Grid` component

Dictates the number of columns and the spacing between those columns. Accepts any props that the `Flex` component accepts.

### `size`: PropTypes.number

The size of a track. This can either be a row or column depending on what the grid's `direction` prop is set to.

### `gutter`: gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({x:PropTypes.number, y:PropTypes.number})])

Horizontal and vertical spacing between cells, set each respective axis by passing an object of `{ x, y }`.

## `Cell` component

Use to lay content along the grid. Accepts any props that the `Flex` component accepts.

### `size`: PropTypes.oneOfType([PropTypes.number, PropTypes.string])

The amount of space on the track a cell will occupy. Defaults to `1`.

### `pull`: PropTypes.number

Pull the cell by any number of track sizes.

### `push`: PropTypes.number

Push the cell by any number of track sizes.

### `order`: PropTypes.number

The order of the cell in the grid. Because of the grid implementation and how we set gutters, this will actually move the cell in your tree by ordering the children before rendering.

## Running Locally

clone repo

`git clone git@github.com:souporserious/golly.git`

move into folder

`cd ~/golly`

install dependencies

`yarn`

run dev mode

`yarn dev`

open your browser and visit: `http://localhost:8080/`
