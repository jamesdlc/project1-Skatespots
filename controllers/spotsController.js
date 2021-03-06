var db = require('../models');

// GET /api/skatespots
function index(req, res) {
  db.Skatespot.find({}, function(err, skatespot) {
    if (err) {
      res.send(err);
    }
    res.json(skatespot);
  });
}

//GET by id /api/skatespots/:id
function show(req, res) {
  db.Skatespot.findById(req.params.skatespotId, function(err, foundSkatespot) {
    if (err) {
      console.log('foundSkatespot.show error', err);
    }
    console.log('afoundSkatespot.show responding with', foundSkatespot);
    res.json(foundSkatespot);
  });
}

// create spot associated with cityId
function create(req,res){
  var cityId = req.params.cityId;
  var newSkatespot = new db.Skatespot({
    name: req.body.name,
    address: req.body.address,
    security_guards: req.body.security_guards,
    difficulty_level: req.body.difficulty_level,
    features: req.body.features,
    pictures: req.body.pictures,
    tips: req.body.tips
  });
  db.City.findById(cityId, function(err, city){
    if (err) {
      return console.log(err);
    }
    console.log(cityId + "test");
    newSkatespot.city = city;
    newSkatespot.save(function(err, skatespot){
      if (err) {
        return console.log("save error: " + err);
      }
      console.log("saved ", skatespot.city);
      // send back the book!
      res.json(skatespot);
  });
});
}

//PUT /api/skatespots/:id update existing spo
function update(req, res) {
  console.log('updating with data', req.body);
  var updateData = req.body;
  var id = req.params.skatespotId;
  console.log(id);
  db.Skatespot.findByIdAndUpdate(id, updateData, {new: true}, function(err, savedUpdatedSkatespot) {
    if (err) {
      console.log('skateSpotToUpdate error', err);
    }
    console.log(savedUpdatedSkatespot);
    res.json(savedUpdatedSkatespot);
  });
}

// Delete by ID
function destroy(req, res) {
  db.Skatespot.findOneAndRemove({_id: req.params.skatespotId}, function(err, skatespotToDelete) {
    if (err) {
      console.log(err, "unable to delete");
    }
    res.json(skatespotToDelete);
    console.log("you did it!");
  });
}

//get skatespots by cityId
function spotsByCityId(req,res){
  var cityId = req.params.cityId;
  db.City.findById(cityId, function(err, city){
    if (err) {
      console.log(err);
    }
    db.Skatespot.find({city: city}, function (err, citySpots){
      if (err){
        console.log(citySpots + "test");
      }
      res.json(citySpots);
    });
  });
}

//create skatespot that DOESNT reference city ID

function createSkatespot(req, res) {
    db.Skatespot.create(req.body, function(err, createdSkatespot) {
        if (err) {
            console.log("error", err);
        }
        res.json(createdSkatespot);
    });
}


module.exports = {
  create: create,
  index: index,
  show: show,
  destroy: destroy,
  update: update,
  spotsByCityId: spotsByCityId,
  createSkatespot: createSkatespot
};
