
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secrets = require('../restricted/secrets');
const restricted = require('../restricted/restrictedMiddleware');


/* /register -> Creates a user using the information sent inside the body of the request. 
Hash the password before saving the user to the database. */

router.post('/register', (req, res)=> {

});


/* /login -> Use the credentials sent inside the body to authenticate the user. On successful login, 
create a new JWT with the user id as the subject and send it back to the client. If login fails, 
respond with the correct status code and the message: 'You shall not pass!'*/

router.post('/login', (req, res)=> {

});

/* users -> If the user is logged in, respond with an array of all the users contained in the database.
 If the user is not logged in respond with the correct status code and the message: 'You shall not pass!'. */

 router.get('/users', (req, res)=> {

});



module.exports = router ;