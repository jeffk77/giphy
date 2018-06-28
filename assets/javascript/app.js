var userText = "";
var giphys = ["Eye Roll", "Double Take", "Snicker", "Giggle", "Belly Laugh", "Sneer", "Exasperated", "Grimace", "Pout", "Cry"];
var giphysFull = false;
var giphyImage = "";
var imageRating = "";
var ratingText = "";

function createButtons() {
    $(".giphyButtons").empty();
    for (var i = 0; i < giphys.length; i++) {
        $("<button class='giphys'>" + giphys[i] + "</button>").appendTo(".giphyButtons");
	}
}

function addUserText() {
    giphys.push(userText);
}

function clearUserText() {
	userText = "";
	$(".searchBox").val("");
}

$(document).ready(function () {

	createButtons();

	$(".addButton").click(function (e) {
		userText = $(".searchBox").val();
		if (userText !== "") {
			addUserText();
			createButtons();
			clearUserText();
		} else {
			alert("Please enter a valid search topic.");
		}
	});

	$(".buttonSection").on("click", ".giphys", function (event) {

		var giphyChoiceText = $(this).text();

		var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=E3GCgeRKo8GLwMpNuLVdOjzcFCe3UIMD&q=" + giphyChoiceText + "&limit=10&offset=0&rating=G&lang=en";

		$.ajax({
			url: queryUrl,
			method: 'GET'
			}).done(function (response) {

			function giphyGenerate() {

				for (var i = 0; i < response.data.length; i++) {

					giphyImage = $("<img class='stillPictures'>");

					giphyImage.attr('src', response.data[i].images.fixed_height_still.url);
					giphyImage.attr('data-still', response.data[i].images.fixed_height_still.url);
					giphyImage.attr('data-animate', response.data[i].images.fixed_height.url);
					giphyImage.attr('data-state', "still");

					imageRating = response.data[i].rating;

					ratingText = $("<div class='rating'>");

					ratingText.text("Rating: " + imageRating);

					$(".giphyImages").append(ratingText);

					$(".giphyImages").append(giphyImage);

					giphysFull = true;
					}
				}

				if (giphysFull == false) {

					giphyGenerate();

				} else {
					$(".giphyImages").empty();

					giphysFull = false;

					giphyGenerate();
				}
			});
		});

	$(document).on("click", ".stillPictures", function (event) {
		var that = $(this);

		var currentData = that.attr("data-state");
		var animateCurrent = that.attr("data-animate");
		var stillCurrent = that.attr("data-still");

		if (currentData == "still") {
			that.attr('data-state', "animate");
			that.attr('src', animateCurrent);
		} else if (currentData == "animate") {
			that.attr('data-state', "still");
			that.attr('src', stillCurrent);
		}
	});

});