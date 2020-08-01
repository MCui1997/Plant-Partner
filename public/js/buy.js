/* eslint-disable quotes */
/* eslint-disable unexpected character */
$(document).ready(function () {
  let arr = [];
  let userid = 0;
  let idforseller = 0;

  //filter card selection in shop
  $("#searchBarFilt").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".card").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    }); 
  });

  //get user data to get the user id
  $.get("api/user_data").then(function(data){
    userid = data.id;
  })

  newWallet();
  getPlants();

//on button click
$(document).on("click", ".buy-btn", function() {

  let id = $(this).data("id");

  //This checks to see if they are trying to buy their own item
  $.get("/api/price/" + id).then(function(data) {
    if (data.id === userid){
      alert("Can't buy your own item");
    }
    else{

      $.ajax({
        method: "PUT",
        url: `/api/buy/${id}`
      }).then(getPlants);
    
      //Allow them to purchase
      getPrice(id);
      idforseller = data.id;
    }

  });
});

// function to get price of the selected plant
function getPrice(id){

  $.get("/api/price/" + id).then(function(data) {
    var newPrice = parseInt(data.price);
    getWallet(newPrice);
  });
}

// function to get the current balance in the user wallet
function getWallet(newPrice){
  
  $.get("/api/wallet").then(function(data) {
    var balance = parseInt(data.wallet);
    checkout(newPrice,balance);
    $(".wallet-name").text("$"+balance);
  });
}

function checkout(newPrice,balance){

  //able to buy
  if (balance >= newPrice){
    var newBalance = balance - newPrice;
    getSellerWallet(newPrice,idforseller,newBalance);
    
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

function getSellerWallet(newPrice,id,update){

  $.get("/api/wallet/" +id).then(function(data) {
    var sellerwallet = data.wallet;
    var newbalance = parseInt(sellerwallet) + newPrice;
    updateSellerWallet(newbalance,id,update);
  });

}

function updateSellerWallet(newbalance,id,update){

  $.ajax({
    method: "PUT",
    url: "/api/sellerwallet",
    data: {
      wallet: newbalance,
      id: id}
  })

  updateWallet(update);
}

//Get the balance of the wallet and display
function newWallet(){

  $.get("/api/wallet").then(function(data) {
    var balance = parseInt(data.wallet);
    $(".wallet-name").text("$"+balance);
    })
  };

  function getPlants() {
  $.get("/api/sell_data", function (data) {
    if (data.length !== 0) {
        data.map(plant => {
            arr.push(plant.id)
  
            if (plant.sold === false) {
  
              let plantCard = $("<div>").attr({ class: "card", "data-id": plant.id, style: "width: 15em;"})
              $("#plant-name").append(plantCard);
      
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
    
              let buyButton = $("<button>").attr({ class: "btn buy-btn mt-auto", "data-id": plant.id} ).text("Gimme Green");
              $(plantInfo).append(buyButton);
  
              $("#plant-name").append(plantCard);
  
            } else {
              let plantCard = $("<div>").attr({ class: "card", "data-id": plant.id, style: "width: 15em;"})
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
  
              $( plantCard ).appendTo( ".sold-plant" );
            }
        })
    }
  });
};

// function getPlants() {
//   $.get("/api/sell_data", function (data) {
//       if (data.length !== 0 && arr.length !== 0 && data.length !== arr.length) {
//           let arrLength = arr.length;

//           for (var i = arrLength; i < data.length; i++) {
//           let plant = {
//               id: data[i].id,
//               plantName: data[i].plantName,
//               price: data[i].price,
//               description: data[i].description,
//               imgURL: data[i].imgURL,
//               sold: data[i].sold
//           }
//           arr.push(plant.id)

//           let plantCard = $("<div>").attr({ class: "card", "data-id": plant.id, style: "width: 15em;"})
//           $("#plant-name").append(plantCard);
  
//           let cardImg = $("<img>").addClass("card-img-top").attr("src", plant.imgURL);
//           $(plantCard).append(cardImg);
  
//           let plantInfo = $("<div>").addClass("card-body d-flex flex-column");
//           $(plantCard).append(plantInfo);
  
//           let name = $("<h2>").addClass("card-title").text(plant.plantName);
//           $(plantInfo).append(name);
  
//           let plantPrice = $("<h4>").text("$ " + plant.price);
//           $(plantInfo).append(plantPrice);
  
//           let plantDesc = $("<p>").addClass("card-text").text(plant.description);
//           $(plantInfo).append(plantDesc);
  
//           let buyButton = $("<button>").attr({ class: "btn buy-btn mt-auto", "data-id": plant.id} ).text("Gimme Green");
//           $(plantInfo).append(buyButton);

//           $('#plant-name').append(plantCard);
//           }
//           } else {
//               for (var i = 0; i < data.length; i++) {
//                 let plant = {
//                   id: data[i].id,
//                   plantName: data[i].plantName,
//                   price: data[i].price,
//                   description: data[i].description,
//                   imgURL: data[i].imgURL,
//                   sold: data[i].sold
//               }
//               arr.push(plant.id)

//               let plantCard = $("<div>").attr({ class: "card", "data-id": plant.id, style: "width: 15em;"})
//               $("#plant-name").append(plantCard);
      
//               let cardImg = $("<img>").addClass("card-img-top").attr("src", plant.imgURL);
//               $(plantCard).append(cardImg);
      
//               let plantInfo = $("<div>").addClass("card-body d-flex flex-column");
//               $(plantCard).append(plantInfo);
      
//               let name = $("<h2>").addClass("card-title").text(plant.plantName);
//               $(plantInfo).append(name);
      
//               let plantPrice = $("<h4>").text("$ " + plant.price);
//               $(plantInfo).append(plantPrice);
      
//               let plantDesc = $("<p>").addClass("card-text").text(plant.description);
//               $(plantInfo).append(plantDesc);

//               let buyButton = $("<button>").attr({ class: "btn buy-btn mt-auto", "data-id": plant.id} ).text("Gimme Green");
//               $(plantInfo).append(buyButton);
    
//               $('#plant-name').append(plantCard);

//           };
//       }
//   })
// }

// $.get("/api/sell_data", function (data) {
//   if (data.length !== 0) {
//       data.map(plant => {
//           arr.push(plant.id)

//           let plantCard = $("<div>").attr({ class: "card", "data-id": plant.id, style: "width: 15em;"})
//           $("#plant-name").append(plantCard);
  
//           let cardImg = $("<img>").addClass("card-img-top").attr("src", plant.imgURL);
//           $(plantCard).append(cardImg);
  
//           let plantInfo = $("<div>").addClass("card-body d-flex flex-column");
//           $(plantCard).append(plantInfo);
  
//           let name = $("<h2>").addClass("card-title").text(plant.plantName);
//           $(plantInfo).append(name);
  
//           let plantPrice = $("<h4>").text("$ " + plant.price);
//           $(plantInfo).append(plantPrice);
  
//           let plantDesc = $("<p>").addClass("card-text").text(plant.description);
//           $(plantInfo).append(plantDesc);

//           if (plant.sold !== true) {
//             let buyButton = $("<button>").attr({ class: "btn buy-btn mt-auto", "data-id": plant.id} ).text("Gimme Green");
//             $(plantInfo).append(buyButton);
//               $("#plant-name").append(plantCard);
//           } else {
//             $( plantCard ).appendTo( ".sold-plant" );
//           }
//       })
//   }
// });

});

