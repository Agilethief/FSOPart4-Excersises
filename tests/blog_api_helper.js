const Blog = require("../models/blog");

const initialBlog = [
  {
    title: "Test title1",
    author: "Test author1",
    url: "www.test.com",
    likes: 1,
  },
  {
    title: "Test title2",
    author: "Test author2",
    url: "www.test.com",
    likes: 2,
  },
  {
    title: "Test title3",
    author: "Test author3",
    url: "www.test.com",
    likes: 3,
  },
  {
    title: "Test title4",
    author: "Test author4",
    url: "www.test.com",
    likes: 4,
  },
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlog,
  blogsInDB,
};
