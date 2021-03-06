const vile = require("vile")
const _ = require("lodash")
const tslint = require("tslint")
const TSLint = tslint.Linter
const Configuration = tslint.Configuration

const IS_TS = /\.ts$/

const is_ts_file = (target, is_dir) =>
  is_dir || IS_TS.test(target)

const tslint_config = (tslint_config_path, filepath) =>
  Configuration.findConfiguration(
    tslint_config_path,
    filepath
  ).results

const lint = (filepath, filedata, tslint_config_path) => {
  let linter = new TSLint({ formatter: "json" })
  let conf = tslint_config(tslint_config_path, filepath)
  linter.lint(filepath, filedata, conf)
  return linter.getResult()
}

const allowed = (ignore, allow) => {
  var filtered = vile.filter(ignore, allow)
  return (target, is_dir) =>
    filtered(target) && is_ts_file(target, is_dir)
}

const line_info = (tslint_result_position) => {
  const line = _.get(tslint_result_position, "line", 0) + 1
  const character = _.get(tslint_result_position, "character")
  return { line: line, character: character }
}

const into_issues = (tslint_config_path) =>
  (filepath, data) => {
    let results = lint(filepath, data, tslint_config_path)
    let errors = _.attempt(
          JSON.parse.bind(null, results.output))

    return _.map(errors, (result) =>
      vile.issue({
        type: vile.MAIN,
        path: result.name,
        message: `${result.failure} [${result.ruleName}]`,
        signature: "tslint::" + result.ruleName,
        where: {
          start: line_info(result.startPosition),
          end: line_info(result.endPosition)
        }
      })
    )
  }

const punish = (user_config) =>
  vile.promise_each(
    process.cwd(),
    allowed(
      _.get(user_config, "ignore"),
      _.get(user_config, "allow")
    ),
    into_issues(_.get(user_config, "config")))

module.exports = {
  punish: punish
}
