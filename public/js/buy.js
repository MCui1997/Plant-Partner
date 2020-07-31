
/* eslint-disable quotes */
/* eslint-disable unexpected character */
$(document).ready(function () {

  getPlants();
  newWallet();


// If purchase btn clicked
$(document).on("click",".buy-btn", function(){

  var id = this.id
  getPrice(id)

});

// function to get price of the selected plant
function getPrice(id){

  $.get("/api/price/" +id).then(function(data) {
    var newPrice = parseInt(data.price);
    getWallet(newPrice,id);
  });
}

// function to get the current balance in the user wallet
function getWallet(newPrice,id){

  
  $.get("/api/wallet").then(function(data) {
    var balance = parseInt(data.wallet);
    checkout(newPrice,balance,id);
    $(".wallet-name").text("$"+balance);
  });
}


function checkout(newPrice,balance,id){

  //able to buy
  if (balance >= newPrice){
    var newBalance = balance - newPrice;
    updateWallet(newBalance);

    $.ajax({
    method: "DELETE",
    url: "/api/buy/" + id
    }).then(getPlants);


  }
  //unable to buy
  else{
    console.log("Not enough funds");
  }
}

//function to update wallet
function updateWallet(newBalance) {

  $.ajax({
    method: "PUT",
    url: "/api/wallet",
    data: {
      wallet: newBalance}
  }).then(newWallet);

}

function newWallet(){

  $.get("/api/wallet").then(function(data) {
    var balance = parseInt(data.wallet);
    $(".wallet-name").text("$"+balance);
});
}

// This function grabs plants from the database and updates the view
function getPlants() {

  $("#plant-name").text("");
  $.get("/api/sell_data").then(function (data) {

    var html = "";

    for (var a = 0; a < data.length; a++) {

      var templateString = '<h2>' + (Object.values(data[a].plantName).join('')) + '</h2><h4 id = "pricetag"> $ ' + Object.values(data[a].price).join('') + '</h4><p>' + Object.values(data[a].description).join('');
      var newImg = (Object.values(data[a].imgURL).join(''));
      var newId = data[a].id;
  

      html += `      
           <div class="col-4">
            <div class="card" style="width:20em;text-align:center;display:inline-block;"  id = "generatedCards">
            <img class = "card-img-top" src = "`+ newImg + `">
                 <div class="card-body">
                 `+ templateString + `
                 <br>
                 <button class = "buy-btn" id = "`+newId+`">Purchase</button>
                </div>
              </div>
        </div>`;
    };
    $('#plant-name').append(`<div class="row">` + html + `</div>`);
  });
}

});