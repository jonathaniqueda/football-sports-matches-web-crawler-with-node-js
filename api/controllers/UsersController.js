/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var moment = require('moment');

module.exports = {

  create: function(req, res) {

      if (req.method.toUpperCase() != 'POST') {
        return res.json(401, ResponseMessage.pattern('error', req.method.toUpperCase() + " not allowed. Try with POST.", null));
      }

      if (req.body.password !== req.body.confirmPassword) {
        return res.json(401, ResponseMessage.pattern('error', "Password doesn't match!", null));
      }

      var expiresDate = moment().add(sails.config.tokenExpiresTime - 60, 'seconds');

      Users.create(req.body).exec(function(err, user) {

        if (err) {
          return res.json(err.status, ResponseMessage.modelErrorReturn(err, 'users'));
        }

        // If user created successfuly we return user and token as response
        if (user) {
          var tokenValue = JwToken.issue({
            id: user.id
          });

          Users.update({
            id: user.id
          }, {
            token: tokenValue,
            tokenExpiresDate: expiresDate.toDate()
          }).exec(function afterwards(err, updated) {
            if (err) {
              return res.json(err.status, ResponseMessage.modelErrorReturn(err, 'users'));
            } else {
              // NOTE: payload is { id: user.id }
              res.json(200, ResponseMessage.pattern('success', null, {
                email: updated[0].email,
                expiresInSeconds: sails.config.tokenExpiresTime,
                expiresDate: updated[0].tokenExpiresDate,
                token: updated[0].token,
              }));
            }
          });
        } // close if

      }); // close create

    } // close action

};
