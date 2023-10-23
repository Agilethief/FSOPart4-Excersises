const dummy = require("../utils/list_helper").dummy;
const totalLikes =
  require("../utils/list_helper").totalLikes;
const GetFavouriteBlog =
  require("../utils/list_helper").GetFavouriteBlog;
const listHelper = require("../utils/list_helper");

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

const listWithFourBlogs = [
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
    author: "Author 2",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 2,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f7",
    title: "Blog 4",
    author: "Author 3",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 1,
    __v: 0,
  },
];

console.log("LOG: Starting tests");

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
    const result = totalLikes(listWithFourBlogs);
    expect(result).toBe(11);
  });
});

describe("Get favourite blog", () => {
  test("Favourite blog with no blogs", () => {
    const blogs = [];

    const result = GetFavouriteBlog(blogs);
    expect(result).toBe(null);
  });

  test("Favourite blog with single blog that has 5 likes", () => {
    const result = GetFavouriteBlog(listWithOneBlog);
    expect(result.title).toEqual("Blog 1");
  });
  test("Favourite blog of four blogs that has 10 total likes", () => {
    const result = GetFavouriteBlog(listWithFourBlogs);
    expect(result.title).toEqual("Blog 1");
  });
});

describe("Get most blogs", () => {
  test("Most blogs with no blogs", () => {
    const blogs = [];

    const result = listHelper.GetMostBlogs(blogs);
    expect(result).toBe(null);
  });

  test("Get most blogs from four long list", () => {
    const result = listHelper.GetMostBlogs(
      listWithFourBlogs
    );
    expect(result.author).toEqual("Edsger W. Dijkstra");
  });
});

describe("Get most likes by author", () => {
  test("Check with no blogs", () => {
    const blogs = [];

    const result = listHelper.GetMostLikes(blogs);
    expect(result).toBe(null);
  });

  test("Get most likes by author from four long list", () => {
    const result = listHelper.GetMostLikes(
      listWithFourBlogs
    );
    expect(result.author).toEqual("Edsger W. Dijkstra");
  });
});
