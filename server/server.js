var express = require( 'express' );
var db = require( './config/db' );
var app = express();

var http = require( 'http' ).Server( app );
var io = require( 'socket.io' )( http );
var Session = require( './sessions/sessions' );
var User = require( './users/users' );

// * facebook authentication resources *
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var env = require('/config/env.js');

io.on( 'connect' , function( socket ){
  console.log( 'we are connected!!' );
  socket.on( 'disconnect', function() {
    console.log( 'were not connected anymore' );
  });

  //this recieves the create event emitted in client/sessions/sessions.js-emitCreate
  socket.on( 'session', function( data ) {
    Session.findOne( { where: { sessionName: data.sessionName } } )
    .then( function( session ) {
      //this function emits an event named newSession and sends the newly created session
      io.emit( 'newSession', session.dataValues );
    } );
  } );

  //this function listens to the new join event in client/sessions/sessions.js-emitJoin
  socket.on( 'newJoin', function( data ) {
    //this function creates a new or joins an existing socket-room
    socket.join( data.sessionName );
    User.findOne( { where: { username: data.username } } )
    .then( function( user ) {
      //this function emits a newUser event and the new user to a specific room named the session name
      io.to( data.sessionName ).emit( 'newUser', user );
    } );
  } );

  socket.on( 'startSession', function( data ) {
    socket.join( data.sessionName );
    io.to( data.sessionName ).emit( 'sessionStarted' );
  } );

  // This listener handles broadcasting a matched movie to connected clients.
  socket.on( 'foundMatch', function( data ) {
    socket.join( data.sessionName );
    io.to( data.sessionName ).emit( 'matchRedirect', data.movie.id );
  });
});


// https://github.com/passport/express-4.x-facebook-example/blob/master/server.js
//
// Passport Facebook strategy configuration
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_URL,
    profileFields: ['id', 'displayName','friends']
  },
  function(accessToken, refreshToken, profile, cb) {
    // TODO: check if user is in the database

    return cb(null, profile);
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// initialize passport and restore authentication state
app.use(passport.initialize());
app.use(passport.session());


const PORT = 8000;

require( './config/middleware' )( app, express );
require( './config/routes' )( app, express );

http.listen( process.env.PORT || PORT );
console.log( 'Listening on port ' + PORT );

module.exports = app;
