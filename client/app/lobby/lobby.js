angular.module( 'moviematch.lobby', [] )

.controller( 'LobbyController', function( $scope, Session, Lobby, Socket, $location, Auth ) {
  $scope.session = {};

  Session.getSession()
  .then( function( session ) {
    $scope.session = session;
    $scope.sessionCode = session.code;

    Lobby.getUsersInOneSession( $scope.session.id )
    .then( function( users ){
      $scope.users = users;
    } );

  });

  $scope.username = Auth.getUserName();
  $scope.users = [];


  //this function is listening to any newUser event and recieves/appends the new user
  Socket.on( 'newUser', function( data ) {
    $scope.users.push( data );
  } );

  $scope.startSession = function( sessionId ) {
    Socket.emit( 'startSession', { sessionId: sessionId } );
  };

  Socket.on( 'sessionStarted', function() {
    $location.path( '/add' );
  } );

} );
