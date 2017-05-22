## CHANGELOG

### 0.3.1

Upgraded `create-styled-element` to `0.4.0`

### 0.3.0

Back to just one `gutter` prop that now accepts an object to set `x` and `y` if needed

`Cell` now defaults to a size of `1` rather than `auto` since this seems to be more common

Remove some of the defaults from `Flex` since they interfere with things like `alignItems`

`Flex` prop changed `justify` -> `justifyContent`

Better fallback for browsers that do not support flexbox

### 0.2.1

Added dist build

### 0.2.0

Rewrite, API finally smoothed out

`Row` -> `Grid`

`Column` -> `Cell`

### 0.1.0

Initial Release
