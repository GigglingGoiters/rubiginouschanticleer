var Movies = require( './movies' );
var env = require('../env/env.js');
var api_key = env.api_key;
var searchUrl = 'http://api.themoviedb.org/3/search/movie';
var request = require('request');

module.exports = {

  getAllMovies: function() {
    Movies.getAllMovies();
  },

  //returns the requested 10er movie package
  getMoviePackage: function( req, res ) {
    res.send( Movies.getMoviePackage( req.params.number ));
  },

  getMovie: function( req, res, next ) {
    var movieID = parseInt( req.params.movie_id );
    var movie = Movies.getMovie( movieID );
    res.json( movie );
  },

  getSearchResults: function (req, res, next) {
    var query = req.body.query;
    console.log('req.body ==========================>>>>>>>', query);

    var options = { method: 'GET',
     url: 'http://api.themoviedb.org/3/search/movie',
     qs: 
      { api_key: 'c062102bb9e2f7a7ab5d2a0f7fb7f2d0',
        query: query },
     headers: 
      { 'postman-token': '617cd5a3-78db-0ae0-0d80-cffed6da26e4',
        'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
     if (error) throw new Error(error);
     console.log(body);
     res.end(body);
    });
  }

};
