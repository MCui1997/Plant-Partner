var axios = require("axios");

app.get("/api/plant/:id", function(req, res) {
  axios.get("https://trefle.io/api/v1/plants/search?token=" + "fQwi4uQ6I6jf1791HHjEbmq1ZN24DWX-JReOLd8qNb0" + "&q=")
    .then(function (response) {
      res.json(response);
    });
});