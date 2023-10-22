const blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
  return likes;
};

// https://seanconnolly.dev/javascript-find-element-with-max-value
const GetFavouriteBlog = (blogs) => {
  if (blogs === null) return null;
  if (blogs.length === 0) return null;

  const blogWithMostLikes = blogs.reduce((max, blog) =>
    blog.likes > max.likes ? blog : max
  );
  return blogWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  GetFavouriteBlog,
};
