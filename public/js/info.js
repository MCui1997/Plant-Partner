/* eslint-disable no-unused-vars */
var baseUrl = "https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants/search?token=";
var apiToken = "fQwi4uQ6I6jf1791HHjEbmq1ZN24DWX-JReOLd8qNb0";


$(document).ready(function () {

  // Event listener for when search button is clicked
  $(".btn").on("click", function (event) {
    event.preventDefault();
    var searchQuery = $(".searchBar").val();
    searchWiki(searchQuery);
    searchPlants(searchQuery);
  });

  // Function to get information from Trefle API
  function searchPlants(searchQuery) {
    var queryUrl = baseUrl + apiToken + "&q=" + searchQuery;
    console.log(queryUrl);

    fetch(queryUrl)
      .then(function (response) {

        if (response.ok) {

          $.ajax({
            url: queryUrl,
            method: "GET"
          }).then(function (response) {
            console.log(response);

            // Loop API results
            var results = response.data;

            for (var i = 0; i < results.length; i++) {


              var plantImg = $("<Img>");
              plantImg.attr("src", results[i].image_url)
                .width("200px").height("200px");

              var plantDiv = $("<div>");
              var pCommon = $("<p>").text("Common Name: " + results[i].common_name);
              var pSci = $("<p>").text("Scientific Name: " + results[i].scientific_name);
              var pFamily = $("<p>").text("Family Name: " + results[i].family_common_name);
              
              plantDiv.append(plantImg);
              plantDiv.append(pCommon);
              plantDiv.append(pSci);
              plantDiv.append(pFamily);
              

              $(".plantPic").prepend(plantDiv);
              $(".commonName").prepend(plantDiv);
              $(".scientificName").prepend(plantDiv);
              $(".family-text").prepend(plantDiv);
              $(".break").prepend(plantDiv);
             

              // Construct results information
              var imgPlant = response.data[i].image_url;
              var commonName = response.data[i].common_name;
              var scientificName = response.data[i].scientific_name;
              var family = response.data[i].family_common_name;

              $("#imgPlant").attr("src", imgPlant);
              $(".commonName-text").text("Common Name: " + commonName);
              $(".scientificName-text").text("Scientific Name: " + scientificName);
              $(".family-text").text("Family Common Name: " + family);

      
            }
          });
        }
      });
  }




  function searchWiki(searchQuery){

    var url = "https://en.wikipedia.org/api/rest_v1/page/summary/"+ searchQuery;

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
