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

// function that returns the author who has the largest amount of blogs
// and the number of blogs
const GetMostBlogs = (blogs) => {
  if (blogs === null) return null;
  if (blogs.length === 0) return null;

  // Get the list of authors
  const authors = blogs.map((blog) => blog.author);
  const authorCounts = [];
  authors.forEach((author) => {
    authorCounts[author] = (authorCounts[author] || 0) + 1;
  });

  let authorWithMostBlogs = {};
  let mostBlogs = 0;
  authors.forEach((author) => {
    if (authorCounts[author] > mostBlogs) {
      authorWithMostBlogs.author = author;
      authorWithMostBlogs.blogs = authorCounts[author];
      mostBlogs = authorCounts[author];
    }
  });

  //console.log(authorWithMostBlogs);

  return authorWithMostBlogs;
};

const GetMostLikes = (blogs) => {
  if (blogs === null) return null;
  if (blogs.length === 0) return null;

  // Get the list of authors
  const authors = blogs.map((blog) => blog.author);
  let authorAndLikes = {};
  let mostLikes = 0;
  authors.forEach((author) => {
    // Filter blogs to just this author
    const blogsByAuthor = blogs.filter(
      (blog) => blog.author === author
    );

    // Then total the likes for this author
    const authorTotalLikes = totalLikes(blogsByAuthor);

    // Then add the author and total likes to the output
    if (authorTotalLikes > mostLikes) {
      authorAndLikes.author = author;
      authorAndLikes.likes = authorTotalLikes;
      mostLikes = authorTotalLikes;
    }
  });

  return authorAndLikes;
};

module.exports = {
  dummy,
  totalLikes,
  GetFavouriteBlog,
  GetMostBlogs,
  GetMostLikes,
};
