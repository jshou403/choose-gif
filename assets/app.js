var topics = ["Toy Story", "The Simpsons", "Rilakkuma", "Aladdin", "Big Mouth", "Family Guy", "Land Before Time", "Cinderella", "Mulan", "Trolls"]

// FUNCTION TO DISPLAY GIFS
function displayGif() {

    var title = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&limit=10&rating=PG13&apikey=QWPefb4T4UfHSWwLEDxMZmKFzKnHDbhS";

    console.log("Data-name = " + title);

    // TRYING TO CREATE A DIV FOR EACH SET OF GIFS TO POPULATE
    var gifGrouping = $("<div>");
    gifGrouping.addClass("border border-2 border-warning mb-3");
    $("#gif-display").prepend(gifGrouping);

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {

        var results = response.data;
        console.log(results);

        for (var i = 0; i < results.length; i++) {

            // New div to hold gif + rating
            var gifHolder = $("<div>");
            // gifHolder.addClass("border border-warning border-2");

            // Add image to new div
            var imgURL = results[i].images.fixed_height_still.url;
            gifHolder.append("<img src=\"" + imgURL + "\">");

            // New p tag to hold rating
            var pRating = $("<p>")
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

// WHEN BUTTON class=animation-name IS CLICKED: 
// 1) RUN FUNCTION TO DISPLAY GIF
$(document).on("click", ".animation-name", displayGif);
