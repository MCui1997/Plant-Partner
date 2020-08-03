$(document).ready(function () {
  let userid = 0;
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/wallet").then(function (data) {
    $(".wallet-name").text("$" + data.wallet);
  });

  $.get("api/user_data").then(function (data) {
    userid = data.id;
  })

  $.get("/api/sell_data", function (data) {
    console.log(data);
    if (data.length !== 0) {
      data.map(plant => {

        if (userid === parseInt(plant.buyerId)) {

          let plantCard = $("<div>").attr({ class: "card", "data-id": plant.id, style: "width: 15em;" })
          $(".bought-plant").append(plantCard);

          let cardImg = $("<img>").addClass("card-img-top").attr("src", plant.imgURL);
          $(plantCard).append(cardImg);

          let plantInfo = $("<div>").addClass("card-body d-flex flex-column");
          $(plantCard).append(plantInfo);

          let name = $("<h2>").addClass("card-title").text(plant.plantName);
          $(plantInfo).append(name);

          let plantPrice = $("<h4>").text("$ " + plant.price);
          $(plantInfo).append(plantPrice);

          let plantDesc = $("<p>").addClass("card-text").text(plant.description);
          $(plantInfo).append(plantDesc);

          $(plantCard).appendTo(".bought-plant");

        } 
      })
    }
  })

  $.get("/api/sell_data", function (data) {
    console.log(data);
    if (data.length !== 0) {
      data.map(plant => {

        if (plant.sold === true && userid === plant.UserId) {

          let plantCard = $("<div>").attr({ class: "card", "data-id": plant.id, style: "width: 15em;" })
          $(".sold-plant").append(plantCard);

          let cardImg = $("<img>").addClass("card-img-top").attr("src", plant.imgURL);
          $(plantCard).append(cardImg);

          let plantInfo = $("<div>").addClass("card-body d-flex flex-column");
          $(plantCard).append(plantInfo);

          let name = $("<h2>").addClass("card-title").text(plant.plantName);
          $(plantInfo).append(name);

          let plantPrice = $("<h4>").text("$ " + plant.price);
          $(plantInfo).append(plantPrice);

          let plantDesc = $("<p>").addClass("card-text").text(plant.description);
          $(plantInfo).append(plantDesc);

          $(plantCard).appendTo(".sold-plant");

        } 
      })
    }
  })

});
