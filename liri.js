require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var inquirer = require("inquirer");



//=======USER PROMPTS=============//
inquirer.prompt([
    {
        type: "list",
        name: "type",
        message: "Which would you like information about?",
        choices: ["Spotify Music", "Concerts", "A Movie"],
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

                // =========================Spotify Music====================== //
                case "Spotify Music":
                    console.log("SPOTIFY MUSIC SELECTED");
                    var songTitle = "";
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "spotifyResp",
                            message: "Please enter the name of a song",
                        }
                    ])
                        .then(function (responseMusic) {
                            songTitle = responseMusic.spotifyResp
                            songGet();

                            function songGet() {
                                spotify
                                    .search({ type: 'track', query: songTitle })
                                    .then(function (respMus) {
                                        console.log("Artist: " + respMus.tracks.items[0].artists[0].name);
                                        console.log("Title: " + respMus.tracks.items[0].name);
                                        console.log("Album: " + respMus.tracks.items[0].album.name);
                                        console.log("Preview: " + respMus.tracks.items[0].preview_url);

                                        
                                    })
                                    .catch(function (err) {
                                        console.log(err);
                                    }



                                    );
                                // console.log(respMus.data.tracks);
                                // console.log(respMus.data.tracks);
                                // console.log(respMus.data.tracks);
                                // console.log(respMus.data.tracks);

                            }
                        })
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
                                    .then(function (respMov) {
                                        console.log("Title: " + respMov.data.Title);
                                        console.log("Year: " + respMov.data.Year);
                                        console.log("IMDB Rating: " + respMov.data.Ratings[0].Value);
                                        console.log("Rotten Tomatoes Rating: " + respMov.data.Ratings[1].Value);
                                        console.log("Country: " + respMov.data.Country);
                                        console.log("Language: " + respMov.data.Language);
                                        console.log("Plot: " + respMov.data.Plot);
                                        console.log("Stars: " + respMov.data.Actors);
                                    });
                            }
                        })
                    break;
            }
        } else {
            console.log("Well try again when you're a little more decisive.")
        }
    });




// ============IF STATEMENT(REPLACE WITH SWITCH STATEMENT)=========================//
// if (response.type === "Music") {
//     console.log("MUSIC SELECTED. RUN SPOTIFY API");
// } else if (response.type === "Concerts") {
//     console.log("CONCERTS SELECTED. RUN BANDS IN TOWN API");
// } else {
//     console.log("MOVIE SELECTED. RUN OMDB API")
// }