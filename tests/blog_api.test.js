const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./blog_api_helper");
const api = supertest(app);

const Blog = require("../models/blog");
const blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlog) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("Getting blogs", () => {
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
});

describe("Adding entire new blogs", () => {
  // 4.10
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
});

describe("Changing and removing blogs", () => {
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

  test("A blog can be updated", async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];
    const blogOriginalTitle = blogToUpdate.title;
    blogToUpdate.title = "Title has been updated";

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    expect(blogToUpdate.title).not.toEqual(
      blogOriginalTitle
    );
  });
});
// 4.9
test("A blog ID is defined", async () => {
  const blogsAtStart = await helper.blogsInDB();
  const IDToCheck = blogsAtStart[0].id;
  expect(IDToCheck).toBeDefined();
});

describe("Requests lacking in definition", () => {
  //4.11
  test("A blog with no likes defined will be 0", async () => {
    const newBlog = {
      title: "There are no likes defined",
      author: "New author",
      url: "www.newblog.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDB();
    //console.log(blogsAtEnd[blogsAtEnd.length - 1]);

    // Uncertain why we need to get the legnth MINUS ONE. Likely the zero based array is different from the length. The length here being incorrectly defined as starting at 1, instead of a count which would start at 1.
    // So instead we get this silly -1 just to get the last item in the array.
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(
      0
    );
  });

  //4.12 - Straightforward, make sure they are required in the model.
  test("A new blog with no title will respond 400", async () => {
    const newBlog = {
      author: "New author",
      url: "www.newblog.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("A new blog with no url will respond 400", async () => {
    const newBlog = {
      title: "New title",
      author: "New author",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
