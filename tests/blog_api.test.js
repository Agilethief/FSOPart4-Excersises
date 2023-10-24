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

  const blogsAtEnd = await helper.blogsInDB();

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlog.length + 1
  );

  const titles = blogsAtEnd.map(
    (blogTitle) => blogTitle.title
  );
  expect(titles).toContain("Test title1");
});

test("Blog without content is not added", async () => {
  const newBlog = {
    likes: 99,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDB();

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlog.length
  );
});

test("A specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDB();

  const blogToView = blogsAtStart[0];
  //console.log("blog", blogToView);

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(resultBlog.body).toEqual(blogToView);
});

test("A blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDB();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDB();

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlog.length - 1
  );

  const titles = blogsAtEnd.map((r) => r.title);

  expect(titles).not.toContain(blogToDelete.title);
});

afterAll(async () => {
  await mongoose.connection.close();
});
