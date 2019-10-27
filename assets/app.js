var topics = ["Toy Story", "The Simpsons", "Rilakkuma", "Aladdin", "Big Mouth",]

// Function for displaying movie data
function generateButtons() {

    $("#button-display").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        var newbutton = $("<button>");
        newbutton.addClass("movie btn btn-warning m-1");

        // Adding a data-attribute with a value of the movie at index i
        newbutton.attr("data-name", topics[i]);

        // Providing the button's text with a value of the movie at index i
        newbutton.text(topics[i]);
        
        // Adding the button to the HTML
        $("#button-display").append(newbutton);
    }
}

// This function handles events where one button is clicked
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

// Calling the renderButtons function at least once to display the initial list of movies
generateButtons();

// // // // // // // // 

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    $("div").append(response.data[1]);
});


// This .on("click") function will trigger the AJAX Call
// $("#find-movie").on("click", function (event) {

//     // Preventing the submit button from trying to submit the form
//     // We're optionally using a form so the user may hit Enter to search instead of clicking the button
//     event.preventDefault();

//     // Here we grab the text from the input box
//     var movie = $("#movie-input").val();

//     // Here we construct our URL
//     var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

//     // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
//     // and display it in the div with an id of movie-view

//     // YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE

//     // =================================================================

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         $("#movie-view").append(JSON.stringify(response));
//     });

//     // =================================================================
// });
