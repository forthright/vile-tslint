# vile-tslint [![Circle CI](https://circleci.com/gh/forthright/vile-tslint.svg?style=svg&circle-token=b2617bd7552a6158b6a8267fb454f8dfea0b9e50)](https://circleci.com/gh/forthright/vile-tslint)

[![score-badge](https://vile.io/brentlintner/vile-tslint/badges/score?token=uFywUmzZfbg6UboLzn6R](https://vile.io/brentlintner/vile-tslint) [![security-badge](https://vile.io/brentlintner/vile-tslint/badges/security?token=uFywUmzZfbg6UboLzn6R](https://vile.io/brentlintner/vile-tslint) [![coverage-badge](https://vile.io/brentlintner/vile-tslint/badges/coverage?token=uFywUmzZfbg6UboLzn6R](https://vile.io/brentlintner/vile-tslint) [![dependency-badge](https://vile.io/brentlintner/vile-tslint/badges/dependency?token=uFywUmzZfbg6UboLzn6R](https://vile.io/brentlintner/vile-tslint)

A [vile](https://vile.io) plugin for running [tslint](https://palantir.github.io/tslint).

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)

## Installation

    npm i vile-tslint
    vile -p

## Config

Currently, config is read from a `tslint` config file.

By default, `/tslint.json` in the `cwd` is used if nothing is specified.

You can specify a custom path like so:

```yml
tslint:
  config: some_custom_file.json
```

## Ignoring Files

You can specify `tslint` specific ignores:

```yml
tslint:
  config: tslint.json
  ignore: [ "dir/**/*", "file.ts" ]
```

## Hacking

    cd vile-tslint
    npm install
    npm test
