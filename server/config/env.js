// When you require('env.js') because this isn’t wrapped
// in a module.exports (on purpose), the code is literally
// executed and thus the variables are added to your environment.
//
// Access by 'process.env.clientID'

process.env['FACEBOOK_APP_ID'] = '1024267340953000';
process.env['FACEBOOK_SECRET'] = 'a7003b9c05f0e831981c62e966672d3c';
process.env['FACEBOOK_URL'] = 'http://localhost:8000/login/facebook/return';