path = require "path"
_ = require "lodash"
sinon = require "sinon"
chai = require "./helpers/sinon_chai"
mimus = require "mimus"
vile = require "vile"
expect = chai.expect
lib = mimus.require "../lib/index", __dirname

system_test_dir = path.resolve(
  path.join __dirname, "..", "test", "fixtures")

change_into_system_test_dir_on_each = ->
  cwd = undefined

  beforeEach ->
    cwd = process.cwd()
    process.chdir system_test_dir

  afterEach ->
    process.chdir cwd

describe "vile-tslint", ->
  change_into_system_test_dir_on_each()

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

    describe "when no tsconfig file is found", ->
      it "logs a warning to stderr", (done) ->
        mimus.stub console, "warn"

        config = config: "tslint-unknown.json"

        lib.punish(config).should.be.fulfilled.notify ->
          process.nextTick ->
            expect(console.warn).to.have.been
              .calledWith "could not find tslint-unknown.json"
            console.warn.restore()
            done()

        return
