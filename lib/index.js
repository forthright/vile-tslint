// TODO: handle when no rules present

var
vile = require("@forthright/vile"),
_ = require("lodash"),
path = require("path"),
TSLint = require("tslint")

var IS_TS = /\.ts$/

function tslint_config(config_path) {
  if (!config_path) config_path = "tslint.json"
  try {
    return require(path.join(process.cwd(), config_path))
  } catch(e) {
    console.warn("could not find " + config_path)
  }
}

function is_ts_file(target, is_dir) {
  return is_dir || IS_TS.test(target)
}

function lint(filepath, fileData, config) {
  var opts = { formatter: "json", configuration: config }
  return new TSLint(filepath, fileData, opts).lint()
}

function allowed(ignore, allow) {
  var filtered = vile.filter(ignore, allow)
  return function (target, is_dir) {
    return filtered(target) && is_ts_file(target, is_dir)
  }
}

function into_issues(config) {
  return function (filepath, data) {
    var
      results = lint(filepath, data, config),
      errors = JSON.parse(results.output)

    return errors.map(function (result) {
      return vile.issue({
        type: vile.STYL,
        path: result.name,
        title: result.ruleName,
        message: result.failure,
        signature: "tslint::" + result.ruleName,
        where: {
          start: result.startPosition,
          end: result.endPosition
        }
      })
    })
  }
}

function punish(user_config) {
  var config = _.get(user_config, "config")
  var ignore = _.get(user_config, "ignore")
  var allow = _.get(user_config, "allow")
  var parsed_config = tslint_config(config)

  return vile.promise_each(
    process.cwd(),
    allowed(ignore, allow),
    into_issues(parsed_config))
}

module.exports = {
  punish: punish
}
