// Import the Express framework
import express from 'express';

// Import body-parser middleware so we can read POST form data
import bodyParser from 'body-parser';

// Tools to recreate __dirname in ES Modules
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// Convert the current file path into a regular directory name
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create the Express application
const app = express();

// The port where the server will listen
const PORT = 3000;

// A simple variable to store whether the user is logged in
// (Not ideal for real apps, but fine for this lesson)
var userIsAuthorised = false;

// Middleware that reads form data and places it into req.body
app.use(bodyParser.urlencoded({ extended: true }));


// Custom middleware that checks if password is correct
function passwordCheck(req, res, next) {

  // Extract password from the incoming form
  const password = req.body.password;

  // If the password matches, authorize the user
  if (password === 'ILoveProgramming') {
    userIsAuthorised = true;
  }

  // Move on to the next middleware or route handler
  next();
}

// Apply our password-checking middleware to every request
app.use(passwordCheck);


// GET route for homepage
// Send the index.html file
// Note: sendFile must take a full absolute path

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// POST route for submitting password
app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
