const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  const user = users.find(
    user => user?.username === username && user?.password === password
  );

  if (!user) return res.status(400).json({message: "User with credentials could not be found!"});

  const token = jwt.sign({ data: user }, "process.env.JWT_SECRET", { expiresIn: 60 * 60 })
  req.session.authorization = { accessToken: token }
  return res.status(200).json({message: "Successfull login!"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const { isbn } = req.params;
  const book = books?.[isbn];
  
  if (!book) return res.status(404).json({ message: "Book not found!" });

  const { review } = req.query;
  const { username } = req.user.data;

  //Adding or modifying review
  book.reviews[username] = review;

  return res.status(200).json({reviews: book.reviews});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const { isbn } = req.params;
    const book = books?.[isbn];
    
    if (!book) return res.status(404).json({ message: "Book not found!" });
  
    const { username } = req.user.data;
  
    const reviewDeleted = book.reviews?.[username];
    
    // Delete the review from the book
    delete book.reviews[username];
    
    return res.status(200).json({
        reviews: book.reviews, 
        message: `${username}'s review was deleted!`,
        reviewDeleted
    });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
