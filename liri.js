require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var inquirer = require("inquirer");



//=======USER PROMPTS=============//
inquirer.prompt([
    {
        type: "list",
        name: "type",
        message: "Which would you like information about?",
        choices: ["Music", "Concerts", "A Movie"],
    }, {
        type: "confirm",
        name: "confirm",
        message: "Are you sure?",
        default: true,
    },
])
    .then(function (response) {
        if (response.confirm) {
            switch (response.type) {
                
                // =========================MUSIC====================== //
                case "Music":
                    console.log("MUSIC SELECTED");
                    break;

                // =========================CONCERT====================== //
                case "Concerts":
                    console.log("CONCERTS SELECTED");
                    break;

                // =========================MOVIE====================== //
                case "A Movie":
                    console.log("MOVIE SELECTED");
                    var movieTitle = "";
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "movie",
                            message: "Which movie would you like information about?",
                        }
                    ])
                        .then(function (response2) {
                            movieTitle = response2.movie
                            movieGet();

                            function movieGet() {
                                axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy")
                                    .then(function (response) {
                                        console.log("Title: " + response.data.Title);
                                        console.log("Year: " + response.data.Year);
                                        console.log("IMDB Rating: " + response.data.Ratings[0].Value);
                                        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                                        console.log("Country: " + response.data.Country);
                                        console.log("Language: " + response.data.Language);
                                        console.log("Plot: " + response.data.Plot);
                                        console.log("Stars: " + response.data.Actors);
                                    });
                            }
                        })
                    break;
            }
        } else {
            console.log("Well try again when you're a little more decisive.")
        }
    });





// if (response.type === "Music") {
//     console.log("MUSIC SELECTED. RUN SPOTIFY API");
// } else if (response.type === "Concerts") {
//     console.log("CONCERTS SELECTED. RUN BANDS IN TOWN API");
// } else {
//     console.log("MOVIE SELECTED. RUN OMDB API")
// }