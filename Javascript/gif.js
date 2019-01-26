
var topic = ["SF 49ers", "Pittsburg Steelers", "Oakland Raiders", "New England Patriots", "LA Chargers", "LA Rams", "Seattle Seahawks", "KC Chiefs", "Dallas Cowboys", "Houston Texans", "Miami Dolphins", "Green Bay Packers"];

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < topic.length; i++) {

        var newbutton = $("<button>");
        newbutton.addClass("team");
        newbutton.attr("data-name", topic[i]);
        newbutton.text(topic[i]);
        $("#buttons-view").append(newbutton);

    }
}

$("#add-team").on("click", function() {

    var team = $("#team-input").val().trim();
    topic.push(team)

    renderButtons();
    return false;

})



function displayGifs() {
    var teamsearch = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      teamsearch + "&api_key=xmdirSkPXMngsS6Y5xLP0srxBkMiKLeH&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var teamImage = $("<img>");
          teamImage.attr("src", results[i].images.fixed_height_still.url);
          teamImage.attr("data-still", results[i].images.fixed_height_still.url);
          teamImage.attr("data-state", 'still');
          teamImage.addClass("gif");
          teamImage.attr('data-animate', results[i].images.fixed_height.url)

          gifDiv.prepend(p);
          gifDiv.prepend(teamImage);

          $("#gifs-appear-here").prepend(gifDiv);

         
        }
      });
    }

      $(document).on("click",".gif", function() {
        var state = $(this).attr("data-state")
        if(state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
          };
  });
$(document).on('click',".team", displayGifs);

  renderButtons();

