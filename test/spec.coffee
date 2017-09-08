path = require "path"
_ = require "lodash"
sinon = require "sinon"
chai = require "./helpers/sinon_chai"
system = require "./helpers/system"
mimus = require "mimus"
vile = require "vile"
expect = chai.expect
lib = mimus.require "../lib/index", __dirname

describe "vile-tslint", ->
  system.change_into_system_test_dir_on_each()

  describe "punish", ->
    describe "allow", ->
      it "allows only some files", ->
        config = allow: [ "src" ]

        lib.punish(config).should.become [
          {
            "message": "Exceeds maximum line length of 50 [max-line-length]"
            "path": "src/a.ts"
            "signature": "tslint::max-line-length"
            "type": "maintainability"
            "where": {
              "end": {
                "character": 74
                "line": 1
              }
              "start": {
                "character": 0
                "line": 1
              }
            }
          }
          {
            "message": "Missing semicolon [semicolon]"
            "path": "src/a.ts"
            "signature": "tslint::semicolon"
            "type": "maintainability"
            "where": {
              "end": {
                "character": 74
                "line": 1
              }
              "start": {
                "character": 74
                "line": 1
              }
            }
          }
        ]

    describe "ignore", ->
      describe "when everything is ignored", ->
        it "returns an empty array", ->
          config = ignore: [ "*" ]
          lib.punish(config).should.become []

      it "ignores some files", ->
        config = ignore: [ "src" ]

        lib.punish(config).should.become [
          {
            "message": "Missing semicolon [semicolon]"
            "path": "b.ts"
            "signature": "tslint::semicolon"
            "type": "maintainability"
            "where": {
              "end": {
                "character": 9
                "line": 2
              }
              "start": {
                "character": 9
                "line": 2
              }
            }
          }
        ]

    describe "using a custom config file", ->
      it "can be set via config", ->
        config = config: "tslint-custom.json"

        lib.punish(config).should.become [
          {
            "message": "Exceeds maximum line length of 50 [max-line-length]"
            "path": "src/a.ts"
            "signature": "tslint::max-line-length"
            "type": "maintainability"
            "where": {
              "end": {
                "character": 74
                "line": 1
              }
              "start": {
                "character": 0
                "line": 1
              }
            }
          }
        ]
