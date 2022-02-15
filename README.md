# atomico-use-remark

[![npm](https://img.shields.io/npm/v/atomico-use-remark)](https://www.npmjs.com/package/atomico-use-remark)
[![npm](https://img.shields.io/npm/dw/atomico-use-remark)](https://www.npmjs.com/package/atomico-use-remark)
[![Codecov](https://img.shields.io/codecov/c/github/keplersj/atomico-use-remark)](https://app.codecov.io/gh/keplersj/atomico-use-remark)
[![Bundle Size](https://img.shields.io/bundlephobia/min/atomico-use-remark)](https://bundlephobia.com/package/atomico-use-remark)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://www.conventionalcommits.org/)

[Atomico](https://atomicojs.github.io/) hook for interacting with [Remark](https://remark.js.org/).

## Installation

Install using [npm](https://npmjs.com):

```sh
$ npm install atomico-use-remark
```

Or use in browsers with [Skypack](https://www.skypack.dev/):

```html
<script type="module">
  import { useRemark } from "https://cdn.skypack.dev/atomico-use-remark";
</script>
```

## Usage

Use the `useRemark()` hook to render some Markdown content in your component:

```jsx
import { c } from "atomico";
import { useRemark } from "atomico-use-remark";

function component() {
  const [tree, setContent] = useRemark(`
    # Hello World!
  `);

  return <host>{tree}</host>;
}

customElements.define("hello-world", c(component));
```

## License

Copyright 2022 [Kepler Sticka-Jones](https://keplersj.com). Licensed ISC.
