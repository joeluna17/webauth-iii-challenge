
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secrets = require('../restricted/secrets');
const restricted = require('../restricted/restrictedMiddleware');
const Users = require('../db-helpers/users-dbmodel');


/* /register -> Creates a user using the information sent inside the body of the request. 
Hash the password before saving the user to the database. */

router.post('/register',  async (req, res) => {
        const user = req.body;
        const hashed = bcrypt.hashSync(user.password,12);
        user.password = hashed;
        
        try {
            const addedUser = await Users.addUser(user);
            res.status(201).json(addedUser);
        }
        catch({message}) {
            res.status(500).json({message});
        }
});


/* /login -> Use the credentials sent inside the body to authenticate the user. On successful login, 
create a new JWT with the user id as the subject and send it back to the client. If login fails, 
respond with the correct status code and the message: 'You shall not pass!'*/

router.post('/login', async (req, res)=> {
    let {username, password} = req.body;

    try {
        const user = await Users.findUserBy({username}).first();
            if(user && bcrypt.compareSync(password, user.password)){
                const token = genJWToken(user) //Generates a token for the user attempting to log in successfully
                res.status(200).json({message: "You are worthy", token});
            }else{
                res.status(401).json({message:'Invalid Creditials who are you working for!'});
             }
    }

    catch({message}){
        res.status(500).json({message});
     }
});


/* users -> If the user is logged in, respond with an array of all the users contained in the database.
 If the user is not logged in respond with the correct status code and the message: 'You shall not pass!'. */

 router.get('/users', restricted, async (req, res)=> {
        try{
            const users = await Users.getUsers();
            res.status(200).json({users});
        }
        catch({message}){
            res.status(500).json({message})
        }
});


//Make the JWToken function
const genJWToken = (user) => {
    const payload = {
        subject : "user",
        username : user.username
    };

    const secret = secrets.jwtSecret;

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload,secret,options);
};

 


module.exports = router ;