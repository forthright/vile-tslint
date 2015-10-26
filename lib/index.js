// TODO: handle when no rules present

var
vile = require("@brentlintner/vile"),
_ = require("lodash"),
path = require("path"),
ignore = require("ignore-file"),
TSLint = require("tslint"),
IS_TS = /\.ts$/

function allowed(ignore_config) {
  var ignored

  // TODO: attempt to auto detect .tslintignore if no config
  if (ignore_config) {
    ignored = typeof ignore_config == "string" ?
      ignore.sync(ignore_config) :
      // TODO: make sure works on windows
      ignore.compile(ignore_config.join("\n"))
  } else {
    ignored = function () { return false }
  }

  return function (file) {
    return IS_TS.test(file) && !ignored(file)
  }
}

function tslint_config(config_path) {
  if (!config_path) config_path = "tslint.json"
  try {
    return require(path.join(process.cwd(), config_path))
  } catch(e) {
    console.warn("could not find " + config_path)
  }
}

function lint(filepath, fileData, config) {
  var opts = { formatter: "json", configuration: config }
  return new TSLint(filepath, fileData, opts).lint()
}

function into_issues(config) {
  if (!config) config = {}
  return function (filepath, data) {
    var
      results = lint(filepath, data, config),
      errors = JSON.parse(results.output)

    return errors.length > 0 ?
      errors.map(function (result) {
        return vile.issue(
          vile.ERROR,
          result.name,
          result.failure,
          result.startPosition,
          result.endPosition
        )
      }) :
      [ vile.issue(vile.OK, filepath) ]
  }
}

function punish(user_config) {
  var config = _.get(user_config, "config")
  var ignore_config = _.get(user_config, "ignore")
  var parsed_config = tslint_config(config)

  return vile.promise_each(
    process.cwd(),
    allowed(ignore_config),
    into_issues(parsed_config)
  )
}

module.exports = {
  punish: punish
}
