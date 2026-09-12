const {
    test,
    after,
    beforeEach,
    describe
} = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');


const api = supertest(app);


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


describe('Base data tests', () => {


    test('Check Get returns json', async () => {

        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

    })

    test('Check get returns all', async () => {
        const fetchedBlogs = await helper.blogsInDb();

        assert.strictEqual(helper.initialBlogs.length, fetchedBlogs.length);


    })

    test('Unique id is named and accessible ', async () => {

        const returnedBlogs = await helper.blogsInDb();
        console.log(returnedBlogs[0].id);
        assert(returnedBlogs[0].id)
    })




})

describe('Posting a new note tests', () => {
    test('A new blog can be added to list', async () => {
        const blogData = {
            title: "the new test blog",
            author: "Still m3",
            url: "www.stillMyBlog.com",
            likes: 2
        }
        const newBlog = new Blog(blogData)

        await newBlog.save();
        const laterDB = (await helper.blogsInDb());
        assert.strictEqual(helper.initialBlogs.length + 1, laterDB.length);

        assert.deepStrictEqual(blogData.title, laterDB[laterDB.length - 1].title);

    })

    test('Blank likes returns 0', async () => {
        const blogDataNoLikes = {
            title: "I have no likes",
            author: "m3",
            url: "www.myblog.com",
        }

        await api
            .post('/api/blogs')
            .send(blogDataNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const returnedDB = await helper.blogsInDb();
        const likes = returnedDB.map(b => b.likes);

        assert.strictEqual(0, likes[likes.length - 1]);

    })

    test('Blank url returns 400', async () => {
        const blankUrlBlog = {
            title: "i have no url",
            author: "m3",
            likes: 3
        }
        await api
            .post('/api/blogs')
            .send(blankUrlBlog)
            .expect(400)

        const finalBlogsLength = (await helper.blogsInDb()).length;
        assert.strictEqual(helper.initialBlogs.length, finalBlogsLength);
    })

    test('Blank title returns 400', async () => {
        const blankTitleBlog = {
            url: "www.myblog.com",
            author: "m3",
            likes: 3
        }
        await api
            .post('/api/blogs')
            .send(blankTitleBlog)
            .expect(400)

        const finalBlogsLength = (await helper.blogsInDb()).length;
        assert.strictEqual(helper.initialBlogs.length, finalBlogsLength);
    })
})

describe('Getting specific notes', () => {

    test('Getting a specific ID', async () => {
        const initialDB = await helper.blogsInDb();
        const testBlog = initialDB[0];


        const resultingblog = await api
            .get(`/api/blogs/${testBlog.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        assert.deepStrictEqual(resultingblog.body, testBlog);

    })

    test('Getting an non existing blog returns 404', async () => {
        const invalidID = await helper.nonExistingId();
        await api.get(`/api/blogs/${invalidID}`).expect(404);

    })


})

describe('Deleting a blog tests', () => {

    test('Deleting a blog is successful', async () => {
        const startBlogs = await helper.blogsInDb();
        const blogToDelete = startBlogs[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const endBlogs = await helper.blogsInDb()
        const ids = endBlogs.map(b => b.id);
        assert(!ids.includes(blogToDelete.id));

        assert.strictEqual(helper.initialBlogs.length - 1, endBlogs.length);
    })

})

describe('Updating a blog tests', () => {

    test('Updating Successfully', async () => {
        const startDB = await helper.blogsInDb();
        const blogToUpdate = startDB[0];
        const updatedData = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 8,
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedData)
            .expect(200)

        const endDB = await helper.blogsInDb();
    
        assert.deepStrictEqual(endDB[0].likes, updatedData.likes);

    })
})


after(async () => {
    await mongoose.connection.close();
})