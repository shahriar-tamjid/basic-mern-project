// Building a basic web server

// Import the Express library by requiring it
const express = require("express");

// Create an instance of express
const app = express();

// Setup two URL routes: 1 --> Homepage URL route  ... 2 --> Admin URL route

// Typical request is the get() request. It means when we type any URL into our browser
// The get() method takes two parameters: 1 --> The path or URL ... 2 --> The function to perform task
// This function cannot be just any function. This function also need to contain two parameters: "req" and "res"
// The "req" and "res" are provided by Express library
// "req" means incoming request that visitor is sending to the server
// "res" means the ability to send back response to that visitor
// We use "send" method to send responses against the requests

// Example: We want to show welcome message on request
app.get("/", (req, res) => {
  res.send("Welcome to the Homepage!");
});

app.get("/admin", (req, res) => {
  res.send("Welcome to the Admin Page!");
});

// Note: URL routes must be defined before we start listening to the port

// Tell the app to listen for incomming request from port no. 3000
app.listen(3000);
