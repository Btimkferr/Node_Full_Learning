const {test, describe} = require('node:test');
const assert = require('node:assert');
const mostBlogs = require('../utils/list_helper').mostBlogs;

describe('Most Blogs tests', () => {
    const extendedBlogList= [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '1',
            title: 'my test blog',
            author: 'm3',
            url: 'www.blog.com',
            likes: 6,
            __v: 0
        },
        {
            _id: '2',
            title: 'my test blog 2',
            author: 'm3',
            url: 'www.blog.com',
            likes: 6,
            __v: 0
        },
        {
            _id: '3',
            title: 'my test blog 3',
            author: 'm3',
            url: 'www.blog.com',
            likes: 6,
            __v: 0
        },
        {
            _id: '4',
            title: 'my test blog 4',
            author: 'm3',
            url: 'www.blog.com',
            likes: 6,
            __v: 0
        },
        {
            _id: '5',
            title: 'my test blog 5',
            author: 'm3',
            url: 'www.blog.com',
            likes: 6,
            __v: 0
        },
        {
            _id: '6 ',
            title: 'my test blog 6',
            author: 'm3',
            url: 'www.blog.com',
            likes: 8,
            __v: 0
        },
    ]

    const equalAuthorBlogList = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 6,
            __v: 0
        },
        {
            _id: '1',
            title: 'my test blog',
            author: 'm3',
            url: 'www.blog.com',
            likes: 6,
            __v: 0
        }];

    test('Find top author from large list', () => {
        result = mostBlogs(extendedBlogList);
        assert.deepStrictEqual(result, {author: 'm3', blogs:6});

    })
    
    test('Most Blogs empty', () => {
        result = mostBlogs([]);
        assert.strictEqual(result, null);
    })

    test('Equal Author Blog List', () => {
        result = mostBlogs(equalAuthorBlogList);
        assert.deepStrictEqual(result, {author:'Edsger W. Dijkstra', blogs:1})
    })
})