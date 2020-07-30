$(document).ready(function() {

  /* eslint-disable no-unused-vars */
  var sellerForm = $("form.selling");
  var plantNameInput = $("input#title");
  var priceInput = $("input#price");
  var descriptionInput = $("textarea#description");
  var imgUrlInput = $("input#imgURL");

  sellerForm.on("submit", function(event) {
    event.preventDefault();
    var itemData = {
      plantName: plantNameInput.val().trim(),
      price: priceInput.val().trim(),
      description: descriptionInput.val().trim(),
      imgUrl: imgUrlInput.val().trim()
    };

    if (!itemData.plantName || !itemData.price || !itemData.description || !itemData.imgUrl) {
      alert("Oops! Something is missing. Please fill out all fields.");
      return;
    }

    
    $("input#title").val("");
    $("input#price").val("");
    $("textarea#description").val("");
    $("input#imgURL").val("");
    
    $.post("/api/sell", itemData);
    // On success, run the following code
  });

    
});