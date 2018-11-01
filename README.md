# liri-node-app
A nodejs app which searches Spotify for songs, Bands in Town for concerts, and OMDB for movies.

## How to use the app.
This app is a commmand line node js app so you need to first of all make sure you have nodejs installed on your system. Refer https://nodejs.org/en/download/ for download / install. Next, you need to go to the root directory of the liri app. Then run the following command:
```javascript
node liri.js
```
Then select one of the following options. Then the prompt will ask you to enter a valid input which will yield your results. For example: If you select Song and enter the name of the song you want to search for then behind the scenes Spotify API will be hit for that specific result and the result will be displayed. Similar procedure is carried out for rest of the requests.
