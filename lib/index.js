"use strict";

var vile = require("vile");
var _ = require("lodash");
var tslint = require("tslint");
var TSLint = tslint.Linter;
var Configuration = tslint.Configuration;

var IS_TS = /\.ts$/;

var is_ts_file = function is_ts_file(target, is_dir) {
  return is_dir || IS_TS.test(target);
};

var tslint_config = function tslint_config(tslint_config_path, filepath) {
  return Configuration.findConfiguration(tslint_config_path, filepath).results;
};

var lint = function lint(filepath, filedata, tslint_config_path) {
  var linter = new TSLint({ formatter: "json" });
  var conf = tslint_config(tslint_config_path, filepath);
  linter.lint(filepath, filedata, conf);
  return linter.getResult();
};

var allowed = function allowed(ignore, allow) {
  var filtered = vile.filter(ignore, allow);
  return function (target, is_dir) {
    return filtered(target) && is_ts_file(target, is_dir);
  };
};

var into_issues = function into_issues(tslint_config_path) {
  return function (filepath, data) {
    var results = lint(filepath, data, tslint_config_path);
    var errors = _.attempt(JSON.parse.bind(null, results.output));

    return _.map(errors, function (result) {
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
      });
    });
  };
};

var punish = function punish(user_config) {
  return vile.promise_each(process.cwd(), allowed(_.get(user_config, "ignore"), _.get(user_config, "allow")), into_issues(_.get(user_config, "config")));
};

module.exports = {
  punish: punish
};