require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var inquirer = require("inquirer");
var moment = require('moment');
var chalk = require("chalk");
var fs = require("fs");


switch (process.argv[2]) {

    // =========================Spotify Music====================== //
    case "spotify-this-song":
        console.log(chalk.greenBright.bold(("SPOTIFY MUSIC SELECTED")));
        var songTitle = process.argv[3];
        songGet();

        //============== BUILD FUNCTION =============//
        function songGet() {
            if (!songTitle) {
                songTitle = "The Sign";
                ace();
            } else {
                spotify
                    .search({ type: 'track', query: songTitle })
                    .then(function (respMus) {
                        console.log((chalk.magentaBright.bold("Artist: ")) + respMus.tracks.items[0].artists[0].name);
                        console.log((chalk.magentaBright.bold("Title: ")) + respMus.tracks.items[0].name);
                        console.log((chalk.magentaBright.bold("Album: ")) + respMus.tracks.items[0].album.name);
                        console.log((chalk.magentaBright.bold("Preview: ")) + respMus.tracks.items[0].preview_url);
                    })
            }
        };
//=================
        function ace() {
            spotify
                .search({ type: 'track', query: songTitle })
                .then(function (respMus) {
                    console.log((chalk.magentaBright.bold("Artist: ")) + respMus.tracks.items[5].artists[0].name);
                    console.log((chalk.magentaBright.bold("Title: ")) + respMus.tracks.items[5].name);
                    console.log((chalk.magentaBright.bold("Album: ")) + respMus.tracks.items[5].album.name);
                    console.log((chalk.magentaBright.bold("Preview: ")) + respMus.tracks.items[5].preview_url);
                })
                }

            

break;
    //==========================CONCERT==================//
    case "concert-this":
        console.log("CONCERT SELECTED");
        var bandName = process.argv[3];
        concertGet();

        function concertGet() {
            var URL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"
            axios.get(URL)
                .then(function (concertResult) {
                    console.log((chalk.magentaBright.bold("UPCOMING SHOWS:")));
                    for (var i = 0; i < 10; i++) {
                        // console.log("\n" + concertResult.data[i].datetime);
                        console.log((chalk.blue.bold("\n" + concertResult.data[i].venue.name)));
                        console.log((chalk.green.bold(concertResult.data[i].venue.city + ", " + concertResult.data[i].venue.region)));
                        console.log((chalk.yellow.bold(moment(concertResult.data[i].datetime).format('L'))));
                    }
                })
        }
        break;
    // =========================MOVIE====================== //
    case "movie-this":
        console.log((chalk.yellow.bold("MOVIE SELECTED")));
        var movieTitle = process.argv[3];
        movieGet();

        function movieGet() {
            if (!movieTitle) {
                movieTitle = "Mr. Nobody";
            }
            axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy")
                .then(function (respMov) {
                    console.log((chalk.blue.bold("Title: ") + respMov.data.Title));
                    console.log((chalk.blue.bold("Year: ") + respMov.data.Year));
                    console.log((chalk.blue.bold("IMDB Rating: ") + respMov.data.Ratings[0].Value));
                    console.log((chalk.blue.bold("Rotten Tomatoes Rating: ") + respMov.data.Ratings[1].Value));
                    console.log((chalk.blue.bold("Country: ") + respMov.data.Country));
                    console.log((chalk.blue.bold("Language: ") + respMov.data.Language));
                    console.log((chalk.blue.bold("Plot: ") + respMov.data.Plot));
                    console.log((chalk.blue.bold("Stars: ") + respMov.data.Actors));
                });
        }
        break;
    //====================DO WHAT IT SAYS======================//
    case "do-what-it-says":
        console.log(chalk.greenBright.bold(("You're the boss...")));
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                console.log(error);
            }
            // console.log(data);
            var dataArr = data.split(",");
            // console.log(dataArr);
            process.argv[2] = dataArr[0];
            songTitle = dataArr[1];
            songGet();
            
        })
        break;
    //==============================DEFAULT======================== //
    default:
        console.log(
            "Please enter a command in the following formats" +
            (chalk.magentaBright.bold("\n spotify-this-song '[SONG NAME]'" +
                "\n concert-this '[BAND NAME]'" +
                "\n movie-this '[MOVIE NAME]'" +
                "\n do-what-it-says")));
}