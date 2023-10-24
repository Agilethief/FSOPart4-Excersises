const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./blog_api_helper");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlog) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("All blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("All blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(
    helper.initialBlog.length
  );
});

test("Specific blog is returned", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map(
    (blogTitle) => blogTitle.title
  );
  expect(titles).toContain("Test title1");
});

test("A valid blog can be added ", async () => {
  const newBlog = {
    title: "New Blog title",
    author: "New author",
    url: "www.newblog.com",
    likes: 99,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const notesAtEnd = await helper.blogsInDB();

  expect(notesAtEnd).toHaveLength(
    helper.initialBlog.length + 1
  );

  const titles = notesAtEnd.map(
    (blogTitle) => blogTitle.title
  );
  expect(titles).toContain("Test title1");
});
