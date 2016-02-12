// TODO: handle when no rules present

var
vile = require("@forthright/vile"),
_ = require("lodash"),
path = require("path"),
TSLint = require("tslint"),
IS_TS = /\.ts$/

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

function allowed(ignore_config) {
  return function (file, is_dir) {
    return (is_dir || IS_TS.test(file)) &&
            !vile.ignored(file, ignore_config)
  }
}

function into_issues(config) {
  if (!config) config = {}
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
