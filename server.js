// Building a basic web server

// Import the MongoDB and destructure it
const {MongoClient} = require("mongodb");

// Import the Express library by requiring it
const express = require("express");

// Setting "upload" variable equal to "Multer" in order to upload files
const multer = require("multer");
const upload = multer();

// Initializing db variable
let db;

// Create an instance of express
const app = express();

// Tell express that we want to use ejs
app.set("view engine", "ejs");
// Also specify which folder we want to keep our templates
app.set("views", "./views");
// Making the public folder available
app.use(express.static("public"));
// If browser is sending JSON data to the server, we can easily access that data
app.use(express.json());
// Insted of async request if browser submits plain HTML form we can easily access that data too
app.use(express.urlencoded({extended: false}));

// Authentication handler
function passwordProtected(req, res, next) {
  res.set("WWW-Authenticate", "Basic realm='Basic MERN App'");
  if(req.headers.authorization == "Basic YWRtaW46YWRtaW4=") {
    // Here we will put the "Base-64" generated string according to our username and password
    // If this string matches then user is authenticated
    next(); // If user is authenticated then we are telling the Express to move onto next step or the third parameter
  } else {
    console.log(req.headers.authorization);
    // With this we will get the "Base-64" encoded string for our username and password
    // Then we can set that string equal to the "req.headers.authorization"
    // Now we can log in successfully
    res.status(401).send("You are not authorized! Try Again!"); // If the password is not matched then we show the error message
  }
}
// This function is also called as a middleware
// Because middleware the parameters that are given to a function which stays in the middle and performs task before getting to the third/later/final parameter

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

// Except the home route we want all other routes to be password protected
// So after the home route we need to call the app.use() and pass our auth function to that
// By doing so any route that fall behind the app.use(passwordProtected), will require for the authorization
app.use(passwordProtected);

app.get("/admin", (req, res) => {
  res.render("admin");
});

// To pass the data to React code we need to get the data from database in JSON format
app.get("/api/cats", async (req, res) => {
  const allCats = await db.collection("cats").find().toArray();
  res.json(allCats);
});
// If we go to the URL we will get raw data from the database
/*
In the browser:
[{"_id":"62d27dd008168ae62602d1f4","name":"Dustin","breed":"Birman"},
{"_id":"62d27e0d08168ae62602d1f5","name":"Steve","breed":"Manie Coon"},
{"_id":"62d27e3408168ae62602d1f6","name":"Max","breed":"Turkish Angora"}]
*/

// Route to pass data to the database
app.post("/create-cat", upload.single("photo"), async (req, res) => {
  // Before sendind data we want to check what browser is getting from its request
  console.log(req.body);
  // Our response
  res.send("Thank You!");
});

/*
In the console we have gotten:

[Object: null prototype] {
  photo: '',
  name: 'Eleven',
  breed: 'Exotic Shorthair'
}
*/

// Note: URL routes must be defined before we start listening to the port

// We want to keep our DB ready before visiting the site. So our async function must be called before the app starts to listen to port
async function start() {
  const client = new MongoClient("mongodb://localhost:27017/BasicMernApp")
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