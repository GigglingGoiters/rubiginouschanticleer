// When you require('env.js') because this isn’t wrapped
// in a module.exports (on purpose), the code is literally
// executed and thus the variables are added to your environment.
//
// Access by 'process.env.clientID'

process.env['FACEBOOK_APP_ID'] = '';
process.env['FACEBOOK_SECRET'] = '';
process.env['FACEBOOK_URL'] = '';