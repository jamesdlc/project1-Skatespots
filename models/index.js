var mongoose = require("mongoose");
module.exports.Skatespot = require("./skatespots.js");
module.exports.Cities = require("./cities.js");
// module.exports.User = require("./user.js");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/skatespots" );
