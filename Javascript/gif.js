
var teams = ["SF 49ers", "Pittsburg Steelers", "Oakland Raiders", "New England Patriots", "LA Chargers", "LA Rams", "Seattle Seahawks", "KC Chiefs", "Dallas Cowboys", "Houston Texans", "Miami Dolphins", "Green Bay Packers"];

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < teams.length; i++) {

        var newbutton = $("<button>");
        newbutton.addClass("team");
        newbutton.attr("data-name", teams[i]);
        newbutton.text(teams[i]);
        $("#buttons-view").append(newbutton);

    }
}

$("#add-team").on("click", function(event) {

    event.preventDefault();
    var team = $("#team-input").val().trim();
    teams.push(team)

    renderButtons();

})

renderButtons();

$("button").on("click", function() {
    var teamsearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
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

          var personImage = $("<img>");
          personImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(personImage);

          $("#gifs-appear-here").prepend(gifDiv);

         
        }
      });
  });