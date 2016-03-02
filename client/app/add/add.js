angular.module( 'moviematch.add', [] )
.controller( 'AddController', function( $scope, Session, Lobby, Socket, $location, Auth, Movies ) {
  $scope.session = {};

  Session.getSession()
  .then( function( session ) {
    $scope.session = session;
  });

  $scope.searchMovies = function () {
    if($scope.query.replace(/\s/g, '') !== ''){
      Movies.searchMovies($scope.query)
      .then( function () {
        $scope.updateMovieResults();
      })
    }
    $scope.query = '';
  };

  $scope.updateMovieResults = function () {

  };

})