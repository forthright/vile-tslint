path = require "path"

system_test_dir = path.resolve(
  path.join __dirname, "..", "..", "test", "fixtures")

change_dir_on_each = ->
  cwd = undefined

  beforeEach ->
    cwd = process.cwd()
    process.chdir system_test_dir

  afterEach ->
    process.chdir cwd

module.exports =
  change_into_system_test_dir_on_each: change_dir_on_each
