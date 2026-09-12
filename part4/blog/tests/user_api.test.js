const {
    test,
    after,
    beforeEach,
    describe
} = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');


const app = require('../app');
const helper = require('./user_test_helper.js');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('password1', 10);
    const user = new User({username:'root',
        name:'Beck',
        passwordHash: passwordHash
    });

    await user.save();

})

describe('Base user db operations', () => {
    test('New username successfully created', async () => {
        const startUsers = await helper.usersInDb();
        console.log("mark1");

        const newUser = {
            username: "btimkferr",
            name: "Beck TK",
            password: "password"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        console.log('mark2');

        const endUsers = await helper.usersInDb();
        assert.strictEqual(startUsers.length + 1, endUsers.length);

        const usernames = endUsers.map(u => u.username);
        assert(usernames.includes(newUser.username));
    })

    test('Existing username returns error msg and status', async () => {
        const startUsers = await helper.usersInDb();

        const newUser = {
            username: "root",
            name: "beck_root",
            password: "password1"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        const endUsers = await helper.usersInDb();
        assert(result.body.error.includes('expected `username` to be unique'));


        assert.strictEqual(endUsers.length, startUsers.length);

    })

})

after(async () => {
    await mongoose.connection.close();
})