# rock-paper-scissors

Simple rock-paper-scissors game made with JavaScript.

## How to play

To play the game, just open the `dist/index.html` file in your browser.

## How to setup the development environment

To prepare the development environment, you can use [Docker Compose](https://docs.docker.com/compose/):

* Open the terminal and run `docker-compose up -d`. For this to work, be sure that the port `8080` is available;
* Run `docker-compose exec web npm run start` to setup the Node.js server. Then you can access the application in [`localhost:8080`](http://localhost:8080);
* You can use `docker-compose exec web npm run test` to run the tests.
