// TODO: handle when no rules present

const vile = require("vile")
const _ = require("lodash")
const path = require("path")
const TSLint = require("tslint").Linter

const IS_TS = /\.ts$/

const tslint_config = (config_path) => {
  if (!config_path) config_path = "tslint.json"
  try {
    return require(path.join(process.cwd(), config_path))
  } catch(e) {
    console.warn("could not find " + config_path)
  }
}

const is_ts_file = (target, is_dir) =>
  is_dir || IS_TS.test(target)

const lint = (filepath, fileData, config) => {
  let linter = new TSLint({ formatter: "json" })
  linter.lint(filepath, fileData, config)
  return linter.getResult()
}

const allowed = (ignore, allow) => {
  var filtered = vile.filter(ignore, allow)
  return (target, is_dir) =>
    filtered(target) && is_ts_file(target, is_dir)
}

const into_issues = (config) =>
  (filepath, data) => {
    let results = lint(filepath, data, config)
    let errors = _.attempt(
          JSON.parse.bind(null, results.output))

    return _.map(errors, (result) =>
      vile.issue({
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
    )
  }

const punish = (user_config) => {
  let config = _.get(user_config, "config")
  let ignore = _.get(user_config, "ignore")
  let allow = _.get(user_config, "allow")
  let parsed_config = tslint_config(config)

  return vile.promise_each(
    process.cwd(),
    allowed(ignore, allow),
    into_issues(parsed_config))
}

module.exports = {
  punish: punish
}
