// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });


  app.put("/api/buy/:id", function (req, res, err) {
    console.log(req.params.id);
    db.Plant.update(
      {
        sold: true,
        buyerId: req.user.id
      },

      {
        returning: true,
        where: { id: req.params.id }
      })
      .then(function (results) {
        res.json(results);
      }).catch(err);
  });


  // Route for getting some data about our plant to be used client side
  app.get("/api/price/:id", function (req, res) {
    db.Plant.findOne({

      where: {
        id: req.params.id
      }
    }).then(function (dbPlant) {
      res.json({
        price: dbPlant.price,
        id: dbPlant.UserId

      });
    });
  });

  // Route for getting some data about our plant to be used client side
  app.get("/api/wallet/:id", function (req, res) {

    console.log(req.params.id);

    db.User.findOne({

      where: {
        id: req.params.id
      }
    }).then(function (dbWallet) {
      res.json({
        wallet: dbWallet.wallet
      });
    });
  });


  // PUT route for updating wallet balance
  app.put("/api/sellerwallet", function (req, res) {


    db.User.update({
      wallet: req.body.wallet,
    }, {
      where: {
        id: req.body.id
      }
    }).then(function () {

      res.json();

    });

  });



};