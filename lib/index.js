"use strict";

// TODO: handle when no rules present

var vile = require("@forthright/vile");
var _ = require("lodash");
var path = require("path");
var TSLint = require("tslint").Linter;

var IS_TS = /\.ts$/;

var tslint_config = function tslint_config(config_path) {
  if (!config_path) config_path = "tslint.json";
  try {
    return require(path.join(process.cwd(), config_path));
  } catch (e) {
    console.warn("could not find " + config_path);
  }
};

var is_ts_file = function is_ts_file(target, is_dir) {
  return is_dir || IS_TS.test(target);
};

var lint = function lint(filepath, fileData, config) {
  var linter = new TSLint({ formatter: "json" });
  linter.lint(filepath, fileData, config);
  return linter.getResult();
};

var allowed = function allowed(ignore, allow) {
  var filtered = vile.filter(ignore, allow);
  return function (target, is_dir) {
    return filtered(target) && is_ts_file(target, is_dir);
  };
};

var into_issues = function into_issues(config) {
  return function (filepath, data) {
    var results = lint(filepath, data, config);
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
  var config = _.get(user_config, "config");
  var ignore = _.get(user_config, "ignore");
  var allow = _.get(user_config, "allow");
  var parsed_config = tslint_config(config);

  return vile.promise_each(process.cwd(), allowed(ignore, allow), into_issues(parsed_config));
};

module.exports = {
  punish: punish
};