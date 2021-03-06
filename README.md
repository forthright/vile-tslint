# vile-tslint [![Circle CI](https://circleci.com/gh/forthright/vile-tslint.svg?style=shield&circle-token=b2617bd7552a6158b6a8267fb454f8dfea0b9e50)](https://circleci.com/gh/forthright/vile-tslint) [![score-badge](https://vile.io/api/v0/projects/vile-tslint/badges/score?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-tslint) [![coverage-badge](https://vile.io/api/v0/projects/vile-tslint/badges/coverage?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-tslint) [![dependency-badge](https://vile.io/api/v0/projects/vile-tslint/badges/dependency?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-tslint) [![npm version](https://badge.fury.io/js/vile-tslint.svg)](https://badge.fury.io/js/vile-tslint)

A [Vile](https://vile.io) plugin for identifying errors and common style/maintainability
issues in your TypeScript code (via [TSLint](https://palantir.github.io/tslint)).

## Requirements

- [Node.js](http://nodejs.org)

## Installation

    npm i -D vile vile-tslint

## Usage

*configure TSLint*

    npx tslint --init

*run the plugin*

    npx vile a -p tslint

## Config

Currently, config is read from any `tslint` config file picked up via
`tslint.Configuration.findConfiguration`.

You can specify a custom config file path in your `.vile.yml`:

```yaml
tslint:
  config: some_custom_file_path.json
```

## Ignoring Files

You can specify `tslint` specific ignores:

```yaml
tslint:
  ignore:
    - dir
    - file.ts
```

## Allowing Files

You can set `vile.allow` or `tslint.allow`:

Example:

```yaml
tslint:
  allow:
    - src
```
## Versioning

This project uses [Semver](http://semver.org).

## Licensing

This project is licensed under the [MPL-2.0](LICENSE) license.

Any contributions made to this project are made under the current license.

## Contributions

Current list of [Contributors](https://github.com/forthright/vile-tslint/graphs/contributors).

Any contributions are welcome and appreciated!

All you need to do is submit a [Pull Request](https://github.com/forthright/vile-tslint/pulls).

1. Please consider tests and code quality before submitting.
2. Please try to keep commits clean, atomic and well explained (for others).

### Issues

Current issue tracker is on [GitHub](https://github.com/forthright/vile-tslint/issues).

Even if you are uncomfortable with code, an issue or question is welcome.

### Code Of Conduct

By participating in this project you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

### Maintainers

- Brent Lintner - [@brentlintner](http://github.com/brentlintner)

## Architecture

This project is currently written in JavaScript.

- `bin` any shell based scripts
- `src` source code
- `lib` transpiled lib

## Developing

    cd vile-tslint
    npm install
    npm run
