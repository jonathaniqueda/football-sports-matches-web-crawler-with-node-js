/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var request = require('request');
var cheerio = require('cheerio');
var qs = require('querystring')

module.exports = {

  parseMatchesOfTheDay: function(req, res) {

    if (req.method.toUpperCase() != 'GET') {
      return res.json(401, ResponseMessage.pattern('error', req.method.toUpperCase() + " not allowed. Try with GET.", null));
    }

    request({
        url: 'https://www.academiadasapostasbrasil.com/users/login_modal',
        method: 'POST',
        json: true,
        form: {
          redirect_to: 'https%3A%2F%2Fwww.academiadasapostasbrasil.com%2Fstats%2Flivescores',
          user: 'iqueda',
          passwrd: '885364',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      },
      function(error, response, body) {

        if (!error && response.statusCode == 200) {
          if (body.status == 'success') {
            //Mapped the livestats page
            request({
              url: 'https://www.academiadasapostasbrasil.com/stats/livescores',
              method: 'GET',
            }, function(error, response, html) {
              if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                $('.live-subscription').each(function(i, element) {
                  var a = $(this).prev();
                  if (AcademiaDasApostasService.getTeams(a) != null) var teams = AcademiaDasApostasService.getTeams(a);

                  if (typeof teams != "undefined") {
                    var route = a.children('.score ').children('a').attr('href');
                    console.log(route);
                  }

                });
              }
            }); //Finish the live stats page map
          } //if success
        }

      }
    ); //Finish the login case

  },

};
