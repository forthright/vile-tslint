# vile-tslint

A [vile](http://vile.io) plugin for running [tslint](http://palantir.github.io/tslint).

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
