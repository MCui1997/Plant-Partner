// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
// var axios = require("axios");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      wallet: req.body.wallet,
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      res.json({
        email: req.user.email,
        id: req.user.id,
        wallet: req.user.wallet
      });
    }
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/wallet", function(req, res) {

    // Otherwise send back the user's email and id
    res.json({
      wallet: req.user.wallet
    });

  });

  // PUT route for updating wallet balance
  app.put("/api/wallet", function(req, res) {

    db.User.update({
      wallet: req.body.wallet,
    },{
      where: {
        id: req.user.id
      }
    }).then(function() {

      req.session.passport.user.wallet = req.body.wallet;
      res.json();
      
    });
   
  });


};
