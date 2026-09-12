const {test, describe} = require('node:test');
const assert = require('node:assert');
const listHelper  = require('../utils/list_helper')

describe('totalLikes', () => {
    const oneBlogList = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

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


    test('List of one blog then total likes = blog likes', () => {
        const result = listHelper.totalLikes(oneBlogList);
        assert.strictEqual(result, 5);
    })

    test('empty list equals zero', () => {
        const result = listHelper.totalLikes([]);
        assert.strictEqual(result, 0);
    })

    test('Correct calculation for a bigger list', () => {
        const result = listHelper.totalLikes(extendedBlogList);

        assert.strictEqual(result, 43);
    })
})