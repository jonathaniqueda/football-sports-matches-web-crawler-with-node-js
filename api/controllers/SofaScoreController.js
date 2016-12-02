/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var request = require('request');

module.exports = {

  parseMatchesOfTheDay: function(req, res) {

    if (req.method.toUpperCase() != 'GET') {
      return res.json(401, ResponseMessage.pattern('error', req.method.toUpperCase() + " not allowed. Try with GET.", null));
    }

    var timeStamp = Math.floor(Date.now() / 1000);

    request({
        url: 'http://www.sofascore.com/football//2016-12-02/json',
        method: 'GET',
        json: true,
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          for (var i = 0; i < body.sportItem.tournaments.length; i++) {
            var central = body.sportItem.tournaments[i];

            if (central.hasEventPlayerStatistics) {
              var route = 'http://www.sofascore.com/u-tournament/' + central.tournament.uniqueId + '/season/' + central.season.id + '/json'
              console.log(route);
              
              request({
                url: route,
                method: 'GET',
                json: true,
              }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                  console.log(body);
                  process.exit();
                }
              });

            }
          }
        }
      }
    );

  },

};
