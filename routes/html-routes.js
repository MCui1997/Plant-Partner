// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/index", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/buy", function(req, res) {
    // If the user already has an account send them to the members page
    if (!req.user) {
      return res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/buy.html"));
  });

  app.get("/sell", function(req, res) {
    // If the user already has an account send them to the members page
    if (!req.user) {
      return res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/sell.html"));
  });

  app.get("/members", function(req, res) {
    // If the user already has an account send them to the members page
    if (!req.user) {
      return res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {

    if(req.user){
      req.logout();
      res.redirect("/");
    }
  
  });


  app.get("/info", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/info.html"));
  });
};
