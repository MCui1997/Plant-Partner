// Construct results information
var commonName = $("<h2>").text(response.data.common_name);
var slug = $("<p>").text(response.data.slug);
var scientificName = $("<p>").text(response.data.scientific_name);
var yrPublishedAsSpecies = $("<p>").text(response.data.year);
var synonyms = $("<p>").text(response.data.synonyms);
var family = $("<p>").text(response.data.family);
var img = $("<img>").attr(response.data.img_url);

// Empty search contents
$(".searchBar").empty();
$(".queryResults").append(commonName, slug, scientificName, yrPublishedAsSpecies, synonyms, family, img);

// Event listener for when search button is clicked
$(".btn").on("click", function (event) {
  event.preventDefault();
  /* eslint-disable no-unused-vars */
  var searchQuery = $(".searchBar").val().trim();

  // Run searchPlants function
  searchPlants();

});


/*
"id": 678281,
"common_name": "Evergreen Oak",
"slug": "quercus-rotundifolia",
"scientific_name": "Quercus rotundifolia",
"year": 1785,
"bibliography": "Encycl. 1: 723 (1785)",
"author": "Lam.",
"status": "accepted",
"rank": "species",
"family_common_name": null,
"genus_id": 5778,
"image_url": "https://bs.floristic.org/image/o/1a03948baf0300da25558c2448f086d39b41ca30",
"synonyms": [
"Quercus rotundifolia var. macrocarpa",
"Quercus rotundifolia f. brevicupulata",
"Quercus rotundifolia subsp. maghrebiana",
"Quercus rotundifolia var. brevicupulata",
"Quercus rotundifolia var. pilosella",
"Quercus ilex subsp. ballota",
"Quercus ilex f. macrocarpa",
"Quercus rotundifolia f. calycina",
"Quercus rotundifolia f. macrocarpa",
"Quercus rotundifolia f. pilosella",
"Quercus rotundifolia f. dolichocalyx",
"Quercus calycina",
"Quercus ilex f. brevicupulata",
"Quercus ballota",
"Quercus rotundifolia f. crassicupulata",
"Quercus lyauteyi"
],
"genus": "Quercus",
"family": "Fagaceae",
"links": {
"self": "/api/v1/species/quercus-rotundifolia",
"plant": "/api/v1/plants/quercus-rotundifolia",
"genus": "/api/v1/genus/quercus"

*/