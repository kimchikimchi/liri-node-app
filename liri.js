// Reading .env files into process.env namespace.
require('dotenv').config();
var keys = require('./keys.js');

runCommand(process.argv[2], process.argv[3]);

function runCommand(command, argument) {
    switch (command) {
        case 'concert-this':
            searchEvents(argument);
        break;

        case 'spotify-this-song':
            searchSongs(argument);
        break;

        case 'movie-this':
            searchMovie(argument);
        break;

        case 'do-what-it-says':
            runTextfileCommands();
        break;

        default:
            console.log("Unknown command");
    }
}

/*
   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
     * Name of the venue
     * Venue location
     * Date of the Event (use moment to format this as "MM/DD/YYYY")
*/

function searchEvents(artist) {
    var url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${keys.bandsintown}`;
    var parser = function(data) {
        // data back from webservers are always in string and need conversion
        data = JSON.parse(data);

        data.forEach(function(event) {
            console.log(`${event.datetime}, ` +
                        `${event.venue.name}, ` +
                        `${event.venue.city} ${event.venue.region}`
                );
        });
    };

    makeRequest(url, parser);
}

/*
   * This will show the following information about the song in your terminal/bash window
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
*/

function searchSongs(song) {
    // Reading keys from .env file.
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);

    song = song || "The Sign";    // default

    spotify
        .search({ type: 'track', query: song })
        .then(function(response) {
            //console.log(JSON.stringify(response, null, 2));
            var tracks = response.tracks.items;

            tracks.forEach(function(track) {
                console.log(
                        `Artist: ${track.artists[0].name}\n` +
                        `Song:   ${track.name}\n` +
                        `Preview: ${track.preview_url}\n` +
                        `Album: ${track.album.name}\n\n`
                    );
            });
        })
        .catch(function(err) {
            console.log(err);
        });
}

/*
    * This will output the following information to your terminal/bash window:
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
*/

function searchMovie(movie) {
    movie = movie || 'Mr. Nobody.';     //default

    var url = `http://www.omdbapi.com/?apikey=${keys.omdb}&t=${movie}`;
    var parser = function(data) {
        // console.log(data);
        // data back from webservers are always in string and need conversion
        data = JSON.parse(data);

        console.log(`Title:  ${data.Title}\n` +
                    `Year:   ${data.Year}\n` +
                    `IMDB Rating: ${data.Ratings[0].Value}\n` +
                    `RT Score: ${data.Ratings[1].Value}\n` +
                    `Country: ${data.Country}\n` +
                    `Language: ${data.Language}\n` +
                    `Plot: ${data.Plot}\n` +
                    `Actors: ${data.Actors}\n`
            );
    };

    makeRequest(url, parser);
}

/*
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
*/

function runTextfileCommands() {
    var infile = './random.txt';
    var fs = require('fs');

    fs.readFile(infile, "utf8", function(err, data){
        if (err) throw err;

        var line = data.split(',');
        var command = line.shift();
        var argument = line.shift();

        runCommand(command, argument);
    });
}


function makeRequest(url, callback) {
    var request = require('request');

    request(url, function (error, response, body) {
        if (error) {
            console.log('error:', error); 
        } else {
            // Delegate parsing and printing to function passed in callback.
            callback(body);
        }
    });
}
