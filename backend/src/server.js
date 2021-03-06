if(process.env.NODE_ENV !== 'production'){
  require("dotenv").config();
}

// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require('path');

const users = require('../routes/api/users');

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


// db connection
require("./db");


// Passport middleware
app.use(passport.initialize());

// Passport config
require('../config/passport')(passport);

// Routes
app.use('/api/users', users);

//  Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  const root = path.join(__dirname, '..', 'client', 'build');
  // Set static folder
  app.use(express.static(root));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('index.html', { root }));
  });
}

const port = process.env.PORT || 5000;

async function main() {
  await app.listen(port, () =>
    console.log(`Server up and running on port ${port} !`)
  );
}

main();
