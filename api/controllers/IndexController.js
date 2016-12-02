/**
 * IndexController
 *
 * @description :: IndexController is the first controller to map the URL /
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  init: function(req, res) {
    return res.send(ResponseMessage.pattern('success', null, 'Hello, this is the first API in NodeJS from uFox.'));
  },

};
