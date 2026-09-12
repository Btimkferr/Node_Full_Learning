const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    let likeCount = 0;
    if(!blogs){
        return 0;
    }
    blogs.map(blog =>{
        likeCount += blog.likes;
    })

    return likeCount;

}

const favouriteBlog = (blogs) => {
    if(!blogs || blogs.length ===0 ){
        return null;
    }
    const topLike = Math.max(...blogs.map(blog => blog.likes));

    const favBlog = blogs.find(blog => {
        return blog.likes === topLike;
    })
    return favBlog;
}

const mostBlogs = (blogs) => {
    let authorArray = [];

    if(!blogs || blogs.length === 0){
        return null;
    }

    blogs.forEach(blog =>{
        
        
        const curAuth = authorArray.find(a => a.author === blog.author);

        if(curAuth){
            
            curAuth.blogs++;
            
        }else{
            
            authorArray.push({author: blog.author, blogs: 1});
            
        }

    })

    const mostArticles = Math.max(...authorArray.map(a => a.blogs));
    console.log(mostArticles);

    const topAuthor = authorArray.find(a => {
        return a.blogs === mostArticles;
    })
    return topAuthor;

}

const mostLikes = (blogs) => {
    let authorArray = [];

    if(!blogs || blogs.length === 0){
        return null;
    }

    blogs.forEach(blog =>{
        
        
        const curAuth = authorArray.find(a => a.author === blog.author);

        if(curAuth){
            
            curAuth.likes= curAuth.likes + blog.likes;
            
        }else{
            
            authorArray.push({author: blog.author, likes: blog.likes});
            
        }

    })

    const mostLikes = Math.max(...authorArray.map(a => a.likes));
    console.log(mostLikes);

    const topAuthor = authorArray.find(a => {
        return a.likes === mostLikes;
    })
    return topAuthor;
}




module.exports = {dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes}


