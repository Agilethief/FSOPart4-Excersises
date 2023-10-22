const dummy = require("../utils/list_helper").dummy;
const totalLikes =
  require("../utils/list_helper").totalLikes;
const GetFavouriteBlog =
  require("../utils/list_helper").GetFavouriteBlog;

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Blog 1",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const listWithThreeBlogs = [
  {
    _id: "5a422aa71b54a676234d17f9",
    title: "Blog 1",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f0",
    title: "Blog 2",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 3,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Blog 3",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 2,
    __v: 0,
  },
];

describe("dummy", () => {
  test("returns one", () => {
    const blogs = [];

    const result = dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("Total Likes", () => {
  test("Empty List has 0 Likes", () => {
    const blogs = [];

    const result = totalLikes(blogs);
    expect(result).toBe(0);
  });

  test("List with one blog that has 5 likes", () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("List with three blog that has 10 tota; likes", () => {
    const result = totalLikes(listWithThreeBlogs);
    expect(result).toBe(10);
  });
});

describe("Get favourite blog", () => {
  test("Favourite blog with no blogs", () => {
    const blogs = [];

    const result = GetFavouriteBlog(blogs);
    console.log(result);
    expect(result).toBe(null);
  });

  test("Favourite blog with single blog that has 5 likes", () => {
    const result = GetFavouriteBlog(listWithOneBlog);
    expect(result.title).toEqual("Blog 1");
  });
  test("Favourite blog of three blogs that has 10 total likes", () => {
    const result = GetFavouriteBlog(listWithThreeBlogs);
    expect(result.title).toEqual("Blog 1");
  });
});
