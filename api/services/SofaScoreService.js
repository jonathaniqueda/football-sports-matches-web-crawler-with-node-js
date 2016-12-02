/**
 * Create helpers functions to map sections on SofaScore Website.
 *
 * @description :: Academia Das Apostas Crawler
 * @help: http://sailsjs.org/#!/documentation/concepts/Services
 */

var request = require('request');

module.exports.getMatchInfo = function(route) {

  request({
    url: route,
    method: 'GET',
    json: true,
  }, function(error, response, body) {
    console.log(body, 'aqui');
    process.exit();
    if (!error && response.statusCode == 200) {
      console.log(body);
      process.exit();
    }
  });

}
