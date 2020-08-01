/* eslint-disable no-unused-vars */
// var express = require("express");
var baseUrl = "https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants/search?token=";
var apiToken = "fQwi4uQ6I6jf1791HHjEbmq1ZN24DWX-JReOLd8qNb0";

$(document).ready(function () {

  // Event listener for when search button is clicked
  $(".btn").on("click", function (event) {
    event.preventDefault();
    /* eslint-disable no-unused-vars */
    var searchQuery = $(".searchBar").val();
    searchPlants();

    function searchPlants() {
      var queryUrl = baseUrl + apiToken + "&q=" + searchQuery;
      console.log(queryUrl);

      // AJAX call

      fetch(queryUrl)
        .then(function(response) {

          if(response.ok){

            $.ajax({
              url: queryUrl,
              method: "GET"
            }).then(function (response) {
              console.log(response);
            

              // Construct results information
              var commonName = response.data.common_name;
              var slug = response.data.slug;
              var scientificName = response.data.scientific_name;
              var yrPublishedAsSpecies = response.data.year;
              var synonyms = response.data.synonyms;
              var family = response.data.family;
              var imgPlant = response.data.img_url;

              $(".commonName").text(response.data.common_name);
              $(".slug").text(response.data.slug);
              $(".scientificName").text(response.data.scientific_name);
              $(".yrPublishedAsSpecies").text(response.data.year);
              $(".synonyms").text(response.data.synonyms);
              $(".family").text(response.data.family);
              $("#imgPlant").attr("src", img_url);

              // Clear search results
              $(".searchBar").empty();
              $(".queryResults").append(commonName, slug, scientificName, yrPublishedAsSpecies, synonyms, family, img);
            });
          }
        });

    }


  });

});