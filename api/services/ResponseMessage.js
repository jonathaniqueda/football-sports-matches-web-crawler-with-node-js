/**
 * Methods to return the response pattern.
 * @type {Object}
 */
module.exports = {

  pattern: function(status, msg, response) {
    return {
      'status': status,
      'msg': msg,
      'response': response
    }
  },

  modelErrorReturn: function(err, modelName) {

    var keys = Object.keys(err.Errors);
    var msg = {};

    for (var i = 0, length = keys.length; i < length; i++) {
      msg[modelName + '.' + keys[i]] = err.Errors[keys[i]][0].message;
    }

    return {
      'status': 'error',
      'msg': msg,
      'response': null
    }
  }

};
