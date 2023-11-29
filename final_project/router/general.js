const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const {username, password} = req.body;

  //Check the username and password exist
  if (!username || !password) return res.status(400).json({message: "Please, provide both username and password"});

  //Check the username that exists
  let user = users?.find( u => u?.username === username );
  if (user) return res.status(400).json({ message : "User with this username already exists!"})
  
  //Create user with username and password
  users.push({username, password});

  return res.status(200).json(
    {message: `User with the username ${username} has successfully been created!`}
  );
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const { isbn } = req.params;
  const book = books?.[isbn]
  return res.status(200).json(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const { author } = req.params;
  const authorsBooks = Object.values(books).filter(
    book => book.author === author
  );

  return res.status(200).json(authorsBooks);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const { title } = req.params;
  const booksByTitle = Object.values(books).filter( book => book.title === title );
  return res.status(200).json(booksByTitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const { isbn } = req.params;
  const reviews = books?.[isbn]?.reviews;
  return res.status(200).json(reviews);
});

module.exports.general = public_users;
