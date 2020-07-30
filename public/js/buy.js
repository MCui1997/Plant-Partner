
/* eslint-disable quotes */
/* eslint-disable unexpected character */
$(document).ready(function() {

  getPlants();

  // This function grabs plants from the database and updates the view
  function getPlants() {
    $.get("/api/sell_data").then(function(data) {

      var html = "";

    for (var a = 0; a <data.length; a++){

      var templateString = '<h2>' + (Object.values(data[a].plantName).join('')) + '</h2><p>' + Object.values(data[a].price).join('') + '</p><p>' + Object.values(data[a].description).join('') + '<img class = "card-img-top" src = '+ Object.values(data[a].imgURL).join('')+'>';
        html += `      
           <div class="col-4">
            <div class="card" style="width:20em;text-align:center;display:inline-block;">
                 <div class="card-body">
                 `+templateString+`br>
                </div>
              </div>
        </div>`;
      };
      $('#plant-name').append(`<div class="row">`+html+`</div>`);
    });
  }
});