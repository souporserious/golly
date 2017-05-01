## Golly 👻

[![npm version](https://badge.fury.io/js/golly.svg)](https://badge.fury.io/js/golly)
[![Dependency Status](https://david-dm.org/souporserious/golly.svg)](https://david-dm.org/souporserious/golly)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Powerful flexbox grid system built on top of [glamor](https://github.com/threepointone/glamor).

## Install

`yarn add golly`

`npm install golly --save`


## Example Usage

```js
import { Row, Column } from 'golly'

const GridComponent = () => (
  <Row alignItems="center">
    <Column size={6}>
      ...
    </Column>
    <Column size={6}>
      ...
    </Column>
  </Row>
)
```

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
