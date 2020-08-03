$(document).ready(function () {

    getPlants();

    function getPlants() {
        $.get("/api/sell_data", function (data) {
            console.log(data);
            if (data.length !== 0) {
                data.map(plant => {

                    if (plant.sold === true) {

                        let plantCard = $("<div>").attr({ class: "card", "data-id": plant.id, style: "width: 15em;" })
                        $("#recent-sold").append(plantCard);

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

                        $("#recent-sold").append(plantCard);
                    }
                })
            }
        })
    }
});