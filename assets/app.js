var topics = ["Toy Story", "The Simpsons", "Rilakkuma", "Aladdin", "Big Mouth", "Family Guy", "Land Before Time", "Cinderella", "Mulan", "Trolls"]

function displayGif() {

    var title = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&limit=10&rating=PG13&apikey=QWPefb4T4UfHSWwLEDxMZmKFzKnHDbhS";

    console.log("Data-name = " + title);

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {

        // var results = response.data;
        console.log(response.data);

        // New div to hold gif + rating
        var gifHolder = $("<div>")

        // Add image to new div
        var imgURL = response.data[1].images.fixed_height_still.url;
        console.log("imgURL: " + imgURL);
        gifHolder.append("<img src=\"" + imgURL + "\">");

        // New p tag to hold rating
        var pRating = $("<p>")

        // Add rating to new div
        var rating = response.data[1].rating;

        pRating.append("Rated : " + rating);
        gifHolder.append(pRating);

        // Prepend new div to gif-display
        $("#gif-display").prepend(gifHolder);





        // var results = response.data;

        // for (var i = 0; i < results.length; i++) {
        //     // create a new div
        //     var gifDiv = $("<div>");

        //     // create a variable to hold the rating that's grabbed
        //     var gifRating = results[i].rating;
        //     // create a p tag to hold the rating text and rating grabbed
        //     var p = $("<p>").text("Rating: " + rating);

        //     // create an image tag to place the image url
        //     var gifImage = $("<img>");
        //     // add src attribute with the URL 
        //     gifImage.attr("src", results[i].images.fixed_height.url);

        //     $("#gif-display").prepend(gifDiv);

        //     // Retrieving the URL for the image
        //     var imgURL = response.data[1].images.fixed_height_still.url;
        //     console.log(imgURL);
        //     $("#gif-display").append("<img src=\"" + imgURL + "\">");

        // }

    });
}

// FUNCTION TO GENERATE BUTTONS
function generateButtons() {

    $("#button-display").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
        var newbutton = $("<button>");
        newbutton.addClass("animation-name btn btn-warning m-1");
        // Adding a data-attribute with a value of the topic at index i
        newbutton.attr("data-name", topics[i]);
        // Providing the button's text with a value of the topic at index i
        newbutton.text(topics[i]);
        // Adding the button to the HTML
        $("#button-display").append(newbutton);
    }
}

// WHEN SEARCH BUTTON IS CLICKED: 
// 1) TAKE VALUE FROM USER-INPUT AND PUSH TO ARRAY,
// 2) THEN RUN FUNCTION TO GENERATE BUTTON
$("#search-button").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
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

$(document).on("click", ".animation-name", displayGif);
