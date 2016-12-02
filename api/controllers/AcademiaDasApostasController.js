/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var request = require('request');
var cheerio = require('cheerio');
var qs = require('querystring');

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
            console.log(
              response.headers['set-cookie'][0],
              response.headers['set-cookie'][1]
            );
            //Mapped the livestats page
            //Cookie:cookies_infonote=1; __umtrst=2; _gat=1; PHPSESSID=648072b52c741ec16851ae0f6f139182; _ga=GA1.2.546015569.1480684380; ADAGLOBALcookie=a%3A4%3A%7Bi%3A0%3Bi%3A61227%3Bi%3A1%3Bs%3A40%3A%22f5906bbb46326736416cf1314076b9da5ecb5126%22%3Bi%3A2%3Bi%3A1481293718%3Bi%3A3%3Bi%3A1%3B%7D
            request({
              url: 'https://www.academiadasapostasbrasil.com/stats/livescores',
              headers: {
                'Cookie': [
                  response.headers['set-cookie'][0],
                  response.headers['set-cookie'][1]
                ],
              },
              method: 'GET',
            }, function(error, response, html) {
              console.log(
                response.headers['set-cookie'][0],
                response.headers['set-cookie'][1]
              );
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
