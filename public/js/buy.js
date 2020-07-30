
/* eslint-disable quotes */
/* eslint-disable unexpected character */
$(document).ready(function() {


// $("#searchBarFilt").on("keyup", function() {
//   var value = $(this).val().toLowerCase();
//   $("").filter(function() {
//     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
// });

  getPlants();

  });

  // This function grabs plants from the database and updates the view
  function getPlants() {
    $.get("/api/sell_data").then(function(data) {

      var html = "";

    for (var a = 0; a <data.length; a++){

      var templateString = '<h2>' + (Object.values(data[a].plantName).join('')) + '</h2><h4>' + Object.values(data[a].price).join('') + '</h4><p>' + Object.values(data[a].description).join('');
      var newImg = (Object.values(data[a].imgURL).join(''));

      html += `      
           <div class="col-4">
            <div class="card" style="width:20em;text-align:center;display:inline-block;"  id = "generatedCards">
            <img class = "card-img-top" src = "`+newImg+`">
                 <div class="card-body">
                 `+templateString+`
                 <br>
                 <button type = input class = "btn" id = "buy-btn">Purchase
                </div>
              </div>
        </div>`;
      };
      $('#plant-name').append(`<div class="row">`+html+`</div>`);
    });
  }

$(".buy-card").on("click", "#buy-btn", function (event) {
  event.preventDefault();

  if (event.target.type === 'submit') {
      let id = $(this).data("id");
      let tacoName = $("#readyEat").text();
      console.log(id);
      console.log(tacoName);

      $.ajax({
          url: `/api/${id}`,
          type: "PUT",
          data: id,
          success: (data) => {
              location.assign("/");
          }
      })
  }
});
