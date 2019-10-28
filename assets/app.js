var topics = ["Toy Story", "The Simpsons", "Rilakkuma", "Aladdin", "Big Mouth", "Family Guy", "Land Before Time", "Cinderella", "Mulan", "Trolls"]

// FUNCTION TO DISPLAY GIFS
function displayGif() {

    var title = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&limit=10&rating=PG13&apikey=QWPefb4T4UfHSWwLEDxMZmKFzKnHDbhS";

    console.log("Title: " + title);

    // CREATED DIV FOR EACH SET OF 10 GIFS TO POPULATE
    var gifGrouping = $("<div>");
    $("#gif-display").prepend(gifGrouping);
    gifGrouping.addClass("border border-2 border-warning mb-3");

    // AJAX call for when generated button is clicked
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {

        var results = response.data;
        console.log("Results: " + results);

        for (var i = 0; i < results.length; i++) {

            // New div to hold gif + rating
            var gifHolder = $("<div>");
            gifHolder.addClass("mr-3 p-2 d-inline-block");

            // Assign gif URLs to variables
            var imgURL = results[i].images.fixed_height_still.url;
            var imgURLanimated = results[i].images.fixed_height.url;

            // New image tag for still gif
            var gifImage = $("<img>");
            gifImage.attr("src", imgURL);
            gifImage.attr("class", "thegif");
            // Add "data" attributes
            gifImage.attr("data-still", imgURL);
            gifImage.attr("data-animate", imgURLanimated);
            gifImage.attr("data-state", "still");
            gifHolder.append(gifImage);

            // New p tag to hold rating
            var pRating = $("<p>");

            // Add rating to new div
            var rating = results[i].rating;
            pRating.append("Rated : " + rating);
            gifHolder.append(pRating);

            // test&debug
            console.log("Still Image URL: " + imgURL);
            console.log("Rating: " + rating);

            // Prepend new div to gif-display
            $(gifGrouping).prepend(gifHolder);

        }

    });

}

// WHEN BUTTON class=thisgif IS CLICKED: 
// 1) RUN FUNCTION TO ANIMATE GIF
$(document).on("click", ".thegif", animateGif);

// FUNCTION TO ANIMATE GIFS
function animateGif() {

    var state = $(this).attr("data-state");
    console.log("State: " + state);

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

// FUNCTION TO GENERATE BUTTONS
function generateButtons() {

    $("#button-display").empty();

    for (var i = 0; i < topics.length; i++) {
        var newbutton = $("<button>");
        newbutton.addClass("animation-name btn btn-warning m-1");
        newbutton.attr("data-name", topics[i]);
        newbutton.text(topics[i]);
        $("#button-display").append(newbutton);
    }
}

// WHEN SEARCH BUTTON IS CLICKED: 
// 1) TAKE VALUE FROM USER-INPUT AND PUSH TO ARRAY,
// 2) THEN RUN FUNCTION TO GENERATE BUTTON
$("#search-button").on("click", function (event) {

    // event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();

    // This line will grab the text from the input box
    var newTopic = $("#user-input").val().trim();
    // The movie from the textbox is then added to our array
    topics.push(newTopic);

    // calling renderButtons which handles the processing of our movie array
    generateButtons();
});

// CALL FUNCTION TO GENERATE BUTTON FUCTION TO DISPLAY INITIAL LIST OF MOVIES
generateButtons();

// WHEN BUTTON class=animation-name IS CLICKED: 
//      RUN FUNCTION TO DISPLAY GIF
$(document).on("click", ".animation-name", displayGif);