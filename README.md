# vile-tslint [![Circle CI](https://circleci.com/gh/forthright/vile-tslint.svg?style=svg&circle-token=b2617bd7552a6158b6a8267fb454f8dfea0b9e50)](https://circleci.com/gh/forthright/vile-tslint)

[![score-badge](https://vile.io/api/v0/projects/vile-tslint/badges/score?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-tslint) [![security-badge](https://vile.io/api/v0/projects/vile-tslint/badges/security?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~/brentlintner/vile-tslint) [![coverage-badge](https://vile.io/api/v0/projects/vile-tslint/badges/coverage?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~/brentlintner/vile-tslint) [![dependency-badge](https://vile.io/api/v0/projects/vile-tslint/badges/dependency?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~/brentlintner/vile-tslint)

A [vile](https://vile.io) plugin for running [tslint](https://palantir.github.io/tslint).

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)

## Installation

    npm i -D vile vile-tslint

## Config

Currently, config is read from a `tslint` config file.

By default, `tslint.json` in the `cwd` is used if nothing is specified.

You can specify a custom path like so:

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
## Architecture

This project is currently written in JavaScript.

- `bin` any shell based scripts
- `src` source code
- `lib` transpiled lib

## Hacking

    cd vile-tslint
    npm install
