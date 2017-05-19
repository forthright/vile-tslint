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
            "message": "Exceeds maximum line length of 50"
            "path": "src/a.ts"
            "signature": "tslint::max-line-length"
            "title": "max-line-length"
            "type": "style"
            "where": {
              "end": {
                "character": 74
                "line": 0
                "position": 74
              }
              "start": {
                "character": 0
                "line": 0
                "position": 0
              }
            }
          }
          {
            "message": "Missing semicolon"
            "path": "src/a.ts"
            "signature": "tslint::semicolon"
            "title": "semicolon"
            "type": "style"
            "where": {
              "end": {
                "character": 74
                "line": 0
                "position": 74
              }
              "start": {
                "character": 74
                "line": 0
                "position": 74
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
            "message": "Missing semicolon"
            "path": "b.ts"
            "signature": "tslint::semicolon"
            "title": "semicolon"
            "type": "style"
            "where": {
              "end": {
                "character": 9
                "line": 1
                "position": 10
              }
              "start": {
                "character": 9
                "line": 1
                "position": 10
              }
            }
          }
        ]

    describe "using a custom config file", ->
      it "can be set via config", ->
        config = config: "tslint-custom.json"

        lib.punish(config).should.become [
          {
            "message": "Exceeds maximum line length of 50"
            "path": "src/a.ts"
            "signature": "tslint::max-line-length"
            "title": "max-line-length"
            "type": "style"
            "where": {
              "end": {
                "character": 74
                "line": 0
                "position": 74
              }
              "start": {
                "character": 0
                "line": 0
                "position": 0
              }
            }
          }
        ]
