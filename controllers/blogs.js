const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { requestLogger } = require("../utils/middleware");

// Get all blogs
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  if (blogs) {
    response.json(blogs);
  }
});

// Get a single blog
blogsRouter.get("/:id", async (request, response) => {
  console.log("Blog ID ", request.params.id);
  const blog = await Blog.findById(request.params.id);
  console.log("Blog", blog);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

// Post a new blog
blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await newBlog.save();
  response.status(201).json(savedBlog);
});

// Delete a blog
blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// Update a blog
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  console.log("Started PUT");
  await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });
  response.status(200).end();
});

module.exports = blogsRouter;
