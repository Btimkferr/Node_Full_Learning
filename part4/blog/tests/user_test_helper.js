const User = require('../models/user');




const initialUsers = [{
    username: "root",
    name: "beck_root",
    passwordHash:"password1"
},
{
    username:"test1",
    name: "test user 1",
    passwordHash: "password2"
}]

const usersInDb = async () => {
    const users = await User.find({});
    console.log("fetching");
    console.log(users[0].username);
    return users.map(user => user.toJSON());
}

module.exports = { initialUsers, usersInDb};

