import request from 'superagent';
import _ from 'lodash/core';
import React from 'react';
import superPrefix from 'superagent-prefix';

import ERROR_MSG from 'ErrorMsg.json';

export default (prefixStr) => {
  if (prefixStr === undefined) {
    prefixStr = '/wx';
  }
  var prefix = superPrefix(prefixStr);

  var methods = ['get', 'post', 'del', 'put'];
  var result = {};

  for (var i = 0; i < methods.length; i++) {
    var name = methods[i];
    result[name] = wrapMethod(name, prefix);
  }
  return result;
};

function wrapMethod(methodName, prefix) {
  return (url) => {
    var callback = null;
    var fakePro = {};
    var methodNames = ['type', 'set', 'query', 'send', 'on', 'abort'];
    _.each(methodNames, (mName) => {
      fakePro[mName] = function () {
        req[mName].apply(req, arguments);
        return fakePro;
      };
    });

    fakePro.end = function (fn) {
      callback = fn;
      return fakePro;
    };

    var req = request[methodName](url)
      .use(prefix);

    setTimeout(() => {
      req.end((err, response) => {
        if (!err) {
          var data = JSON.parse(response.text);
          if (err !== null) {
            var msg = err ? ERROR_MSG[response.statusCode] : data.state.msg;
            callback(msg, data);
          } else {
            callback(null, data);
          }
        } else {
          callback(err);
        }
      });
    }, 0);

    return fakePro;
  };
};
