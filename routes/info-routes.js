var axios = require("axios");

module.exports = function (app) {
  app.get("/api/plant/:id", function (req, res) {
    console.log(req.params.id);
    axios.get("https://trefle.io/api/v1/plants/search?token=" + "fQwi4uQ6I6jf1791HHjEbmq1ZN24DWX-JReOLd8qNb0" + "&q=" + req.params.id)
      .then(function (response) {
        res.json(response.data);
      }).catch(function (error) {
        console.log(error);
      });
  });
};