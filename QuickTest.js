const listHelper = require("./utils/list_helper");

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
    author: "Author 2",
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
    author: "Author 2",
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
    author: "Author 2",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 1,
    __v: 0,
  },
];

console.log(listHelper.GetMostBlogs(listWithFourBlogs));
