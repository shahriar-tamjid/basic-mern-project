// Building a basic web server

// Import the MongoDB and destructure it
const {MongoClient, ObjectId} = require("mongodb");

// Import the Express library by requiring it
const express = require("express");

// Setting "upload" variable equal to "Multer" in order to upload files
const multer = require("multer");
const upload = multer();

// Import Sanitize HTML
const sanitizeHTML = require("sanitize-html");

// Import fs-extra and sharp
const fse = require("fs-extra");
const sharp = require("sharp");

// Import the Path module to specify directory
const path = require("path");

// Initializing db variable
let db;

// Import React and CatCard to render them into the server
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const CatCard = require("./src/components/CatCard").default; // To avoid complexities of ES6+

// When the app first launches, make sure the "public/uploaded-photos" folder exists
fse.ensureDirSync(path.join("public", "uploaded-photos"));

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

// Home Route
app.get("/", async (req, res) => {
  // DB query to fetch data
  const allCats = await db.collection("cats").find().toArray();

  // Custom style for the Cat Card
  const catCard = {
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px 30px"
  };
  
  // Generating HTML template
  const generatedHTML = ReactDOMServer.renderToString(
    <div className="container">
      <br /> <br /> <br />
      {!allCats.length && <h3>There are no cats yet, the admin need to add a few</h3>}
      <div style={catCard}>
        {allCats.map(cat => <CatCard key={cat._id} name={cat.name} breed={cat.breed} photo={cat.photo} id={cat._id} readOnly={true} />)}
      </div>
      <br />
      <h4><a href="/auth/login">Login / manage the cat listings</a></h4>
    </div>
  );
  res.render("home", {generatedHTML});
});

// Admin Route
app.get("/admin", (req, res) => {
  res.render("admin");
});

// Login Route GET method
app.get("/auth/:method?", function (req, res, next) {
  if (req.params.method == "login" || req.params.method == "signin") {
    res.render("auth", {method: "login"});
  } else if (req.params.method == "register" || req.params.method == "signup") {
    res.render("auth", {method: "register"});
  }
});

// Login Route POST method
app.post("/auth/:method?", ourCleanup, async function (req, res) {
  if (req.params.method == "login" || req.params.method == "signin") {
    const allUsers = await db.collection("users").find().toArray();
    console.log(allUsers);
    console.log(req.body.name);
    console.log(req.body.password);

    const userNameArray = [];
    const userPasswordArray = [];
    
    allUsers.forEach(user => userNameArray.push(user.name));
    console.log(userNameArray);
    allUsers.forEach(user => userPasswordArray.push(user.password));
    console.log(userPasswordArray);

    for (let i = 0; i < userNameArray.length; i++) {
      if (req.body.name == userNameArray[i]) {
        for (let j = 0; j < userPasswordArray.length; j++) {
          if (req.body.password == userPasswordArray[j]) {
            res.redirect('/admin');
          }
        }
      }
    }
    // res.send("To access the admin page you must register first!");
    
  } else if (req.params.method == "register" || req.params.method == "signup") {
    // Inserting data to MongoDB
    const info = await db.collection("users").insertOne(req.cleanUserData);
    const newUser = await db.collection("users").findOne({_id: new ObjectId(info.insertedId)})
    
    res.redirect("/auth/login");
  }
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
app.post("/create-cat", upload.single("photo"), ourCleanup, async (req, res) => {
  // Photo upload
  if(req.file) {
    const photoFileName = `${Date.now()}.jpg`;
    await sharp(req.file.buffer).resize(844, 456).jpeg({quality: 60}).toFile(path.join("public", "uploaded-photos", photoFileName)); // Resizing photo
    req.cleanData.photo = photoFileName; // Adding the file name to the object that we want to store in DB
  }
  // Before sendind data we want to check what browser is getting from its request
  console.log(req.body);
  // Inserting data to MongoDB
  const info = await db.collection("cats").insertOne(req.cleanData);
  const newCat = await db.collection("cats").findOne({_id: new ObjectId(info.insertedId)})
  // Because browser has no idea about the id and photo name
  // So we also need to send back the newly created document back to the browser
  // Our response
  res.send(newCat);
  // Now when we refresh the browser and the database we see the data has been successfully passed
});

/*
In the console we have gotten:

[Object: null prototype] {
  photo: '',
  name: 'Eleven',
  breed: 'Exotic Shorthair'
}
*/

// Route to delete data from the database
app.delete("/cat/:id", async (req, res) => {
  // If the id is not a string then we will set it to an empty string
  if(typeof req.params.id != "string") req.params.id = "";
  // Find the photo of the target cat
  const doc = await db.collection("cats").findOne({_id: new ObjectId(req.params.id)});
  // Then remove the photo from the uploaded-photos directory
  if(doc.photo) {
    fse.remove(path.join("public", "uploaded-photos", doc.photo));
  }
  // Delete operation
  db.collection("cats").deleteOne({_id: new ObjectId(req.params.id)});
  res.send("Successfully deleted!");
})

// Route to edit data on the database
app.post("/update-cat", upload.single("photo"), ourCleanup, async (req, res) => {
  if(req.file) {
    // If they are uploading a new photo
    // Copy and paste the photo upload section from "/create-cat" route
    const photoFileName = `${Date.now()}.jpg`;
    await sharp(req.file.buffer).resize(844, 456).jpeg({quality: 60}).toFile(path.join("public", "uploaded-photos", photoFileName)); // Resizing photo
    req.cleanData.photo = photoFileName; // Adding the file name to the object that we want to store in DB
    const info = await db.collection("cats").findOneAndUpdate({_id: new ObjectId(req.body._id)}, {$set: req.cleanData});
    // If we want to remove the photo
    if(info.value.photo) {
      fse.remove(path.join("public", "uploaded-photos", info.value.photo));
    }
    res.send(photoFileName);
  } else {
    // If they are not uploading a photo
    db.collection("cats").findOneAndUpdate({_id: new ObjectId(req.body._id)}, {$set: req.cleanData});
    res.send(false);
  }
})

// We need a data cleanup middleware to clean our data from garbage data or malicious inputs
function ourCleanup(req, res, next) {
  if(typeof req.body.name != "string") req.body.name = "";
  if(typeof req.body.breed != "string") req.body.breed = "";
  if(typeof req.body._id != "string") req.body._id = "";
  if(typeof req.body.password != "string") req.body.password = "";

  req.cleanData = {
    name: sanitizeHTML(req.body.name.trim(), {allowedTags: [], allowedAttributes: {}}),
    breed: sanitizeHTML(req.body.breed.trim(), {allowedTags: [], allowedAttributes: {}})
  }

  req.cleanUserData = {
    name: sanitizeHTML(req.body.name.trim(), {allowedTags: [], allowedAttributes: {}}),
    password: sanitizeHTML(req.body.password.trim(), {allowedTags: [], allowedAttributes: {}})
  }

  next();
}

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