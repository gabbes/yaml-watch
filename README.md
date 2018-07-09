# Yaml Watch

> Watch .yml files and compile to .json on save via cli.

## Install

```sh
npm i -g yaml-watch
```

## Usage

`yaml-watch <dir> [options]`

```bash
yaml-watch ./src -o ./dist -m
```

The above example watches .yml files under /src and runs compilation on change and outputs them to /dist as minified .json.

## Options

- `-h, --help` Show help.
- `-o, --output \<dir\>` Set output directory or file.
- `-m, --minify` Minify compiled output.
- `-s, --shallow` Output without folder structure.
- `-v, --version` Show version number.

## Module

You can use yaml-watch either as a CLI tool (recommended), but also as a Node module if you would like to intergrate it into your own work flow.

```sh
npm i yaml-watch
```

```js
const yamlWatch = require('yaml-watch');

const options = {
  minify: true,
  shallow: true
};

yamlWatch(input, output, options);
```

## Changelog

All notable changes to this project will be documented in this file.

### 0.1.0 - 2018-07-09

- Initial release.

## License

[MIT](./LICENSE)
