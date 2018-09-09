// Reading .env files into process.env namespace.
require('dotenv').config();

// Module imports
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var command =  process.argv[2],
    argument = process.argv[3];

 /*
    Take one of the following commands:
    concert-this
    spotify-this-song
    movie-this
    do-what-it-says
*/


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

/*
   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")
*/
function searchEvents(artist) {

}

/*
   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from
*/

function searchSongs(song) {


}

/*
    * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```
*/

function searchMovie(movie) {


}

/*
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
*/

function runTextfileCommands() {


}
