// Reading .env files
require('dotenv').config();

// import Spotify lib?

// Import keys.js and store it into a variable.
var keys = require('keys');
var spotify = new Spotify(keys.spotify);

/*  Take one of the following commands:
    concert-this
    spotify-this-song
    movie-this
    do-what-it-says
*/
