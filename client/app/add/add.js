angular.module( 'moviematch.add', [] )
.controller( 'AddController', function( $scope, Session, Lobby, Socket, $location, Auth, Movies ) {
  $scope.session = {};

  Session.getSession()
  .then( function( session ) {
    $scope.session = session;
    console.log('GET SESSION and scope.session', $scope.session);
  });

  $scope.searchMovies = function () {
    if($scope.query.replace(/\s/g, '') !== ''){
      Movies.searchMovies($scope.query)
      .then( function (data) {
        console.log('here the data data data', data);
        $scope.updateMovieResults(data);
      });
    }
    $scope.query = '';
  };

  $scope.updateMovieResults = function (data) {
    $scope.results = data.results;
  };

  $scope.addToQueue = function (movie) {
    $scope.movies = $scope.movies || [];
    $scope.movies.push(movie);
    Movies.saveMovie(movie, $scope.session.id);
  };

  $scope.startSession = function (sessionId) {
    console.log('The START SESSION BUTTON RESPONSE', sessionId);
    $location.path( '/match' );
  };

});