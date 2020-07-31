// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });
  
  // Route for getting some data about our plant to be used client side
  app.get("/api/sell_data", function(req, res) {
    db.Plant.findAll({}).then(function(dbPlant) {
      res.json(dbPlant);
    });
  });

  app.post("/api/sell", function(req, res) {    
    db.Plant.create({
      plantName: req.body.plantName,
      price: req.body.price,
      description: req.body.description,
      imgURL: req.body.imgUrl,
      UserId: req.user.id
    }).then(function(dbPlant) {
      res.json(dbPlant);
    });
  });

  

};