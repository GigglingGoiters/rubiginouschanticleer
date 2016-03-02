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
  }

  getSearchResults: function (req, res, next) {
    var query = req.params.query;
    var options = {
        url: searchUrl + '?api_key=' + api_key + '&query=' + query,
        page: 1
    };
    request.get(options, function (error, response, body) {
      if (error) {
        console.log("search movies request:", error);
      } else {
        res.end(body);
      }
    });

  }

};
