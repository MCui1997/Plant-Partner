
/* eslint-disable quotes */
/* eslint-disable unexpected character */
$(document).ready(function () {

  var userid = 0;

  $("#searchBarFilt").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".card").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    }); 
  });

  $.get("api/user_data").then(function(data){

    userid = data.id;
  })


  getPlants();
  newWallet();



//if purchased change sold to true
$(document).on("click", ".buy-btn", function() {

  var id = this.id;

  //This checks to see if they are trying to buy their own item
  $.get("/api/price/" +id).then(function(data) {
    
    if (data.id === userid){

      alert("Can't buy your own item");
    }
    else{
      
      //Allow them to purchase
      getPrice(id);
    }

  });
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


  }
  //unable to buy
  else{
    alert("Not enough funds");
  }
}

//function to update wallet
function updateWallet(newBalance) {

  $.ajax({
    method: "PUT",
    url: "/api/wallet",
    data: {
      wallet: newBalance}
  }).then(location.reload());

}

//Get the balance of the wallet and display
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

    // if (data.sold === 0) {
    for (var a = 0; a < data.length; a++) {

      var templateString = '<h2>' + (Object.values(data[a].plantName).join('')) + '</h2><h4 id = "pricetag"> $ ' + Object.values(data[a].price).join('') + '</h4><p>' + Object.values(data[a].description).join('');
      var newImg = (Object.values(data[a].imgURL).join(''));
      var newId = data[a].id;

      html += `      
           <div class="col-sm-4">
            <div class="card" style="width:20em;text-align:center;display:inline-block;"  id = "generatedCards">
            <img class = "card-img-top" src = "`+ newImg +`">
                 <div class="card-body">
                 `+ templateString + `
                 <br>
                 <button class="btn buy-btn" id = "`+newId+`">Purchase</button>
                </div>
              </div>
        </div>`;
    };
    $('#plant-name').append(`<div class="row">`+ html +`</div>`);
  }); 
//   else {
//     for (var a = 0; a < data.length; a++) {

//       var templateString = '<h2>' + (Object.values(data[a].plantName).join('')) + '</h2><h4> $ ' + Object.values(data[a].price).join('') + '</h4><p>' + Object.values(data[a].description).join('');
//       var newImg = (Object.values(data[a].imgURL).join(''));
//       var newId = data[a].id;

//       html += `      
//            <div class="col-4">
//             <div class="card" style="width:20em;text-align:center;display:inline-block;"  id = "generatedCards">
//             <img class = "card-img-top" src = "`+ newImg +`">
//                  <div class="card-body">
//                  `+ templateString + `
//                  <br>
//                  <button class="btn buy-btn" id = "`+newId+`">Purchase</button>
//                 </div>
//               </div>
//         </div>`;
//     };
//     $('#sold-plant').append(`<div class="row">`+ html +`</div>`);

// }

// });
// }
}
});