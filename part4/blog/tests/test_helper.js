const Blog = require('../models/blog');


const initialBlogs = [{
       
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        
    },
    {
        
        title: 'my test blog',
        author: 'm3',
        url: 'www.blog.com',
        likes: 6,
    }
]

const loginTemplate = {
    username: "root",
    password: "password1"
};


const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
    const blog = new Blog({title: 'will remove this soon',
        author:'tester',
        url:'www.test url'
    });
    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
}

module.exports = {initialBlogs, blogsInDb, nonExistingId, loginTemplate}