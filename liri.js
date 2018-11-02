// Read and set environment variables
require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

//Helper function that gets the artist name
var getArtistNames = function (artist) {
  return artist.name;
};

//Function that handles what callback function to run after getting the user inputs from inquirer
var pick = function (caseData, functionData) {
  switch (caseData) {
    case "Concert or Artist":
      getMyBands(functionData);
      break;
    case "Song":
      getMeSpotify(functionData);
      break;
    case "Movie":
      getMeMovie(functionData);
      break;
    case "Whatever the file says.":
      doWhatItSays();
      break;
    default:
      console.log("LIRI doesn't know that");
  }
};

// Function for running a Spotify search
var getMeSpotify = function (songName) {
  if (songName === undefined) {
    songName = "Amplifier";
  }

  spotify.search({
      type: "track",
      query: songName
    },
    function (err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    }
  );
};

var getMyBands = function (artist) {
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  request(queryURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);

      if (!jsonData.length) {
        console.log("No results found for " + artist);
        return;
      }

      console.log("Upcoming concerts for " + artist + ":");

      for (var i = 0; i < jsonData.length; i++) {
        var show = jsonData[i];

        // Print data about each concert
        // If a concert doesn't have a region, display the country instead
        // Use moment to format the date
        console.log(
          show.venue.city +
          "," +
          (show.venue.region || show.venue.country) +
          " at " +
          show.venue.name +
          " " +
          moment(show.datetime).format("MM/DD/YYYY")
        );
      }
    }
  });
};

// Function for running a Movie Search
var getMeMovie = function (movieName) {
  if (movieName === undefined) {
    movieName = "Interstellar";
  }

  var urlHit =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  request(urlHit, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
    }
  });
};

// Function for running a command based on text file
var doWhatItSays = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

// Function for determining which command is executed


var UserInput1 = "";
var UserInput2 = "";
// execute(process.argv[2], process.argv.slice(3).join(" "));

var inquirer = require("inquirer");


inquirer.prompt([{
  name: "searchWhat",
  type: "list",
  message: "What would you like to search for?",
  choices: ["Concert or Artist", "Song", "Movie", "Whatever the file says."],
  validate: function (input) {
    if (input === '') {
      console.log("\n Invalid input. Please enter a valid search term");
      return false;
    } else {
      return true;
    }
  }
}]).then(function (data) {
  UserInput1 = data.searchWhat;
  console.log(UserInput1);
  if (UserInput1 == "Whatever the file says.") {
    doWhatItSays();
  } else {
    inquirer.prompt([{
      name: "UserInput",
      type: "input",
      message: "What is the name of the " + data.searchWhat + " you would like to search for?",
    }]).then(function (data) {
      UserInput2 = data.UserInput;
      console.log(UserInput2);
      // Invoking the function with User inputs from Inquirer
      pick(UserInput1, UserInput2);
    });
  }
});