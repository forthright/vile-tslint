# vile-tslint

A [vile](http://vile.io) plugin for running [tslint](http://palantir.github.io/tslint).

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)

## Installation

    npm i vile-tslint
    vile -p

## Ignoring Files

If you have a `.tslintignore` file in your root, and you have
this in your `.vile.yml`:

```yml
tslint:
  config: tslint.json
  ignore: .tslintignore
```

### .tslintignore

This is a file specific to `vile-tslint` itself.

It is more or less like a `.gitignore` file, and uses
[ignore-file](https://github.com/mafintosh/ignore-file) for matching.

## Hacking

    cd vile-tslint
    npm install
    npm test
