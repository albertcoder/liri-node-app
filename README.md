# liri-node-app
A nodejs app which searches Spotify for songs, Bands in Town for concerts, and OMDB for movies.

## How to install the app?
This app is a commmand line node js app so you need to first of all make sure you have nodejs installed on your system. Refer https://nodejs.org/en/download/ for download / install. 

```
git clone git@github.com:albertcoder/liri-node-app.git
```

```
npm install
```

Then create a file named .env and replace with your spotify credentials. The file should have something like this
```
# Spotify API keys

SPOTIFY_ID=34e84d93de6a5555515e5420e0369999
SPOTIFY_SECRET=5162cd8b5cf944440f48702dffe096c0000
```

## How to run the app?
You need to go to the root directory of the liri app. Then run the following command:
```javascript
node liri.js
```
Then select one of the following options. Then the prompt will ask you to enter a valid input which will yield your results. For example: If you select Song and enter the name of the song you want to search for then behind the scenes Spotify API will be hit for that specific result and the result will be displayed. Similar procedure is carried out for rest of the requests.
