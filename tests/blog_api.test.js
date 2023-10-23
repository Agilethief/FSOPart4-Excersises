const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./blog_api_helper");
const api = supertest(app);

const Blog = require("../models/blog");

test("All blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
