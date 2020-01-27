const mongoose = require("mongoose");

// DB config
const URI = require("../config/keys").MongoURI;

// Connect to MongoDB
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
