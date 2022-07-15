// Building a basic web server

// Import the MongoDB and destructure it
const {MongoClient} = require("mongodb");

// Import the Express library by requiring it
const express = require("express");

// Initializing db variable
let db;

// Create an instance of express
const app = express();

// Tell express that we want to use ejs
app.set("view engine", "ejs");
// Also specify which folder we want to keep our templates
app.set("views", "./views");

// Let's practice querying the database when we place a get request to the homepage
// For any task which requires to communicate with database or API we need to use async-await function
app.get("/", async (req, res) => {
  const allCats = await db.collection("cats").find().toArray();
  // Here we are storing all the data that are stored in a collection named "cats"
  // find() method will return all the data from the collection by that return value is difficult for us to read
  // So we converted it into an array for our convenience

  // It's not a good thing to write HTML template inside of a send() method because it gets unmanageable with time
  // We can use a template engine called "ejs" to keep things clean
  res.render("home", {allCats});
  // If we pass a parameter to this render() method, we will be able to access that into our home.ejs file
});

/*
Here is the response in the browser:

Hello I am the homepage template
*/

app.get("/admin", (req, res) => {
  res.send("Welcome to the Admin Page!");
});

// Note: URL routes must be defined before we start listening to the port

// We want to keep our DB ready before visiting the site. So our async function must be called before the app starts to listen to port
async function start() {
  const client = new MongoClient("mongodb://root:root@localhost:27017/BasicMernApp?&authSource=admin")
  // We need to create a new instance of MongoClient. Let's name it as "client"
  // Inside MongoClient() we need to provide the connection string
  
  await client.connect();
  // This means we need to wait until the "client" variable is connected to the "connection string"
  
  db = client.db();
  // client.db() will return data that is stored in the database
  
  // After that we can tell our app to listen to the port
  app.listen(3000);
}
start();
