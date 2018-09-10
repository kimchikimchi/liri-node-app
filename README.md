# LIRI Bot

### Overview

In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### How to run the program
```
node ./liri.js <subcommand> <argument>
```
* `<subcommand> <argument>` is one of the following:
    * concert-this `<artist>` - shows future concert schedules for artist.
    * spotify-this-song `<song>` - shows artist, song title, preview, and album name for the song.
    * movie-this `<movie title>` - shows info on the movie.
    * do-what-it-says - reads from random.txt and performs the search action without user input.
