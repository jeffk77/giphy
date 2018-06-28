// Variable and Array Establishing
var userText = "";
var giphys = ["Shawshank Redemption", "Toy Story", "Men in Black", "Ace Ventura", "Avengers", "Short Circuit", "Trading Places", "Coming to America", "Dirty Harry", "Iron Man", "The Expendables", "Terminator", "Judge Dredd", "Star Wars", "Star Trek"];
var giphysFull = false;
var giphyImage = "";
var imageRating = "";
var ratingText = "";

// Establishing the createButtons function, appending user created buttons based on inputted data, to the giphyButtons class.
function createButtons() {
    $(".giphyButtons").empty();
    for (var i = 0; i < giphys.length; i++) {
        $("<button class='giphys'>" + giphys[i] + "</button>").appendTo(".giphyButtons");
	}
}

// addUserText function, used to grab user data, and push it to the userText variable.
function addUserText() {
    giphys.push(userText);
}

// emptying user text box after accepting and pushing it to a variable.
function clearUserText() {
	userText = "";
	$(".searchBox").val("");
}

$(document).ready(function () {

	// Calling the createButtons function
	createButtons();

	// The series of functions designed to accept user search entry, create the applicable button, and then clear the entry.
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

	// The response to a user click on a button, either created, or pre-supplied.
	$(".buttonSection").on("click", ".giphys", function (event) {

		// The variable containing the user's search text.
		var giphyChoiceText = $(this).text();

		// The url of the GIPHY API, utlizing a combination of my API particulars, and the content of the user search, and finally a limiting of the search results to 10.
		var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=E3GCgeRKo8GLwMpNuLVdOjzcFCe3UIMD&q=" + giphyChoiceText + "&limit=10&offset=0&rating=G&lang=en";

		$.ajax({
			url: queryUrl,
			method: 'GET'
			}).done(function (response) {

			function giphyGenerate() {

				// This for loop, provides the still images drawn from the GIPHY API.
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

	// The function that allows the GIF's to respond to a click, to animate them, and to still again, if clicked on again.
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