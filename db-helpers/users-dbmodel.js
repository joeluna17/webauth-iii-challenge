const usersdb = require('../data/db-config');


const getUsers = () =>{
    return usersdb('users');
};

const findUserBy = (filter) => {
    return usersdb('users')
            .where(filter);
};

const addUser = async (user) => {
    try{
        const [id] = await usersdb('users')
            .insert(user);
         return findById(id);  
    }
    catch(err){
        console.log(err);
    }
};

const findById = (id) => {
    return usersdb('users')
            .where({id})
            .first();
};



module.exports = {
    getUsers,
    findUserBy,
    addUser,
    findById
};