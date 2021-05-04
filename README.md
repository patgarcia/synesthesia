# synesthesia

An art gallery with a vision to emulate a voluntary synesthetic experience.

The motivation behind this installation, is to provide a vantage point into the life of people with the type of synesthesia, who experience color as sounds.

It is also a take on how [Neil Harbisson](https://www.ted.com/talks/neil_harbisson_i_listen_to_color?language=en_), a color-blind artist, experiences color as sound.

![App Demo](React%20App.gif)

## Repo
The repository can be found at https://github.com/patgarcia/synesthesia

## API
The Metropolitan Art Museum API https://metmuseum.github.io/
## Techonologies used
* Node JS
* React JS
* HTML5 / CSS3

## Installation
From inside the repository run:

```npm
npm -install
```

## CORS Proxy requirement
This app expects a ```REACT_APP_PROXY``` variable declared in your environment. Its value should be the address of a CORS proxy server we'll use to request some resources from the API. This server forwards our resource request to the API and serves the reponse back to our app with ```Access-Control-Allow-Origin``` added to its HTTP headers. In the live site we're using a Heroku app spined up with [this recipe](https://stackoverflow.com/a/43881141/5727431).

## Live Site
The site is hosted in a free tier of Heroku, so please be patient on loading. If you get ```Application error``` please reload. 
https://synthesthesia.herokuapp.com/