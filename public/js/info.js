/* eslint-disable no-unused-vars */
var baseUrl = "https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants/search?token=";
var apiToken = "fQwi4uQ6I6jf1791HHjEbmq1ZN24DWX-JReOLd8qNb0";


$(document).ready(function () {

  searchWiki("lily");
  searchPlants("lily");

  // Event listener for when search button is clicked
  $(".search-btn").on("click", function (event) {
    event.preventDefault();

    $(".plantPic").empty();
    $(".scientificName").empty();
    $(".commonName-text").empty();
    $(".family-text").empty();
    $(".break").empty();

    var searchQuery = $(".searchBar").val();
    searchWiki(searchQuery);
    searchPlants(searchQuery);
    });

    
    // function to get trefle 
    function searchPlants(searchQuery){
      $.get("/api/trefle/" + searchQuery).then(response => {
        console.log(response);
  
        // Loop API results
        var results = response.data;
  
        for (var i = 0; i < 5; i++) {
  
          var plantImg = $("<Img>");
          plantImg.attr({ src: results[i].image_url, class: "plantPic" })
            .width("200px").height("200px");
  
          var plantDiv = $("<div>").attr("class", "card-info");
          var pCommon = $("<p>").attr("class", "info-text").text("Common Name: " + results[i].common_name);
          var pSci = $("<p>").attr("class", "info-text").text("Scientific Name: " + results[i].scientific_name);
          var pFamily = $("<p>").attr("class", "info-text").text("Family Name: " + results[i].family_common_name);
  
          plantDiv.append(plantImg);
          plantDiv.append(pCommon);
          plantDiv.append(pSci);
          plantDiv.append(pFamily);
  
          $(".plantPic").prepend(plantDiv); 
          $(".scientificName").prepend(plantDiv);
          $(".family-text").prepend(plantDiv);
          $(".break").prepend(plantDiv);
        
        }
    });
  
  }
  

// Function to get wiki link and description
  function searchWiki(searchQuery) {

    var url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + searchQuery;

    fetch(url)
      .then(function (response) {

        if (response.ok) {

          $.ajax({
            url: url,
            method: "GET"
          }).then(function (response) {

            console.log(response);

            $("#wikitext").text(response.extract);
            $("#wikiLink").text(response.content_urls.desktop.page);
            $("#wikiLink").attr("href", response.content_urls.desktop.page);


          });
        }
      });




  }


});
