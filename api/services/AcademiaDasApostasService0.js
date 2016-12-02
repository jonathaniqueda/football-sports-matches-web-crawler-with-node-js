/**
 * Create helpers functions to map sections on Academia Das Apostas Website.
 *
 * @description :: Academia Das Apostas Crawler
 * @help: http://sailsjs.org/#!/documentation/concepts/Services
 */

// Generates a token from supplied payload
module.exports.getTeams = function(prev) {
  if (prev.children('.team-a').text().trim() != '' && prev.children('.team-a').text().trim() != null) {
    var gameInfo = {
      'teamA': prev.children('.team-a').text().trim(),
      'teamB': prev.children('.team-b').text().trim(),
    };

    return gameInfo;
  }

  return null;
};
