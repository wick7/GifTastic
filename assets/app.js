var array = ['Space', 'Mars', 'Neil Degrasse Tyson', 'Earth', 'Star Trek', 'Asteroids', 'Neil Armstrong', 'Constellation', 'Eclipse', 'Universe', 'The Cosmos', 'Meteorite', 'Astronaut‎ Sally Ride', 'Orbit', 'Northern Lights', 'Astronaut‎', 'Carl Sagan'];


function displayGifs() {

    $("#view").html('')
    var input = $(this).attr('data-name');
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=vfza6OdQBaslr1Oz9FIYd5vwqb9cdnbi';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)

        for (var i = 0; i < response.data.length; i++) {

            if ((i % 3) == 0) {
                var row = $("<div class=\"row justify-content-center\">");
                $("#view").append(row);
                var both = $("<div class=\"col-lg-3 col-sm-12\">");
                var rating = $("<p>");
                var image = $("<img>");
                rating.text('Rating: ' + response.data[i].rating);
                image.attr('src', response.data[i].images.fixed_height_still.url);
                image.attr('class', 'gif');
                image.attr('data-state', 'still');
                image.attr('data-still', response.data[i].images.fixed_height_still.url);
                image.attr('data-animate', response.data[i].images.fixed_height.url);
                $(both).append(rating);
                $(both).append(image);
                $(row).append(both);
            } else {
                var both = $("<div class=\"col-lg-3 col-sm-12\">");
                var rating = $("<p>");
                var image = $("<img>");
                rating.text('Rating: ' + response.data[i].rating);
                image.attr('src', response.data[i].images.fixed_height_still.url);
                image.attr('class', 'gif');
                image.attr('data-state', 'still');
                image.attr('data-still', response.data[i].images.fixed_height_still.url);
                image.attr('data-animate', response.data[i].images.fixed_height.url);
                $(both).append(rating);
                $(both).append(image);
                $(row).append(both);
            }
        }

    });

}


function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < array.length; i++) {

        var a = $("<button>");
        a.addClass("space");
        a.addClass('btn');
        a.addClass('btn-primary');
        a.attr("data-name", array[i]);
        a.text(array[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-input").on("click", function (event) {
    event.preventDefault();
    var userInput = $("#user-input").val().trim();

      if(userInput === '') {
        alert('Choose a label. No blank spaces!')
        var userInput = $("#user-input").val('');
    } else if (array.includes(userInput) === false) {
        array.push(userInput);
        renderButtons();
        var userInput = $("#user-input").val('');
    } else {
        alert('Button Already Exists! Choose a new label.')
        var userInput = $("#user-input").val('');
    }

});


renderButtons();

$(document).on("click", ".space", displayGifs);

$(document).on("click", ".gif", function () {
    console.log(this)
    var state = $(this).attr("data-state");
    var dataStill = $(this).attr("data-still");
    var dataAnimate = $(this).attr("data-animate");
    console.log(state)

    if (state === 'still') {
        $(this).attr('src', dataAnimate);
        $(this).attr('data-state', 'animate');
    } else if (state === 'animate') {
        $(this).attr('src', dataStill);
        $(this).attr('data-state', 'still');
    }
});